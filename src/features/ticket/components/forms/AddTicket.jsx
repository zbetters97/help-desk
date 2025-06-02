import { useRef, useState } from "react";
import useTicket from "../../hooks/useTicket";
import TicketDropdown from "../dropdowns/TicketDropdown";
import "./add-ticket.scss";

const statusList = ["New", "Open", "Waiting", "Paused", "Resolved"];
const priorityList = ["Low", "Medium", "High"];
const severityList = ["Low", "Medium", "High"];
const requesterList = ["User 1", "User 2", "User 3"];
const assigneeList = ["User 1", "User 2", "User 3"];

const AddTicket = () => {
  const { addTicket } = useTicket();

  const formRef = useRef(null);

  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form to firestore
    await submitToDb();

    // Reset dropdown values
    setStatus(statusList[0]);
    setPriority(priorityList[0]);
    setSeverity(severityList[0]);

    // Reset form values
    formRef.current.reset();
  };

  const validateForm = () => {
    const requester = formRef.current.elements.requester.value;
    if (!requester || requester == "") {
      return false;
    }

    const subject = formRef.current.elements.subject.value;
    if (!subject || subject == "") {
      return false;
    }

    const description = formRef.current.elements.description.value;
    if (!description || description == "") {
      return false;
    }

    return true;
  };

  const submitToDb = async () => {
    const formData = new FormData(formRef.current);

    const requester = formData.get("requester");
    const subject = formData.get("subject");
    const description = formData.get("description");
    const assignee = formData.get("assignee") || "";

    await addTicket(
      requester,
      subject,
      description,
      status,
      priority,
      severity,
      assignee
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="add-ticket">
      <div className="add-ticket__header">
        <h3 className="add-ticket__title">Create a ticket</h3>
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
            options={requesterList}
          />

          <FormSelect label="Assignee" name="assignee" options={assigneeList} />
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
      <select
        id={name}
        name={name}
        defaultValue=""
        className="add-ticket__select"
      >
        <option value="" disabled>
          -- Choose an option --
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="add-ticket__option">
            {option}
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
        name={name}
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
        name={name}
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
