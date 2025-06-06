import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const TicketColumns = ({
  tickets,
  setTickets,
  columnOrder,
  setColumnOrder,
  columnData,
}) => {
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
          content={columnData[column].content}
          classes={columnData[column].classes}
          handleSort={handleSort}
          sortedValue={sortedValue}
          sortOrder={sortOrder}
        />
      ))}
    </tr>
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

export default TicketColumns;
