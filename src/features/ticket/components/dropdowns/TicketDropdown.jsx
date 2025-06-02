import { useEffect, useRef, useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ticket-dropdown.scss";

const TicketDropdown = ({ showIcon, label, items, selected, setSelected }) => {
  const [showItems, setShowItems] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowItems(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      onClick={() => setShowItems(!showItems)}
      className="ticket-dropdown"
    >
      {showIcon && (
        <span
          className={`ticket-dropdown__icon ticket-dropdown__icon--${selected.toLowerCase()}`}
        />
      )}
      <p>
        {label}: <span>{selected}</span>
      </p>
      <FontAwesomeIcon icon={faCaretDown} />

      <ul className="ticket-dropdown__options" aria-expanded={showItems}>
        {items.map((option) => (
          <li
            key={option.toLowerCase()}
            onClick={() => {
              setSelected(option);
              setShowItems(false);
            }}
            className="ticket-dropdown__option"
          >
            {showIcon && (
              <span
                className={`ticket-dropdown__icon ticket-dropdown__icon--${option.toLowerCase()}`}
              />
            )}
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDropdown;
