import styled from "styled-components";
import { useEventStore } from "../Store/EventStoreContext";
import { useMemo } from "react";

/* ================== STYLED COMPONENTS ================== */

const Wrapper = styled.div`
  width: 100%;
  padding: 22px;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 16px;
  box-shadow: 0 4px 14px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
`;

/* GRID LAYOUT → Auto-wrap after 3 items */
const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  padding: 16px;
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 16px ${({ theme }) => theme.shadow};
  transition: 0.25s ease;
  color: ${({ theme }) => theme.text};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 170px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const Sub = styled.p`
  margin: 4px 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 14px;
`;

/* ================== MAIN COMPONENT ================== */

export default function UpcomingEvents() {
  const { uploadedEvents } = useEventStore();

  const sorted = useMemo(() => {
    return [...uploadedEvents].sort((a, b) => {
      return new Date(a.date || 0) - new Date(b.date || 0);
    });
  }, [uploadedEvents]);

  return (
    <Wrapper>
      <h2 style={{ marginTop: 0 }}>Upcoming Events</h2>

      {sorted.length === 0 && <p>No events uploaded yet.</p>}

      <Grid>
        {sorted.map((event) => (
          <EventCard key={event.id}>
            {event.image && <Image src={event.image} alt={event.title} />}

            <Title>{event.title}</Title>

            <Sub>{event.category}</Sub>

            <Sub>
              {event.date} | {event.time || "No time set"}
            </Sub>

            <Sub>{event.location}</Sub>

            {event.description && (
              <Sub style={{ marginTop: 10 }}>
                {event.description.slice(0, 120)}...
              </Sub>
            )}
          </EventCard>
        ))}
      </Grid>
    </Wrapper>
  );
}
