import { useContext } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import MapComponent from "./Maps/MapComponent";
import { MapContext } from "./Maps/MapContext";

const Container = styled.div`
  text-align: center;
  padding: 1rem;
  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

const Heading = styled.h1`
  font-size: 2em;
  color: #333;
  span {
    color: #ff4500;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: #fb923c;
    }
  }
  @media (max-width: 600px) {
    font-size: 1.5em;
  }
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #555;
  margin-top: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

function Directions() {
  const { destination } = useContext(MapContext); // ✅ Get destination from context

  return (
    <>
      <Container>
        <Heading>
          Find Your Way <span>with Ease</span>
        </Heading>
        <Message>
          Stay on Eventify for the best experience. Use our real-time directions
          to get to your event hassle-free!
        </Message>
      </Container>
      <Buttons />

      {/* ✅ Show MapComponent only if a destination is set */}
      {destination && <MapComponent />}
    </>
  );
}

export default Directions;
