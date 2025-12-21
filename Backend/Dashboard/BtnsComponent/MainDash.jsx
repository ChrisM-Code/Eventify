import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiArchive,
  FiXCircle,
  FiEdit,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";
import { useEventStore } from "../Store/EventStoreContext";

/* ================= STYLES ================= */

const DashWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.glass};
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.neon};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  svg {
    font-size: 20px;
    color: ${({ color }) => color};
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

const Count = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

/* ================= DASHBOARD ================= */

function MainDash() {
  const navigate = useNavigate();
  const { events = [] } = useEventStore(); // safe default

  /* ========= CORRECT COUNTS ========= */

  const totalEvents = events.length;

  const draftEvents = events.filter((e) => e.status === "draft" && !e.uploaded);

  const upcomingEvents = events.filter(
    (e) => e.status === "upcoming" && e.uploaded
  );

  const confirmedEvents = events.filter(
    (e) => e.status === "confirmed" && e.uploaded
  );

  const cancelledEvents = events.filter(
    (e) => e.status === "cancelled" && e.uploaded
  );

  return (
    <DashWrapper>
      <Title>Main Dashboard</Title>

      <Grid>
        {/* ===== TOP PRIORITY ===== */}

        <Card onClick={() => navigate("/filter")}>
          <CardHeader color="#3b82f6">
            <FiCalendar />
            <h3>Total Events</h3>
          </CardHeader>
          <Count>{totalEvents}</Count>
        </Card>

        <Card onClick={() => navigate("/filter?filter=upcoming")}>
          <CardHeader color="#f59e0b">
            <FiClock />
            <h3>Upcoming Events</h3>
          </CardHeader>
          <Count>{upcomingEvents.length}</Count>
        </Card>

        <Card onClick={() => navigate("/filter?filter=confirmed")}>
          <CardHeader color="#22c55e">
            <FiCheckCircle />
            <h3>Confirmed Events</h3>
          </CardHeader>
          <Count>{confirmedEvents.length}</Count>
        </Card>

        <Card onClick={() => navigate("/filter?filter=cancelled")}>
          <CardHeader color="#ef4444">
            <FiXCircle />
            <h3>Cancelled Events</h3>
          </CardHeader>
          <Count>{cancelledEvents.length}</Count>
        </Card>

        {/* ===== ADMIN ===== */}

        <Card onClick={() => navigate("/quickaction")}>
          <CardHeader color="#ec4899">
            <FiEdit />
            <h3>Draft Events</h3>
          </CardHeader>
          <Count>{draftEvents.length}</Count>
        </Card>

        {/* ===== BUSINESS METRICS (COMING SOON) ===== */}

        <Card style={{ opacity: 0.4, pointerEvents: "none" }}>
          <CardHeader color="#8b5cf6">
            <FiTag />
            <h3>Tickets Sold</h3>
          </CardHeader>
          <Count>—</Count>
        </Card>

        <Card style={{ opacity: 0.4, pointerEvents: "none" }}>
          <CardHeader color="#10b981">
            <FiDollarSign />
            <h3>Revenue</h3>
          </CardHeader>
          <Count>—</Count>
        </Card>

        <Card style={{ opacity: 0.4, pointerEvents: "none" }}>
          <CardHeader color="#6b7280">
            <FiArchive />
            <h3>Past Events</h3>
          </CardHeader>
          <Count>—</Count>
        </Card>
      </Grid>
    </DashWrapper>
  );
}

export default MainDash;
