/*
 * The post editor (development only): http://localhost:3000/editor
 *
 * Write mode is a document-style editor dressed in the site's article styles,
 * Preview renders the exact component the live site uses, and Source shows the
 * Markdown. Save writes content/<posts|portfolio>/<file>.md; the dev server
 * then rebuilds the site data automatically.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost, PortfolioItem } from "../lib/content";
import { slugify } from "../lib/markup";
import PostArticle from "../components/PostArticle";
import PortfolioArticle from "../components/PortfolioArticle";
import BodyEditor from "./BodyEditor";
import { PortfolioMetaForm, PostMetaForm } from "./MetaForm";
import { checkEntry, ContentResponse, fetchContent, Kind, saveEntry, uploadImage } from "./api";
import "./editor.css";

type Mode = "write" | "preview" | "source";

interface Draft {
  kind: Kind;
  /** file name on disk before this editing session (null for a new entry) */
  previousFile: string | null;
  file: string;
  /** false until the user edits the file name by hand */
  autoFile: boolean;
  data: BlogPost | PortfolioItem;
}

const STORAGE_KEY = "existnchill-editor-drafts";
const draftKey = (kind: Kind, previousFile: string | null) => `${kind}:${previousFile || "new"}`;

const readStoredDrafts = (): Record<string, Draft> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};
const writeStoredDrafts = (drafts: Record<string, Draft>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    /* storage unavailable */
  }
};

const suggestPostFile = (id: number, title: string) =>
  `${String(Number.isFinite(id) ? id : 0).padStart(3, "0")}-${slugify(title) || "untitled"}.md`;
const suggestPortfolioFile = (slug: string) => `${slug || "untitled"}.md`;

const newPost = (id: number): BlogPost => ({
  id,
  title: "",
  datePosted: new Date(Math.floor(Date.now() / 60000) * 60000).toISOString(),
  subcategory: "",
  subject: "",
  youtubeID: "",
  spotifyURL: "",
  hook: "",
  featured: false,
  draft: true,
  relatedPosts: [],
  summaryPoints: [],
  quotes: [],
  resources: [],
  body: "## Introduction\n\n",
  file: "",
});

const newPortfolioItem = (): PortfolioItem => ({
  slug: "",
  title: "",
  youtubeID: "",
  image: "",
  dateFrom: new Date().toISOString().slice(0, 10),
  dateTo: "",
  description: "",
  summaryPoints: [],
  resources: [],
  body: "## Abstract\n\n",
  file: "",
});

const downloadText = (name: string, text: string) => {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

const EditorPage: React.FC = () => {
  const [content, setContent] = useState<ContentResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [mode, setMode] = useState<Mode>("write");
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileText, setFileText] = useState("");
  const [status, setStatus] = useState<{ text: string; error?: boolean }>({ text: "" });
  const [saving, setSaving] = useState(false);
  const [generation, setGeneration] = useState(0);
  const sourceEdited = useRef(false);

  const say = useCallback((text: string, error = false) => setStatus({ text, error }), []);

  const reload = useCallback(async () => {
    try {
      setContent(await fetchContent());
      setLoadError(null);
    } catch (err) {
      setLoadError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Keep a copy of unsaved work in the browser.
  useEffect(() => {
    if (!draft || !dirty) return;
    const timer = setTimeout(() => {
      const drafts = readStoredDrafts();
      drafts[draftKey(draft.kind, draft.previousFile)] = draft;
      writeStoredDrafts(drafts);
    }, 500);
    return () => clearTimeout(timer);
  }, [draft, dirty]);

  // Validate as you go (debounced) and keep the file text for Copy / Download.
  useEffect(() => {
    if (!draft) return;
    const timer = setTimeout(async () => {
      try {
        const result = await checkEntry(draft.kind, draft.file, draft.previousFile, draft.data);
        setErrors(result.errors);
        if (result.text) setFileText(result.text);
      } catch (err) {
        setErrors([(err as Error).message]);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [draft]);

  const openEntry = (kind: Kind, previousFile: string | null) => {
    if (!content) return;
    if (dirty && !window.confirm("You have unsaved changes (they are kept in this browser). Switch anyway?")) return;

    let fresh: Draft;
    if (kind === "post") {
      const existing = previousFile ? content.posts.find((p) => p.file === previousFile) : null;
      const data = existing ? { ...existing } : newPost(content.nextId);
      fresh = { kind, previousFile, file: existing ? existing.file : suggestPostFile(data.id, data.title), autoFile: !existing, data };
    } else {
      const existing = previousFile ? content.portfolio.find((p) => p.file === previousFile) : null;
      const data = existing ? { ...existing } : newPortfolioItem();
      fresh = { kind, previousFile, file: existing ? existing.file : suggestPortfolioFile(data.slug), autoFile: !existing, data };
    }

    const stored = readStoredDrafts()[draftKey(kind, previousFile)];
    if (stored && JSON.stringify(stored.data) !== JSON.stringify(fresh.data)) {
      if (window.confirm("This browser has unsaved changes for this entry. Restore them?")) {
        fresh = stored;
        setDirty(true);
      } else {
        const drafts = readStoredDrafts();
        delete drafts[draftKey(kind, previousFile)];
        writeStoredDrafts(drafts);
        setDirty(false);
      }
    } else {
      setDirty(false);
    }

    sourceEdited.current = false;
    setDraft(fresh);
    setErrors([]);
    setFileText("");
    setMode("write");
    setGeneration((g) => g + 1);
    say("");
  };

  const update = (patch: Partial<BlogPost> | Partial<PortfolioItem>) => {
    setDraft((current) => {
      if (!current) return current;
      const data = { ...current.data, ...patch } as BlogPost | PortfolioItem;
      let file = current.file;
      if (current.autoFile) {
        file =
          current.kind === "post"
            ? suggestPostFile((data as BlogPost).id, (data as BlogPost).title)
            : suggestPortfolioFile((data as PortfolioItem).slug);
      }
      return { ...current, data, file };
    });
    setDirty(true);
  };

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    if (mode === "source" && sourceEdited.current) {
      sourceEdited.current = false;
      setGeneration((g) => g + 1);
    }
    setMode(next);
  };

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const result = await saveEntry(draft.kind, draft.file, draft.previousFile, draft.data);
      if (!result.ok) {
        setErrors(result.errors);
        say("Not saved. Fix the problems listed above.", true);
        return;
      }
      const drafts = readStoredDrafts();
      delete drafts[draftKey(draft.kind, draft.previousFile)];
      writeStoredDrafts(drafts);
      setDraft({ ...draft, previousFile: result.file || draft.file, file: result.file || draft.file, autoFile: false });
      setDirty(false);
      setErrors(result.errors || []);
      if (result.text) setFileText(result.text);
      say(`Saved content/${draft.kind === "post" ? "posts" : "portfolio"}/${result.file}. The site has been updated.`);
      await reload();
    } catch (err) {
      say(`Save failed: ${(err as Error).message}`, true);
    } finally {
      setSaving(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fileText);
      say(`Copied the contents of ${draft?.file} to the clipboard.`);
    } catch (err) {
      say(`Could not copy: ${(err as Error).message}`, true);
    }
  };

  const pickerValue = draft ? `${draft.kind}:${draft.previousFile || "new"}` : "";
  const sortedPosts = useMemo(() => (content ? [...content.posts].sort((a, b) => b.id - a.id) : []), [content]);
  const canSave = !!draft && !saving && errors.length === 0 && fileText !== "";

  if (loadError) {
    return (
      <div className="editorRoot">
        <div className="editorTop">
          <strong>Post editor</strong>
        </div>
        <div className="editorMessage">
          <p>{loadError}</p>
          <button type="button" onClick={reload}>Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="editorRoot">
      <div className="editorTop">
        <strong className="editorBrand">Post editor</strong>
        <select
          className="editorPicker"
          value={pickerValue}
          onChange={(e) => {
            const [kind, file] = e.target.value.split(":");
            if (kind) openEntry(kind as Kind, file === "new" ? null : file);
          }}
        >
          <option value="">Open…</option>
          <option value="post:new">＋ New post</option>
          <option value="portfolio:new">＋ New portfolio item</option>
          <optgroup label="Posts">
            {sortedPosts.map((p) => (
              <option key={p.file} value={`post:${p.file}`}>
                {p.id}. {p.title}
                {p.draft ? " (draft)" : ""}
              </option>
            ))}
          </optgroup>
          <optgroup label="Portfolio">
            {(content?.portfolio || []).map((p) => (
              <option key={p.file} value={`portfolio:${p.file}`}>
                {p.title}
              </option>
            ))}
          </optgroup>
        </select>

        {draft && (
          <>
            <div className="editorTabs">
              {(["write", "preview", "source"] as Mode[]).map((m) => (
                <button key={m} type="button" className={mode === m ? "is-active" : ""} onClick={() => changeMode(m)}>
                  {m === "write" ? "Write" : m === "preview" ? "Preview" : "Source"}
                </button>
              ))}
            </div>
            <span className={`editorDirty${dirty ? " is-dirty" : ""}`}>{dirty ? "Unsaved changes" : "All changes saved"}</span>
            <div className="editorActions">
              <button type="button" onClick={copy} disabled={!fileText} title="Copy the file contents">Copy</button>
              <button type="button" onClick={() => downloadText(draft.file, fileText)} disabled={!fileText} title="Download the .md file">Download</button>
              <button type="button" className="is-primary" onClick={save} disabled={!canSave} title="Write the file into content/ and update the site">
                {saving ? "Saving…" : "Save to site"}
              </button>
            </div>
          </>
        )}
        <Link to="/" className="editorExit" title="Back to the site">✕</Link>
      </div>

      {!draft ? (
        <div className="editorMessage">
          <h2>Pick a post to edit, or start a new one.</h2>
          <p>Use the menu above. Everything you type is kept in this browser until you save.</p>
          {content && content.errors.length > 0 && (
            <div className="editorErrors">
              <strong>Problems in content/ right now:</strong>
              <ul>
                {content.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="editorMain">
          <aside className="editorSidebar">
            {draft.kind === "post" ? (
              <PostMetaForm
                data={draft.data as BlogPost}
                categories={content?.categories || []}
                allPosts={content?.posts || []}
                file={draft.file}
                onFileChange={(file) => {
                  setDraft((c) => (c ? { ...c, file, autoFile: false } : c));
                  setDirty(true);
                }}
                onChange={update}
              />
            ) : (
              <PortfolioMetaForm
                data={draft.data as PortfolioItem}
                file={draft.file}
                onFileChange={(file) => {
                  setDraft((c) => (c ? { ...c, file, autoFile: false } : c));
                  setDirty(true);
                }}
                onChange={update}
              />
            )}
          </aside>

          <main className="editorContent">
            {(errors.length > 0 || status.text) && (
              <div className="editorNotices">
                {errors.length > 0 && (
                  <div className="editorErrors">
                    <strong>Before this can be saved:</strong>
                    <ul>
                      {errors.map((e, i) => (
                        <li key={i}>{e.replace(/^content\/(posts|portfolio)\/[^:]+:\s*/, "")}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {status.text && <div className={`editorStatus${status.error ? " is-error" : ""}`}>{status.text}</div>}
              </div>
            )}

            {mode === "write" && (
              <BodyEditor
                key={`${pickerValue}:${generation}`}
                initialBody={draft.data.body}
                onChange={(body) => update({ body })}
                uploadImage={uploadImage}
                onStatus={say}
              />
            )}

            {mode === "preview" && (
              <div className="postPage editorPreview">
                {draft.kind === "post" ? (
                  <PostArticle post={draft.data as BlogPost} />
                ) : (
                  <PortfolioArticle item={draft.data as PortfolioItem} />
                )}
              </div>
            )}

            {mode === "source" && (
              <div className="editorSource">
                <p className="editorFieldHint">
                  The body as it is stored on disk. Headings: <code>##</code> chapter, <code>###</code> section, <code>####</code> subsection.
                  Styles: <code>**bold**</code> <code>*italic*</code> <code>__underline__</code> <code>~sub~</code> <code>^sup^</code>.
                  Start a paragraph with a tab to indent it. <code>::: center</code> … <code>:::</code> centers a block, <code>$$ … $$</code> is an equation.
                </p>
                <textarea
                  className="editorSourceText"
                  value={draft.data.body}
                  spellCheck
                  onChange={(e) => {
                    sourceEdited.current = true;
                    update({ body: e.target.value });
                  }}
                />
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
