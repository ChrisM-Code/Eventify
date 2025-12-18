import styled from "styled-components";
import { useEventStore } from "../Store/EventStoreContext";

/* ================== Styled Components ================== */
const Wrapper = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 900px) {
    padding: 12px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 6px 18px ${({ theme }) => theme.shadow};
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 18px;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 14px;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

const TrashItem = styled.div`
  padding: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 12px;
`;

const Name = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.text};
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  background: ${({ theme }) => theme.headerBg};
  color: white;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GhostButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

/* ================== MAIN COMPONENT ================== */
export default function TrashBin() {
  const { trash, restoreEvent, permanentDelete } = useEventStore();

  return (
    <Wrapper>
      <Card>
        <Title>Deleted Events</Title>

        {trash.length === 0 && (
          <p style={{ color: "gray", fontSize: "14px" }}>Trash is empty</p>
        )}

        {trash.map((item) => (
          <TrashItem key={item.id}>
            <Name>{item.title}</Name>

            <Row>
              <Button onClick={() => restoreEvent(item.id)}>Restore</Button>

              <GhostButton onClick={() => permanentDelete(item.id)}>
                Delete
              </GhostButton>
            </Row>
          </TrashItem>
        ))}
      </Card>
    </Wrapper>
  );
}
