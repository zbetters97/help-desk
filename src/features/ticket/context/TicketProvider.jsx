import useTicket from "../hooks/useTicket";
import TicketContext from "./TicketContext";

const TicketProvider = ({ children }) => {
  const useTicketMethods = useTicket();

  const ticketMethods = {
    ...useTicketMethods,
  };

  return (
    <TicketContext.Provider value={ticketMethods}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
