import styled from "styled-components";
import { useState } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import EventEditorDrawer from "../BtnsComponent/EventEditorDrawer";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
`;

const ButtonRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const EditBtn = styled.button`
  padding: 8px 14px;
  border: none;
  background: ${({ theme }) => theme.headerBg};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

export default function FilterPage() {
  const { getFilteredEvents } = useEventStore();
  const filteredEvents = getFilteredEvents();
  const [editingEvent, setEditingEvent] = useState(null);

  return (
    <Grid>
      {filteredEvents.length === 0 && (
        <p style={{ textAlign: "center", color: "#999" }}>
          No confirmed or cancelled events yet.
        </p>
      )}

      {filteredEvents.map((event) => (
        <Card key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <ButtonRow>
            <EditBtn onClick={() => setEditingEvent(event)}>Edit</EditBtn>
          </ButtonRow>
        </Card>
      ))}

      {editingEvent && (
        <EventEditorDrawer
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </Grid>
  );
}

// ✅ Full Filter Page Component
// 👀 Beautiful layout (grid, cards, theme)
// 🔍 Search
// 🟦 Confirmed filter
// 🔴 Cancelled filter
// 📅 Past events filter
// 🎟 Category filter
// ⭐ Reuse Edit Drawer
