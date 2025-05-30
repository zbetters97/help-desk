import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./status-select.scss";

const statusList = [
  { label: "New", value: "new" },
  { label: "Open", value: "open" },
  { label: "Waiting", value: "waiting" },
  { label: "Paused", value: "paused" },
  { label: "Resolved", value: "resolved" },
];

const StatusSelect = () => {
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState(statusList[0]);

  return (
    <div onClick={() => setShowStatus(!showStatus)} className="status-select">
      <span
        className={`status-select__icon status-select__icon--${status.value}`}
      />
      <p>
        Status: <span>{status.label}</span>
      </p>
      <FontAwesomeIcon icon={faCaretDown} />

      <ul className="status-select__options" aria-expanded={showStatus}>
        {statusList.map((option) => (
          <li
            key={option.value}
            onClick={() => {
              setStatus(option);
              setShowStatus(false);
            }}
            className="status-select__option"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusSelect;
