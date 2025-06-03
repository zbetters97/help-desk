import { useParams } from "react-router-dom";
import AddTicket from "src/features/ticket/components/forms/AddTicket";
import "./ticket-page.scss";
import EditTicket from "src/features/ticket/components/forms/EditTicket";

const TicketPage = () => {
  const params = useParams();
  const ticketId = params?.ticketId;

  return (
    <section className="ticket">
      {ticketId === "new" ? <AddTicket /> : <EditTicket ticketId={ticketId} />}
    </section>
  );
};

export default TicketPage;
