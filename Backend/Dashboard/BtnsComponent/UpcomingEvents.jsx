import styled from "styled-components";
import { useState } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import EventEditorDrawer from "../BtnsComponent/EventEditorDrawer";
import TicketPrice from "../BtnsComponent/TicketPrice";

/* ================== STYLES ================== */
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
  position: relative;

  ${({ status }) =>
    status === "cancelled" &&
    `
    opacity: 0.6;
    &::after {
      content: "CANCELLED";
      position: absolute;
      top: 10px;
      right: 10px;
      background: #b91c1c;
      color: #fff;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  `}
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const ButtonRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Btn = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #fff;
  background: ${({ theme }) => theme.headerBg};
  transition: 0.2s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

const CancelBtn = styled(Btn)`
  background: #b91c1c;
`;

const ConfirmBtn = styled(Btn)`
  background: #059669;
`;

const DeleteBtn = styled(Btn)`
  background: #6b7280;
`;

/* ===== Ticket Styles ===== */
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
    display: block;
    font-size: 13px;
    font-weight: 700;
    margin-top: 2px;
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

/* ================== COMPONENT ================== */
export default function UpcomingEvents() {
  const { events, deleteEvent, cancelEvent, confirmEvent } = useEventStore();
  const [editingEvent, setEditingEvent] = useState(null);

  const upcomingEvents = events.filter((e) => e.status !== "deleted");

  return (
    <>
      <Grid>
        {upcomingEvents.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No upcoming events yet.
          </p>
        )}

        {upcomingEvents.map((event) => (
          <Card key={event.id} status={event.status}>
            {event.image && <Image src={event.image} alt={event.title} />}

            <h3>{event.title}</h3>

            <p style={{ opacity: 0.7, marginTop: 4 }}>
              {event.category} | {event.date} {event.time && `| ${event.time}`}
            </p>

            <p style={{ opacity: 0.8, marginTop: 8 }}>{event.location}</p>

            <p style={{ marginTop: 12 }}>
              {event.description?.slice(0, 120)}...
            </p>

            <TicketPrice event={event} />

            <ButtonRow>
              <Btn onClick={() => setEditingEvent(event)}>Edit</Btn>
              <CancelBtn onClick={() => cancelEvent(event.id)}>
                Cancel
              </CancelBtn>
              <ConfirmBtn onClick={() => confirmEvent(event.id)}>
                Confirm
              </ConfirmBtn>
              <DeleteBtn onClick={() => deleteEvent(event.id)}>
                Delete
              </DeleteBtn>
            </ButtonRow>
          </Card>
        ))}
      </Grid>

      {editingEvent && (
        <EventEditorDrawer
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </>
  );
}
