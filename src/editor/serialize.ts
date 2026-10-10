/*
 * Turns the editor document back into the post format (Markdown plus extras,
 * see src/lib/markup.ts). The live site parses this text, so what the preview
 * shows is exactly what the site will show.
 */
import {
  MarkdownSerializer,
  MarkdownSerializerState,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import type { Mark, Node as PMNode } from "@tiptap/pm/model";

type NodeSerializer = (state: MarkdownSerializerState, node: PMNode, parent: PMNode, index: number) => void;

// Internal state helpers that prosemirror-markdown does not expose in its types.
interface StateInternals {
  closed: PMNode | null;
  inAutolink?: boolean;
  flushClose: (size?: number) => void;
}
const internals = (state: MarkdownSerializerState) => state as unknown as StateInternals;

const base = defaultMarkdownSerializer;
const SUB_SUP = new Set(["subscript", "superscript"]);
const isWordChar = (ch: string) => /[A-Za-z0-9]/.test(ch);

// Two lists in a row would merge into one in Markdown. Switching the bullet
// character (or the number delimiter) keeps them apart.
const listMarker = new WeakMap<PMNode, string>();

/** Markdown's `__` underline cannot sit inside a word; fall back to <u> there. */
function underlineDelimiter(open: boolean) {
  return (_state: MarkdownSerializerState, mark: Mark, parent: PMNode, index: number) => {
    let start = open ? index : index - 1;
    let end = open ? index : index - 1;
    while (start > 0 && mark.isInSet(parent.child(start - 1).marks)) start--;
    while (end < parent.childCount && mark.isInSet(parent.child(end).marks)) end++;
    const before = start > 0 && parent.child(start - 1).isText ? (parent.child(start - 1).text || "").slice(-1) : "";
    const after = end < parent.childCount && parent.child(end).isText ? (parent.child(end).text || "").charAt(0) : "";
    const html = isWordChar(before) || isWordChar(after);
    if (html) return open ? "<u>" : "</u>";
    return "__";
  };
}

const nodes: Record<string, NodeSerializer> = {
  paragraph(state, node) {
    if (node.attrs.indent) state.write("\t");
    state.renderInline(node);
    state.closeBlock(node);
  },
  heading: base.nodes.heading,
  blockquote: base.nodes.blockquote,
  codeBlock(state, node) {
    const backticks = node.textContent.match(/`{3,}/gm);
    const fence = backticks ? backticks.sort().slice(-1)[0] + "`" : "```";
    state.write(fence + (node.attrs.language || "") + "\n");
    state.text(node.textContent, false);
    state.write("\n");
    state.write(fence);
    state.closeBlock(node);
  },
  horizontalRule(state, node) {
    state.write("---");
    state.closeBlock(node);
  },
  bulletList(state, node) {
    const previous = internals(state).closed;
    const bullet = previous && previous.type === node.type && listMarker.get(previous) === "-" ? "*" : "-";
    listMarker.set(node, bullet);
    state.renderList(node, "  ", () => `${bullet} `);
  },
  orderedList(state, node) {
    const previous = internals(state).closed;
    const delimiter = previous && previous.type === node.type && listMarker.get(previous) === "." ? ")" : ".";
    listMarker.set(node, delimiter);
    const start = Number(node.attrs.start) || 1;
    const maxWidth = String(start + node.childCount - 1).length;
    const space = state.repeat(" ", maxWidth + 2);
    state.renderList(node, space, (i) => {
      const n = String(start + i);
      return state.repeat(" ", maxWidth - n.length) + n + delimiter + " ";
    });
  },
  listItem: base.nodes.list_item,
  image(state, node) {
    const src = String(node.attrs.src || "").replace(/[()]/g, "\\$&");
    state.write(`![${state.esc(String(node.attrs.alt || ""))}](${src})`);
    state.closeBlock(node);
  },
  hardBreak: base.nodes.hard_break,
  text(state, node) {
    const text = node.text || "";
    if (node.marks.some((m) => SUB_SUP.has(m.type.name))) {
      // ~sub~ and ^sup^ cannot contain bare spaces
      state.text(state.esc(text).replace(/ /g, "\\ "), false);
    } else {
      state.text(text, !internals(state).inAutolink);
    }
  },
  center(state, node) {
    state.write("::: center\n");
    state.renderContent(node);
    internals(state).flushClose(1);
    state.write(":::");
    state.closeBlock(node);
  },
  mathBlock(state, node) {
    state.write(`$$\n${String(node.attrs.latex || "").trim()}\n$$`);
    state.closeBlock(node);
  },
  mathInline(state, node) {
    state.write(`$${String(node.attrs.latex || "").trim()}$`);
  },
  table(state, node) {
    const rows: string[][] = [];
    let headerFirst = false;
    node.forEach((row, _offset, rowIndex) => {
      const cells: string[] = [];
      row.forEach((cell) => {
        if (rowIndex === 0 && cell.type.name === "tableHeader") headerFirst = true;
        cells.push(serializeCell(cell));
      });
      rows.push(cells);
    });
    const cols = Math.max(1, ...rows.map((r) => r.length));
    const line = (cells: string[]) =>
      "| " + Array.from({ length: cols }, (_, i) => cells[i] || "").join(" | ") + " |";
    const all = headerFirst ? rows : [Array<string>(cols).fill(""), ...rows];
    const [head, ...body] = all;
    state.write([line(head), "|" + Array(cols).fill(" --- ").join("|") + "|", ...body.map(line)].join("\n"));
    state.closeBlock(node);
  },
  // Rows and cells are written by `table` above.
  tableRow() {},
  tableCell() {},
  tableHeader() {},
};

const marks = {
  bold: { open: "**", close: "**", mixable: true, expelEnclosingWhitespace: true },
  italic: { open: "*", close: "*", mixable: true, expelEnclosingWhitespace: true },
  underline: {
    open: underlineDelimiter(true),
    close: underlineDelimiter(false),
    mixable: true,
    expelEnclosingWhitespace: true,
  },
  subscript: { open: "~", close: "~", mixable: true, expelEnclosingWhitespace: true },
  superscript: { open: "^", close: "^", mixable: true, expelEnclosingWhitespace: true },
  code: base.marks.code,
  link: base.marks.link,
};

const serializer = new MarkdownSerializer(nodes, marks, {
  // `$` starts an equation, `^` a superscript, `<` raw HTML
  escapeExtraCharacters: /[$^<]/g,
  hardBreakNodeName: "hardBreak",
  strict: false,
});

function serializeCell(cell: PMNode): string {
  return serializer
    .serialize(cell, { tightLists: true })
    .replace(/^\t/gm, "")
    .replace(/\\\n/g, "<br>")
    .replace(/\n+/g, "<br>")
    .replace(/\|/g, "\\|")
    .trim();
}

/** The whole document as post-format text. */
export function serializeDoc(doc: PMNode): string {
  const out = serializer.serialize(doc, { tightLists: true });
  return out.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
