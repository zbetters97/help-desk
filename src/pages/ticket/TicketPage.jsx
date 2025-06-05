import { useParams } from "react-router-dom";
import AddTicket from "src/features/ticket/components/forms/AddTicket";
import EditTicket from "src/features/ticket/components/forms/EditTicket";
import "./ticket-page.scss";

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
