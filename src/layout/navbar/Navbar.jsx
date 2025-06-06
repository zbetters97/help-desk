import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "src/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import { useTicketContext } from "src/features/ticket/context/TicketContext";
import "./navbar.scss";

const Navbar = () => {
  const { globalUser } = useAuthContext();
  const {
    getAllTicketCounts,
    getTicketCountByAssignee,
    getTicketCountByStatus,
  } = useTicketContext();

  const [unassignedTickets, setUnassignedTickets] = useState(0);
  const [allTickets, setAllTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [myTickets, setMyTickets] = useState(0);

  useEffect(() => {
    // Update ticket counts on database changes
    const unsubscribe = onSnapshot(collection(db, "tickets"), async () => {
      if (!globalUser) return;

      const unassignedTickets = await getTicketCountByAssignee("none");
      const allTickets = await await getAllTicketCounts();
      const openTickets = await getTicketCountByStatus("Open");
      const myTickets = await getTicketCountByAssignee(globalUser.uid);

      setUnassignedTickets(unassignedTickets);
      setAllTickets(allTickets);
      setOpenTickets(openTickets);
      setMyTickets(myTickets);
    });

    return () => unsubscribe();
  }, [globalUser]);

  return (
    <header className="nav">
      <nav className="navbar">
        <ul className="navbar__list">
          <li>
            <NavLink
              to="/dashboard/0"
              className="navbar__item"
              aria-current="page"
            >
              {`Unassigned Tickets (${unassignedTickets})`}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/1"
              className="navbar__item"
              aria-current="page"
            >
              {`All Tickets (${allTickets})`}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/2"
              className="navbar__item"
              aria-current="page"
            >
              {`Open Tickets (${openTickets})`}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/3"
              className="navbar__item"
              aria-current="page"
            >
              {`My Tickets (${myTickets})`}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
