import { MapProvider } from "./Maps/MapContext";
import MapComponent from "./Maps/MapComponent";
import styled from "styled-components";

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
  margin: auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

function Map() {
  return (
    <MapProvider>
      <MapWrapper>
        <MapComponent />
      </MapWrapper>
    </MapProvider>
  );
}

export default Map;
