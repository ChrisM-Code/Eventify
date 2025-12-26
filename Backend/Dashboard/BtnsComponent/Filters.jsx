import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import TicketPrice from "../BtnsComponent/TicketPrice";

/* ================== STYLES ================== */

const PageWrapper = styled.div`
  padding: 25px;
  color: ${({ theme }) => theme.text};
`;

const FilterHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.glass};
  border-radius: 14px;
  backdrop-filter: blur(10px);
  margin-bottom: 25px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.text};

  &:focus {
    border-color: ${({ theme }) => theme.headerBg};
    outline: none;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
`;

const Tab = styled.button`
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.headerBg : theme.mainBg};
  color: ${({ active }) => (active ? "white" : "inherit")};
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.mainBg};
  padding: 22px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
  position: relative;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }

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
        color: white;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 12px;
      }
    `}

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
        color: white;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 12px;
      }
    `}
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 12px;
`;

const ViewBtn = styled.button`
  margin-top: 12px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.headerBg};
  color: white;
  cursor: pointer;
`;

/* ===== MODAL ===== */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(600px, 90%);
  max-height: 85vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 18px;
  padding: 24px;
  z-index: 1000;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

/* ================== COMPONENT ================== */

export default function FilterPage() {
  const { events } = useEventStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("confirmed");
  const [viewingEvent, setViewingEvent] = useState(null);
  const [page, setPage] = useState(1);

  const perPage = 6;

  /* ===== DERIVED DATA ===== */

  const filteredEvents = useMemo(() => {
    const term = search.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term)
    );
  }, [events, search]);

  const tabEvents = useMemo(() => {
    if (filter === "all") return filteredEvents;
    return filteredEvents.filter((e) => e.status === filter);
  }, [filteredEvents, filter]);

  const paginated = tabEvents.slice((page - 1) * perPage, page * perPage);

  /* ===== EFFECTS ===== */

  useEffect(() => {
    document.body.style.overflow = viewingEvent ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [viewingEvent]);

  const formatEventDateTime = (event) => {
    if (!event.startDate) return "Date not set";

    const sameDay = !event.endDate || event.startDate === event.endDate;

    if (sameDay) {
      return `${event.startDate} | ${event.startTime || ""} – ${
        event.endTime || ""
      }`;
    }

    return `${event.startDate} → ${event.endDate}`;
  };

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
              onClick={() => {
                setFilter(tab);
                setPage(1);
              }}
            >
              {tab.toUpperCase()}
            </Tab>
          ))}
        </Tabs>
      </FilterHeader>

      <SectionTitle>{filter.toUpperCase()} EVENTS</SectionTitle>

      <EventGrid>
        {paginated.length === 0 && <p>No events found.</p>}

        {paginated.map((event) => (
          <Card key={event.id} status={event.status}>
            {event.image && <Image src={event.image} alt={event.title} />}
            <h3>{event.title}</h3>
            <p style={{ opacity: 0.7 }}>
              {event.startDate === event.endDate || !event.endDate ? (
                <>
                  {event.startDate} | {event.startTime} | {event.endTime}
                </>
              ) : (
                <>
                  {event.startDate} → {event.endDate}
                </>
              )}
            </p>
            <p>{event.location}</p>
            <p>{event.description}</p>

            <TicketPrice event={event} />

            <ViewBtn onClick={() => setViewingEvent(event)}>View</ViewBtn>
          </Card>
        ))}
      </EventGrid>

      {viewingEvent && (
        <>
          <Backdrop onClick={() => setViewingEvent(null)} />

          <Modal>
            <CloseBtn onClick={() => setViewingEvent(null)}>✕</CloseBtn>

            {viewingEvent.image && (
              <Image src={viewingEvent.image} alt={viewingEvent.title} />
            )}

            <h2>{viewingEvent.title}</h2>

            <p style={{ opacity: 0.7 }}>{formatEventDateTime(viewingEvent)}</p>

            <p>{viewingEvent.location}</p>
            <p>{viewingEvent.description}</p>

            <TicketPrice event={viewingEvent} />
          </Modal>
        </>
      )}
    </PageWrapper>
  );
}

//Past vs upcoming analytics//
