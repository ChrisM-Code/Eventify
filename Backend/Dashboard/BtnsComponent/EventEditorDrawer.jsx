import styled from "styled-components";
import { useState } from "react";
import { useEventStore } from "../Store/EventStoreContext";

/* ===== Styled Components ===== */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2000;
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: ${({ theme }) => theme.body};
  padding: 25px;
  box-shadow: -3px 0 8px ${({ theme }) => theme.shadow};
  z-index: 3000;
  overflow-y: auto;

  transform: translateX(100%);
  animation: slideIn 0.35s forwards ease;

  @keyframes slideIn {
    to {
      transform: translateX(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: ${({ theme }) => theme.text};
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  }

  input,
  textarea {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.mainBg};
    color: ${({ theme }) => theme.text};
  }
`;

const SaveBtn = styled.button`
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.headerBg};
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

export default function EventEditorDrawer({ event, onClose }) {
  const { updateEvent } = useEventStore();

  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEvent(event.id, form);
    onClose();
  };

  return (
    <>
      <Backdrop onClick={onClose} />

      <Drawer>
        <Header>
          <h2>Edit Event</h2>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <Form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <label>Description</label>
          <textarea
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <label>Start Time</label>
          <input
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />

          <label>End Time</label>
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />

          <label>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <SaveBtn type="submit">Save Changes</SaveBtn>
        </Form>
      </Drawer>
    </>
  );
}
