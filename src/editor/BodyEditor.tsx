import React, { useEffect, useRef } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import { renderHtml } from "../lib/markup";
import { serializeDoc } from "./serialize";
import { CellEnter, CenterBlock, IndentParagraph, MathBlock, MathInline } from "./extensions";

interface BodyEditorProps {
  /** Markdown body to start from; the editor is re-created when its key changes */
  initialBody: string;
  onChange: (markdown: string) => void;
  uploadImage: (file: File) => Promise<string>;
  onStatus: (message: string, isError?: boolean) => void;
}

const promptLink = (editor: Editor) => {
  const current = editor.getAttributes("link").href as string | undefined;
  const url = window.prompt("Link address (leave empty to remove the link)", current || "https://");
  if (url === null) return;
  const href = url.trim();
  if (!href || href === "https://") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  } else {
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }
};

const LinkShortcut = Extension.create({
  name: "linkShortcut",
  addKeyboardShortcuts() {
    return {
      "Mod-k": () => {
        promptLink(this.editor);
        return true;
      },
    };
  },
});

const extensions = [
  StarterKit.configure({
    paragraph: false,
    strike: false,
    heading: { levels: [2, 3, 4], HTMLAttributes: { class: "sectionHeading" } },
  }),
  IndentParagraph,
  Underline,
  Subscript,
  Superscript,
  Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
  Image.configure({ inline: false }),
  Table.configure({ resizable: false, HTMLAttributes: { class: "postTable" } }),
  TableRow,
  TableHeader.extend({ content: "paragraph" }),
  TableCell.extend({ content: "paragraph" }),
  CenterBlock,
  MathBlock,
  MathInline,
  CellEnter,
  LinkShortcut,
  Placeholder.configure({
    placeholder: "Start writing. Use the toolbar, or Ctrl+B / Ctrl+I / Ctrl+U / Ctrl+K. Tab indents a paragraph.",
  }),
];

interface ButtonProps {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ButtonProps> = ({ label, title, active, disabled, onClick }) => (
  <button
    type="button"
    className={`toolbarButton${active ? " is-active" : ""}`}
    title={title}
    disabled={disabled}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
  >
    {label}
  </button>
);

const Divider = () => <span className="toolbarDivider" />;

const BodyEditor: React.FC<BodyEditorProps> = ({ initialBody, onChange, uploadImage, onStatus }) => {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImageFiles = (editor: Editor, files: File[]) => {
    files.forEach(async (file) => {
      try {
        onStatus(`Uploading ${file.name}…`);
        const src = await uploadImage(file);
        editor.chain().focus().setImage({ src, alt: file.name.replace(/\.[^.]+$/, "") }).run();
        onStatus(`Added ${src}`);
      } catch (err) {
        onStatus(`Image upload failed: ${(err as Error).message}`, true);
      }
    });
  };

  const editor = useEditor({
    extensions,
    content: renderHtml(initialBody),
    onUpdate: ({ editor: current }) => onChangeRef.current(serializeDoc(current.state.doc)),
    editorProps: {
      attributes: { class: "postDetailedContent editorProse", spellcheck: "true" },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files || []).filter((f) => f.type.startsWith("image/"));
        if (!files.length || !editor) return false;
        insertImageFiles(editor, files);
        return true;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || []).filter((f) => f.type.startsWith("image/"));
        if (!files.length || !editor) return false;
        insertImageFiles(editor, files);
        return true;
      },
    },
  });

  // Handy while developing: inspect the document from the browser console.
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    w.__editor = editor;
    w.__serializeDoc = serializeDoc;
    w.__renderHtml = renderHtml;
  }, [editor]);

  if (!editor) return <div className="editorLoading">Loading editor…</div>;

  const blockType = editor.isActive("heading", { level: 2 })
    ? "h2"
    : editor.isActive("heading", { level: 3 })
    ? "h3"
    : editor.isActive("heading", { level: 4 })
    ? "h4"
    : "p";

  const setBlockType = (value: string) => {
    const chain = editor.chain().focus();
    if (value === "p") chain.setParagraph().run();
    else chain.setHeading({ level: Number(value.slice(1)) as 2 | 3 | 4 }).run();
  };

  const inTable = editor.isActive("table");

  return (
    <div className="editorBody">
      <div className="editorToolbar">
        <ToolbarButton label="↶" title="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} />
        <ToolbarButton label="↷" title="Redo (Ctrl+Y)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} />
        <Divider />
        <select
          className="toolbarSelect"
          value={blockType}
          title="Paragraph or heading level"
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => setBlockType(e.target.value)}
        >
          <option value="p">Paragraph</option>
          <option value="h2">Chapter (1)</option>
          <option value="h3">Section (1.1)</option>
          <option value="h4">Subsection (1.1.1)</option>
        </select>
        <Divider />
        <ToolbarButton label="B" title="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
        <ToolbarButton label="I" title="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
        <ToolbarButton label="U" title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
        <ToolbarButton label="x₂" title="Subscript" active={editor.isActive("subscript")} onClick={() => editor.chain().focus().toggleSubscript().run()} />
        <ToolbarButton label="x²" title="Superscript" active={editor.isActive("superscript")} onClick={() => editor.chain().focus().toggleSuperscript().run()} />
        <ToolbarButton label="</>" title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} />
        <ToolbarButton label="Link" title="Add or edit link (Ctrl+K)" active={editor.isActive("link")} onClick={() => promptLink(editor)} />
        <Divider />
        <ToolbarButton label="• List" title="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
        <ToolbarButton label="1. List" title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
        <ToolbarButton label="Indent" title="First-line indent for this paragraph (Tab / Shift+Tab)" active={editor.isActive("paragraph", { indent: true })} onClick={() => editor.chain().focus().toggleIndent().run()} />
        <ToolbarButton label="Center" title="Center this block" active={editor.isActive("center")} onClick={() => editor.chain().focus().toggleCenter().run()} />
        <ToolbarButton label="Quote" title="Block quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
        <ToolbarButton label="Code block" title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
        <ToolbarButton label="— Rule" title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
        <Divider />
        <ToolbarButton label="Image" title="Upload an image" onClick={() => fileInputRef.current?.click()} />
        <ToolbarButton
          label="Image URL"
          title="Image from an address"
          onClick={() => {
            const src = window.prompt("Image address (for example /images/posts/photo.png or https://…)");
            if (src && src.trim()) editor.chain().focus().setImage({ src: src.trim() }).run();
          }}
        />
        <ToolbarButton label="∑ Equation" title="Display equation (LaTeX)" onClick={() => editor.chain().focus().insertMathBlock("").run()} />
        <ToolbarButton label="∑ Inline" title="Inline equation (LaTeX)" onClick={() => editor.chain().focus().insertMathInline("x").run()} />
        <Divider />
        {inTable ? (
          <>
            <ToolbarButton label="+ Row" title="Add a row below" onClick={() => editor.chain().focus().addRowAfter().run()} />
            <ToolbarButton label="− Row" title="Delete this row" onClick={() => editor.chain().focus().deleteRow().run()} />
            <ToolbarButton label="+ Col" title="Add a column to the right" onClick={() => editor.chain().focus().addColumnAfter().run()} />
            <ToolbarButton label="− Col" title="Delete this column" onClick={() => editor.chain().focus().deleteColumn().run()} />
            <ToolbarButton label="Header row" title="Toggle the header row" onClick={() => editor.chain().focus().toggleHeaderRow().run()} />
            <ToolbarButton label="✕ Table" title="Delete the table" onClick={() => editor.chain().focus().deleteTable().run()} />
          </>
        ) : (
          <ToolbarButton label="Table" title="Insert a 3×3 table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            e.target.value = "";
            if (files.length) insertImageFiles(editor, files);
          }}
        />
      </div>
      <div className="postPage editorPage">
        <article className="post">
          <EditorContent editor={editor} />
        </article>
      </div>
    </div>
  );
};

export default BodyEditor;
