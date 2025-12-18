import styled from "styled-components";

/* ===== Styles ===== */

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 4px;
  margin-top: 5px;
`;

const TicketBadge = styled.div`
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 3px 6px;
  text-align: center;
  box-shadow: 0 2px 6px ${({ theme }) => theme.shadow};

  span {
    display: block;
    font-size: 10px;
    font-weight: 600;
    opacity: 0.65;
    text-transform: uppercase;
  }

  strong {
    font-size: 13px;
    font-weight: 700;
    margin-top: 2px;
    display: block;
  }
`;

const FreeBadge = styled.div`
  margin-top: 10px;
  display: inline-block;
  background: rgba(5, 150, 105, 0.15);
  color: #059669;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

/* ===== Component ===== */

export default function TicketPrices({ event }) {
  if (!event) return null;

  if (event.freeEvent) {
    return <FreeBadge>Free Event</FreeBadge>;
  }

  if (!event.tickets) return null;

  const activeTickets = Object.entries(event.tickets).filter(
    ([_, price]) => price && price.trim() !== ""
  );

  if (activeTickets.length === 0) return null;

  return (
    <TicketGrid>
      {activeTickets.map(([type, price]) => (
        <TicketBadge key={type}>
          <span>{type}</span>
          <strong>{price}</strong>
        </TicketBadge>
      ))}
    </TicketGrid>
  );
}
