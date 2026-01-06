import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { EventStoreProvider } from "../Dashboard/Store/EventStoreContext";

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
import TrashBin from "./BtnsComponent/TrashBin";
import Analytics from "./BtnsComponent/Analytics";

import { lightTheme, darkTheme } from "./Themes/Theme";

/* ================= CONSTANTS ================= */
const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 260;

/* ================= LAYOUT ================= */

const AppShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const HeaderArea = styled.header`
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 500;
`;

const SidebarArea = styled.aside`
  grid-area: sidebar;
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  width: ${SIDEBAR_WIDTH}px;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  z-index: 300;

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
  }
`;

const MainArea = styled.main`
  grid-area: main;
  margin-top: ${HEADER_HEIGHT}px;
  margin-left: ${SIDEBAR_WIDTH}px;
  padding: 24px;
  background: ${({ theme }) => theme.mainBg};
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const FooterArea = styled.footer`
  grid-area: footer;
  margin-left: ${SIDEBAR_WIDTH}px;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.sidebarBg};
  text-align: center;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const DarkModeButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 600;
  padding: 10px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.text};
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px ${({ theme }) => theme.shadow};

  &:hover {
    transform: translateY(-2px);
  }
`;

export default function AppDash() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <EventStoreProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <AppShell>
          <HeaderArea>
            <Header />
          </HeaderArea>

          <SidebarArea>
            <SideBar setActivePage={setActivePage} />
          </SidebarArea>

          <MainArea>
            {activePage === "dashboard" && <MainDash />}
            {activePage === "menu" && <Menu />}
            {activePage === "filters" && <Filters />}
            {activePage === "notification" && <Notification />}
            {activePage === "graph" && <GraphWidget />}
            {activePage === "quickaction" && <QuickAction />}
            {activePage === "events" && <UpcomingEvents />}
            {activePage === "trashbin" && <TrashBin />}
            {activePage === "analytics" && <Analytics />}
          </MainArea>

          <DarkModeButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </DarkModeButton>
        </AppShell>
        <FooterArea>
          <Footer />
        </FooterArea>
      </ThemeProvider>
    </EventStoreProvider>
  );
}
