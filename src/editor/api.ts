/*
 * Talks to the development-only API in src/setupProxy.js.
 */
import type { BlogPost, PortfolioItem } from "../lib/content";

export type Kind = "post" | "portfolio";

export interface CategoryInfo {
  name: string;
  slug: string;
  subcategories: string[];
}

export interface ContentResponse {
  posts: BlogPost[];
  portfolio: PortfolioItem[];
  errors: string[];
  categories: CategoryInfo[];
  nextId: number;
}

export interface CheckResponse {
  ok: boolean;
  errors: string[];
  /** the exact file contents that would be written */
  text?: string;
}

export interface SaveResponse extends CheckResponse {
  file?: string;
}

const BASE = "/__editor/api";

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const json = await res.json();
      if (json && Array.isArray(json.errors)) message = json.errors.join("; ");
    } catch {
      /* not json */
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchContent(): Promise<ContentResponse> {
  const res = await fetch(`${BASE}/content`);
  if (!res.ok) {
    throw new Error("The editor needs the development server. Start the site with `npm start` and open http://localhost:3000/editor.");
  }
  return res.json();
}

export const checkEntry = (kind: Kind, file: string, previousFile: string | null, data: unknown) =>
  postJson<CheckResponse>("/check", { kind, file, previousFile, data });

export const saveEntry = (kind: Kind, file: string, previousFile: string | null, data: unknown) =>
  postJson<SaveResponse>("/save", { kind, file, previousFile, data });

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/** Uploads an image to public/images/posts and returns its URL path. */
export async function uploadImage(file: File): Promise<string> {
  const data = await readAsDataUrl(file);
  const result = await postJson<{ ok: boolean; url?: string; errors?: string[] }>("/upload", {
    name: file.name,
    data,
  });
  if (!result.ok || !result.url) throw new Error((result.errors || ["Upload failed"]).join("; "));
  return result.url;
}
