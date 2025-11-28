import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// ===== Styled Components =====
const Container = styled.div`
  padding: 25px;
  color: ${({ theme }) => theme.text};
  .react-calendar {
    background: ${({ theme }) => theme.mainBg};
    color: ${({ theme }) => theme.text};
    border-radius: 12px;
    padding: 10px;
    border: none;
  }
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.headerBg};
    color: ${({ theme }) => theme.text};
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.headerBg : theme.sidebarBg};
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    filter: brightness(1.1);
  }
`;

const FormSection = styled.div`
  background: ${({ theme }) => theme.glass};
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    margin-bottom: 6px;
    font-weight: 500;
  }
  input,
  textarea,
  select {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.mainBg};
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.headerBg};
    }
  }
  textarea {
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    text-align: left;
    color: ${({ theme }) => theme.text};
  }
  th {
    background: ${({ theme }) => theme.headerBg};
    font-weight: 600;
  }
  tr:hover {
    background: ${({ theme }) => theme.glass};
    filter: brightness(1.05);
  }
  button {
    background: #ff4d4f;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const SectionTitle = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const EventCard = styled.div`
  background: ${({ theme }) => theme.mainBg};
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    filter: brightness(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardTitle = styled.h4`
  margin: 0;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const TicketsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  li {
    margin-bottom: 4px;
  }
`;

// ===== Component =====
function QuickAction() {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [newEvent, setNewEvent] = useState({
    image: null,
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    freeEvent: false,
    tickets: { vvip: "", vip: "", regular: "", other: "" },
    attendees: [],
  });
  const [attendeePage, setAttendeePage] = useState(1);
  const attendeesPerPage = 5;

  // ===== Handlers =====
  const resetNewEvent = () => {
    setNewEvent({
      image: null,
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      freeEvent: false,
      tickets: { vvip: "", vip: "", regular: "", other: "" },
      attendees: [],
    });
  };

  const handleCreateEvent = () => {
    const title = newEvent.title.trim();
    const location = newEvent.location.trim();
    const description = newEvent.description.trim();

    if (
      !title ||
      !newEvent.date ||
      !newEvent.time ||
      !location ||
      !description
    ) {
      setError("Please fill in all required fields before creating the event.");
      return;
    }

    setError("");

    if (editingEventId) {
      // Update existing event
      const updatedEvents = events.map((e) =>
        e.id === editingEventId
          ? { ...newEvent, id: editingEventId, uploaded: e.uploaded }
          : e
      );
      setEvents(updatedEvents);
      setEditingEventId(null); // reset editing
      setSuccessMsg("Event updated successfully!");
    } else {
      // Create new event
      const createdEvent = { ...newEvent, id: Date.now() };
      setEvents([...events, createdEvent]);
      setSuccessMsg("Event created successfully!");
    }

    resetNewEvent();
    setTimeout(() => setSuccessMsg(""), 2000);
    setActiveTab("ticketing");
  };

  const handleTicketUpdate = (eventId) => {
    setSuccessMsg("Ticket info saved successfully.");
    setTimeout(() => setSuccessMsg(""), 2000);
    setActiveTab("review");
  };

  const handleUploadEvent = (eventId) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, uploaded: true } : e
    );
    setEvents(updatedEvents);
    setSuccessMsg("Event uploaded successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
    setActiveTab("manage");
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((e) => e.id === eventId);
    if (eventToEdit) {
      setNewEvent({ ...eventToEdit });
      setActiveTab("create"); // open the create/edit form
      setEditingEventId(eventId); // mark as editing
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setNewEvent({ ...newEvent, image: URL.createObjectURL(file) });
  };

  const handleAddAttendee = (eventId) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId
        ? {
            ...e,
            attendees: [
              ...e.attendees,
              { name: "", email: "", ticket: "Regular" },
            ],
          }
        : e
    );
    setEvents(updatedEvents);
  };

  const handleRemoveAttendee = (eventId, index) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId
        ? { ...e, attendees: e.attendees.filter((_, i) => i !== index) }
        : e
    );
    setEvents(updatedEvents);
  };

  const handleAttendeeChange = (eventId, index, field, value) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId
        ? {
            ...e,
            attendees: e.attendees.map((a, i) =>
              i === index ? { ...a, [field]: value } : a
            ),
          }
        : e
    );
    setEvents(updatedEvents);
  };

  // ===== Render =====
  return (
    <Container>
      <Nav>
        <NavButton
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
        >
          Create Event
        </NavButton>
        <NavButton
          active={activeTab === "ticketing"}
          onClick={() => setActiveTab("ticketing")}
        >
          Ticketing
        </NavButton>
        <NavButton
          active={activeTab === "review"}
          onClick={() => setActiveTab("review")}
        >
          Review & Upload
        </NavButton>
        <NavButton
          active={activeTab === "manage"}
          onClick={() => setActiveTab("manage")}
        >
          Manage Events
        </NavButton>
        <NavButton
          active={activeTab === "attendees"}
          onClick={() => setActiveTab("attendees")}
        >
          Attendees
        </NavButton>
        <NavButton
          active={activeTab === "calendar"}
          onClick={() => setActiveTab("calendar")}
        >
          Event Calendar
        </NavButton>
      </Nav>
      {/* CREATE EVENT */}
      {activeTab === "create" && (
        <FormSection>
          <h3>Create Event</h3>
          {error && (
            <p
              style={{ color: "red", fontWeight: "500", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}
          <FormGroup>
            <label>Event Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {newEvent.image && (
              <img
                src={newEvent.image}
                alt="Preview"
                style={{ marginTop: "10px", maxWidth: "200px" }}
              />
            )}
          </FormGroup>
          {["title", "date", "time", "location"].map((field) => (
            <FormGroup key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={
                  field === "date" ? "date" : field === "time" ? "time" : "text"
                }
                value={newEvent[field]}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, [field]: e.target.value })
                }
              />
            </FormGroup>
          ))}
          <FormGroup>
            <label>Description</label>
            <textarea
              rows={4}
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>
              <input
                type="checkbox"
                checked={newEvent.freeEvent}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, freeEvent: e.target.checked })
                }
              />{" "}
              Free Event
            </label>
          </FormGroup>
          <SubmitButton onClick={handleCreateEvent}>
            Create Event & Next → Ticketing
          </SubmitButton>
        </FormSection>
      )}
      {/* TICKETING */}
      {activeTab === "ticketing" && (
        <FormSection>
          <h3>Ticketing</h3>
          {events.map((event) => (
            <div key={event.id} style={{ marginBottom: "25px" }}>
              <h4>{event.title}</h4>
              {!event.freeEvent &&
                ["vvip", "vip", "regular", "other"].map((tier) => (
                  <FormGroup key={tier}>
                    <label>{tier.toUpperCase()} Price</label>
                    <input
                      type="number"
                      value={event.tickets[tier]}
                      onChange={(e) => {
                        const updatedEvents = events.map((ev) =>
                          ev.id === event.id
                            ? {
                                ...ev,
                                tickets: {
                                  ...ev.tickets,
                                  [tier]: e.target.value,
                                },
                              }
                            : ev
                        );
                        setEvents(updatedEvents);
                      }}
                    />
                  </FormGroup>
                ))}
              <SubmitButton onClick={() => handleTicketUpdate(event.id)}>
                Save & Next → Review
              </SubmitButton>
              {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            </div>
          ))}
        </FormSection>
      )}

      {/* REVIEW & UPLOAD */}
      {activeTab === "review" && (
        <FormSection>
          <h3>Review & Upload</h3>
          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            <Grid>
              {events.map((event) => (
                <EventCard key={event.id}>
                  {event.image && (
                    <CardImage src={event.image} alt={event.title} />
                  )}
                  <CardContent>
                    <CardTitle>{event.title}</CardTitle>
                    <CardText>
                      {event.date} | {event.time} | {event.location}
                    </CardText>
                    <CardText>{event.description}</CardText>
                    <SectionTitle>Tickets</SectionTitle>
                    <TicketsList>
                      {event.freeEvent ? (
                        <li>Free Event</li>
                      ) : (
                        Object.entries(event.tickets).map(([tier, price]) => (
                          <li key={tier}>
                            {tier.toUpperCase()}: ${price || "N/A"}
                          </li>
                        ))
                      )}
                    </TicketsList>
                    <SubmitButton onClick={() => handleUploadEvent(event.id)}>
                      Upload Event
                    </SubmitButton>
                    {successMsg && (
                      <p style={{ color: "green" }}>{successMsg}</p>
                    )}
                  </CardContent>
                </EventCard>
              ))}
            </Grid>
          )}
        </FormSection>
      )}

      {/* MANAGE EVENTS */}
      {activeTab === "manage" && (
        <FormSection>
          <h3>Manage Events</h3>
          {events.length === 0 ? (
            <p>No events available. Create and upload an event first.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Tickets</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          style={{ width: "60px", borderRadius: "8px" }}
                        />
                      )}
                      <span>{event.title}</span>
                    </td>
                    <td>
                      {event.date} | {event.time}
                    </td>
                    <td>{event.location}</td>
                    <td>
                      {event.uploaded ? (
                        <span style={{ color: "green", fontWeight: "600" }}>
                          ✅ Uploaded
                        </span>
                      ) : (
                        <span style={{ color: "orange", fontWeight: "600" }}>
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {!event.freeEvent &&
                        Object.entries(event.tickets).map(([tier, price]) => (
                          <div key={tier}>
                            {tier.toUpperCase()}: ${price || "N/A"}
                          </div>
                        ))}
                      {event.freeEvent && <div>Free Event</div>}
                    </td>
                    <td>
                      <button
                        style={{
                          background: "#ffa500",
                          color: "#fff",
                          marginRight: "6px",
                        }}
                        onClick={() => handleEditEvent(event.id)}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          background: "#1890ff",
                          color: "#fff",
                          marginRight: "6px",
                        }}
                        onClick={() => handleUploadEvent(event.id)}
                      >
                        {event.uploaded ? "Update Live" : "Upload"}
                      </button>
                      <button
                        onClick={() =>
                          setEvents(events.filter((e) => e.id !== event.id))
                        }
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </FormSection>
      )}

      {/* ATTENDEES */}
      {activeTab === "attendees" && (
        <FormSection>
          <h3>Attendees</h3>
          {events
            .filter((e) => !e.uploaded) // exclude uploaded events
            .map((event) => (
              <div key={event.id} style={{ marginBottom: "25px" }}>
                <h4>{event.title}</h4>
                <SubmitButton onClick={() => handleAddAttendee(event.id)}>
                  Add Attendee
                </SubmitButton>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Ticket</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.attendees
                      .slice(
                        (attendeePage - 1) * attendeesPerPage,
                        attendeePage * attendeesPerPage
                      )
                      .map((a, i) => (
                        <tr key={i}>
                          <td>
                            <input
                              type="text"
                              value={a.name}
                              onChange={(e) =>
                                handleAttendeeChange(
                                  event.id,
                                  (attendeePage - 1) * attendeesPerPage + i,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="email"
                              value={a.email}
                              onChange={(e) =>
                                handleAttendeeChange(
                                  event.id,
                                  (attendeePage - 1) * attendeesPerPage + i,
                                  "email",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <select
                              value={a.ticket}
                              onChange={(e) =>
                                handleAttendeeChange(
                                  event.id,
                                  (attendeePage - 1) * attendeesPerPage + i,
                                  "ticket",
                                  e.target.value
                                )
                              }
                            >
                              {["VVIP", "VIP", "Regular", "Other"].map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                handleRemoveAttendee(
                                  event.id,
                                  (attendeePage - 1) * attendeesPerPage + i
                                )
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ))}
        </FormSection>
      )}

      {/* CALENDAR */}
      {activeTab === "calendar" && (
        <FormSection>
          <h3>Event Calendar</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date, view }) =>
              view === "month"
                ? events
                    .filter((e) => e.date === date.toISOString().split("T")[0])
                    .map((e, i) => <p key={i}>{e.title}</p>)
                : null
            }
          />
        </FormSection>
      )}
    </Container>
  );
}

export default QuickAction;
