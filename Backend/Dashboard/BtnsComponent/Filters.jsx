import styled from "styled-components";
import { useState } from "react";

// ===== Styled Components =====
const Container = styled.div`
  padding: 25px;
  color: ${({ theme }) => theme.text};
`;

const FiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.mainBg};
  color: ${({ theme }) => theme.text};
  flex: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.headerBg};
  }
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 10px;
`;

const Tag = styled.button`
  padding: 8px 14px;
  border-radius: 12px;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.headerBg : theme.sidebarBg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.glass};
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 0 10px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.neon};
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 12px;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    opacity: 0.85;
    margin-bottom: 6px;
  }

  span {
    font-weight: 500;
    font-size: 13px;
    opacity: 0.9;
  }

  button {
    margin-top: auto;
    padding: 8px 12px;
    border: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.headerBg};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s ease;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.headerBg};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    transition: 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

// Modal overlay
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: ${({ visible }) => (visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.glass};
  padding: 25px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  color: ${({ theme }) => theme.text};
`;

const ModalClose = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
`;

// ===== Component =====
function Filters() {
  const [filter, setFilter] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalEvent, setModalEvent] = useState(null);

  const eventsData = [
    {
      id: 1,
      title: "Tech Expo 2025",
      date: "2025-12-05",
      time: "10:00 AM",
      location: "Nairobi Conference Center",
      description: "Annual technology expo showcasing latest innovations.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=1",
    },
    {
      id: 2,
      title: "Music Fest",
      date: "2025-10-10",
      time: "06:00 PM",
      location: "City Stadium",
      description: "Live music festival featuring top artists.",
      status: "past",
      image: "https://picsum.photos/300/150?random=2",
    },
    {
      id: 3,
      title: "Food Carnival",
      date: "2025-09-20",
      time: "12:00 PM",
      location: "Downtown Park",
      description: "Experience world cuisines and local delicacies.",
      status: "cancelled",
      image: "https://picsum.photos/300/150?random=3",
    },
    {
      id: 4,
      title: "Startup Meetup",
      date: "2025-12-15",
      time: "02:00 PM",
      location: "Tech Hub",
      description: "Networking event for startups and investors.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=4",
    },
    {
      id: 5,
      title: "Startup Meetup",
      date: "2025-9-15",
      time: "02:00 PM",
      location: "Tech Hub",
      description: "Networking event for startups and investors.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=4",
    },
    {
      id: 6,
      title: "Startup Meetup",
      date: "2025-3-15",
      time: "02:00 PM",
      location: "Tech Hub",
      description: "Networking event for startups and investors.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=4",
    },
    {
      id: 7,
      title: "Startup Meetup",
      date: "2025-10-15",
      time: "02:00 PM",
      location: "Tech Hub",
      description: "Networking event for startups and investors.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=4",
    },
    {
      id: 8,
      title: "Startup Meetup",
      date: "2025-11-15",
      time: "02:00 PM",
      location: "Tech Hub",
      description: "Networking event for startups and investors.",
      status: "upcoming",
      image: "https://picsum.photos/300/150?random=4",
    },
    // Add more events here...
  ];

  // Filter + Search
  const filtered = eventsData
    .filter((e) => e.status === filter)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  // Pagination
  const perPage = 2;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <Container>
      {/* Filters + Search */}
      <FiltersBar>
        <SearchInput
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CategoryTags>
          {["upcoming", "past", "cancelled"].map((f) => (
            <Tag
              key={f}
              active={filter === f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} Events
            </Tag>
          ))}
        </CategoryTags>
      </FiltersBar>

      {/* Grid Events */}
      <Grid>
        {paged.map((event) => (
          <Card key={event.id}>
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <span>
              {event.date} at {event.time}
            </span>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <button onClick={() => setModalEvent(event)}>View Event</button>
          </Card>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </Pagination>

      {/* Modal */}
      <ModalOverlay visible={modalEvent}>
        {modalEvent && (
          <ModalContent>
            <ModalClose onClick={() => setModalEvent(null)}>×</ModalClose>
            <h2>{modalEvent.title}</h2>
            <img
              src={modalEvent.image}
              alt={modalEvent.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <p>
              <strong>Date:</strong> {modalEvent.date}
            </p>
            <p>
              <strong>Time:</strong> {modalEvent.time}
            </p>
            <p>
              <strong>Location:</strong> {modalEvent.location}
            </p>
            <p>{modalEvent.description}</p>
          </ModalContent>
        )}
      </ModalOverlay>
    </Container>
  );
}

export default Filters;
