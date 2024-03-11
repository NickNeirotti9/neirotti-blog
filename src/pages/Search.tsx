import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import "../assets/search.css";
import Pagination from "../components/Pagination";
import blogPostsData from "../blogposts.json";

// Assuming you have a type for your posts
interface Post {
  id: number;
  title: string;
  hook: string;
  youtubeID: string;
  subcategory: string;
  subject: string;
  confidenceScore: number;
  datePosted: string;
  featured: boolean;
}

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const searchQuery = searchParams.get("query") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    // Perform the search
    const filteredPosts = searchQuery
      ? blogPostsData.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.subcategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            post.subject.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    setSearchResults(filteredPosts);

    // Reset to first page on new search
    setCurrentPage(1);
  }, [searchQuery]);

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
      <h1>Search Results for: {searchQuery}</h1>
      <div className="postsContainer">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No results found.</p>
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
