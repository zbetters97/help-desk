import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const TicketColumns = ({ tickets, setTickets, columnOrder, columnData }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedValue, setSortedValue] = useState("");

  const handleSort = (sortValue) => {
    setTickets(
      [...tickets].sort((a, b) => {
        if (sortOrder === "asc") {
          if (sortValue === "Created" || sortValue === "Last Updated")
            return a.createdAt - b.createdAt;

          return a[sortValue.toLowerCase()].localeCompare(
            b[sortValue.toLowerCase()]
          );
        } else {
          if (sortValue === "Created" || sortValue === "Last Updated")
            return b.createdAt - a.createdAt;

          return b[sortValue.toLowerCase()].localeCompare(
            a[sortValue.toLowerCase()]
          );
        }
      })
    );

    setSortedValue(sortValue);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <tr role="row">
      {columnOrder.map((column) => (
        <TableHead
          key={column}
          id={column}
          column={columnData[column]}
          handleSort={handleSort}
          sortedValue={sortedValue}
          sortOrder={sortOrder}
        />
      ))}
    </tr>
  );
};

const TableHead = ({ id, column, handleSort, sortedValue, sortOrder }) => {
  const sorted = sortedValue === column.content;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      activationConstraint: { distance: 8 },
    });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <th
      onClick={() => handleSort(column.content)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className={`tickets-table__cell tickets-table__cell--header ${column.classes}`}
      role="cell"
    >
      <div className="tickets-table__content">
        {column.content}
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

export default TicketColumns;
