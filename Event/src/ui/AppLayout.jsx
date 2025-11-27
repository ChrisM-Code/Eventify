import styled from "styled-components";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Home/NavBar";

// Styled components for layout
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 0.1rem;
  }
`;

const AppLayout = () => {
  return (
    <LayoutContainer>
      <Sticky>
        <NavBar />
      </Sticky>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;
