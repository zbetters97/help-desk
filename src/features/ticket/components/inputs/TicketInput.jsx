const TicketInput = ({ label, name, type }) => {
  return (
    <div className="ticket-form__field">
      <label htmlFor={name} className="ticket-form__label">
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        id={name}
        name={name}
        className="ticket-form__input"
      />
    </div>
  );
};

export default TicketInput;
