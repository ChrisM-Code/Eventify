import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useEventStore } from "../Store/EventStoreContext";
import { eventTemplate } from "../Data/eventTemplate";

/* ================== LAYOUT ================== */

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
  gap: 20px;
  height: calc(100vh - 120px);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
`;

const FormBody = styled.div`
  display: grid;
  gap: 12px;
  overflow-y: auto;
  padding-right: 6px;
`;

const DraftList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
`;

const DraftItem = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/* ================== FORM ================== */

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
`;

const Input = styled.input`
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

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  min-height: 90px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TicketInputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme }) => theme.headerBg};
  color: #fff;

  &:hover {
    box-shadow: ${({ theme }) => theme.neon};
    transform: translateY(-1px);
  }
`;

const GhostBtn = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
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
  const [showOtherTicket, setShowOtherTicket] = useState(false);
  const [errors, setErrors] = useState({});

  const isSingleDay = form.startDate === form.endDate || !form.endDate;

  /* ================== HELPERS ================== */

  const resetForm = () => {
    setForm(eventTemplate);
    setEditId(null);
    setImagePreview("");
    setErrors({});
    setShowOtherTicket(false);
  };

  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.startDate) e.startDate = "Start date required";
    if (!form.startTime) e.startTime = "Start time required";
    if (!form.location.trim()) e.location = "Location required";

    if (!form.freeEvent) {
      const hasPrice = Object.values(form.tickets).some(Boolean);
      if (!hasPrice) e.tickets = "Add at least one ticket price";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================== HANDLERS ================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleTicketChange = (tier, value) => {
    setForm((p) => ({
      ...p,
      tickets: { ...p.tickets, [tier]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setForm((p) => ({ ...p, image: url, imageFile: file }));
  };

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
    const ev = events.find((e) => e.id === id);
    if (!ev) return;
    setForm(ev);
    setEditId(id);
    setImagePreview(ev.image || "");
  };

  /* ================== RENDER ================== */

  return (
    <Wrapper>
      <Grid>
        {/* CREATE / EDIT */}
        <Card>
          <h3>{editId ? "Edit Event" : "Create Event"}</h3>

          <FormBody>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}

            <Label>Category</Label>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {["Music", "Tech", "Sports", "Food", "Business", "Community"].map(
                (c) => (
                  <option key={c}>{c}</option>
                )
              )}
            </Select>

            <DateGrid>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>End Time</Label>
                <Input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>
            </DateGrid>

            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <Label>Image</Label>
            <Input type="file" onChange={handleFileChange} />
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
                onChange={(e) => handleChange(e)}
                name="freeEvent"
              />{" "}
              Free Event
            </label>

            {!form.freeEvent && (
              <>
                <Label>Ticket Prices</Label>
                <TicketInputGrid>
                  {["vvip", "vip", "regular"].map((t) => (
                    <Input
                      key={t}
                      placeholder={`${t.toUpperCase()} price`}
                      value={form.tickets[t]}
                      onChange={(e) => handleTicketChange(t, e.target.value)}
                    />
                  ))}
                </TicketInputGrid>
                {errors.tickets && <ErrorText>{errors.tickets}</ErrorText>}
              </>
            )}
          </FormBody>

          <Row>
            <Button onClick={handleSave}>{editId ? "Update" : "Create"}</Button>
            <GhostBtn onClick={resetForm}>Reset</GhostBtn>
          </Row>
        </Card>

        {/* DRAFTS */}
        <Card>
          <h4>Draft Events</h4>
          <DraftList>
            {pendingEvents.length === 0 && <p>No drafts yet</p>}
            {pendingEvents.map((e) => (
              <DraftItem key={e.id}>
                {e.image && <PreviewImg src={e.image} />}
                <strong>{e.title}</strong>
                <small>
                  {e.category} • {e.startDate}
                </small>
                <Row>
                  <Button onClick={() => handleEdit(e.id)}>Edit</Button>
                  <Button onClick={() => uploadEvent(e.id)}>Upload</Button>
                  <GhostBtn onClick={() => deleteEvent(e.id)}>Delete</GhostBtn>
                </Row>
              </DraftItem>
            ))}
          </DraftList>
        </Card>
      </Grid>
    </Wrapper>
  );
}
