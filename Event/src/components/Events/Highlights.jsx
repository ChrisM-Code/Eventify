import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
`;

const HighlightButton = styled.button`
  background-color: ${({ hasNew }) => (hasNew ? "#10b981" : "#ffbc85")};
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  position: relative;

  &:hover {
    background-color: ${({ hasNew }) => (hasNew ? "#059669" : "#2dd4bf")};
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 10px;
  height: 10px;
  background-color: #22c55e;
  border-radius: 50%;
`;

function Highlights({ hasNewEvent, onClick }) {
  return (
    <Container>
      <HighlightButton hasNew={hasNewEvent} onClick={onClick}>
        <FaRegBell />
        {hasNewEvent && <NotificationDot />}
      </HighlightButton>
    </Container>
  );
}

export default Highlights;
