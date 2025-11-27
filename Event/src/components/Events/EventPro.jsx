import styled from "styled-components";
import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Modal from "./Modal";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: clamp(1rem, 2vw, 0.5rem);
  padding: clamp(0.5rem, 2vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
`;

const PastEventsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 0.5rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PastEventCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  pointer-events: none;
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;

  span {
    color: #ff4500;
    cursor: pointer;

    &:hover {
      color: #fb923c;
    }
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: gray;
`;

const EventPro = ({
  onHighlightClick,
  modalOpen,
  selectedEvent,
  onCloseModal,
}) => {
  const [events, setEvents] = useState([
    {
      image: "eve4.jpg",
      title: "AI Summit 2025",
      date: "October 29, 2025",
      time: "9:00 PM - 11:00 PM",
      location: "Cape Town",
      details: "Explore the future of technology at the Blockchain Summit.",
    },
    {
      image: "eve2.jpg",
      title: "Mbaa Ngumbi",
      date: "October 23, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Nairobi",
      details: "Cinema Premiers",
    },
    {
      image: "eve4.jpg",
      title: "Blockchain Summit 2025",
      date: "October 27, 2025",
      time: "9:00 PM - 11:00 PM",
      location: "Zimbambwe",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve2.jpg",
      title: "Blockchain Summit 2025",
      date: "September 8, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Nairobi",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve3.jpg",
      title: "Summit 2025",
      date: "September 19, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Kisumu",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve3.jpg",
      title: "Summit 2025",
      date: "September 25, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Eldoret",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
  ]);

  const [inactiveEvents, setInactiveEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const now = new Date();
    const newActiveEvents = [];
    const newInactiveEvents = [];

    events.forEach((event) => {
      const endTime = event.time.split("-")[1]?.trim() || event.time.trim();
      const fullDateTimeStr = `${event.date} ${endTime}`;
      const eventEndDateTime = new Date(fullDateTimeStr);
      const timeSinceEnd = now - eventEndDateTime;
      const oneDay = 24 * 60 * 60 * 1000;

      if (timeSinceEnd > oneDay) {
        newInactiveEvents.push(event);
      } else {
        newActiveEvents.push(event);
      }
    });

    setInactiveEvents(newInactiveEvents);
    setEvents(newActiveEvents);
    setLoading(false);
  }, []);

  const handleEventClick = (event) => {
    onHighlightClick(event);
  };

  return (
    <>
      {loading ? (
        <LoadingMessage>Loading events...</LoadingMessage>
      ) : (
        <>
          {inactiveEvents.length > 0 && (
            <>
              <H2>
                Past <span>Events</span>
              </H2>
              <PastEventsContainer>
                {inactiveEvents.map((event, index) => (
                  <PastEventCard key={index}>
                    <EventCard event={event} />
                  </PastEventCard>
                ))}
              </PastEventsContainer>
            </>
          )}

          <H2>
            Upcoming <span>Events</span>
          </H2>
          <Container>
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </Container>
        </>
      )}

      {modalOpen && selectedEvent && (
        <Modal onClose={onCloseModal}>
          <EventCard event={selectedEvent} />
        </Modal>
      )}
    </>
  );
};

export default EventPro;
