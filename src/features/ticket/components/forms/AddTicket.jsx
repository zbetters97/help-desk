import { useRef, useState } from "react";
import TicketDropdown from "../dropdowns/TicketDropdown";
import "./add-ticket.scss";

const statusList = [
  { label: "New", value: "new" },
  { label: "Open", value: "open" },
  { label: "Waiting", value: "waiting" },
  { label: "Paused", value: "paused" },
  { label: "Resolved", value: "resolved" },
];

const priorityList = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const severityList = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const AddTicket = () => {
  const formRef = useRef(null);

  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);

  const handleSubmit = () => {
    console.log("called");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="add-ticket">
      <div className="add-ticket__header">
        <h1 className="add-ticket__title">Create Ticket</h1>
        <FormSubmitButton />
      </div>

      <div className="add-ticket__properties">
        <TicketDropdown
          showIcon
          label="Status"
          items={statusList}
          selected={status}
          setSelected={setStatus}
        />
        <TicketDropdown
          label="Priority"
          items={priorityList}
          selected={priority}
          setSelected={setPriority}
        />
        <TicketDropdown
          label="Severity"
          items={severityList}
          selected={severity}
          setSelected={setSeverity}
        />
      </div>

      <div className="add-ticket__content">
        <div className="add-ticket__users">
          <FormSelect
            label="Requester"
            name="requester"
            options={[
              { label: "User 1", value: "user1" },
              { label: "User 2", value: "user2" },
              { label: "User 3", value: "user3" },
            ]}
          />

          <FormSelect
            label="Assignee"
            name="assignee"
            options={[
              { label: "User 1", value: "user1" },
              { label: "User 2", value: "user2" },
              { label: "User 3", value: "user3" },
            ]}
          />
        </div>

        <div className="add-ticket__details">
          <FormInput label="Subject" name="subject" type="text" />
          <FormTextArea label="Description" name="description" />
        </div>
      </div>
    </form>
  );
};

const FormSelect = ({ label, name, options }) => {
  return (
    <div className="add-ticket__field">
      <label htmlFor={name} className="add-ticket__label">
        {label}
      </label>
      <select id={name} className="add-ticket__select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormInput = ({ label, name, type }) => {
  return (
    <div className="add-ticket__field">
      <label htmlFor={name} className="add-ticket__label">
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        id={name}
        className="add-ticket__input"
      />
    </div>
  );
};

const FormTextArea = ({ label, name }) => {
  return (
    <div className="add-ticket__field">
      <label htmlFor={name} className="add-ticket__label">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={label}
        className="add-ticket__textarea"
      />
    </div>
  );
};

const FormSubmitButton = () => {
  return (
    <button type="submit" className="add-ticket__save">
      <p>Save</p>
    </button>
  );
};

export default AddTicket;
