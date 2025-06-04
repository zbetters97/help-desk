import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateMDYShort } from "src/utils/date";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import { useTicketContext } from "src/features/ticket/context/TicketContext";
import "./home-page.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const filter = params?.filter;

  const { globalUser } = useAuthContext();
  const { getAllTickets, getTicketsByStatus, getTicketsByAssignee } =
    useTicketContext();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!globalUser) return;

      let fetchedTickets =
        filter === "0"
          ? await getTicketsByAssignee("")
          : filter === "1"
          ? await getAllTickets()
          : filter === "2"
          ? await getTicketsByStatus("Open")
          : filter === "3"
          ? await getTicketsByAssignee(globalUser?.uid || "")
          : await getAllTickets();

      // Add a checked property to each ticket object
      fetchedTickets = fetchedTickets.map((ticket) => ({
        ...ticket,
        checked: false,
      }));

      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, [filter, globalUser]);

  const handleCheckAll = (e) => {
    tickets.forEach((ticket) => (ticket.checked = e.target.checked));
    setTickets([...tickets]);
  };

  const handleCheck = (e, ticket) => {
    ticket.checked = e.target.checked;
    setTickets([...tickets]);
  };

  if (!tickets) return null;

  return (
    <section className="home">
      <table role="table" className="tickets-table">
        <thead className="tickets-table__header" role="rowgroup">
          <tr role="row">
            <TableHead
              content={<HeaderCheckbox handleCheckAll={handleCheckAll} />}
            />
            <TableHead
              content={<div className="tickets-table__status" />}
              classes="tickets-table__status-indicator"
            />
            <TableHead content="Status" classes="tickets-table__status-cell" />
            <TableHead content="Created" />
            <TableHead content="Subject" />
            <TableHead content="Requester" />
            <TableHead content="Assignee" />
            <TableHead content="Priority" />
            <TableHead content="Severity" />
            <TableHead content="Last Updated" />
          </tr>
        </thead>

        <tbody role="rowgroup">
          {tickets.map((ticket) => {
            const link = `/ticketing/${ticket.id}`;
            const status = `tickets-table__status--${ticket.status.toLowerCase()}`;
            const date = formatDateMDYShort(ticket.createdAt.toDate());

            return (
              <tr
                key={ticket.id}
                onClick={() => navigate(link)}
                className="tickets-table__row"
                role="row"
              >
                <TableData
                  content={
                    <TicketCheckbox ticket={ticket} handleCheck={handleCheck} />
                  }
                />
                <TableData
                  content={
                    <div className={`tickets-table__status ${status}`} />
                  }
                  classes="tickets-table__status-indicator"
                />
                <TableData
                  content={ticket.status}
                  classes="tickets-table__status-cell"
                />
                <TableData content={date} />
                <TableData content={ticket.subject} />
                <TableData
                  content={ticket.requester}
                  classes="tickets-table__user"
                />
                <TableData
                  content={ticket.assignee}
                  classes="tickets-table__user"
                />
                <TableData content={ticket.priority} />
                <TableData content={ticket.severity} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

const TableHead = ({ content, classes }) => {
  return (
    <th className={`tickets-table__cell ${classes}`} role="cell">
      {content}
    </th>
  );
};

const TableData = ({ content, classes }) => {
  return (
    <td className={`tickets-table__cell ${classes}`} role="cell">
      {content}
    </td>
  );
};

const HeaderCheckbox = ({ handleCheckAll }) => {
  return (
    <input
      type="checkbox"
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleCheckAll(e)}
      className="tickets-table__checkbox"
    />
  );
};

const TicketCheckbox = ({ ticket, handleCheck }) => {
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

export default HomePage;
