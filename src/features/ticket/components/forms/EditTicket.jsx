import { useEffect, useState } from "react";
import { db } from "src/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "src/features/auth/context/AuthContext";
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
  const { getUserById } = useAuthContext();
  const { getTicketById, updateTicket } = useTicketContext();

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

  useEffect(() => {
    if (!ticket) {
      setCanSave(false);
      return;
    }
    setCanSave(
      subject !== ticket.subject ||
        status !== ticket.status ||
        priority !== ticket.priority ||
        severity !== ticket.severity ||
        requester !== ticket.requesterId ||
        assignee !== ticket.assigneeId
    );
  }, [ticket, subject, status, priority, severity, requester, assignee]);

  useEffect(() => {
    if (!ticket?.chatId) return;

    const unsubscribe = onSnapshot(
      doc(db, "chats", ticket.chatId),
      async (docSnap) => {
        if (!docSnap.exists()) {
          setChats([]);
          return;
        }

        const messages = docSnap.data().messages || [];
        if (messages.length === 0) {
          setChats([]);
          return;
        }

        const senderIds = [...new Set(messages.map((m) => m.senderId))];
        const users = await Promise.all(senderIds.map(getUserById));

        const userMap = {};
        senderIds.forEach((id, idx) => {
          userMap[id] = users[idx];
        });

        const fetchedChats = messages.map((message) => {
          const sender = userMap[message.senderId] || {};

          return {
            id: message.id,
            message: message.message,
            firstname: sender.firstname || "",
            lastname: sender.lastname || "",
            displayname: sender.displayname || "",
            createdAt: message.createdAt,
          };
        });

        setChats(fetchedChats.sort((a, b) => b.createdAt - a.createdAt));
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [ticket, getUserById]);

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
  }, [ticketId, getTicketById]);

  const validateForm = () => {
    if (subject === "") return false;
    if (requester === "") return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await updateTicket(
      ticketId,
      requester,
      subject,
      status,
      priority,
      severity,
      assignee
    );

    setCanSave(false);
  };

  if (loading) return null;

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
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
