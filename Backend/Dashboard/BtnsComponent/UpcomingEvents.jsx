import styled from "styled-components";
import { useState, useMemo } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import EventEditorDrawer from "../BtnsComponent/EventEditorDrawer";
import TicketPrice from "../BtnsComponent/TicketPrice";

/* ================== PAGE ================== */

const PageWrapper = styled.section`
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.7;
`;

/* ================== GRID ================== */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ================== CARD ================== */

const Card = styled.article`
  background: ${({ theme }) => theme.mainBg};
  border-radius: 16px;
  box-shadow: 0 6px 16px ${({ theme }) => theme.shadow};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: ${({ status }) => (status === "cancelled" ? 0.7 : 1)};
`;

const CancelBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  background: #b91c1c;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
`;

/* ================== MEDIA ================== */

const Image = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

/* ================== CONTENT ================== */

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EventTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

const Meta = styled.div`
  font-size: 13px;
  opacity: 0.7;
`;

const Location = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;
`;

/* ================== ACTIONS ================== */

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  padding: 5px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Btn = styled.button`
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  color: #fff;
  background: ${({ theme }) => theme.headerBg};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
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

/* ================== COMPONENT ================== */

export default function UpcomingEvents() {
  const {
    events = [],
    deleteEvent,
    cancelEvent,
    confirmEvent,
  } = useEventStore();

  const [editingEventId, setEditingEventId] = useState(null);

  /* ✅ Always get the latest event from store */
  const editingEvent = useMemo(
    () => events.find((e) => e.id === editingEventId),
    [events, editingEventId]
  );

  const upcomingEvents = useMemo(() => {
    return [...events]
      .filter((e) => e?.status !== "deleted" && e?.status !== "past")
      .sort((a, b) => {
        if (a?.createdAt && b?.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return String(b?.id).localeCompare(String(a?.id));
      });
  }, [events]);

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Upcoming Events</Title>
        <Subtitle>
          Manage all scheduled and confirmed events before they go live
        </Subtitle>
      </PageHeader>

      <Grid>
        {upcomingEvents.length === 0 && (
          <p style={{ opacity: 0.6 }}>No upcoming events available.</p>
        )}

        {upcomingEvents.map((event) => (
          <Card key={event.id} status={event.status}>
            {event.status === "cancelled" && (
              <CancelBadge>CANCELLED</CancelBadge>
            )}

            {event.image && (
              <Image src={event.image} alt={event.title || "Event image"} />
            )}

            <Content>
              <EventTitle>{event.title || "Untitled Event"}</EventTitle>

              <Meta>
                {event.startDate ? (
                  event.endDate && event.startDate !== event.endDate ? (
                    <>
                      {event.startDate} → {event.endDate}
                    </>
                  ) : (
                    <>
                      {event.startDate}
                      {event.startTime && ` • ${event.startTime}`}
                      {event.endTime && ` – ${event.endTime}`}
                    </>
                  )
                ) : (
                  "Date not set"
                )}
              </Meta>

              <Location>{event.location || "Location not set"}</Location>

              <Description>
                {event.description
                  ? event.description.length > 120
                    ? `${event.description.slice(0, 120)}…`
                    : event.description
                  : "No description provided"}
              </Description>

              <TicketPrice event={event} />
            </Content>

            <ButtonRow>
              <Btn onClick={() => setEditingEventId(event.id)}>Edit</Btn>
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

      {/* ✅ Editor Drawer always receives fresh data */}
      {editingEvent && (
        <EventEditorDrawer
          event={editingEvent}
          onClose={() => setEditingEventId(null)}
        />
      )}
    </PageWrapper>
  );
}
