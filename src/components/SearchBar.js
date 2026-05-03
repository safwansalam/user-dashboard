import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(text);
    }, 500);
    return () => clearTimeout(delay);
  }, [text]);

  return (
    <div className="search-wrap">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;