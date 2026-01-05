import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import TicketPrice from "../BtnsComponent/TicketPrice";

/* ================== PAGE ================== */

const PageWrapper = styled.div`
  padding: 25px;
  color: ${({ theme }) => theme.text};
`;

/* ================== HEADER ================== */

const FilterHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 14px 18px;
  background: ${({ theme }) => theme.glass};
  border-radius: 14px;
  margin-bottom: 25px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 220px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.headerBg};
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({ active, theme }) =>
    active ? theme.headerBg : theme.mainBg};
  color: ${({ active }) => (active ? "#fff" : "inherit")};
`;

/* ================== GRID ================== */

const SectionTitle = styled.h2`
  margin-bottom: 15px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ================== CARD ================== */

const Card = styled.article`
  background: ${({ theme }) => theme.mainBg};
  padding: 5px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;

  ${({ status }) =>
    status === "cancelled" &&
    `
      opacity: 0.55;
      &::after {
        content: "CANCELLED";
        position: absolute;
        top: 12px;
        right: 12px;
        background: #b91c1c;
        color: #fff;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
      }
    `}

  ${({ status }) =>
    status === "past" &&
    `
      opacity: 0.55;
      &::after {
        content: "PAST EVENT";
        position: absolute;
        top: 12px;
        right: 12px;
        background: #374151;
        color: #fff;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
      }
    `}
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
`;

const Meta = styled.div`
  font-size: 13px;
  opacity: 0.7;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;
`;

const ViewBtn = styled.button`
  margin-top: auto;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.headerBg};
  color: white;
  font-weight: 600;
`;

/* ================== MODAL ================== */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(680px, 95%);
  max-height: 90vh;

  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);

  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 24px 60px ${({ theme }) => theme.shadow},
    ${({ theme }) => theme.neon};

  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  animation: modalIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translate(-50%, -46%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled.div`
  padding: 22px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({ theme }) => theme.text};

  line-height: 1.6;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.text};

  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  display: grid;
  place-items: center;
  font-size: 18px;
  z-index: 10;
  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.headerBg};
    color: #fff;
  }
`;

/* ================== COMPONENT ================== */

export default function FilterPage() {
  const { events } = useEventStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("confirmed");
  const [viewingEvent, setViewingEvent] = useState(null);

  /* ===== HELPERS ===== */

  const formatEventDateTime = (event) => {
    if (!event?.startDate) return "Date not set";

    if (!event.endDate || event.startDate === event.endDate) {
      return `${event.startDate} • ${event.startTime || ""}${
        event.endTime ? ` – ${event.endTime}` : ""
      }`;
    }

    return `${event.startDate} → ${event.endDate}`;
  };

  /* ===== FILTERING ===== */

  const filteredEvents = useMemo(() => {
    const term = search.toLowerCase();
    return events.filter(
      (e) =>
        e.title?.toLowerCase().includes(term) ||
        e.location?.toLowerCase().includes(term) ||
        e.description?.toLowerCase().includes(term)
    );
  }, [events, search]);

  const tabEvents = useMemo(() => {
    if (filter === "all") return filteredEvents;
    return filteredEvents.filter((e) => e.status === filter);
  }, [filteredEvents, filter]);

  /* ===== EFFECT ===== */

  useEffect(() => {
    document.body.style.overflow = viewingEvent ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [viewingEvent]);

  /* ===== RENDER ===== */

  return (
    <PageWrapper>
      <FilterHeader>
        <SearchInput
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Tabs>
          {["confirmed", "cancelled", "past", "all"].map((tab) => (
            <Tab
              key={tab}
              active={filter === tab}
              onClick={() => setFilter(tab)}
            >
              {tab.toUpperCase()}
            </Tab>
          ))}
        </Tabs>
      </FilterHeader>

      <SectionTitle>{filter.toUpperCase()} EVENTS</SectionTitle>

      <EventGrid>
        {tabEvents.length === 0 && <p>No events found.</p>}

        {tabEvents.map((event) => (
          <Card key={event.id} status={event.status}>
            {event.image && <Image src={event.image} alt={event.title} />}
            <h3>{event.title}</h3>
            <Meta>{formatEventDateTime(event)}</Meta>
            <strong>{event.location}</strong>
            <Description>{event.description}</Description>
            <TicketPrice event={event} />
            <ViewBtn onClick={() => setViewingEvent(event)}>
              View Details
            </ViewBtn>
          </Card>
        ))}
      </EventGrid>

      {viewingEvent && (
        <>
          <Backdrop onClick={() => setViewingEvent(null)} />

          <Modal>
            <ModalHeader>
              <CloseBtn onClick={() => setViewingEvent(null)}>✕</CloseBtn>
            </ModalHeader>

            {/* ===== Modal Body ===== */}
            <ModalBody>
              {viewingEvent.image && (
                <Image src={viewingEvent.image} alt={viewingEvent.title} />
              )}
              <h3>{viewingEvent.title}</h3>
              <Meta>{formatEventDateTime(viewingEvent)}</Meta>
              <strong>{viewingEvent.location}</strong>
              <p>{viewingEvent.description}</p>

              <TicketPrice event={viewingEvent} />
            </ModalBody>
          </Modal>
        </>
      )}
    </PageWrapper>
  );
}
