import categoriesData from "./categories.json";

export interface CategoryDef {
  name: string;
  slug: "stem" | "health" | "mind";
  subcategories: string[];
}

// The list itself lives in categories.json so the content build script
// (scripts/content-lib.cjs) can validate post headers against the same data.
export const categories: CategoryDef[] = categoriesData as CategoryDef[];

export const allSubcategories: string[] = categories.flatMap(
  (c) => c.subcategories
);

// Maps a post's subcategory (e.g. "Philosophy") to its parent category slug
// (e.g. "mind") so tags/badges can be color-coded consistently everywhere.
export const getCategorySlug = (subcategory: string): CategoryDef["slug"] | null => {
  const match = categories.find((c) => c.subcategories.includes(subcategory));
  return match ? match.slug : null;
};
