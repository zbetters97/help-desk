const TicketSelect = ({ label, name, options, defaultValue }) => {
  return (
    <div className="ticket-form__field">
      <label htmlFor={name} className="ticket-form__label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        className="ticket-form__select"
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            className="ticket-form__option"
          >
            {option.displayname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketSelect;
