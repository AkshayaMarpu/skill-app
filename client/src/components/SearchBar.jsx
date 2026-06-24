import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  };

  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search skills, users..."
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default SearchBar;