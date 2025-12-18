import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useEventStore } from "../Store/EventStoreContext";
import { eventTemplate } from "../Data/eventTemplate";

/* ================== STYLES ================== */
/* ================== STYLED ================== */
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.mainBg};
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 420px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 6px 16px ${({ theme }) => theme.shadow};
  padding: 18px;
  border-radius: 14px;
  backdrop-filter: blur(8px);
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;

  &.stack {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;
  min-height: 96px;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const Button = styled.button`
  padding: 10px 14px;
  background: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.textOnHeader || "#fff"};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const GhostBtn = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.glass};
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  margin-bottom: 10px;
`;

const AddOtherBtn = styled.button`
  background: transparent;
  border: 1px dashed ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.mainBg};
  }
`;

/* ===== Ticket Price Styles ===== */

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
  margin-top: 10px;
`;

const TicketBadge = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 6px 8px;
  text-align: center;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};

  span {
    display: block;
    font-size: 10px;
    font-weight: 600;
    opacity: 0.65;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  strong {
    font-size: 13px;
    font-weight: 700;
    margin-top: 2px;
    display: block;
  }
`;

const FreeBadge = styled.div`
  margin-top: 10px;
  display: inline-block;
  background: rgba(5, 150, 105, 0.15);
  color: #059669;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

/* ================== ERROR TEXT ================== */
const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 2px;
  display: block;
`;

/* ================== COMPONENT ================== */
export default function QuickAction() {
  const theme = useTheme();
  const {
    events,
    pendingEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    uploadEvent,
    triggerNotification,
  } = useEventStore();

  const [form, setForm] = useState(eventTemplate);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showOtherTicket, setShowOtherTicket] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  /* ================== HELPERS ================== */
  const resetForm = () => {
    setForm({
      ...eventTemplate,
      tickets: { ...eventTemplate.tickets },
      attendees: [...(eventTemplate.attendees || [])],
    });
    setImagePreview("");
    setEditId(null);
    setShowOtherTicket(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.date.trim()) errors.date = "Date is required";
    if (!form.location.trim()) errors.location = "Location is required";
    if (!form.freeEvent) {
      const hasPrice = Object.values(form.tickets).some((p) => p.trim());
      if (!hasPrice) errors.tickets = "At least one ticket price required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================== INPUT HANDLERS ================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTicketChange = (tier, value) => {
    setForm((prev) => ({
      ...prev,
      tickets: { ...prev.tickets, [tier]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
    setForm((prev) => ({ ...prev, image: previewURL, imageFile: file }));
  };

  const toggleFreeEvent = (checked) => {
    setForm((prev) => ({
      ...prev,
      freeEvent: checked,
      tickets: checked
        ? { vvip: "", vip: "", regular: "", other: "" }
        : prev.tickets,
    }));
  };

  /* ================== ACTION HANDLERS ================== */
  const handleSave = () => {
    if (!validateForm()) return;

    if (editId) {
      updateEvent(editId, form);
      triggerNotification("Event updated");
    } else {
      addEvent(form);
      triggerNotification("Event created");
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;

    setForm(event);
    setImagePreview(event.image || "");
    setEditId(id);
  };

  const handleUpload = (id) => {
    uploadEvent(id);
    triggerNotification("Event uploaded");
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    triggerNotification("Event moved to trash");
    if (id === editId) resetForm();
  };

  useEffect(() => {
    if (form.tickets.other) setShowOtherTicket(true);
  }, [form.tickets.other]);

  /* ================== RENDER HELPERS ================== */
  const renderTicketPrices = (event) => {
    if (event.freeEvent) return <FreeBadge>Free Event</FreeBadge>;

    const tickets =
      event.tickets &&
      Object.entries(event.tickets).filter(([, price]) => price);

    if (!tickets || tickets.length === 0) return null;

    return (
      <TicketGrid>
        {tickets.map(([type, price]) => (
          <TicketBadge key={type}>
            <span>{type}</span>
            <strong>{price}</strong>
          </TicketBadge>
        ))}
      </TicketGrid>
    );
  };

  /* ================== JSX ================== */
  return (
    <Wrapper>
      <Grid>
        {/* LEFT: FORM */}
        <Card>
          <h3>{editId ? "Edit Event" : "Create Event"}</h3>

          <Label>Title</Label>
          <Input name="title" value={form.title} onChange={handleChange} />
          {validationErrors.title && (
            <ErrorText>{validationErrors.title}</ErrorText>
          )}

          <Label>Category</Label>
          <Select name="category" value={form.category} onChange={handleChange}>
            {[
              "Music",
              "Tech",
              "Sports",
              "Food",
              "Business",
              "Community",
              "Other",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>

          <Row>
            <Input
              name="date"
              value={form.date}
              readOnly
              onFocus={() => setShowCalendar(true)}
            />
            <Input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </Row>
          {validationErrors.date && (
            <ErrorText>{validationErrors.date}</ErrorText>
          )}

          {showCalendar && (
            <Calendar
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  date: new Date(value).toISOString().split("T")[0],
                }));
                setShowCalendar(false);
              }}
            />
          )}

          <Label>Location</Label>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          {validationErrors.location && (
            <ErrorText>{validationErrors.location}</ErrorText>
          )}

          <Label>Image</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && <PreviewImg src={imagePreview} />}

          <Label>Description</Label>
          <TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              checked={form.freeEvent}
              onChange={(e) => toggleFreeEvent(e.target.checked)}
            />
            Free Event
          </label>

          {!form.freeEvent && (
            <>
              <Label>Ticket Prices</Label>
              {["vvip", "vip", "regular"].map((tier) => (
                <Input
                  key={tier}
                  placeholder={`${tier.toUpperCase()} price`}
                  value={form.tickets[tier]}
                  onChange={(e) => handleTicketChange(tier, e.target.value)}
                />
              ))}
              {showOtherTicket ? (
                <Input
                  placeholder="Other ticket"
                  value={form.tickets.other}
                  onChange={(e) => handleTicketChange("other", e.target.value)}
                />
              ) : (
                <AddOtherBtn onClick={() => setShowOtherTicket(true)}>
                  Add other ticket
                </AddOtherBtn>
              )}
              {validationErrors.tickets && (
                <ErrorText>{validationErrors.tickets}</ErrorText>
              )}
            </>
          )}

          <Row>
            <Button onClick={handleSave}>{editId ? "Update" : "Create"}</Button>
            <GhostBtn onClick={resetForm}>Reset</GhostBtn>
          </Row>
        </Card>

        {/* RIGHT: DRAFTS */}
        <Card>
          <h4>Drafts</h4>
          {pendingEvents.length === 0 && (
            <p style={{ opacity: 0.6 }}>No drafts yet</p>
          )}

          {pendingEvents.map((e) => (
            <div key={e.id}>
              {e.image && <PreviewImg src={e.image} />}
              <strong>{e.title}</strong>
              <div style={{ opacity: 0.6 }}>
                {e.category} | {e.date} {e.time && `| ${e.time}`}
              </div>

              {renderTicketPrices(e)}

              <Row>
                <Button onClick={() => handleEdit(e.id)}>Edit</Button>
                <Button onClick={() => handleUpload(e.id)}>Upload</Button>
                <GhostBtn onClick={() => handleDelete(e.id)}>Delete</GhostBtn>
              </Row>
            </div>
          ))}
        </Card>
      </Grid>
    </Wrapper>
  );
}
