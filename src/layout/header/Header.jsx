import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "src/features/search/components/SearchBar";
import {
  faArrowRightFromBracket,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/features/auth/context/AuthContext";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { globalUser, logout } = useAuthContext();

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [globalUser]);

  const handleUserClick = () => {
    if (globalUser) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <section className="header">
      <SearchBar />

      <div className="header__options">
        <button
          type="button"
          onClick={() => navigate("/ticketing/new")}
          className="header__add"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {globalUser && (
          <div ref={dropdownRef} className="header__profile">
            <FontAwesomeIcon
              icon={faUser}
              onClick={handleUserClick}
              className="navbar__user-icon"
            />

            <div className="header__dropdown" aria-expanded={showDropdown}>
              <div className="header__info">
                <p className="header__initials">
                  {globalUser.firstname.charAt(0)}
                  {globalUser.lastname.charAt(0)}
                </p>
                <div>
                  <p className="header__displayname">
                    {globalUser.displayname}
                  </p>
                  <p className="header__email">{globalUser.email}</p>
                </div>
              </div>

              <div className="header__divider" />

              <button
                type="button"
                onClick={handleLogout}
                className="header__logout"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <p>Logout</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
