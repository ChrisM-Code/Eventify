import styled from "styled-components";
import Mission from "./Mission";

const Container = styled.div`
  max-width: auto;
  margin: 2rem auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
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
    font-size: 2.5rem;
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

function About() {
  return (
    <>
      <Container>
        <Heading>
          About <span>Eventfy</span>
        </Heading>
        <Paragraph>
          Welcome to <strong>Eventfy</strong>, your ultimate destination for
          discovering and showcasing events happening across various locations!
          Whether you’re looking for concerts, workshops, festivals, or
          networking events, Eventfy makes it simple to explore, share, and
          engage with events near you or anywhere around the globe.
        </Paragraph>
      </Container>

      <Mission />
    </>
  );
}

export default About;
