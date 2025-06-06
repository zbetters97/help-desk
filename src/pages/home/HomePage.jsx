import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import TicketRows from "src/features/ticket/components/table/TicketRows";
import { useTicketContext } from "src/features/ticket/context/TicketContext";
import TicketColumns from "src/features/ticket/components/table/TicketColumns";
import "./home-page.scss";

const HomePage = () => {
  const { globalUser } = useAuthContext();
  const { getAllTickets, getTicketsByStatus, getTicketsByAssignee } =
    useTicketContext();

  const params = useParams();
  const filter = params?.filter;

  const [tickets, setTickets] = useState([]);

  const [columnOrder, setColumnOrder] = useState([
    "checkbox",
    "status",
    "created",
    "subject",
    "requester",
    "assignee",
    "priority",
    "severity",
    "updated",
  ]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!globalUser) return;

      let fetchedTickets =
        filter === "0"
          ? await getTicketsByAssignee("none")
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

  const columnData = {
    checkbox: {
      content: <HeaderCheckbox tickets={tickets} setTickets={setTickets} />,
    },
    status: {
      content: "Status",
    },
    created: {
      content: "Created",
    },
    subject: {
      content: "Subject",
    },
    requester: {
      content: "Requester",
      classes: "tickets-table__user",
    },
    assignee: {
      content: "Assignee",
      classes: "tickets-table__user",
    },
    priority: {
      content: "Priority",
    },
    severity: {
      content: "Severity",
    },
    updated: {
      content: "Last Updated",
    },
  };

  if (!tickets) return null;

  return (
    <section className="home">
      <table role="table" className="tickets-table">
        <thead className="tickets-table__header" role="rowgroup">
          <TicketColumns
            tickets={tickets}
            setTickets={setTickets}
            columnData={columnData}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
          />
        </thead>
        <tbody role="rowgroup">
          <TicketRows
            tickets={tickets}
            setTickets={setTickets}
            columnOrder={columnOrder}
            columnData={columnData}
          />
        </tbody>
      </table>
    </section>
  );
};

const HeaderCheckbox = ({ tickets, setTickets }) => {
  const handleCheckAll = (e) => {
    tickets.forEach((ticket) => (ticket.checked = e.target.checked));
    setTickets([...tickets]);
  };

  return (
    <input
      type="checkbox"
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleCheckAll(e)}
      className="tickets-table__checkbox"
    />
  );
};

export default HomePage;
