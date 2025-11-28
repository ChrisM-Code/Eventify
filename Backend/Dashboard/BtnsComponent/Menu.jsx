import styled from "styled-components";

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;

  /* Align the whole grid to the right visually */
  justify-content: end;
`;

const MenuCard = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.glass};
  border-radius: 14px;
  box-shadow: 0 0 10px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: 0.25s ease;

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.text};
    opacity: 0.85;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.neon};
    filter: brightness(1.05);
  }
`;

function Menu() {
  return (
    <MenuWrapper>
      <MenuCard>
        <h3>Events</h3>
        <p>View and manage all platform events</p>
      </MenuCard>

      <MenuCard>
        <h3>Analysis</h3>
        <p>Track performance and insights</p>
      </MenuCard>

      <MenuCard>
        <h3>Settings</h3>
        <p>Configure system preferences</p>
      </MenuCard>

      <MenuCard>
        <h3>Create Event</h3>
        <p>Create your event</p>
      </MenuCard>

      <MenuCard>
        <h3>Upcoming Events</h3>
        <p>What event to expect</p>
      </MenuCard>

      <MenuCard>
        <h3>Past Events</h3>
        <p>Past event details</p>
      </MenuCard>

      <MenuCard>
        <h3>Event Calender</h3>
        <p>View the dates of an event</p>
      </MenuCard>
    </MenuWrapper>
  );
}

export default Menu;

//✨ Add icons for each card/
//✨ Add card animations (fade-in, slide-up)/
//✨ Make each card link to a page (React Router support)/
