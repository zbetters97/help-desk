import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTicket from "src/features/ticket/components/forms/AddTicket";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import EditTicket from "src/features/ticket/components/forms/EditTicket";
import "./ticket-page.scss";

const TicketPage = () => {
  const { loadingUser, globalUser } = useAuthContext();

  const navigate = useNavigate();

  const params = useParams();
  const ticketId = params?.ticketId;

  useEffect(() => {
    const checkUser = () => {
      if (loadingUser) return;

      if (!globalUser) {
        // If no user is logged in, redirect to login page
        navigate("/auth");
        return;
      }
    };

    checkUser();
  }, [loadingUser, globalUser]);

  return (
    <section className="ticket">
      {ticketId === "new" ? <AddTicket /> : <EditTicket ticketId={ticketId} />}
    </section>
  );
};

export default TicketPage;
