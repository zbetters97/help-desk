import "./navbar.scss";

const Navbar = () => {
  return (
    <header className="nav">
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">Unnassigned Tickets</li>
          <li className="navbar__item">All Tickets</li>
          <li className="navbar__item">Open Tickets</li>
          <li className="navbar__item">My Tickets</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
