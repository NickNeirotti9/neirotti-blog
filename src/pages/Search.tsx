import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../assets/search.css";
import Pagination from "../components/Pagination";
import { posts, BlogPost } from "../lib/content";
import { plainText } from "../lib/markup";

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const searchQuery = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Searchable text per post, built once: title, category, hook and body.
  const index = useMemo(
    () =>
      posts.map((post) => ({
        post,
        text: [post.title, post.subcategory, post.subject, post.hook, plainText(post.body)]
          .join(" ")
          .toLowerCase(),
      })),
    []
  );

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const filteredPosts = query
      ? index.filter((entry) => entry.text.includes(query)).map((entry) => entry.post)
      : [];

    setSearchResults(filteredPosts);

    // Reset to first page on new search
    setCurrentPage(1);
  }, [searchQuery, index]);

  // Calculate the number of pages every time searchResults changes
  useEffect(() => {
    const newTotalPages = Math.ceil(searchResults.length / postsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  }, [searchResults, currentPage, postsPerPage]);

  // Calculate the posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="searchContainer">
      <span className="eyebrow searchEyebrow">Search Results</span>
      <h1>{searchQuery ? `"${searchQuery}"` : "All posts"}</h1>
      <div className="postsContainer">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="noResults">No results found. Try a different term.</p>
        )}
      </div>
      <Pagination
        itemsPerPage={postsPerPage}
        totalItems={searchResults.length}
        currentPage={currentPage}
        paginate={(pageNumber: number) => {
          setCurrentPage(pageNumber);
          window.scrollTo(0, 0); // Scroll to top whenever page changes
        }}
      />
    </div>
  );
};

export default Search;
