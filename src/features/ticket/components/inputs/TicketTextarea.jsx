const TicketTextarea = ({ label, name, placeholder }) => {
  return (
    <div className="ticket-form__field">
      <label htmlFor={name} className="ticket-form__label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className="ticket-form__textarea"
      />
    </div>
  );
};

export default TicketTextarea;
