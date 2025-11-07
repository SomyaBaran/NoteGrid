"use client";

import { useState } from "react";
import EditableBlock from "./EditableBlock";
import DropDown from "./Dropdown";
import { blockTypes } from "./Blocktype";

export default function Editor() {
  interface Block {
    type: string;
    content: string;
  }

  const [blocks, setBlocks] = useState<Block[]>([
    { type: "paragraph", content: "" },
  ]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

  const handleAutocomplete = (blockType: string) => {
    const editor = document.querySelector('[contenteditable]') as HTMLDivElement;
    if (!editor) return;

    setBlocks((prev) => {
      const newBlocks = [...prev];
      const lastBlock = newBlocks[newBlocks.length - 1];

      // Clears the input box when the specic text command is selected 
      lastBlock.type = blockType;
      lastBlock.content = "";
      return newBlocks;
    });


    editor.innerText = "";
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);

    setShowDropDown(false);
    setQuery("");
  };

  const handleSlashCommand = (
    query: string | null,
    position: { x: number; y: number }
  ) => {
    if (query === null) {
      setShowDropDown(false);
      setQuery("");
      return;
    }

    setShowDropDown(true);
    setQuery(query);
    setDropdownPos(position);
    setSelectedIndex(0);
  };

  const handleKeyDownCustom = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!showDropDown) return;

    const filterBlocks = query
      ? blockTypes.filter((b) =>
        b.toLowerCase().startsWith(query.toLowerCase())
      )
      : blockTypes;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev + 1 < filterBlocks.length ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const filtered = query
        ? blockTypes.filter((b) =>
          b.toLowerCase().startsWith(query.toLowerCase())
        )
        : blockTypes;

      if (filtered[selectedIndex]) {
        handleAutocomplete(filtered[selectedIndex]);
      }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();

      setBlocks((prev) => [
        ...prev,
        {
          type: "paragraph",
          content: ""
        }
      ]);

      setShowDropDown(false);
      setQuery("");
      }
    }


  
  return (
    <div style={{ position: "relative" }}>
      {blocks.map((block, index) => (
        <EditableBlock
          key={index}
          type={block.type}
          value={block.content}
          onChange={(content) => {
            setBlocks((prev) => {
              const newBlocks = [...prev];
              newBlocks[index].content = content;
              return newBlocks;
            });
          }}
          onSlashCommand={handleSlashCommand}
          onKeyDownCustom={handleKeyDownCustom}
          onAutocomplete={handleAutocomplete}
        />
      ))}

      {showDropDown && (
        <DropDown
          query={query}
          selectedIndex={selectedIndex}
          onSelect={handleAutocomplete}
          position={dropdownPos}
        />
      )}
    </div>
  );
}
