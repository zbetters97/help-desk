import { db } from "src/config/firebase";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const useTicket = () => {
  const { getUserById } = useAuthContext();

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
      const chatDoc = collection(db, "chats");
      const newChatRef = doc(chatDoc);

      const id = Date.now().toString();

      await setDoc(newChatRef, {
        messages: [
          {
            id,
            senderId: requesterId,
            message: description,
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
      });

      const chatId = newChatRef.id;

      const ticket = {
        requesterId,
        subject,
        chatId,
        status,
        priority,
        severity,
        assigneeId,
        createdAt: new Date(),
        lastUpdated: new Date(),
      };

      const ticketRef = collection(db, "tickets");

      const ticketIdRef = doc(ticketRef, "id-counter");
      const idCounter = await getDoc(ticketIdRef);
      const ticketId = idCounter.data().counter + 1;

      const ticketDocRef = doc(ticketRef, ticketId.toString());
      await setDoc(ticketDocRef, ticket);

      await updateDoc(ticketIdRef, { counter: ticketId });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateTicket = async (
    ticketId,
    requesterId,
    subject,
    status = "new",
    priority = "low",
    severity = "low",
    assigneeId = ""
  ) => {
    try {
      const ticket = {
        requesterId,
        subject,
        status,
        priority,
        severity,
        assigneeId,
        lastUpdated: new Date(),
      };

      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, ticket);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const addMessage = async (chatId, senderId, message) => {
    try {
      if (!message) return false;

      const id = Date.now().toString();
      const chatRef = doc(db, "chats", chatId);

      await updateDoc(chatRef, {
        messages: arrayUnion({
          id,
          senderId,
          message,
          createdAt: new Date(),
        }),
      });

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
          const requester = await getUserById(doc.data().requesterId);
          const assignee = await getUserById(doc.data().assigneeId || "");

          return {
            id: doc.id,
            ...doc.data(),
            requester: requester?.displayname || "",
            assignee: assignee?.displayname || "",
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
      if (!assigneeId) return [];

      const assignee = await getUserById(assigneeId);

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
          const requester = await getUserById(doc.data().requesterId);
          return {
            id: doc.id,
            ...doc.data(),
            requester: requester?.displayname || "",
            assignee: assignee?.displayname || "",
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

  const getTicketsByStatus = async (status) => {
    try {
      if (!status) return [];

      const ticketRef = collection(db, "tickets");
      const q = query(
        ticketRef,
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return [];

      const tickets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const requester = await getUserById(doc.data().requesterId);
          const assignee = await getUserById(doc.data().assigneeId || "");

          return {
            id: doc.id,
            ...doc.data(),
            requester: requester?.displayname || "",
            assignee: assignee?.displayname || "",
          };
        })
      );

      return tickets;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const getTicketChats = async (chatId) => {
    try {
      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) return [];

      const messages = await Promise.all(
        chatDoc.data().messages.map(async (message) => {
          const sender = await getUserById(message.senderId);

          return {
            id: message.id,
            message: message.message,
            firstname: sender?.firstname || "",
            lastname: sender?.lastname || "",
            displayname: sender?.displayname || "",
            createdAt: message.createdAt,
          };
        })
      );

      return messages;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  return {
    addTicket,
    updateTicket,
    addMessage,

    getAllTickets,
    getTicketById,
    getTicketsByAssignee,
    getTicketsByRequester,
    getTicketsByStatus,

    getTicketChats,
  };
};

export default useTicket;
