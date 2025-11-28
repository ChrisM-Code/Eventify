import styled from "styled-components";

const DashWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
`;

const Card = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.glass};
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
  backdrop-filter: blur(8px);
  transition: 0.3s ease;

  h3 {
    font-size: 22px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.text};
    opacity: 0.85;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.neon};
    filter: brightness(1.05);
  }
`;

function MainDash() {
  return (
    <DashWrapper>
      <Title>Main Dashboard Overview</Title>

      <Grid>
        <Card>
          <h3>Overview</h3>
          <p>General system summary</p>
        </Card>

        <Card>
          <h3>Event Summary</h3>
          <p>Quick analytics of all events</p>
        </Card>

        <Card>
          <h3>Total Events</h3>
          <p>56 events hosted on platform</p>
        </Card>

        <Card>
          <h3>Active Events</h3>
          <p>12 currently active</p>
        </Card>

        <Card>
          <h3>Past Events</h3>
          <p>30 Past events</p>
        </Card>

        <Card>
          <h3>Tickets Sold</h3>
          <p>4,982 total tickets sold</p>
        </Card>

        <Card>
          <h3>Revenue Generated</h3>
          <p>$238,000 in total earnings</p>
        </Card>

        <Card>
          <h3>Graph</h3>
          <p>Monthly performance chart</p>
        </Card>
      </Grid>
    </DashWrapper>
  );
}

export default MainDash;
