import styled from "styled-components";
import EventPro from "./EventPro";

const HeaderContainer = styled.div`
  text-align: center;
  padding: 0.5rem;
  border-radius: 0rem;
  margin: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
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
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.5;
`;

function Header() {
  return (
    <>
      <HeaderContainer>
        <Title>
          <span>Events</span>
        </Title>
        <Subtitle>
          <strong>
            Welcome to our Events Page! Explore upcoming events and choose the
            ones that inspire you. Your next adventure starts here!
          </strong>
        </Subtitle>
      </HeaderContainer>
      <EventPro />
    </>
  );
}

export default Header;
