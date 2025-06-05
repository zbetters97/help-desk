import { useEffect, useRef, useState } from "react";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priorityList, severityList, statusList } from "src/data/const";
import TicketSave from "../buttons/TicketSave";
import TicketResponse from "../inputs/TicketResponse";
import TicketActivity from "../sections/TicketActivity";
import TicketAssignee from "../dropdowns/TicketAssignee";
import TicketDropdown from "../dropdowns/TicketDropdown";
import TicketRequester from "../dropdowns/TicketRequester";
import { useTicketContext } from "../../context/TicketContext";
import "./ticket-form.scss";

const EditTicket = ({ ticketId }) => {
  const { getTicketById, updateTicket, getTicketChats } = useTicketContext();

  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);

  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState(statusList[0]);
  const [priority, setPriority] = useState(priorityList[0]);
  const [severity, setSeverity] = useState(severityList[0]);
  const [requester, setRequester] = useState("");
  const [assignee, setAssignee] = useState("none");
  const [canSave, setCanSave] = useState(false);

  const [chats, setChats] = useState([]);

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

      const fetchedChats = await getTicketChats(fetchedTicket.chatId);
      const sortedChats = fetchedChats.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      setChats(sortedChats);

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
          <TicketResponse chatId={ticket.chatId} />
          <TicketActivity chats={chats} />
        </div>
      </div>
    </form>
  );
};

export default EditTicket;
