import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";

import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Menu from "./BtnsComponent/Menu";
import MainDash from "./BtnsComponent/MainDash";
import Filters from "./BtnsComponent/Filters";
import GraphWidget from "./BtnsComponent/GraphWidget";
import Notification from "./BtnsComponent/Notification";
import QuickAction from "./BtnsComponent/QuickAction";
import UpcomingEvents from "./BtnsComponent/UpcomingEvents";

import { lightTheme, darkTheme } from "./Themes/Theme";

const DashboardWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.body};
  position: relative;
`;

const DarkModeButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;

  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${(p) => p.theme.headerBg};
  color: ${(p) => p.theme.text};
  box-shadow: 0 2px 6px ${(p) => p.theme.shadow};

  transition: 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 260px;
  background: ${(p) => p.theme.sidebarBg};
  border-right: 1px solid ${(p) => p.theme.border};
  overflow-y: auto;
`;

const MainContent = styled.main`
  flex: 1;
  background: ${(p) => p.theme.mainBg};
  color: ${(p) => p.theme.text};
  padding: 20px;
  overflow-y: auto;
`;

function AppDash() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <DashboardWrapper>
        <Header />

        {/* Floating Dark Mode Toggle */}
        <DarkModeButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </DarkModeButton>

        <ContentWrapper>
          <SidebarContainer>
            <SideBar setActivePage={setActivePage} />
          </SidebarContainer>

          <MainContent>
            {activePage === "dashboard" && <MainDash />}
            {activePage === "menu" && <Menu />}
            {activePage === "filters" && <Filters />}
            {activePage === "notification" && <Notification />}
            {activePage === "graph" && <GraphWidget />}
            {activePage === "quickaction" && <QuickAction />}
            {activePage === "events" && <UpcomingEvents />}
          </MainContent>
        </ContentWrapper>

        <Footer />
      </DashboardWrapper>
    </ThemeProvider>
  );
}

export default AppDash;
