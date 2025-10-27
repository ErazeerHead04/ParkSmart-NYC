import React from "react";

const SearchBar = ({ city, onCityChange, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        placeholder="Enter a city..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
