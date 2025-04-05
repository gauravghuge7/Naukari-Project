import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button, Form } from "react-bootstrap";

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
  });

  const resetForm = () => {
    setNewEvent({ title: "", date: "", description: "" });
    setEditMode(false);
    setSelectedEvent(null);
  };

  const handleDateClick = (info) => {
    resetForm();
    setNewEvent({ ...newEvent, date: info.dateStr });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(
      (event) =>
        event.date === info.event.startStr && event.title === info.event.title
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setNewEvent({
        title: clickedEvent.title,
        date: clickedEvent.date,
        description: clickedEvent.description,
      });
      setEditMode(true);
      setShowModal(true);
    }
  };

  const handleEventSave = () => {
    if (!newEvent.title || !newEvent.date) return;

    if (editMode && selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.date === selectedEvent.date && event.title === selectedEvent.title
          ? {
              ...event,
              title: newEvent.title,
              date: newEvent.date,
              description: newEvent.description,
            }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([
        ...events,
        {
          title: newEvent.title,
          date: newEvent.date,
          description: newEvent.description,
        },
      ]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEventDelete = () => {
    const filteredEvents = events.filter(
      (event) =>
        !(
          event.date === selectedEvent.date &&
          event.title === selectedEvent.title
        )
    );
    setEvents(filteredEvents);
    setShowModal(false);
    resetForm();
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
          ...event,
          title: `${event.title}${event.description ? ` - ${event.description}` : ""}`,
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
            <Form.Group>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Optional description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </Form.Group>

            <div className="mt-4 d-flex justify-content-between">
              <Button variant="primary" onClick={handleEventSave}>
                {editMode ? "Save Changes" : "Add Task"}
              </Button>
              {editMode && (
                <Button variant="danger" onClick={handleEventDelete}>
                  Delete Task
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
