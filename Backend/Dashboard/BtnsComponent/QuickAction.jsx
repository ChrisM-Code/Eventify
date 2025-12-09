import { useState, useCallback } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useEventStore } from "../Store/EventStoreContext";
import { eventTemplate } from "../Data/eventTemplate";

/* ================== STYLED ================== */
const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text};

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
  box-shadow: 0 6px 18px ${({ theme }) => theme.shadow};
  padding: 18px;
  border-radius: 12px;
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
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;
  min-height: 96px;
`;

const Button = styled.button`
  padding: 10px 14px;
  background: ${({ theme }) => theme.headerBg};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    transform: translateY(-2px);
  }
`;

const GhostBtn = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

/* ================== MAIN COMPONENT ================== */
export default function QuickAction() {
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    uploadEvent,
    triggerNotification,
    pendingEvents,
  } = useEventStore();

  const [form, setForm] = useState(eventTemplate);
  const [editId, setEditId] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // image preview state (object URL)
  const [imagePreview, setImagePreview] = useState(form.image || "");

  // handle generic input changes
  const onChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }, []);

  // handle ticket price changes
  const onTicketChange = useCallback((tier, value) => {
    setForm((f) => ({ ...f, tickets: { ...f.tickets, [tier]: value } }));
  }, []);

  // handle file upload (image)
  const onFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((f) => ({ ...f, image: url, imageFile: file }));
  }, []);

  // Save (create or update)
  const handleSave = useCallback(() => {
    if (!form.title || !form.date || !form.location) {
      return alert("Please provide title, date and location.");
    }

    if (editId) {
      updateEvent(editId, form);
      triggerNotification("Event updated");
    } else {
      addEvent(form);
      triggerNotification("Event created");
    }

    // Reset form
    setForm({
      ...eventTemplate,
      tickets: { ...eventTemplate.tickets },
      attendees: [...(eventTemplate.attendees || [])],
      imageFile: null,
      image: "",
    });

    setImagePreview("");
    setEditId(null);
  }, [form, editId, updateEvent, addEvent, triggerNotification]);

  // Edit existing draft
  const handleEdit = useCallback(
    (id) => {
      const item = events.find((e) => e.id === id);
      if (!item) return;
      setForm(item);
      setImagePreview(item.image || "");
      setEditId(id);
    },
    [events]
  );

  // Upload event
  const handleUpload = useCallback(
    (id) => {
      uploadEvent(id);
      triggerNotification("Event uploaded to site");
    },
    [uploadEvent, triggerNotification]
  );

  // Delete → moves to trash
  const handleDelete = useCallback(
    (id) => {
      deleteEvent(id);
      triggerNotification("Event moved to trash");
      if (id === editId) {
        setForm(eventTemplate);
        setImagePreview("");
        setEditId(null);
      }
    },
    [deleteEvent, triggerNotification, editId]
  );

  // toggle free event
  const toggleFreeEvent = useCallback((checked) => {
    setForm((f) => ({
      ...f,
      freeEvent: checked,
      tickets: checked
        ? { vvip: "", vip: "", regular: "", other: "" }
        : f.tickets,
    }));
  }, []);

  return (
    <Wrapper>
      <Grid>
        {/* LEFT: FORM */}
        <Card>
          <h3 style={{ marginTop: 0 }}>
            {editId ? "Edit Event" : "Create Event"}
          </h3>

          <Label>Title</Label>
          <Input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Event title"
          />

          <Row className="stack">
            <div style={{ width: "100%" }}>
              <Label>Category</Label>
              <Select name="category" value={form.category} onChange={onChange}>
                <option>Music</option>
                <option>Tech</option>
                <option>Sports</option>
                <option>Food</option>
                <option>Business</option>
                <option>Community</option>
                <option>Other</option>
              </Select>
            </div>
          </Row>

          <Row>
            <div style={{ flex: 1 }}>
              <Label>Date</Label>
              <Input
                name="date"
                value={form.date}
                placeholder="YYYY-MM-DD"
                readOnly
                onFocus={() => setShowCalendar(true)}
              />
            </div>

            <div style={{ width: 140 }}>
              <Label>Time</Label>
              <Input
                type="time"
                name="time"
                value={form.time}
                onChange={onChange}
              />
            </div>
          </Row>

          {showCalendar && (
            <div style={{ marginBottom: 12 }}>
              <Calendar
                onChange={(value) => {
                  const d = new Date(value);
                  const formatted = d.toISOString().split("T")[0]; // YYYY-MM-DD

                  setForm((f) => ({
                    ...f,
                    date: formatted,
                  }));
                  setShowCalendar(false);
                }}
              />
            </div>
          )}

          <Label>Location</Label>
          <Input
            name="location"
            value={form.location}
            onChange={onChange}
            placeholder="Event location (venue, building, street...)"
          />

          <Label style={{ marginTop: 12 }}>Image</Label>
          <Input type="file" accept="image/*" onChange={onFileChange} />
          {imagePreview ? (
            <PreviewImg src={imagePreview} alt="preview" />
          ) : null}

          <Label>Description</Label>
          <TextArea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Short event description"
          />

          <Row style={{ marginTop: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={form.freeEvent}
                onChange={(e) => toggleFreeEvent(e.target.checked)}
              />
              Free Event
            </label>
          </Row>

          {/* Ticket Prices */}
          {!form.freeEvent && (
            <>
              <Label>Ticket Prices</Label>
              <Row>
                <Input
                  placeholder="VVIP price"
                  value={form.tickets.vvip}
                  onChange={(e) => onTicketChange("vvip", e.target.value)}
                />
                <Input
                  placeholder="VIP price"
                  value={form.tickets.vip}
                  onChange={(e) => onTicketChange("vip", e.target.value)}
                />
              </Row>
              <Row>
                <Input
                  placeholder="Regular price"
                  value={form.tickets.regular}
                  onChange={(e) => onTicketChange("regular", e.target.value)}
                />
                <Input
                  placeholder="Other price"
                  value={form.tickets.other}
                  onChange={(e) => onTicketChange("other", e.target.value)}
                />
              </Row>
            </>
          )}

          <Row style={{ marginTop: 12 }}>
            <Button onClick={handleSave}>
              {editId ? "Update Event" : "Create Event"}
            </Button>
            <GhostBtn
              onClick={() => {
                setForm({
                  ...eventTemplate,
                  tickets: { ...eventTemplate.tickets },
                  attendees: [...(eventTemplate.attendees || [])],
                });
                setImagePreview("");
                setEditId(null);
              }}
            >
              Reset
            </GhostBtn>
          </Row>
        </Card>

        {/* RIGHT: PREVIEW + ACTIONS */}
        <div>
          <Card>
            <h4 style={{ marginTop: 0 }}>Drafts</h4>
            {pendingEvents.length === 0 && (
              <p style={{ color: "gray" }}>No drafts yet</p>
            )}

            {pendingEvents.map((e) => (
              <div key={e.id} style={{ marginBottom: 14 }}>
                {e.image && <PreviewImg src={e.image} alt={e.title} />}
                <strong>{e.title}</strong>
                <div style={{ color: "gray", fontSize: 13 }}>
                  {e.category} • {e.date} {e.time ? `• ${e.time}` : ""}
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <Button onClick={() => handleEdit(e.id)}>Edit</Button>
                  <Button onClick={() => handleUpload(e.id)}>Upload</Button>
                  <GhostBtn onClick={() => handleDelete(e.id)}>Delete</GhostBtn>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ marginTop: 14 }}>
            <h4 style={{ marginTop: 0 }}>Quick Help</h4>
            <p style={{ margin: 0, color: "gray", fontSize: 13 }}>
              - Upload lets event appear on Upcoming & Filter pages.
              <br />- Image uses a local preview (object URL). Save/upload to
              persist server-side.
            </p>
          </Card>
        </div>
      </Grid>
    </Wrapper>
  );
}
