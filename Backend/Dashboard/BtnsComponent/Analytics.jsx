import styled from "styled-components";
import { useEventStore } from "../Store/EventStoreContext";

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 20px;
`;

const Stat = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
`;

function Analytics() {
  const { events } = useEventStore();

  const ticketsSold = events.reduce((sum, e) => sum + (e.ticketsSold || 0), 0);

  const revenue = events.reduce(
    (sum, e) => sum + (e.ticketsSold || 0) * (e.ticketPrice || 0),
    0
  );

  return (
    <Wrapper>
      <Title>Analytics</Title>

      <Stat>🎟️ Total Tickets Sold: {ticketsSold}</Stat>
      <Stat>💰 Total Revenue: ${revenue.toLocaleString()}</Stat>
      <Stat>📅 Total Events: {events.length}</Stat>

      {/* Later */}
      {/* Charts */}
      {/* Monthly revenue */}
      {/* Event performance */}
    </Wrapper>
  );
}

export default Analytics;
