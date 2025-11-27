import styled from "styled-components";
import Section from "./Section";

const Container = styled.div`
  margin: 0.5rem auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;

  @media (min-width: 768px) {
    padding: 0.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;

  span {
    color: #ff4500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #fb923c;
    }
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

function Mission() {
  return (
    <>
      <Container>
        <Heading>
          Our <span>Mission</span>
        </Heading>
        <Paragraph>
          At <strong>Eventfy</strong>, we believe in the power of connection.
          Our mission is to bring people together by making it easy to discover
          and participate in events that match their interests, passions, and
          goals. From local community gatherings to international conferences,
          Eventfy bridges the gap between event organizers and attendees.
        </Paragraph>
      </Container>

      <Section />
    </>
  );
}

export default Mission;
