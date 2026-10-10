declare module "markdown-it-sub" {
  import MarkdownIt from "markdown-it";
  const plugin: (md: MarkdownIt.MarkdownIt) => void;
  export default plugin;
}

declare module "markdown-it-sup" {
  import MarkdownIt from "markdown-it";
  const plugin: (md: MarkdownIt.MarkdownIt) => void;
  export default plugin;
}

// @mdit/plugin-tex only exposes an "exports" map, which the project's
// TypeScript module resolution cannot read, so its types are declared here.
declare module "@mdit/plugin-tex" {
  import MarkdownIt from "markdown-it";
  export interface MarkdownItTexOptions {
    delimiters?: "brackets" | "dollars" | "all";
    mathFence?: boolean;
    allowInlineWithSpace?: boolean;
    render: (content: string, displayMode: boolean, env: unknown) => string;
  }
  export const tex: (md: MarkdownIt.MarkdownIt, options: MarkdownItTexOptions) => void;
}
