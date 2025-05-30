import { useParams } from "react-router-dom";
import AddTicket from "src/features/ticket/components/forms/AddTicket";
import "./ticket-page.scss";

const TicketPage = () => {
  const params = useParams();
  const ticketId = params?.ticketId;

  return (
    <section className="ticket">
      <AddTicket />
    </section>
  );
};

export default TicketPage;
