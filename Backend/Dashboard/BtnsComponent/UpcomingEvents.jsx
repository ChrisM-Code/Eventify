import { useState } from "react";
import styled from "styled-components";

// ===== Styled Components =====
const Container = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme?.text || "#000"};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background: ${({ theme }) => theme?.mainBg || "#f5f5f5"};
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme?.shadow || "rgba(0,0,0,0.1)"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, filter 0.2s ease;
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
  font-size: 18px;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  color: #fff;
  background: ${({ color }) => color || "#1890ff"};
  &:hover {
    filter: brightness(1.1);
  }
`;

// ===== Component =====
function UpcomingEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Music Festival",
      date: "2025-12-05",
      time: "18:00",
      location: "Nairobi Arena",
      image: "https://via.placeholder.com/300x180",
      confirmed: false,
    },
    {
      id: 2,
      title: "Tech Conference",
      date: "2025-12-10",
      time: "09:00",
      location: "KICC",
      image: "https://via.placeholder.com/300x180",
      confirmed: false,
    },
  ]);

  // ===== Handlers =====
  const handleEdit = (id) => {
    const event = events.find((e) => e.id === id);
    alert(`Edit Event: ${event.title}`);
  };

  const handleConfirm = (id) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, confirmed: true } : e)));
    alert(`Event confirmed!`);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    alert(`Event deleted!`);
  };

  const pendingEvents = events.filter((e) => !e.confirmed);

  if (pendingEvents.length === 0) {
    return <Container>No upcoming events pending confirmation.</Container>;
  }

  return (
    <Container>
      <h3>Upcoming Events (Pending Confirmation)</h3>
      <Grid>
        {pendingEvents.map((event) => (
          <EventCard key={event.id}>
            {event.image && <CardImage src={event.image} alt={event.title} />}
            <CardContent>
              <CardTitle>{event.title}</CardTitle>
              <CardText>
                {event.date} | {event.time}
              </CardText>
              <CardText>{event.location}</CardText>
              <ButtonGroup>
                <ActionButton
                  color="#ffa500"
                  onClick={() => handleEdit(event.id)}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  color="#1890ff"
                  onClick={() => handleConfirm(event.id)}
                >
                  Confirm
                </ActionButton>
                <ActionButton
                  color="#ff4d4f"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </ActionButton>
              </ButtonGroup>
            </CardContent>
          </EventCard>
        ))}
      </Grid>
    </Container>
  );
}

export default UpcomingEvents;
