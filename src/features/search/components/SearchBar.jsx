import "./searchbar.scss";

const SearchBar = () => {
  return (
    <div className="searchbar">
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
