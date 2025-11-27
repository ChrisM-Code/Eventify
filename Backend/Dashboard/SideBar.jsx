import { useState } from "react";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.text};
  transition: 0.25s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
  }
`;

const SectionContent = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.glass};
  border-radius: 12px;
`;

function SideBar({ setActivePage }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);

    if (section === "menu") setActivePage("menu");
    if (section === "notification") setActivePage("notification");
    if (section === "filters") setActivePage("filters");
    if (section === "quickaction") setActivePage("quickaction");
    if (section === "events") setActivePage("events");
    if (section === "graph") setActivePage("graph");

    if (section === "maindash") setActivePage("dashboard");
  };

  return (
    <SidebarWrapper>
      <SectionButton onClick={() => toggleSection("maindash")}>
        Main Dashboard
      </SectionButton>

      <SectionButton onClick={() => toggleSection("menu")}>Menu</SectionButton>

      <SectionButton onClick={() => toggleSection("notification")}>
        Notifications
      </SectionButton>

      <SectionButton onClick={() => toggleSection("filters")}>
        Filters
      </SectionButton>

      <SectionButton onClick={() => toggleSection("quickaction")}>
        Quick Actions
      </SectionButton>

      <SectionButton onClick={() => toggleSection("events")}>
        Upcoming Events
      </SectionButton>

      <SectionButton onClick={() => toggleSection("graph")}>
        Graph Widget
      </SectionButton>
    </SidebarWrapper>
  );
}

export default SideBar;
