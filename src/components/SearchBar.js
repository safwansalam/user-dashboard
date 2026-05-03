import React, { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(text);
    }, 500);

    return () => clearTimeout(delay);
  }, [text, onSearch]); // ✅ FIXED HERE

  return (
    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Search users..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

export default SearchBar;