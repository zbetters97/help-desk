import { useEffect, useRef, useState } from "react";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priorityList, severityList, statusList } from "src/data/const";
import TicketSave from "../buttons/TicketSave";
import TicketSelect from "../inputs/TicketSelect";
import TicketTextarea from "../inputs/TicketTextarea";
import TicketDropdown from "../dropdowns/TicketDropdown";
import { useTicketContext } from "../../context/TicketContext";
import "./ticket-form.scss";

const requesterList = ["User 1", "User 2", "User 3"];
const assigneeList = ["User 1", "User 2", "User 3"];

const EditTicket = ({ ticketId }) => {
  const { getTicketById } = useTicketContext();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);

  const [canSave, setCanSave] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const fetchedTicket = await getTicketById(ticketId);
      setTicket(fetchedTicket);

      setStatus(fetchedTicket.status);
      setPriority(fetchedTicket.priority);
      setSeverity(fetchedTicket.severity);
    };

    fetchTicket();
  }, [ticketId]);

  const handleSubjectChange = (e) => {
    // Can only save if not blank and change has been made
    setCanSave(e.target.value !== "" && e.target.value !== ticket.subject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form to firestore
    await submitToDb();
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

    return true;
  };

  const submitToDb = async () => {
    const formData = new FormData(formRef.current);
  };

  if (!ticket) return null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="ticket-form">
      <div className="ticket-form__header">
        <div className="ticket-form__header__subject">
          <FontAwesomeIcon icon={faTicket} className="ticket-form__icon" />
          <input
            type="text"
            name="subject"
            defaultValue={ticket.subject}
            onChange={handleSubjectChange}
            className="ticket-form__subject ticket-form__subject--edit"
          />
        </div>

        <TicketSave canSave={canSave} />
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
        <div className="ticket-form__box ticket-form__users ">
          <TicketSelect
            label="Requester"
            name="requester"
            options={requesterList}
            defaultValue={ticket.requesterId}
          />

          <TicketSelect
            label="Assignee"
            name="assignee"
            options={assigneeList}
            defaultValue={ticket.assigneeId}
          />
        </div>

        <div className="ticket-form__details">
          <div className=" ticket-form__box ticket-form__response">
            <TicketTextarea
              label="Public Response"
              name="response"
              placeholder="Type your response here..."
            />
          </div>

          <div className=" ticket-form__box ticket-form__activity">
            <h3>Ticket activity</h3>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditTicket;
