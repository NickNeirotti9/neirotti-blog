import React from "react";
import type { BlogPost, PortfolioItem, Resource } from "../lib/content";
import type { CategoryInfo } from "./api";

/* ------------------------------------------------------------------ */
/* small building blocks                                               */
/* ------------------------------------------------------------------ */

const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <label className="editorField">
    <span className="editorFieldLabel">{label}</span>
    {children}
    {hint && <span className="editorFieldHint">{hint}</span>}
  </label>
);

const StringList: React.FC<{
  label: string;
  hint?: string;
  items: string[];
  placeholder?: string;
  multiline?: boolean;
  onChange: (items: string[]) => void;
}> = ({ label, hint, items, placeholder, multiline, onChange }) => {
  const update = (i: number, value: string) => onChange(items.map((item, j) => (j === i ? value : item)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  return (
    <div className="editorField">
      <span className="editorFieldLabel">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="editorListRow">
          {multiline ? (
            <textarea value={item} rows={2} placeholder={placeholder} onChange={(e) => update(i, e.target.value)} />
          ) : (
            <input type="text" value={item} placeholder={placeholder} onChange={(e) => update(i, e.target.value)} />
          )}
          <div className="editorListButtons">
            <button type="button" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
            <button type="button" title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
            <button type="button" title="Remove" onClick={() => remove(i)}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" className="editorAddButton" onClick={() => onChange([...items, ""])}>
        + Add
      </button>
      {hint && <span className="editorFieldHint">{hint}</span>}
    </div>
  );
};

const ResourceList: React.FC<{ items: Resource[]; onChange: (items: Resource[]) => void }> = ({ items, onChange }) => {
  const update = (i: number, patch: Partial<Resource>) =>
    onChange(items.map((item, j) => (j === i ? { ...item, ...patch } : item)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  return (
    <div className="editorField">
      <span className="editorFieldLabel">Resources &amp; references</span>
      {items.map((r, i) => (
        <div key={i} className="editorResource">
          <input type="text" value={r.title} placeholder="Title" onChange={(e) => update(i, { title: e.target.value })} />
          <input type="url" value={r.url} placeholder="https://…" onChange={(e) => update(i, { url: e.target.value })} />
          <textarea value={r.description} rows={2} placeholder="Description (optional)" onChange={(e) => update(i, { description: e.target.value })} />
          <div className="editorListButtons">
            <button type="button" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
            <button type="button" title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
            <button type="button" title="Remove" onClick={() => remove(i)}>✕</button>
          </div>
        </div>
      ))}
      <button type="button" className="editorAddButton" onClick={() => onChange([...items, { title: "", url: "", description: "" }])}>
        + Add resource
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Accepts a full YouTube link or a bare 11-character ID. */
export const extractYoutubeId = (input: string): string => {
  const m = input.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input.trim();
};

const pad = (n: number) => String(n).padStart(2, "0");

const isoToLocalInput = (iso: string): string => {
  const d = new Date(iso);
  if (!iso || isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const localInputToIso = (value: string): string => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? "" : d.toISOString();
};

/* ------------------------------------------------------------------ */
/* the forms                                                           */
/* ------------------------------------------------------------------ */

interface CommonProps {
  file: string;
  onFileChange: (file: string) => void;
}

interface PostFormProps extends CommonProps {
  data: BlogPost;
  categories: CategoryInfo[];
  allPosts: BlogPost[];
  onChange: (patch: Partial<BlogPost>) => void;
}

export const PostMetaForm: React.FC<PostFormProps> = ({ data, categories, allPosts, file, onFileChange, onChange }) => {
  const subjects = Array.from(new Set(allPosts.map((p) => p.subject).filter(Boolean))).sort();
  const others = allPosts.filter((p) => p.id !== data.id).sort((a, b) => b.id - a.id);
  return (
    <div className="editorForm">
      <Field label="Title">
        <input type="text" value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
      </Field>
      <Field label="Hook" hint="One line shown on the post card and the home page.">
        <textarea rows={2} value={data.hook} onChange={(e) => onChange({ hook: e.target.value })} />
      </Field>
      <div className="editorRow">
        <Field label="Subcategory">
          <select value={data.subcategory} onChange={(e) => onChange({ subcategory: e.target.value })}>
            <option value="">Choose…</option>
            {categories.map((c) => (
              <optgroup key={c.name} label={c.name}>
                {c.subcategories.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Subject" hint='Shown after the subcategory, e.g. "Purpose".'>
          <input type="text" list="editor-subjects" value={data.subject} onChange={(e) => onChange({ subject: e.target.value })} />
          <datalist id="editor-subjects">
            {subjects.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </Field>
      </div>
      <div className="editorRow">
        <Field label="Date">
          <input
            type="datetime-local"
            value={isoToLocalInput(data.datePosted)}
            onChange={(e) => onChange({ datePosted: localInputToIso(e.target.value) })}
          />
        </Field>
        <Field label="Post ID" hint="Used in the address: /post/ID">
          <input type="number" min={1} value={Number.isFinite(data.id) ? data.id : ""} onChange={(e) => onChange({ id: Number(e.target.value) })} />
        </Field>
      </div>
      <Field label="YouTube video" hint="Paste the full link or the 11-character ID.">
        <input type="text" value={data.youtubeID} onChange={(e) => onChange({ youtubeID: extractYoutubeId(e.target.value) })} />
      </Field>
      <Field label="Spotify episode link" hint="Optional.">
        <input type="url" value={data.spotifyURL} onChange={(e) => onChange({ spotifyURL: e.target.value })} />
      </Field>
      <div className="editorRow editorChecks">
        <label className="editorCheck">
          <input type="checkbox" checked={data.featured} onChange={(e) => onChange({ featured: e.target.checked })} /> Featured on the home page
        </label>
        <label className="editorCheck">
          <input type="checkbox" checked={data.draft} onChange={(e) => onChange({ draft: e.target.checked })} /> Draft (not published on the live site)
        </label>
      </div>
      <Field label="File name" hint="In content/posts/. Suggested from the ID and title.">
        <input type="text" value={file} onChange={(e) => onFileChange(e.target.value)} />
      </Field>

      <div className="editorField">
        <span className="editorFieldLabel">Related posts ("You might like")</span>
        <div className="editorRelated">
          {others.map((p) => (
            <label key={p.id} className="editorCheck">
              <input
                type="checkbox"
                checked={data.relatedPosts.includes(p.id)}
                onChange={(e) =>
                  onChange({
                    relatedPosts: e.target.checked
                      ? [...data.relatedPosts, p.id]
                      : data.relatedPosts.filter((id) => id !== p.id),
                  })
                }
              />{" "}
              {p.id}. {p.title}
            </label>
          ))}
          {others.length === 0 && <span className="editorFieldHint">No other posts yet.</span>}
        </div>
      </div>

      <StringList label="Key takeaways" items={data.summaryPoints} multiline placeholder="One takeaway" onChange={(summaryPoints) => onChange({ summaryPoints })} />
      <StringList label="Quotes I like" items={data.quotes} multiline placeholder="A quote" onChange={(quotes) => onChange({ quotes })} />
      <ResourceList items={data.resources} onChange={(resources) => onChange({ resources })} />
    </div>
  );
};

interface PortfolioFormProps extends CommonProps {
  data: PortfolioItem;
  onChange: (patch: Partial<PortfolioItem>) => void;
}

export const PortfolioMetaForm: React.FC<PortfolioFormProps> = ({ data, file, onFileChange, onChange }) => (
  <div className="editorForm">
    <Field label="Title">
      <input type="text" value={data.title} onChange={(e) => onChange({ title: e.target.value })} />
    </Field>
    <Field label="Description" hint="Shown on the portfolio card.">
      <textarea rows={3} value={data.description} onChange={(e) => onChange({ description: e.target.value })} />
    </Field>
    <div className="editorRow">
      <Field label="Start date">
        <input type="date" value={data.dateFrom} onChange={(e) => onChange({ dateFrom: e.target.value })} />
      </Field>
      <Field label="End date" hint="Leave empty for “Present”.">
        <input type="date" value={data.dateTo} onChange={(e) => onChange({ dateTo: e.target.value })} />
      </Field>
    </div>
    <Field label="YouTube video" hint="Paste the full link or the 11-character ID. Optional if there is an image.">
      <input type="text" value={data.youtubeID} onChange={(e) => onChange({ youtubeID: extractYoutubeId(e.target.value) })} />
    </Field>
    <Field label="Card image" hint="A file name in src/assets/images, used when there is no video.">
      <input type="text" value={data.image} onChange={(e) => onChange({ image: e.target.value })} />
    </Field>
    <Field label="Address slug" hint="Used in the address: /portfolio/slug">
      <input type="text" value={data.slug} onChange={(e) => onChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })} />
    </Field>
    <Field label="File name" hint="In content/portfolio/.">
      <input type="text" value={file} onChange={(e) => onFileChange(e.target.value)} />
    </Field>
    <StringList label="Key takeaways" items={data.summaryPoints} multiline placeholder="One takeaway" onChange={(summaryPoints) => onChange({ summaryPoints })} />
    <ResourceList items={data.resources} onChange={(resources) => onChange({ resources })} />
  </div>
);
