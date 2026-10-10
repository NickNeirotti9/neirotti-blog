/*
 * TipTap extensions for the parts of the post format that plain Markdown
 * does not have: indented paragraphs, centered blocks and equations.
 */
import { Editor, Extension, Node, mergeAttributes } from "@tiptap/core";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MathBlockView, MathInlineView } from "./MathView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indentParagraph: {
      setIndent: (indent: boolean) => ReturnType;
      toggleIndent: () => ReturnType;
    };
    center: {
      toggleCenter: () => ReturnType;
    };
    mathBlock: {
      insertMathBlock: (latex?: string) => ReturnType;
    };
    mathInline: {
      insertMathInline: (latex?: string) => ReturnType;
    };
  }
}

const inListOrTable = (editor: Editor) =>
  editor.isActive("listItem") || editor.isActive("tableCell") || editor.isActive("tableHeader");

/** Paragraph with an `indent` attribute (<p class="indent">). Tab toggles it. */
export const IndentParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...(this.parent?.() || {}),
      indent: {
        default: false,
        parseHTML: (element: HTMLElement) => element.classList.contains("indent"),
        renderHTML: (attributes: Record<string, unknown>) =>
          attributes.indent ? { class: "indent" } : {},
      },
    };
  },
  addCommands() {
    return {
      ...(this.parent?.() || {}),
      setIndent:
        (indent: boolean) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { indent }),
      toggleIndent:
        () =>
        ({ commands, editor }) =>
          commands.updateAttributes(this.name, { indent: !editor.getAttributes(this.name).indent }),
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (!this.editor.isActive(this.name) || inListOrTable(this.editor)) return false;
        return this.editor.commands.setIndent(true);
      },
      "Shift-Tab": () => {
        if (!this.editor.isActive(this.name) || inListOrTable(this.editor)) return false;
        return this.editor.commands.setIndent(false);
      },
    };
  },
});

/** A centered block: `::: center` ... `:::` in Markdown. */
export const CenterBlock = Node.create({
  name: "center",
  group: "block",
  content: "block+",
  defining: true,
  parseHTML() {
    return [{ tag: "div.center" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { class: "center" }), 0];
  },
  addCommands() {
    return {
      toggleCenter:
        () =>
        ({ commands }) =>
          commands.toggleWrap(this.name),
    };
  },
});

const latexAttribute = {
  latex: {
    default: "",
    parseHTML: (element: HTMLElement) => element.getAttribute("data-latex") || "",
    renderHTML: (attributes: Record<string, unknown>) => ({ "data-latex": String(attributes.latex || "") }),
  },
};

/** A display equation: `$$ ... $$` in Markdown. */
export const MathBlock = Node.create({
  name: "mathBlock",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return latexAttribute;
  },
  parseHTML() {
    return [{ tag: 'div[data-math="block"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-math": "block" })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(MathBlockView);
  },
  addCommands() {
    return {
      insertMathBlock:
        (latex = "") =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { latex } }),
    };
  },
});

/** An inline equation: `$ ... $` in Markdown. */
export const MathInline = Node.create({
  name: "mathInline",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,
  addAttributes() {
    return latexAttribute;
  },
  parseHTML() {
    return [{ tag: 'span[data-math="inline"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-math": "inline" })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(MathInlineView);
  },
  addCommands() {
    return {
      insertMathInline:
        (latex = "") =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { latex } }),
    };
  },
});

/** Table cells hold a single paragraph, so Enter inserts a line break instead. */
export const CellEnter = Extension.create({
  name: "cellEnter",
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Enter: () =>
        this.editor.isActive("tableCell") || this.editor.isActive("tableHeader")
          ? this.editor.commands.setHardBreak()
          : false,
    };
  },
});
