import { useEffect, useRef, useState } from "react";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priorityList, severityList, statusList } from "src/data/const";
import TicketSave from "../buttons/TicketSave";
import TicketTextarea from "../inputs/TicketTextarea";
import TicketAssignee from "../inputs/TicketAssignee";
import TicketRequester from "../inputs/TicketRequester";
import TicketDropdown from "../dropdowns/TicketDropdown";
import { useTicketContext } from "../../context/TicketContext";
import "./ticket-form.scss";

const EditTicket = ({ ticketId }) => {
  const { getTicketById, updateTicket } = useTicketContext();

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState(null);

  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);
  const [requester, setRequester] = useState("");
  const [assignee, setAssignee] = useState("");

  const [canSave, setCanSave] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) return;

      setLoading(true);

      const fetchedTicket = await getTicketById(ticketId);
      setTicket(fetchedTicket);

      setSubject(fetchedTicket.subject);
      setStatus(fetchedTicket.status);
      setPriority(fetchedTicket.priority);
      setSeverity(fetchedTicket.severity);
      setRequester(fetchedTicket.requesterId);
      setAssignee(fetchedTicket.assigneeId);

      setLoading(false);
    };

    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    if (!ticket) return;

    setCanSave(
      subject !== ticket.subject ||
        status !== ticket.status ||
        priority !== ticket.priority ||
        severity !== ticket.severity ||
        requester !== ticket.requesterId ||
        assignee !== ticket.assigneeId
    );
  }, [subject, status, priority, severity, requester, assignee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form to firestore
    await submitToDb();

    setCanSave(false);
  };

  const validateForm = () => {
    const subject = formRef.current.elements.subject.value;
    if (!subject || subject == "") {
      return false;
    }

    const requester = formRef.current.elements.requester.value;
    if (!requester || requester == "") {
      return false;
    }

    const assignee = formRef.current.elements.assignee.value;
    if (!assignee || assignee == "") {
      return false;
    }

    return true;
  };

  const submitToDb = async () => {
    await updateTicket(
      ticketId,
      requester,
      subject,
      status,
      priority,
      severity,
      assignee
    );
  };

  if (loading) return null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="ticket-form">
      <div className="ticket-form__header">
        <div className="ticket-form__header__subject">
          <FontAwesomeIcon icon={faTicket} className="ticket-form__icon" />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
          <TicketRequester selected={requester} setSelected={setRequester} />
          <TicketAssignee selected={assignee} setSelected={setAssignee} />
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
