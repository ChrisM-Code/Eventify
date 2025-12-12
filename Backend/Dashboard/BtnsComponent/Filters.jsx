import styled from "styled-components";
import { useState } from "react";
import { useEventStore } from "../Store/EventStoreContext";
import EventEditorDrawer from "../BtnsComponent/EventEditorDrawer";

/* -------------------- STYLES -------------------- */

const PageWrapper = styled.div`
  padding: 25px;
  color: ${({ theme }) => theme.text};
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.glass};
  border-radius: 14px;
  backdrop-filter: blur(10px);
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(6px);

  &:focus {
    border-color: ${({ theme }) => theme.headerBg};
    outline: none;
  }
`;

const FilterSelect = styled.select`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.text};
  backdrop-filter: blur(6px);
`;

const SectionWrapper = styled.div`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
`;

/* GRID + CARD */
const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.text};
  padding: 22px;
  border-radius: 18px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  position: relative;
  backdrop-filter: blur(12px);
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }

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
        padding: 4px 12px;
        color: white;
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

const Btn = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  background: ${({ theme }) => theme.headerBg};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const EditRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const Tabs = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  white-space: nowrap;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.headerBg : theme.mainBg};
  color: ${({ active }) => (active ? "white" : "inherit")};
  box-shadow: ${({ active, theme }) => (active ? theme.neon : "none")};
  cursor: pointer;
  transition: 0.25s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const PageBtn = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.glass};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: 0.25s ease;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.headerBg};
    color: white;
  }
`;

export default function FilterPage() {
  const { events } = useEventStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("confirmed");
  const [editingEvent, setEditingEvent] = useState(null);

  const [page, setPage] = useState(1);
  const perPage = 6;

  // FILTER LOGIC
  const filtered = events.filter((e) => {
    const term = search.toLowerCase();
    return (
      e.title.toLowerCase().includes(term) ||
      e.location.toLowerCase().includes(term) ||
      e.description.toLowerCase().includes(term)
    );
  });

  const tabEvents = filtered.filter((e) => {
    if (filter === "confirmed") return e.status === "confirmed";
    if (filter === "cancelled") return e.status === "cancelled";
    if (filter === "past") return e.status === "past";
    return true;
  });

  // PAGINATION
  const start = (page - 1) * perPage;
  const paginated = tabEvents.slice(start, start + perPage);

  return (
    <PageWrapper>
      {/* 🔍 Search + Tabs */}
      <FilterHeader>
        {/* Search */}
        <SearchInput
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabs */}
        <Tabs>
          <Tab
            active={filter === "confirmed"}
            onClick={() => {
              setFilter("confirmed");
              setPage(1);
            }}
          >
            Confirmed
          </Tab>

          <Tab
            active={filter === "cancelled"}
            onClick={() => {
              setFilter("cancelled");
              setPage(1);
            }}
          >
            Cancelled
          </Tab>

          <Tab
            active={filter === "past"}
            onClick={() => {
              setFilter("past");
              setPage(1);
            }}
          >
            Past
          </Tab>

          <Tab
            active={filter === "all"}
            onClick={() => {
              setFilter("all");
              setPage(1);
            }}
          >
            All
          </Tab>
        </Tabs>
      </FilterHeader>

      {/* ✨ Active Tab Title */}
      <SectionTitle>{filter.toUpperCase()} EVENTS</SectionTitle>

      {/* GRID */}
      <EventGrid>
        {paginated.length === 0 && <p>No events found.</p>}

        {paginated.map((event) => (
          <Card key={event.id} status={event.status}>
            {event.image && <Image src={event.image} alt={event.title} />}
            <h3>{event.title}</h3>
            <p style={{ opacity: 0.7, marginTop: 4 }}>
              {event.category} | {event.date} {event.time && `| ${event.time}`}
            </p>
            <p>{event.location}</p>
            <p style={{ marginTop: 10 }}>{event.description}</p>

            <EditRow>
              <Btn onClick={() => setEditingEvent(event)}>Edit</Btn>
            </EditRow>
          </Card>
        ))}
      </EventGrid>

      {/* PAGINATION */}
      {tabEvents.length > perPage && (
        <PaginationWrapper>
          <PageBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </PageBtn>

          <PageBtn
            disabled={start + perPage >= tabEvents.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </PageBtn>
        </PaginationWrapper>
      )}

      {/* Drawer */}
      {editingEvent && (
        <EventEditorDrawer
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </PageWrapper>
  );
}
