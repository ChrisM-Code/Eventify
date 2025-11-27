import styled from "styled-components";

const MenuContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.glass};
  border-radius: 14px;
  box-shadow: 0 0 10px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(8px);

  h2 {
    font-size: 22px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    margin-bottom: 15px;
  }

  ul {
    padding-left: 15px;
  }

  li {
    padding: 10px;
    list-style: none;
    background: ${({ theme }) => theme.headerBg};
    color: ${({ theme }) => theme.text};
    margin-bottom: 10px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      filter: brightness(1.1);
      box-shadow: ${({ theme }) => theme.neon};
      transform: translateX(5px);
    }
  }
`;

function Menu() {
  return (
    <MenuContainer>
      <h2>Menu</h2>
      <ul>
        <li>Events</li>
        <li>Analysis</li>
        <li>Messages</li>
        <li>Settings</li>
      </ul>
    </MenuContainer>
  );
}

export default Menu;
