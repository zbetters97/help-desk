import { createContext, useContext } from "react";

const TicketContext = createContext();

const useTicketContext = () => {
  const context = useContext(TicketContext);

  if (context === undefined) {
    throw new Error(
      "Error! useTicketContext must be used within TicketProvidor."
    );
  }

  return context;
};

export { useTicketContext };
export default TicketContext;
