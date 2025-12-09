import styled from "styled-components";
import { useEventStore } from "../Store/EventStoreContext";
import { useMemo } from "react";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 12px;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};
`;

const EventCard = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const Sub = styled.p`
  margin: 4px 0;
  color: #666;
`;

export default function UpcomingEvents() {
  const { uploadedEvents } = useEventStore();

  const sorted = useMemo(() => {
    return [...uploadedEvents].sort((a, b) => {
      return new Date(a.date || 0) - new Date(b.date || 0);
    });
  }, [uploadedEvents]);

  return (
    <Wrapper>
      <h2>Upcoming Events</h2>

      {sorted.length === 0 && <p>No events uploaded yet.</p>}

      {sorted.map((event) => (
        <EventCard key={event.id}>
          {event.image && (
            <img
              src={event.image}
              style={{
                width: "100%",
                height: 160,
                borderRadius: "10px",
                objectFit: "cover",
                marginBottom: 10,
              }}
            />
          )}

          <Title>{event.title}</Title>
          <Sub>{event.category}</Sub>
          <Sub>
            {event.date} • {event.time || "No time set"}
          </Sub>
          <Sub>{event.location}</Sub>
        </EventCard>
      ))}
    </Wrapper>
  );
}
