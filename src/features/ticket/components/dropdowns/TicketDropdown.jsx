import { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ticket-dropdown.scss";

const TicketDropdown = ({ showIcon, label, items, selected, setSelected }) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div onClick={() => setShowItems(!showItems)} className="ticket-dropdown">
      {showIcon && (
        <span
          className={`ticket-dropdown__icon ticket-dropdown__icon--${selected.value}`}
        />
      )}
      <p>
        {label}: <span>{selected.label}</span>
      </p>
      <FontAwesomeIcon icon={faCaretDown} />

      <ul className="ticket-dropdown__options" aria-expanded={showItems}>
        {items.map((option) => (
          <li
            key={option.value}
            onClick={() => {
              setSelected(option);
              setShowItems(false);
            }}
            className="ticket-dropdown__option"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDropdown;
