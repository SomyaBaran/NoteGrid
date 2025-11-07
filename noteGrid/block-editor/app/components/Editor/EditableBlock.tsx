"use client";

import { useRef, useEffect } from "react";

interface EditableBlockProps {
  type: string;
  value: string;
  onChange: (content: string) => void;
  onSlashCommand: (
    query: string | null,
    position: { x: number; y: number }
  ) => void;
  onKeyDownCustom: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onAutocomplete: (blockType: string) => void;
}

export default function EditableBlock({
  type,
  value,
  onChange,
  onSlashCommand,
  onKeyDownCustom,
  onAutocomplete
}: EditableBlockProps) {
  const EditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (EditorRef.current && !EditorRef.current.innerText) {
      EditorRef.current.innerText = value;
    }
  }, []);

  const handleInput = () => {
    const content = EditorRef.current?.innerText || "";
    onChange(content);


    if (content.trim() === "") {
      onSlashCommand(null, { x: 0, y: 0 });
      onChange("");
      onAutocomplete("paragraph");
      return;
    }
    if (content.startsWith("/")) {
      const selection = window.getSelection();
      let x = 0,
        y = 0;

      if (selection && selection.rangeCount > 0) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        x = rect.left;
        y = rect.bottom;
      } else if (EditorRef.current) {
        const rect = EditorRef.current.getBoundingClientRect();
        x = rect.left;
        y = rect.top + 20;
      }

      onSlashCommand(content.slice(1), { x, y });
    } else {
      onSlashCommand(null, { x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={EditorRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={onKeyDownCustom}
      className="text-white bg-transparent outline-none"
      style={{
        padding: "10px",
        minHeight: "50px",
        width: "400px",
        position: "relative",
        color: "white",

        fontSize:
          type === "h1" ? "3rem" :
            type === "h2" ? "2rem" :
              type === "h3" ? "1.5rem" :
                "1rem",

        fontWeight: type.startsWith("h") ? "bold" : "normal",
      }}
    />
  );
}


