import { useState } from "react";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";

/* ================= CONSTANTS ================= */
const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 260;

/* ================= STYLES ================= */

const SidebarWrapper = styled.aside`
  width: ${SIDEBAR_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.sidebarBg};
  border-right: 1px solid ${({ theme }) => theme.border};
`;

/* Sidebar header */
const SidebarHeader = styled.div`
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

/* Nav container */
const NavList = styled.nav`
  flex: 1;
  margin: 16px;
  padding: 8px;
  background: ${({ theme }) => theme.glass};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
`;

/* Nav item */
const NavItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ active }) =>
    active ? "rgba(255,255,255,0.08)" : "transparent"};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

/* ===== MOBILE ELEMENTS ===== */

/* Hamburger toggle */
const MobileToggle = styled.button`
  position: flex;
  top: 12px;
  left: 12px;
  z-index: 1100; /* ABOVE header and sidebar */
  display: none;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.headerBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 8px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* Backdrop for mobile */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1050;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

/* Sliding mobile sidebar */
const MobileSidebar = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 5px;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: ${SIDEBAR_WIDTH}px;
  z-index: 1060;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    position: static;
    transform: none;
    height: 100%;
  }
`;

/* ================= COMPONENT ================= */

function SideBar({ setActivePage }) {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "menu", label: "Menu" },
    { id: "analytics", label: "Analytics" },
    { id: "notification", label: "Notifications" },
    { id: "filters", label: "Filters" },
    { id: "quickaction", label: "Quick Actions" },
    { id: "events", label: "Events" },
    { id: "graph", label: "Graphs" },
    { id: "trashbin", label: "Trash Bin" },
  ];

  const handleNav = (page) => {
    setActive(page);
    setActivePage(page);
    setOpen(false); // close on mobile
  };

  return (
    <>
      {/* Mobile toggle icon */}
      <MobileToggle onClick={() => setOpen(!open)}>
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </MobileToggle>

      {/* Mobile backdrop */}
      <Backdrop open={open} onClick={() => setOpen(false)} />

      {/* Sidebar */}
      <MobileSidebar open={open}>
        <SidebarWrapper>
          <SidebarHeader>Admin Panel</SidebarHeader>

          <NavList>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                active={active === item.id}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </NavItem>
            ))}
          </NavList>
        </SidebarWrapper>
      </MobileSidebar>
    </>
  );
}

export default SideBar;
