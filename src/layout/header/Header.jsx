import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "src/features/search/components/SearchBar";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import "./header.scss";

const Header = () => {
  return (
    <section className="header">
      <SearchBar />
      <div className="header__options">
        <FontAwesomeIcon icon={faPlus} />
        <FontAwesomeIcon icon={faUser} />
      </div>
    </section>
  );
};

export default Header;
