import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  }, []);

  const updateDestination = (newDestination) => {
    setDestination(newDestination);
    setIsMapVisible(true); // Ensure map updates when a new event is clicked
  };

  return (
    <MapContext.Provider
      value={{ userLocation, destination, isMapVisible, updateDestination }}
    >
      {children}
    </MapContext.Provider>
  );
};

// ✅ Add PropTypes for validation
MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapProvider;
