import { db } from "src/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const useTicket = () => {
  const addTicket = async (
    requesterId,
    subject,
    description,
    status = "new",
    priority = "low",
    severity = "low",
    assigneeId = ""
  ) => {
    try {
      const ticket = {
        requesterId,
        subject,
        description,
        status,
        priority,
        severity,
        assigneeId,
        createdAt: new Date(),
      };

      const ticketRef = collection(db, "tickets");
      const ticketDoc = await addDoc(ticketRef, ticket);

      if (!ticketDoc.id) return false;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getAllTickets = async () => {
    try {
      const ticketsRef = collection(db, "tickets");

      // Get the 20 most liked reviews from the last X days
      const q = query(ticketsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const tickets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      return tickets;
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketById = async (ticketId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      const ticketDoc = await getDoc(ticketRef);

      if (!ticketDoc.exists()) return null;

      return {
        id: ticketDoc.id,
        ...ticketDoc.data(),
      };
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTicketsByAssignee = async (assigneeId) => {
    try {
      if (!userId) return [];

      const ticketRef = collection(db, "tickets");
      const q = query(
        ticketRef,
        where("assigneeId", "==", assigneeId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const tickets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      return tickets;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const getTicketsByRequester = async (requesterId) => {
    try {
      if (!userId) return [];

      const ticketRef = collection(db, "tickets");
      const q = query(
        ticketRef,
        where("requesterId", "==", requesterId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const tickets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      return tickets;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  return {
    addTicket,

    getAllTickets,
    getTicketById,
    getTicketsByAssignee,
    getTicketsByRequester,
  };
};

export default useTicket;
