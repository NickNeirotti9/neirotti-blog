/*
 * The post body format: Markdown plus a few extras.
 *
 *   ## Chapter / ### Section / #### Subsection   headings become numbered TOC entries
 *   **bold**  *italic*  __underline__  `code`      inline styles
 *   ~sub~  ^sup^                                  subscript / superscript
 *   [text](https://...)  ![alt](/images/posts/x.png)
 *   - item / 1. item                             lists
 *   | a | b |  tables (GFM, with a |---|---| row under the header)
 *   ---                                          horizontal rule
 *   > quote                                      block quote
 *   ::: center ... :::                           centered block
 *   $$ ... $$  and  $...$                        equations (KaTeX)
 *   A paragraph that starts with a tab (or four spaces) gets a first-line indent.
 *   Raw HTML (e.g. <br>) is allowed as an escape hatch but never required.
 *
 * The same parser is used by the live site and by the /editor preview, so the
 * two can never drift apart. Equations are emitted as placeholders carrying
 * their LaTeX source; ArticleBody typesets them with KaTeX after render, and
 * the editor turns them into editable nodes.
 */
import MarkdownIt from "markdown-it";
import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import container from "markdown-it-container";
import { tex } from "@mdit/plugin-tex";

export interface Section {
  /** 1 = chapter (##), 2 = section (###), 3 = subsection (####) */
  level: 1 | 2 | 3;
  /** "1", "1.2", "1.2.3" */
  number: string;
  title: string;
  /** anchor id used by the table of contents */
  id: string;
  /** rendered HTML of everything under the heading, up to the next heading */
  html: string;
}

export interface ParsedBody {
  /** HTML of any text that comes before the first heading */
  preamble: string;
  sections: Section[];
}

type Token = MarkdownIt.Token;
type Md = MarkdownIt.MarkdownIt;
type RendererRule = MarkdownIt.RendererRule;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function renderMath(content: string, displayMode: boolean): string {
  const attr = escapeHtml(content.trim());
  return displayMode
    ? `<div class="equation" data-math="block" data-latex="${attr}"></div>\n`
    : `<span class="mathInline" data-math="inline" data-latex="${attr}"></span>`;
}

// Stands in for a leading tab while Markdown is parsed (an invisible character
// that never appears in normal text).
const INDENT_MARK = "⁣";

const FENCE_RE = /^\s{0,3}(```|~~~)/;
// Lines after which a new paragraph starts even without a blank line in between.
const BLOCK_END_RE = /^(#{1,6}\s|:::|---\s*$|\*\*\*\s*$)/;

/**
 * A paragraph that starts with a tab (or four spaces) is indented. The tab is
 * swapped for a marker before parsing so Markdown does not read the
 * indentation as code or as a continuation of a list item above it.
 */
function markIndents(src: string): string {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  let inFence = false;
  let previous = "";
  let first = true;
  return lines
    .map((line) => {
      let out = line;
      if (FENCE_RE.test(line)) {
        inFence = !inFence;
      } else if (
        !inFence &&
        (first || previous.trim() === "" || BLOCK_END_RE.test(previous)) &&
        /^(\t| {4})\s*\S/.test(line)
      ) {
        out = INDENT_MARK + line.replace(/^(\t| {4})\s*/, "");
      }
      previous = line;
      first = false;
      return out;
    })
    .join("\n");
}

function createMarkdownIt(): Md {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: false,
    typographer: false,
  });

  // A leading tab means "indent this paragraph", not "this is a code block".
  // Fenced code blocks (```) still work.
  md.disable("code");

  md.use(sub).use(sup);
  md.use(container, "center");
  md.use(tex, { render: renderMath });

  // Headings: # and ## are chapters, ### sections, #### (and deeper) subsections.
  md.core.ruler.push("blog_headings", (state) => {
    for (const t of state.tokens) {
      if (t.type === "heading_open" || t.type === "heading_close") {
        const level = Number(t.tag.slice(1));
        t.tag = `h${Math.min(4, Math.max(2, level))}`;
      }
    }
    return true;
  });

  // __text__ is underline (standard Markdown would make it bold).
  md.core.ruler.push("blog_underline", (state) => {
    for (const t of state.tokens) {
      if (t.type !== "inline" || !t.children) continue;
      for (const c of t.children) {
        if ((c.type === "strong_open" || c.type === "strong_close") && c.markup === "__") {
          c.tag = "u";
        }
      }
    }
    return true;
  });

  // A paragraph that started with a tab (see markIndents) gets class="indent"
  // (a first-line indent, like a book). Runs before inline parsing so the
  // marker never reaches the output.
  md.core.ruler.before("inline", "blog_indent", (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const t = state.tokens[i];
      if (t.type !== "inline") continue;
      const content = String(t.content);
      if (!content.includes(INDENT_MARK)) continue;
      const open = state.tokens[i - 1];
      if (content.startsWith(INDENT_MARK) && open && open.type === "paragraph_open") {
        open.attrJoin("class", "indent");
      }
      t.content = content.split(INDENT_MARK).join("");
    }
    return true;
  });

  // Links to other sites open in a new tab.
  const renderToken: RendererRule = (tokens, idx, options, _env, self) =>
    self.renderToken(tokens, idx, options);
  const defaultLinkOpen = md.renderer.rules.link_open || renderToken;
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = String(tokens[idx].attrGet("href") || "");
    if (/^https?:\/\//i.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return defaultLinkOpen(tokens, idx, options, env, self);
  };

  // Tables get the site's table styling and a wrapper that scrolls on phones.
  md.renderer.rules.table_open = () => '<div class="tableWrapper"><table class="postTable">';
  md.renderer.rules.table_close = () => "</table></div>";

  return md;
}

let instance: Md | null = null;
const getMd = (): Md => {
  if (!instance) instance = createMarkdownIt();
  return instance;
};

function plainTextOfInline(token: Token): string {
  if (!token.children) return String(token.content);
  return token.children
    .map((c) => {
      if (c.type === "text" || c.type === "code_inline" || c.type === "math_inline") return String(c.content);
      if (c.type === "softbreak" || c.type === "hardbreak") return " ";
      return "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

/** Splits a post body into numbered sections and renders each one to HTML. */
export function parseBody(src: string): ParsedBody {
  const md = getMd();
  const env = {};
  const tokens = md.parse(markIndents(src || ""), env);

  const sections: Section[] = [];
  const sectionTokens: Token[][] = [];
  const preambleTokens: Token[] = [];
  const counters = [0, 0, 0];
  const usedIds = new Set<string>(["quotes-i-like", "key-takeaways", "resources-references"]);

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === "heading_open" && t.level === 0) {
      const level = (Number(t.tag.slice(1)) - 1) as 1 | 2 | 3;
      const inline = tokens[i + 1];
      const title = inline && inline.type === "inline" ? plainTextOfInline(inline) : "";
      i += 2; // skip the inline token and heading_close

      // e.g. a ### with no ## before it still gets a sensible "1.1"
      for (let k = 0; k < level - 1; k++) if (counters[k] === 0) counters[k] = 1;
      counters[level - 1]++;
      for (let k = level; k < 3; k++) counters[k] = 0;
      const number = counters.slice(0, level).join(".");
      const id = uniqueId(slugify(title) || `section-${sections.length + 1}`, usedIds);

      sections.push({ level, number, title, id, html: "" });
      sectionTokens.push([]);
      continue;
    }
    if (sections.length) sectionTokens[sectionTokens.length - 1].push(t);
    else preambleTokens.push(t);
  }

  const render = (ts: Token[]) => md.renderer.render(ts, md.options, env);
  sections.forEach((s, idx) => {
    s.html = render(sectionTokens[idx]);
  });

  return { preamble: render(preambleTokens), sections };
}

/** Renders the whole body as one HTML string (headings included). */
export function renderHtml(src: string): string {
  return getMd().render(markIndents(src || ""));
}

/** Plain text for search: markup stripped, equations left out. */
export function plainText(src: string): string {
  return renderHtml(src)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
