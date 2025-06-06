import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import TicketRows from "src/features/ticket/components/table/TicketRows";
import { useTicketContext } from "src/features/ticket/context/TicketContext";
import TicketColumns from "src/features/ticket/components/table/TicketColumns";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./home-page.scss";

const HomePage = () => {
  const { globalUser, updateUserColumns } = useAuthContext();
  const { getAllTickets, getTicketsByStatus, getTicketsByAssignee } =
    useTicketContext();

  const params = useParams();
  const filter = params?.filter;

  const [tickets, setTickets] = useState([]);
  const [columnOrder, setColumnOrder] = useState([
    "checkbox",
    "created",
    "status",
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

      setColumnOrder(globalUser.columns);

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
      classes: "tickets-table__property",
    },
    severity: {
      content: "Severity",
      classes: "tickets-table__property",
    },
    updated: {
      content: "Last Updated",
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = async (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }

    setColumnOrder((columns) => {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);

      const newOrder = arrayMove(columns, oldIndex, newIndex);
      updateUserColumns(globalUser.uid, newOrder);
      return newOrder;
    });
  };

  if (!tickets) return null;

  return (
    <section className="home">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <table role="table" className="tickets-table">
            <thead className="tickets-table__header" role="rowgroup">
              <TicketColumns
                tickets={tickets}
                setTickets={setTickets}
                columnData={columnData}
                columnOrder={columnOrder}
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
        </SortableContext>
      </DndContext>
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
