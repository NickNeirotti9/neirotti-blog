import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import katex from "katex";

const render = (latex: string, displayMode: boolean) =>
  katex.renderToString(latex.trim() || "\\text{equation}", {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });

/** Display equation: rendered with KaTeX, LaTeX source editable when selected. */
export const MathBlockView: React.FC<NodeViewProps> = ({ node, updateAttributes, selected }) => {
  const latex = String(node.attrs.latex || "");
  const [editing, setEditing] = useState(latex === "");
  const html = useMemo(() => render(latex, true), [latex]);
  const open = selected || editing;

  return (
    <NodeViewWrapper className={`mathNode mathNode-block${open ? " is-open" : ""}`} data-drag-handle>
      <div
        className="equation"
        onClick={() => setEditing(true)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {open && (
        <textarea
          className="mathNodeInput"
          value={latex}
          rows={2}
          autoFocus={editing}
          placeholder="LaTeX, for example: E = mc^2"
          onChange={(e) => updateAttributes({ latex: e.target.value })}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") (e.target as HTMLTextAreaElement).blur();
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

/** Inline equation with a small popover editor. */
export const MathInlineView: React.FC<NodeViewProps> = ({ node, updateAttributes, selected }) => {
  const latex = String(node.attrs.latex || "");
  const [editing, setEditing] = useState(latex === "");
  const html = useMemo(() => render(latex, false), [latex]);
  const inputRef = useRef<HTMLInputElement>(null);
  const open = selected || editing;

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  return (
    <NodeViewWrapper as="span" className={`mathNode mathNode-inline${open ? " is-open" : ""}`}>
      <span onClick={() => setEditing(true)} dangerouslySetInnerHTML={{ __html: html }} />
      {open && (
        <span className="mathNodePopover" contentEditable={false}>
          <input
            ref={inputRef}
            className="mathNodeInput"
            value={latex}
            placeholder="LaTeX, for example: x^2"
            onChange={(e) => updateAttributes({ latex: e.target.value })}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        </span>
      )}
    </NodeViewWrapper>
  );
};
