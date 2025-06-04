import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
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
              Unassigned Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/1"
              className="navbar__item"
              aria-current="page"
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/2"
              className="navbar__item"
              aria-current="page"
            >
              Open Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/3"
              className="navbar__item"
              aria-current="page"
            >
              My Tickets
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
