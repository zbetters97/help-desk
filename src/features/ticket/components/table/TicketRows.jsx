import { useNavigate } from "react-router-dom";
import { formatDateMDYShort, formatTime } from "src/utils/date";

const TicketRows = ({ tickets, setTickets, columnOrder, columnData }) => {
  const navigate = useNavigate();

  const getColumnContent = (key, ticket) => {
    switch (key) {
      case "checkbox":
        return (
          <TicketCheckbox
            ticket={ticket}
            tickets={tickets}
            setTickets={setTickets}
          />
        );
      case "status":
        return (
          <div
            className={`tickets-table__status tickets-table__status--${ticket.status.toLowerCase()}`}
          >
            {ticket.status}
          </div>
        );
      case "created":
        const createdAt = ticket.createdAt.toDate();
        const createdTime = `${formatDateMDYShort(createdAt)} ${formatTime(
          createdAt
        )}`;
        return createdTime;
      case "subject":
        return ticket.subject;
      case "requester":
        return ticket.requester;
      case "assignee":
        return ticket.assignee;
      case "priority":
        return ticket.priority;
      case "severity":
        return ticket.severity;
      case "updated":
        const lastUpdated = ticket.lastUpdated.toDate();
        const updatedTime = `${formatDateMDYShort(lastUpdated)} ${formatTime(
          lastUpdated
        )}`;
        return updatedTime;
      default:
        return null;
    }
  };

  return (
    <>
      {tickets.map((ticket) => (
        <tr
          key={ticket.id}
          onClick={() => navigate(`/ticketing/${ticket.id}`)}
          className="tickets-table__row"
          role="row"
        >
          {columnOrder.map((column) => (
            <TableData
              key={column}
              content={getColumnContent(column, ticket)}
              classes={columnData[column].classes}
            />
          ))}
        </tr>
      ))}
    </>
  );
};

const TicketCheckbox = ({ ticket, tickets, setTickets }) => {
  const handleCheck = (e, ticket) => {
    ticket.checked = e.target.checked;
    setTickets([...tickets]);
  };

  return (
    <input
      type="checkbox"
      checked={ticket.checked}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleCheck(e, ticket)}
      className="tickets-table__checkbox"
    />
  );
};

const TableData = ({ content, classes }) => {
  return (
    <td className={`tickets-table__cell ${classes || ""}`} role="cell">
      {content}
    </td>
  );
};

export default TicketRows;
