import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCalendarAlt, FaDirections, FaBackspace } from "react-icons/fa";
import Modal from "./Modal";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #fb923c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 150px;

  &:hover {
    background-color: #ff4500;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: none;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap; /* allows buttons to stack on small screens */

  @media (max-width: 600px) {
    flex-direction: column; /* stack vertically on mobile */
    width: 100%;
    gap: 0.75rem;
  }

  button {
    flex: 1; /* make buttons take equal width */
    max-width: 180px;
    width: 100%;
    font-size: 1rem;

    @media (max-width: 600px) {
      max-width: 100%;
      font-size: 0.95rem;
      padding: 0.75rem;
    }
  }
`;

const Buttons = ({ events = [] }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(false);
  };

  return (
    <>
      <ButtonContainer>
        <StyledButton onClick={() => navigate("/events")}>
          <FaCalendarAlt /> Events
        </StyledButton>

        <StyledButton onClick={() => setShowModal(true)}>
          <FaDirections /> Directions
        </StyledButton>
      </ButtonContainer>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {events.length === 0 ? (
            <p>Select Event To Navigate.</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id} style={{ marginBottom: "0.5rem" }}>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "6px",
                      background: "#ff7b00",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSelectEvent(event)}
                  >
                    {event.title} — {event.location}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {/* --- Exit / Back Buttons --- */}
          <ModalButtonGroup
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <StyledButton onClick={() => navigate("/events")}>
              <FaBackspace /> Back to Events
            </StyledButton>
          </ModalButtonGroup>
        </Modal>
      )}

      {selectedEvent && userLocation && (
        <div style={{ marginTop: "2rem" }}>
          <h3>
            Directions to: <em>{selectedEvent.title}</em>
          </h3>
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>
            <Marker position={[selectedEvent.lat, selectedEvent.lng]}>
              <Popup>{selectedEvent.title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default Buttons;
