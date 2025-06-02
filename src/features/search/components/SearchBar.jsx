import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./searchbar.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const setFocus = () => {
    document.getElementById("search").focus();
  };

  return (
    <div className="searchbar" onClick={setFocus}>
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        className="searchbar__input"
        aria-label="Search for a ticket"
      />
    </div>
  );
};

export default SearchBar;
