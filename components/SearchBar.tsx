import React, { useState } from "react";
import { YouBikeStation } from "../types";

interface SearchBarProps {
  stations: YouBikeStation[];
  onSelect: (station: YouBikeStation) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ stations, onSelect }) => {
  const [query, setQuery] = useState("");
  const filtered = stations.filter(
    (s) => s.sna.includes(query) || s.ar.includes(query)
  );

  return (
    <div style={{ padding: 8, position: "relative" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋站點名稱或地址"
        style={{ width: "100%", padding: 8, borderRadius: "8px" }}
      />
      {query && (
        <ul
          style={{
            background: "#fff",
            border: "1px solid #eee",
            maxHeight: 200,
            overflow: "auto",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 44,
            left: 0,
            width: "100%",
            zIndex: 1000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          {filtered.map((station) => (
            <li
              key={station.sno}
              style={{ listStyle: "none", padding: 8, cursor: "pointer" }}
              onClick={() => {
                onSelect(station);
                setQuery("");
              }}
            >
              {station.sna} <span style={{ color: "#888" }}>{station.ar}</span>
            </li>
          ))}
          {filtered.length === 0 && <li style={{ padding: 8 }}>查無資料</li>}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
