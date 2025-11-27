import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MapContext } from "../Directions/Maps/MapContext";

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 0.1rem;
  width: 350px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const EventImage = styled.img`
  width: 100%;
  height: 192px;
  object-fit: cover;
  border-radius: 8px;
`;

const EventTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 8px;
`;

const InfoText = styled.p`
  color: black;
  font-size: 0.9rem;
  margin-top: 4px;
  padding: 3px 10px;
`;

const LocationButton = styled.button`
  background-color: #fb923c;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 0rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #ff7600;
  }
`;

const EventInfo = ({ children }) => <InfoText>{children}</InfoText>;

// ✅ Add prop validation for `EventInfo`
EventInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

function EventCard({ event }) {
  const navigate = useNavigate();
  const { updateDestination } = useContext(MapContext);

  if (!event) {
    return <p>No event data available.</p>;
  }

  const handleLocationClick = () => {
    updateDestination(event.location);

    navigate("/directions", { state: { location: event.location } });
  };

  return (
    <Card whileHover={{ scale: 1.02 }}>
      {event.image && <EventImage src={event.image} alt={event.title} />}
      <EventTitle>{event.title}</EventTitle>
      <EventInfo>
        {event.date} | {event.time}
      </EventInfo>
      <LocationButton onClick={handleLocationClick}>
        {event.location}
      </LocationButton>
      <EventInfo>{event.details}</EventInfo>
    </Card>
  );
}

// ✅ Improved prop validation
EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string, // Optional
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
