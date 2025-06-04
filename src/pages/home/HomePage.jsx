import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateMDYShort, formatTime } from "src/utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import { useTicketContext } from "src/features/ticket/context/TicketContext";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import "./home-page.scss";

const HomePage = () => {
  const navigate = useNavigate();

  const params = useParams();
  const filter = params?.filter;

  const { globalUser } = useAuthContext();
  const { getAllTickets, getTicketsByStatus, getTicketsByAssignee } =
    useTicketContext();

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedValue, setSortedValue] = useState("");
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

      // Add a checked flag to each ticket object
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

  const handleSort = (sortValue) => {
    setTickets(
      [...tickets].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortValue.toLowerCase()].localeCompare(
            b[sortValue.toLowerCase()]
          );
        } else {
          return b[sortValue.toLowerCase()].localeCompare(
            a[sortValue.toLowerCase()]
          );
        }
      })
    );

    setSortedValue(sortValue);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
            <TableHead
              content="Status"
              classes="tickets-table__status-cell"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Created"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Subject"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Requester"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Assignee"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Priority"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Severity"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
            <TableHead
              content="Last Updated"
              handleSort={handleSort}
              sortedValue={sortedValue}
              sortOrder={sortOrder}
            />
          </tr>
        </thead>

        <tbody role="rowgroup">
          {tickets.map((ticket) => {
            const link = `/ticketing/${ticket.id}`;
            const status = `tickets-table__status--${ticket.status.toLowerCase()}`;

            const createdAtDate = `${formatDateMDYShort(
              ticket.createdAt.toDate()
            )} ${formatTime(ticket.createdAt.toDate())}`;

            const updatedAtDate = `${formatDateMDYShort(
              ticket.lastUpdated.toDate()
            )} ${formatTime(ticket.lastUpdated.toDate())}`;

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
                <TableData content={createdAtDate} />
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
                <TableData content={updatedAtDate} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

const TableHead = ({
  content,
  classes,
  handleSort,
  sortedValue,
  sortOrder,
}) => {
  const sorted = sortedValue === content;

  return (
    <th
      onClick={() => handleSort(content)}
      className={`tickets-table__cell tickets-table__cell--header ${classes}`}
      role="cell"
    >
      <div className="tickets-table__content">
        {content}
        <div>
          <FontAwesomeIcon
            icon={
              sortOrder === "asc" ? faArrowUpWideShort : faArrowDownWideShort
            }
            className={`tickets-table__sort-icon tickets-table__sort-icon--${
              sorted ? "active" : "inactive"
            }`}
          />
        </div>
      </div>
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
