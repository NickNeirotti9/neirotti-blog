/*
 * Shared helpers for the content pipeline.
 *
 * Posts and portfolio items are Markdown files in content/ with a YAML header.
 * This module reads them, checks them, and writes the JSON the site imports
 * (src/generated/). It runs in Node only: from scripts/build-content.cjs
 * before `npm start` / `npm run build`, and from src/setupProxy.js, which
 * powers the /editor page while the dev server is running.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const PORTFOLIO_DIR = path.join(CONTENT_DIR, "portfolio");
const GENERATED_DIR = path.join(ROOT, "src", "generated");
const IMAGES_DIR = path.join(ROOT, "public", "images", "posts");
const IMAGES_URL = "/images/posts";

const categories = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src", "data", "categories.json"), "utf8")
);
const SUBCATEGORIES = categories.flatMap((c) => c.subcategories);

const FILENAME_RE = /^[a-z0-9][a-z0-9-]*\.md$/;

/* ------------------------------------------------------------------ */
/* small utilities                                                     */
/* ------------------------------------------------------------------ */

const str = (v) => (v === undefined || v === null ? "" : String(v).trim());

const strArray = (v) =>
  Array.isArray(v) ? v.map(str).filter((s) => s.length > 0) : [];

const isHttpUrl = (s) => /^https?:\/\/\S+$/i.test(s);

function slugify(text) {
  return str(text)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Accepts a Date (YAML turns bare timestamps into Dates), an ISO string, or a
// plain YYYY-MM-DD. Plain dates are pinned to noon UTC so they show as the same
// calendar day in every timezone. Returns null when the value is not a date.
function toIsoDateTime(value) {
  if (value === undefined || value === null || value === "") return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value.toISOString();
  const s = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const d = new Date(`${s}T12:00:00Z`);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

// For portfolio date ranges we only keep the day: YYYY-MM-DD.
function toDateOnly(value) {
  if (value === undefined || value === null || value === "") return "";
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value.toISOString().slice(0, 10);
  }
  const s = String(value).trim();
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .sort();
}

function cleanBody(text) {
  return String(text || "").replace(/\r\n/g, "\n").replace(/^\n+/, "").trimEnd() + "\n";
}

function readMarkdownFile(dir, file) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const parsed = matter(raw); // gray-matter caches by string; never mutate .data
  return { file, data: { ...parsed.data }, body: cleanBody(parsed.content) };
}

/* ------------------------------------------------------------------ */
/* posts                                                               */
/* ------------------------------------------------------------------ */

const POST_KEYS = [
  "id", "title", "date", "subcategory", "subject", "youtube", "spotify", "hook",
  "featured", "draft", "related", "takeaways", "quotes", "resources",
];

function normalizeResources(v) {
  if (!Array.isArray(v)) return [];
  return v.map((r) => ({
    title: str(r && r.title),
    url: str(r && r.url),
    description: str(r && r.description),
  }));
}

// Header fields (friendly names) -> the shape the site reads.
function normalizePost(entry) {
  const d = entry.data || {};
  return {
    id: d.id === undefined || d.id === null || d.id === "" ? NaN : Number(d.id),
    title: str(d.title),
    datePosted: toIsoDateTime(d.date),
    subcategory: str(d.subcategory),
    subject: str(d.subject),
    youtubeID: str(d.youtube),
    spotifyURL: str(d.spotify),
    hook: str(d.hook),
    featured: d.featured === true,
    draft: d.draft === true,
    relatedPosts: Array.isArray(d.related) ? d.related.map(Number) : [],
    summaryPoints: strArray(d.takeaways),
    quotes: strArray(d.quotes),
    resources: normalizeResources(d.resources),
    body: entry.body,
    file: entry.file,
    _unknownKeys: Object.keys(d).filter((k) => !POST_KEYS.includes(k)),
  };
}

// The reverse: site shape -> header fields, in a stable, readable order.
function postToFrontmatter(post) {
  const fm = {
    id: post.id,
    title: post.title,
    date: post.datePosted,
    subcategory: post.subcategory,
    subject: post.subject,
    youtube: post.youtubeID,
  };
  if (post.spotifyURL) fm.spotify = post.spotifyURL;
  fm.hook = post.hook;
  fm.featured = !!post.featured;
  if (post.draft) fm.draft = true;
  if (post.relatedPosts && post.relatedPosts.length) fm.related = post.relatedPosts;
  if (post.summaryPoints && post.summaryPoints.length) fm.takeaways = post.summaryPoints;
  if (post.quotes && post.quotes.length) fm.quotes = post.quotes;
  if (post.resources && post.resources.length) {
    fm.resources = post.resources.map((r) => {
      const o = { title: r.title, url: r.url };
      if (r.description) o.description = r.description;
      return o;
    });
  }
  return fm;
}

function validatePost(post, allPosts) {
  const e = [];
  const where = `content/posts/${post.file}`;
  const add = (msg) => e.push(`${where}: ${msg}`);

  if (!Number.isInteger(post.id) || post.id <= 0) {
    add('"id" must be a whole number greater than 0 (for example: id: 9)');
  } else {
    const dup = allPosts.find((p) => p !== post && p.id === post.id);
    if (dup) add(`"id" ${post.id} is already used by content/posts/${dup.file}`);
  }
  if (!post.title) add('"title" is missing');
  if (!post.datePosted) {
    add('"date" is missing or not a date (use 2025-09-25 or 2025-09-25T15:30:00Z)');
  }
  if (!post.subcategory) {
    add(`"subcategory" is missing. Choose one of: ${SUBCATEGORIES.join(", ")}`);
  } else if (!SUBCATEGORIES.includes(post.subcategory)) {
    const guess = SUBCATEGORIES.find(
      (s) => s.toLowerCase() === post.subcategory.toLowerCase()
    );
    add(
      `"subcategory" "${post.subcategory}" is not one of: ${SUBCATEGORIES.join(", ")}` +
        (guess ? ` (did you mean "${guess}"?)` : "")
    );
  }
  if (!post.subject) add('"subject" is missing (the topic shown after the subcategory, e.g. "Purpose")');
  if (!post.youtubeID) add('"youtube" is missing (the 11-character video ID from the YouTube URL)');
  if (post.spotifyURL && !isHttpUrl(post.spotifyURL)) add('"spotify" must be a full https:// link to the episode');
  if (!post.hook) add('"hook" is missing (the one-line teaser shown on post cards)');
  post.relatedPosts.forEach((rid) => {
    if (!Number.isInteger(rid)) add(`"related" contains "${rid}", which is not a post id`);
    else if (rid === post.id) add('"related" lists the post itself');
    else if (!allPosts.some((p) => p.id === rid)) add(`"related" lists post ${rid}, but no post has that id`);
  });
  post.resources.forEach((r, i) => {
    if (!r.title) add(`resource #${i + 1} has no "title"`);
    if (!isHttpUrl(r.url)) add(`resource #${i + 1} ("${r.title || "untitled"}") needs a full http(s) "url"`);
  });
  if (!post.body.trim()) add("the post has no body text below the header");
  if (post._unknownKeys.length) {
    add(`unknown header field(s): ${post._unknownKeys.join(", ")}. Known fields: ${POST_KEYS.join(", ")}`);
  }
  return e;
}

/* ------------------------------------------------------------------ */
/* portfolio                                                           */
/* ------------------------------------------------------------------ */

const PORTFOLIO_KEYS = [
  "slug", "title", "youtube", "image", "dateFrom", "dateTo", "description",
  "takeaways", "resources",
];

function normalizePortfolioItem(entry) {
  const d = entry.data || {};
  return {
    slug: str(d.slug) || entry.file.replace(/\.md$/i, ""),
    title: str(d.title),
    youtubeID: str(d.youtube),
    image: str(d.image),
    dateFrom: toDateOnly(d.dateFrom),
    dateTo: toDateOnly(d.dateTo),
    description: str(d.description),
    summaryPoints: strArray(d.takeaways),
    resources: normalizeResources(d.resources),
    body: entry.body,
    file: entry.file,
    _unknownKeys: Object.keys(d).filter((k) => !PORTFOLIO_KEYS.includes(k)),
  };
}

function portfolioToFrontmatter(item) {
  const fm = { slug: item.slug, title: item.title };
  if (item.youtubeID) fm.youtube = item.youtubeID;
  if (item.image) fm.image = item.image;
  fm.dateFrom = item.dateFrom;
  if (item.dateTo) fm.dateTo = item.dateTo;
  fm.description = item.description;
  if (item.summaryPoints && item.summaryPoints.length) fm.takeaways = item.summaryPoints;
  if (item.resources && item.resources.length) {
    fm.resources = item.resources.map((r) => {
      const o = { title: r.title, url: r.url };
      if (r.description) o.description = r.description;
      return o;
    });
  }
  return fm;
}

function validatePortfolioItem(item, all) {
  const e = [];
  const where = `content/portfolio/${item.file}`;
  const add = (msg) => e.push(`${where}: ${msg}`);
  if (!/^[a-z0-9-]+$/.test(item.slug)) add(`"slug" "${item.slug}" may only contain lowercase letters, numbers and dashes`);
  const dup = all.find((p) => p !== item && p.slug === item.slug);
  if (dup) add(`"slug" ${item.slug} is already used by content/portfolio/${dup.file}`);
  if (!item.title) add('"title" is missing');
  if (!item.dateFrom) add('"dateFrom" is missing or not a date (use YYYY-MM-DD)');
  if (item.dateTo === null) add('"dateTo" is not a date (use YYYY-MM-DD)');
  if (!item.description) add('"description" is missing (shown on the portfolio card)');
  if (!item.youtubeID && !item.image) add('needs a "youtube" video ID or an "image" path for the card');
  item.resources.forEach((r, i) => {
    if (!r.title) add(`resource #${i + 1} has no "title"`);
    if (!isHttpUrl(r.url)) add(`resource #${i + 1} ("${r.title || "untitled"}") needs a full http(s) "url"`);
  });
  if (!item.body.trim()) add("the item has no body text below the header");
  if (item._unknownKeys.length) {
    add(`unknown header field(s): ${item._unknownKeys.join(", ")}. Known fields: ${PORTFOLIO_KEYS.join(", ")}`);
  }
  return e;
}

/* ------------------------------------------------------------------ */
/* loading                                                             */
/* ------------------------------------------------------------------ */

function loadCollection(dir, label, normalize, validate) {
  const items = [];
  const errors = [];
  for (const file of listMarkdownFiles(dir)) {
    if (!FILENAME_RE.test(file)) {
      errors.push(`content/${label}/${file}: file names may only contain lowercase letters, numbers and dashes, and must end in .md`);
      continue;
    }
    try {
      items.push(normalize(readMarkdownFile(dir, file)));
    } catch (err) {
      errors.push(`content/${label}/${file}: could not read the header. ${String(err.message).split("\n")[0]}`);
    }
  }
  for (const item of items) errors.push(...validate(item, items));
  return { items, errors };
}

function stripPrivate(item) {
  const copy = { ...item };
  delete copy._unknownKeys;
  return copy;
}

// Everything, including drafts and invalid entries, with an error list.
function loadContent() {
  const posts = loadCollection(POSTS_DIR, "posts", normalizePost, validatePost);
  const portfolio = loadCollection(PORTFOLIO_DIR, "portfolio", normalizePortfolioItem, validatePortfolioItem);
  return {
    posts: posts.items.sort((a, b) => a.id - b.id).map(stripPrivate),
    portfolio: portfolio.items.map(stripPrivate),
    errors: [...posts.errors, ...portfolio.errors],
  };
}

function writeIfChanged(file, content) {
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === content) return false;
  fs.writeFileSync(file, content);
  return true;
}

// Writes src/generated/posts.json and portfolio.json.
// In production, drafts are left out and any error aborts.
// In development, drafts are kept and only the broken files are skipped.
function writeGenerated({ production = false } = {}) {
  const { posts, portfolio, errors } = loadContent();
  const broken = new Set(errors.map((e) => e.split(": ")[0].trim()));
  const okPosts = posts.filter(
    (p) => !broken.has(`content/posts/${p.file}`) && (!production || !p.draft)
  );
  const okPortfolio = portfolio.filter((p) => !broken.has(`content/portfolio/${p.file}`));

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  const changed = [
    writeIfChanged(path.join(GENERATED_DIR, "posts.json"), JSON.stringify(okPosts, null, 2) + "\n"),
    writeIfChanged(path.join(GENERATED_DIR, "portfolio.json"), JSON.stringify(okPortfolio, null, 2) + "\n"),
  ].some(Boolean);

  return {
    errors,
    changed,
    posts: okPosts.length,
    portfolio: okPortfolio.length,
    draftsSkipped: production ? posts.filter((p) => p.draft).length : 0,
  };
}

/* ------------------------------------------------------------------ */
/* saving (used by the editor)                                         */
/* ------------------------------------------------------------------ */

function suggestPostFilename(id, title) {
  const n = Number.isInteger(id) ? String(id).padStart(3, "0") : "000";
  return `${n}-${slugify(title) || "untitled"}.md`;
}

function nextPostId() {
  const { posts } = loadContent();
  return posts.reduce((m, p) => Math.max(m, p.id || 0), 0) + 1;
}

function stringifyPost(post) {
  return matter.stringify("\n" + cleanBody(post.body), postToFrontmatter(post));
}

function stringifyPortfolioItem(item) {
  return matter.stringify("\n" + cleanBody(item.body), portfolioToFrontmatter(item));
}

function removeOldFile(dir, previousFile, file) {
  if (previousFile && previousFile !== file && FILENAME_RE.test(previousFile)) {
    const old = path.join(dir, previousFile);
    if (fs.existsSync(old)) fs.unlinkSync(old);
  }
}

const badFilename = (file) =>
  `"${file}" is not a valid file name (lowercase letters, numbers, dashes, ending in .md)`;

// Serializes the post exactly as it will be written, reads it back, and checks
// it against the rest of the collection (replacing the entry it will overwrite).
function checkPost({ file, post, previousFile }) {
  if (!FILENAME_RE.test(file || "")) return { ok: false, errors: [badFilename(file)] };
  const text = stringifyPost(post || {});
  const reread = matter(text);
  const candidate = normalizePost({ file, data: { ...reread.data }, body: cleanBody(reread.content) });
  const others = loadContent().posts.filter((p) => p.file !== file && p.file !== previousFile);
  const errors = validatePost(candidate, [...others, candidate]);
  return { ok: errors.length === 0, errors, text };
}

function checkPortfolioItem({ file, item, previousFile }) {
  if (!FILENAME_RE.test(file || "")) return { ok: false, errors: [badFilename(file)] };
  const text = stringifyPortfolioItem(item || {});
  const reread = matter(text);
  const candidate = normalizePortfolioItem({ file, data: { ...reread.data }, body: cleanBody(reread.content) });
  const others = loadContent().portfolio.filter((p) => p.file !== file && p.file !== previousFile);
  const errors = validatePortfolioItem(candidate, [...others, candidate]);
  return { ok: errors.length === 0, errors, text };
}

// Writes the file only when it is clean, then regenerates the JSON.
function savePost({ file, post, previousFile }) {
  const check = checkPost({ file, post, previousFile });
  if (!check.ok) return { ok: false, errors: check.errors };
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(POSTS_DIR, file), check.text);
  removeOldFile(POSTS_DIR, previousFile, file);
  const build = writeGenerated({ production: false });
  return { ok: true, file, errors: build.errors, text: check.text };
}

function savePortfolioItem({ file, item, previousFile }) {
  const check = checkPortfolioItem({ file, item, previousFile });
  if (!check.ok) return { ok: false, errors: check.errors };
  fs.mkdirSync(PORTFOLIO_DIR, { recursive: true });
  fs.writeFileSync(path.join(PORTFOLIO_DIR, file), check.text);
  removeOldFile(PORTFOLIO_DIR, previousFile, file);
  const build = writeGenerated({ production: false });
  return { ok: true, file, errors: build.errors, text: check.text };
}

// Stores an uploaded image under public/images/posts and returns its URL path.
function saveImage(name, base64) {
  const ext = path.extname(name || "").toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) {
    return { ok: false, errors: [`"${name}": only png, jpg, gif, webp and svg images are supported`] };
  }
  const base = slugify(path.basename(name, ext)) || "image";
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  let fileName = `${base}${ext}`;
  let n = 2;
  while (fs.existsSync(path.join(IMAGES_DIR, fileName))) fileName = `${base}-${n++}${ext}`;
  fs.writeFileSync(path.join(IMAGES_DIR, fileName), Buffer.from(base64, "base64"));
  return { ok: true, url: `${IMAGES_URL}/${fileName}` };
}

// Re-generates the JSON whenever a Markdown file changes on disk.
function watchContent(onChange) {
  let timer = null;
  const trigger = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        const result = writeGenerated({ production: false });
        if (onChange) onChange(result);
      } catch (err) {
        console.error("[content] rebuild failed:", err.message);
      }
    }, 150);
  };
  for (const dir of [POSTS_DIR, PORTFOLIO_DIR]) {
    fs.mkdirSync(dir, { recursive: true });
    try {
      fs.watch(dir, { persistent: false }, trigger);
    } catch (err) {
      console.warn(`[content] could not watch ${dir}: ${err.message}`);
    }
  }
}

module.exports = {
  ROOT, CONTENT_DIR, POSTS_DIR, PORTFOLIO_DIR, GENERATED_DIR, IMAGES_DIR,
  categories, SUBCATEGORIES,
  slugify, toIsoDateTime, toDateOnly, cleanBody,
  loadContent, writeGenerated, watchContent,
  normalizePost, validatePost, postToFrontmatter, stringifyPost, checkPost, savePost,
  suggestPostFilename, nextPostId,
  normalizePortfolioItem, validatePortfolioItem, portfolioToFrontmatter,
  stringifyPortfolioItem, checkPortfolioItem, savePortfolioItem,
  saveImage,
};
