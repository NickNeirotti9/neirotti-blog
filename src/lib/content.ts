/*
 * Typed access to the content generated from content/*.md.
 * src/generated/*.json is written by scripts/build-content.cjs, which runs
 * before `npm start` and `npm run build` (and whenever a file in content/
 * changes while the dev server is running).
 */
import postsJson from "../generated/posts.json";
import portfolioJson from "../generated/portfolio.json";

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  datePosted: string;
  subcategory: string;
  subject: string;
  youtubeID: string;
  spotifyURL: string;
  hook: string;
  featured: boolean;
  draft: boolean;
  relatedPosts: number[];
  summaryPoints: string[];
  quotes: string[];
  resources: Resource[];
  /** Markdown body, see src/lib/markup.ts */
  body: string;
  /** file name inside content/posts */
  file: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  youtubeID: string;
  image: string;
  /** YYYY-MM-DD */
  dateFrom: string;
  /** YYYY-MM-DD or "" while ongoing */
  dateTo: string;
  description: string;
  summaryPoints: string[];
  resources: Resource[];
  body: string;
  file: string;
}

export const posts: BlogPost[] = postsJson as unknown as BlogPost[];
export const portfolioItems: PortfolioItem[] = portfolioJson as unknown as PortfolioItem[];

export const getPostById = (id: number | string): BlogPost | undefined =>
  posts.find((p) => String(p.id) === String(id));

export const getPortfolioItem = (slug: string): PortfolioItem | undefined =>
  portfolioItems.find((p) => p.slug === slug);

/** Newest first. */
export const postsByDate = (): BlogPost[] =>
  [...posts].sort(
    (a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  );

/**
 * Parses a stored date. Plain YYYY-MM-DD values are treated as calendar days
 * (not UTC midnight) so they never show as the day before.
 */
export const parseDate = (value: string): Date => {
  const m = (value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m
    ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
    : new Date(value);
};

/** Formats a stored date for display. */
export const formatDate = (value: string): string => {
  if (!value) return "";
  const d = parseDate(value);
  return isNaN(d.getTime()) ? value : d.toLocaleDateString();
};
