import { addDoc, collection } from "firebase/firestore";
import { db } from "src/config/firebase";

const useTicket = () => {
  const addTicket = async (
    requester,
    subject,
    description,
    status = "new",
    priority = "low",
    severity = "low",
    assignee = ""
  ) => {
    try {
      const ticket = {
        requester,
        subject,
        description,
        status,
        priority,
        severity,
        assignee,
      };

      const ticketRef = collection(db, "tickets");
      const ticketDoc = await addDoc(ticketRef, ticket);
      console.log(ticketDoc.id);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    addTicket,
  };
};

export default useTicket;
