"use client";

import { blockTypes } from "./Blocktype";

interface DropDownProps {
  query: string;
  selectedIndex: number;
  onSelect: (type: string) => void;
  position: { x: number; y: number };
}

export default function DropDown({
  query,
  selectedIndex,
  onSelect,
  position,
}: DropDownProps) {
  // Show all blocks if query is empty
  const filterBlocks = query
    ? blockTypes.filter((b) =>
      b.toLowerCase().startsWith(query.toLowerCase())
    )
    : blockTypes;

  if (!filterBlocks.length) return null;

  return (
    <ul
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        backgroundColor: "#1f1f1f", // Notion-like dark gray
        border: "1px solid #2E2E2E",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        padding: "6px 0",
        width: "220px",
        listStyle: "none",
        zIndex: 9999,
      }}
    >
      {filterBlocks.map((b, i) => (
        <li
          key={b}
          style={{
            padding: "10px 14px",
            cursor: "pointer",
            color: "white",
            backgroundColor: i === selectedIndex ? "#3a3a3a" : "transparent",
            transition: "background-color 0.2s",
            borderRadius: "8px",
            margin: "2px 6px",
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(b);
          }}
        >
          {b}
        </li>
      ))}
    </ul>
  );
}
