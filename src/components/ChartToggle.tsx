import React from "react";

interface ChartToggleProps {
  mode: "line" | "bar";
  onChange: (mode: "line" | "bar") => void;
}

const ChartToggle: React.FC<ChartToggleProps> = ({ mode, onChange }) => {
  return (
    <div style={{ textAlign: "right", margin: 8 }}>
      <button
        onClick={() => onChange("line")}
        style={{
          marginRight: 8,
          background: mode === "line" ? "#8884d8" : "#eee",
          color: mode === "line" ? "#fff" : "#333",
          padding: "4px 12px",
          border: "none",
          borderRadius: 4,
        }}
      >
        折線圖
      </button>
      <button
        onClick={() => onChange("bar")}
        style={{
          background: mode === "bar" ? "#82ca9d" : "#eee",
          color: mode === "bar" ? "#fff" : "#333",
          padding: "4px 12px",
          border: "none",
          borderRadius: 4,
        }}
      >
        長條圖
      </button>
    </div>
  );
};

export default ChartToggle;
