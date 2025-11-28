import styled from "styled-components";
import { useState } from "react";

const Panel = styled.div`
  width: 100%;
  max-width: 900px;
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.mainBg};
  border-radius: 12px;
  overflow: hidden;
`;

const Head = styled.thead`
  background: ${({ theme }) => theme.headerBg};
  th {
    padding: 12px;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
  }
`;

const Body = styled.tbody`
  td {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
  }
`;

const Pagination = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
}

function Notification() {
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const notifications = [
    { msg: "Tech Expo 2025 added", date: "2025-11-28T10:00:00" },
    { msg: "5 new users registered", date: "2025-11-28T07:15:00" },
    { msg: "Music Fest reminder", date: "2025-11-27T08:20:00" },
    { msg: "System update applied", date: "2025-11-26T12:45:00" },
    { msg: "New admin added", date: "2025-11-25T09:10:00" },
    { msg: "Security scan completed", date: "2025-11-21T14:30:00" },
  ];

  const sorted = [...notifications].sort((a, b) =>
    sortAsc ? a.msg.localeCompare(b.msg) : b.msg.localeCompare(a.msg)
  );

  const perPage = 3;
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <Panel>
      <Header>Notifications</Header>

      <Table>
        <Head>
          <tr>
            <th onClick={() => setSortAsc(!sortAsc)}>Message ⬍</th>
            <th>Date</th>
          </tr>
        </Head>

        <Body>
          {paged.map((item, i) => (
            <tr key={i}>
              <td>{item.msg}</td>
              <td>{formatDate(item.date)}</td>
            </tr>
          ))}
        </Body>
      </Table>

      <Pagination>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={page * perPage >= sorted.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </Pagination>
    </Panel>
  );
}

export default Notification;
