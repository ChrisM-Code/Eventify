import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapContext } from "../Maps/MapContext";
import styled from "styled-components";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// ---------- Styled Components ----------
const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 20px auto;
  border-radius: 10px;
  background: white;
  position: relative;
  overflow: hidden;
`;

const DistanceInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  color: #ff4500;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;

  &:hover {
    color: #fb923c;
  }
`;

// ---------- Main Map Component ----------
const MapComponent = () => {
  const { userLocation, destination, isMapVisible } = useContext(MapContext);
  const [eventCoordinates, setEventCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!destination) return;

    setLoading(true);
    setError(null);
    setEventCoordinates(null);

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          const coords = [lat, lon];
          setEventCoordinates(coords);

          if (userLocation) {
            setDistance(calculateDistance(userLocation, coords));
          }
        } else {
          setError("Oops! Location not found. Try another event.");
        }
      })
      .catch(() => {
        setError("Error fetching event location. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [destination, userLocation]);

  const calculateDistance = (loc1, loc2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(loc2[0] - loc1[0]);
    const dLon = toRad(loc2[1] - loc1[1]);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1[0])) *
        Math.cos(toRad(loc2[0])) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  if (!isMapVisible) {
    return (
      <DistanceInfo onClick={() => navigate("/events")}>
        Click here to select an event location
      </DistanceInfo>
    );
  }

  return (
    <MapWrapper>
      {loading && <DistanceInfo>Loading event location...</DistanceInfo>}
      {error && <DistanceInfo>{error}</DistanceInfo>}

      {!loading && !error && (
        <>
          <MapContainer
            center={userLocation || [0.0236, 37.9062]} // default center: Kenya
            zoom={13}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {userLocation && (
              <Marker
                position={userLocation}
                icon={L.icon({
                  iconUrl:
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png",
                  iconSize: [25, 40],
                })}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {eventCoordinates && (
              <Marker
                position={eventCoordinates}
                icon={L.icon({
                  iconUrl:
                    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-red.png",
                  iconSize: [25, 40],
                })}
              >
                <Popup>Event: {destination}</Popup>
              </Marker>
            )}

            {userLocation && eventCoordinates && (
              <Routing
                userLocation={userLocation}
                eventCoordinates={eventCoordinates}
              />
            )}
          </MapContainer>
        </>
      )}
    </MapWrapper>
  );
};

// ---------- Routing Component ----------
const Routing = ({ userLocation, eventCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !eventCoordinates) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(userLocation), L.latLng(eventCoordinates)],
      lineOptions: {
        styles: [{ color: "#007bff", weight: 5, opacity: 0.8 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      createMarker: (i, waypoint) =>
        L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl:
              i === 0
                ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png"
                : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-red.png",
            iconSize: [25, 40],
          }),
        }),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    // Hide default route info panel
    const panel = document.querySelector(".leaflet-routing-container");
    if (panel) panel.style.display = "none";

    return () => map.removeControl(routingControl);
  }, [map, userLocation, eventCoordinates]);

  return null;
};

Routing.propTypes = {
  userLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  eventCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapComponent;
