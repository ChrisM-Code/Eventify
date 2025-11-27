import { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MapProvider } from "./components/Directions/Maps/MapContext";
import LoadingScreen from "./ui/LoadingScreen";

// Lazy imports for all pages/components
const AppLayout = lazy(() => import("./ui/AppLayout"));
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Directions = lazy(() => import("./components/Directions/Directions"));
const MapComponent = lazy(() =>
  import("./components/Directions/Maps/MapComponent")
);

const EventPro = lazy(() => import("./components/Events/EventPro"));
const Dashboard = lazy(() => import("./components/Home/Dashboard"));

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleHighlightClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <MapProvider>
        {/* Suspense wraps everything for lazy loading */}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route
                path="events"
                element={
                  <EventPro
                    onHighlightClick={handleHighlightClick}
                    modalOpen={modalOpen}
                    selectedEvent={selectedEvent}
                    onCloseModal={handleCloseModal}
                  />
                }
              />
              <Route path="directions" element={<Directions />} />
              <Route path="map" element={<MapComponent />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </MapProvider>
    </>
  );
};

export default App;
