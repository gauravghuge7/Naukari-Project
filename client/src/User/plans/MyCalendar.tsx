import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function MyCalendar() {
  const { planId } = useParams<{ planId: string }>();

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    taskTitle: "",
    taskDate: "",
    taskDescription: "",
    taskStatus: "To Do",
    taskDuration: 30,
    taskPriority: 1,
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/api/student/task/getTasks/${planId}`);
      if (res.status === 200) {
        setEvents(res.data || []);
      }
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [planId]);

  const resetForm = () => {
    setNewEvent({
      taskTitle: "",
      taskDate: "",
      taskDescription: "",
      taskStatus: "To Do",
      taskDuration: 30,
      taskPriority: 1,
    });
    setEditMode(false);
    setSelectedEvent(null);
  };

  const handleDateClick = (info) => {
    resetForm();
    setNewEvent({ ...newEvent, taskDate: info.dateStr });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) =>
        event.taskDate === info.event.startStr &&
        event.taskTitle === info.event.title
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setNewEvent({
        taskTitle: clickedEvent.taskTitle,
        taskDate: clickedEvent.taskDate,
        taskDescription: clickedEvent.taskDescription,
        taskStatus: clickedEvent.taskStatus,
        taskDuration: clickedEvent.taskDuration,
        taskPriority: clickedEvent.taskPriority,
      });
      setEditMode(true);
      setShowModal(true);
    }
  };

  const handleEventSave = async () => {
    const formData = new FormData();
    Object.entries(newEvent).forEach(([key, value]) =>
      formData.append(key, String(value))
    );

    try {
      if (editMode && selectedEvent) {
        const res = await axios.put(
          `/api/student/task/updateTask/${planId}`,
          formData
        );
        if (res.status === 200) {
          toast.success("Task updated");
          fetchTasks();
        }
      } else {
        const res = await axios.post(
          `/api/student/task/addTasks/${planId}`,
          formData
        );
        if (res.status === 201) {
          toast.success("Task added");
          fetchTasks();
        }
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleEventDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/student/task/deleteTask/${selectedEvent._id}`
      );
      if (res.status === 200) {
        toast.success("Task deleted");
        fetchTasks();
        setShowModal(false);
        resetForm();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="80vh"
        events={events.map((event) => ({
          title: event.taskTitle,
          start: event.taskDate,
          extendedProps: { ...event },
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="taskTitle"
                value={newEvent.taskTitle}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskTitle: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="taskDescription"
                value={newEvent.taskDescription}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskDescription: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="taskStatus"
                value={newEvent.taskStatus}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskStatus: e.target.value })
                }
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="taskDuration"
                value={newEvent.taskDuration}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskDuration: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type="number"
                name="taskPriority"
                value={newEvent.taskPriority}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskPriority: e.target.value })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleEventSave}>
                {editMode ? "Save Changes" : "Add Task"}
              </Button>
              {editMode && (
                <Button variant="danger" onClick={handleEventDelete}>
                  Delete
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MyCalendar;
