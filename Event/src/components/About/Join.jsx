import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem auto;
  padding: 2rem;
  max-width: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: auto;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;

  span {
    color: #ff4500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #fb923c;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #444;
  margin-top: 0.5rem;

  strong {
    color: #000;
  }

  &:hover {
    animation: ${bounce} 1s ease-in-out;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

function Join() {
  return (
    <Container>
      <Title>
        Join the <span>Eventfy Community</span>
      </Title>
      <Description>
        Be part of a growing community of event enthusiasts! With Eventfy,
        you’re not just attending events; you’re creating memories, building
        networks, and enriching your life experiences.
      </Description>
      <List>
        <ListItem>
          <strong>
            Let’s make every moment count. Start exploring with Eventfy today!
          </strong>
        </ListItem>
      </List>
    </Container>
  );
}

export default Join;
