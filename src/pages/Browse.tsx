import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import blogPostsData from "../blogposts.json";
import Pagination from "../components/Pagination";
import "../assets/index.css";
import "../assets/browse.css";

interface Post {
  id: number;
  title: string;
  hook: string;
  youtubeID: string;
  subcategory: string;
  subject: string;
  datePosted: string;
  featured: boolean;
}

const categories = [
  {
    name: "STEM",
    subcategories: ["Science", "Technology", "Engineering", "Mathematics"],
  },
  {
    name: "HEALTH",
    subcategories: ["Nutrition", "Fitness", "Mindfulness", "General Wellness"],
  },
  {
    name: "LIFE",
    subcategories: ["Philosophy", "Psychology", "Productivity", "Misc."],
  },
];

// Type for the groupings
type PostGroup = Record<string, Post[]>;

const groupPostsByDate = (posts: Post[]): PostGroup => {
  const groups: PostGroup = {};
  posts.forEach((post) => {
    const year = new Date(post.datePosted).getFullYear().toString(); // Extract the year
    if (!groups[year]) {
      groups[year] = []; // Initialize if not already present
    }
    groups[year].push(post);
  });
  return groups;
};

const groupPostsBySubject = (posts: Post[]): PostGroup => {
  const groups: PostGroup = {};
  posts.forEach((post) => {
    const subject = post.subject; // Extracting the subject from the post
    if (!groups[subject]) {
      groups[subject] = []; // Initialize if not already present
    }
    groups[subject].push(post); // Add the post to the array for this subject
  });
  return groups;
};

const Browse = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    new Set<string>()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState(
    new Set<string>()
  );

  const location = useLocation();

  const initializeFiltersFromQuery = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");

    if (filter) {
      if (filter === "ALL") {
        // When filter is "Browse All", select all categories and subcategories
        const allCategories = new Set(categories.map((c) => c.name));
        const allSubcategories = new Set(
          categories.flatMap((c) => c.subcategories)
        );
        setSelectedCategories(allCategories);
        setSelectedSubcategories(allSubcategories);
      } else {
        // Handle individual category or subcategory selection
        const category = categories.find(
          (c) => c.name === filter || c.subcategories.includes(filter)
        );
        if (category) {
          setSelectedCategories(new Set([category.name]));
          const subcategoriesToSelect =
            category.name === filter ? category.subcategories : [filter];
          setSelectedSubcategories(new Set(subcategoriesToSelect));
        } else {
          // Clear selections if the filter doesn't match any category or subcategory
          setSelectedCategories(new Set());
          setSelectedSubcategories(new Set());
        }
      }
    } else {
      // If no filter is provided, or to handle a "clear" action, you might want to clear selections
      setSelectedCategories(new Set());
      setSelectedSubcategories(new Set());
    }
  }, [location.search]);

  useEffect(() => {
    initializeFiltersFromQuery();
  }, [initializeFiltersFromQuery]);

  const toggleCategory = (categoryName: string, subcategories: string[]) => {
    const newCategories = new Set(selectedCategories);
    const newSubcategories = new Set(selectedSubcategories);

    const selectedSubCount = subcategories.reduce((count, subcategory) => {
      return newSubcategories.has(subcategory) ? count + 1 : count;
    }, 0);

    if (selectedSubCount <= subcategories.length / 2) {
      // If half or less subcategories are selected, select all of them
      newCategories.add(categoryName);
      subcategories.forEach((sub) => newSubcategories.add(sub));
    } else {
      // If more than half are selected, clear them
      newCategories.delete(categoryName);
      subcategories.forEach((sub) => newSubcategories.delete(sub));
    }

    setSelectedCategories(newCategories);
    setSelectedSubcategories(newSubcategories);
  };

  const toggleSubcategory = (subcategory: string) => {
    const newSubcategories = new Set(selectedSubcategories);

    if (newSubcategories.has(subcategory)) {
      newSubcategories.delete(subcategory);
    } else {
      newSubcategories.add(subcategory);
    }

    setSelectedSubcategories(newSubcategories);
  };

  const [sortOption, setSortOption] = useState("newest");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const totalItems = React.useMemo(() => {
    return blogPostsData.filter((post) =>
      selectedSubcategories.has(post.subcategory)
    ).length;
  }, [selectedSubcategories]);

  useEffect(() => {
    // Calculate the total number of pages after filtering
    const newTotalPages = Math.ceil(totalItems / postsPerPage);

    // If the current page is greater than the new total pages, set to the last page
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1); // Set to 1 to avoid setting it to 0
    }
  }, [totalItems, currentPage, postsPerPage]);

  const sortedAndFilteredPosts = React.useMemo(() => {
    if (selectedSubcategories.size === 0) {
      return [];
    }

    // Filter posts by selected subcategories
    let filtered = blogPostsData.filter((post) =>
      selectedSubcategories.has(post.subcategory)
    );

    let sorted;
    // First, sort the filtered posts based on the sort option.
    switch (sortOption) {
      case "newest":
        sorted = [...filtered].sort(
          (a, b) =>
            new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        );
        break;
      case "oldest":
        sorted = [...filtered].sort(
          (a, b) =>
            new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        );
        break;
      case "az":
        sorted = [...filtered].sort((a, b) =>
          a.subject.localeCompare(b.subject)
        );
        break;
      case "za":
        sorted = [...filtered].sort((a, b) =>
          b.subject.localeCompare(a.subject)
        );
        break;
      default:
        sorted = filtered;
    }

    // Pagination logic: Calculate which posts to display based on the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sorted.slice(indexOfFirstPost, indexOfLastPost);

    // Further process the current page's posts if needed (e.g., group by date or subcategory)
    switch (sortOption) {
      case "newest":
      case "oldest":
        return groupPostsByDate(currentPosts);
      case "az":
      case "za":
        return groupPostsBySubject(currentPosts);
      default:
        return currentPosts;
    }
  }, [sortOption, selectedSubcategories, currentPage, postsPerPage]);

  return (
    <div className="browseContainer">
      <h1>Browse Posts</h1>
      <div className="controlsContainer">
        <div className="categoryContainer">
          {categories.map(({ name, subcategories }) => (
            <div key={name}>
              <button onClick={() => toggleCategory(name, subcategories)}>
                {name}
              </button>
              <div className="subcategories">
                {subcategories.map((sub) => (
                  <label key={sub} className="subcategoryLabel">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.has(sub)}
                      onChange={() => toggleSubcategory(sub)}
                    />{" "}
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="sortContainer">
            <label htmlFor="sortSelect">SORT BY</label>
            <select
              id="sortSelect"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest">Date: Newest first</option>
              <option value="oldest">Date: Oldest first</option>
              <option value="az">Subject: A-Z</option>
              <option value="za">Subject: Z-A</option>
            </select>
          </div>
        </div>
      </div>
      <div className="postsContainer">
        {/* Convert the grouped posts into an array of [yearOrSubject, Post[]], 
          then sort based on current sort option if needed. */}
        {(() => {
          const entries = Object.entries(sortedAndFilteredPosts as PostGroup);

          let sortedEntries;
          if (sortOption === "newest") {
            // Newest first means highest year first
            sortedEntries = entries.sort(
              ([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA)
            );
          } else if (sortOption === "oldest") {
            // Oldest first means lowest year first
            sortedEntries = entries.sort(
              ([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB)
            );
          } else {
            // For A-Z or Z-A sorts, we're grouping by subject, so no need
            // to reorder group labels by numeric value (years).
            sortedEntries = entries;
          }

          return sortedEntries.map(([label, posts]) => (
            <div className="primaryGroupWrapper" key={label}>
              <h2>{label}</h2>
              <div className="postCardsRow">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <hr className="divider" />
            </div>
          ));
        })()}
      </div>
      <Pagination
        itemsPerPage={postsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Browse;
