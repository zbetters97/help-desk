import { useRef, useState } from "react";
import { priorityList, severityList, statusList } from "src/data/const";
import useTicket from "../../hooks/useTicket";
import TicketSave from "../buttons/TicketSave";
import TicketInput from "../inputs/TicketInput";
import TicketTextarea from "../inputs/TicketTextarea";
import TicketAssignee from "../dropdowns/TicketAssignee";
import TicketRequester from "../dropdowns/TicketRequester";
import TicketDropdown from "../dropdowns/TicketDropdown";
import "./ticket-form.scss";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
  const { addTicket } = useTicket();

  const navigate = useNavigate();

  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);
  const [requester, setRequester] = useState("");
  const [assignee, setAssignee] = useState("none");

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form to firestore
    await submitToDb();

    resetForm();

    navigate("/dashboard/1");
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

    const subject = formData.get("subject");
    const description = formData.get("description");

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

  const resetForm = () => {
    // Reset dropdown values
    setStatus(statusList[0]);
    setPriority(priorityList[0]);
    setSeverity(severityList[0]);
    setRequester("");
    setAssignee("none");

    // Reset form values
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="ticket-form">
      <div className="ticket-form__header">
        <h3 className="ticket-form__subject">Create a ticket</h3>
        <TicketSave />
      </div>

      <div className="ticket-form__properties">
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

      <div className="ticket-form__content">
        <div className="ticket-form__users ticket-form__box">
          <TicketRequester selected={requester} setSelected={setRequester} />
          <TicketAssignee selected={assignee} setSelected={setAssignee} />
        </div>

        <div className="ticket-form__details ticket-form__box">
          <TicketInput label="Subject" name="subject" type="text" />
          <TicketTextarea
            label="Description"
            name="description"
            placeholder="Add a description..."
          />
        </div>
      </div>
    </form>
  );
};

export default AddTicket;
