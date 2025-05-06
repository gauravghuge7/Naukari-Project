import React, { useEffect, useState } from "react";
import FullCalendar, {
  DateClickArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./MyCalendar.css"; // Optional custom styles

interface Task {
  _id?: string;
  taskTitle: string;
  taskDate: string;
  taskDescription: string;
  taskStatus: "To Do" | "In Progress" | "Completed";
  taskDuration: number;
  taskPriority: number;
}

interface Params {
  planId: string;
}

function MyCalendar() {
  const { planId } = useParams<Params>();
  const [events, setEvents] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Task | null>(null);
  const [newEvent, setNewEvent] = useState<Task>({
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
    } catch {
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

  const handleDateClick = (info: DateClickArg) => {
    resetForm();
    setNewEvent((prev) => ({ ...prev, taskDate: info.dateStr }));
    setShowModal(true);
  };

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = events.find(
      (event) =>
        event.taskDate === info.event.startStr &&
        event.taskTitle === info.event.title
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setNewEvent({ ...clickedEvent });
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
    } catch {
      toast.error("Action failed");
    }
  };

  const handleEventDelete = async () => {
    if (!selectedEvent?._id) return;
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
        } satisfies EventInput))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="classic-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Task" : "Add New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={newEvent.taskTitle}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskTitle: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Details or notes"
                value={newEvent.taskDescription}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, taskDescription: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Status</Form.Label>
                  <Form.Select
                    value={newEvent.taskStatus}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        taskStatus: e.target.value as Task["taskStatus"],
                      })
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Priority</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={5}
                    value={newEvent.taskPriority}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        taskPriority: Number(e.target.value),
                      })
                    }
                  />
                  <Form.Text muted>1 = High, 5 = Low</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.taskDuration}
                min={0}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    taskDuration: Number(e.target.value),
                  })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-between pt-2">
              <Button variant="primary" onClick={handleEventSave}>
                {editMode ? "Update Task" : "Add Task"}
              </Button>
              {editMode && (
                <Button variant="outline-danger" onClick={handleEventDelete}>
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
