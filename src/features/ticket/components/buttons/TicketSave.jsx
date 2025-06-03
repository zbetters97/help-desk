const TicketSave = ({ canSave = true }) => {
  return (
    <button type="submit" disabled={!canSave} className="ticket-form__save">
      <p>Save</p>
    </button>
  );
};

export default TicketSave;
