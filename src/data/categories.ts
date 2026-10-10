export interface CategoryDef {
  name: string;
  slug: "stem" | "health" | "mind";
  subcategories: string[];
}

export const categories: CategoryDef[] = [
  {
    name: "STEM",
    slug: "stem",
    subcategories: ["Science", "Technology", "Engineering", "Mathematics"],
  },
  {
    name: "HEALTH",
    slug: "health",
    subcategories: ["Nutrition", "Fitness", "Lifestyle", "Body Systems"],
  },
  {
    name: "MIND",
    slug: "mind",
    subcategories: ["Philosophy", "Psychology", "Consciousness", "Reflections"],
  },
];

// Maps a post's subcategory (e.g. "Philosophy") to its parent category slug
// (e.g. "mind") so tags/badges can be color-coded consistently everywhere.
export const getCategorySlug = (subcategory: string): CategoryDef["slug"] | null => {
  const match = categories.find((c) => c.subcategories.includes(subcategory));
  return match ? match.slug : null;
};
