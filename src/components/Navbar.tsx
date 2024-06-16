import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import "../assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false); // New state to track input focus
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme); // Persist theme choice
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.dataset.theme = savedTheme;
  }, []);

  const navigateToSTEM = () => {
    navigate("/browse?filter=STEM");
  };
  const navigateToHEALTH = () => {
    navigate("/browse?filter=HEALTH");
  };
  const navigateToLIFE = () => {
    navigate("/browse?filter=LIFE");
  };

  // Input change handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event?:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault(); // Optional chaining to prevent default if event exists
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setIsInputFocused(false);
  };

  // Clear search handler
  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus(); // Keep input focused after clearing
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">existnchill</Link>
      </div>
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search..."
          className="search-input"
          aria-label="Search"
          ref={searchInputRef}
        />
        {/* Render the clear button only when there's a searchQuery and the input is not focused */}
        {searchQuery && !isInputFocused && (
          <button
            type="button" // This should be "button" so it doesn't submit the form
            className="clear-button visible" // Use "visible" class to show the button
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <FontAwesomeIcon icon={faTimes} /> {/* Clear icon */}
          </button>
        )}
        {/* Render the search button when the input is focused or there's a searchQuery */}
        {isInputFocused || searchQuery ? (
          <button
            type="submit" // This should be "submit" to trigger form submission
            className="search-button visible" // Use "visible" class to show the button
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faSearch} /> {/* Search icon */}
          </button>
        ) : (
          <button
            type="submit" // Still "submit", because this button is always in a state that can submit the form
            className="search-button hidden" // Use "hidden" class to hide the button
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faSearch} /> {/* Search icon */}
          </button>
        )}
      </form>
      <div className="menu-and-toggle">
        <div className="menu">
          <div className="dropdown">
            <button className="dropbtn" onClick={navigateToSTEM}>
              STEM
            </button>
            <div className="dropdown-content">
              <Link to="/browse?filter=Science">Science</Link>
              <Link to="/browse?filter=Technology">Technology</Link>
              <Link to="/browse?filter=Engineering">Engineering</Link>
              <Link to="/browse?filter=Mathematics">Mathematics</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={navigateToHEALTH}>
              HEALTH
            </button>
            <div className="dropdown-content">
              <Link to="/browse?filter=Nutrition">Nutrition</Link>
              <Link to="/browse?filter=Fitness">Fitness</Link>
              <Link to="/browse?filter=Mindfulness">Mindfulness</Link>
              <Link to="/browse?filter=General Wellness">General Wellness</Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn" onClick={navigateToLIFE}>
              LIFE
            </button>
            <div className="dropdown-content">
              <Link to="/browse?filter=Philosophy">Philosophy</Link>
              {/*} <Link to="/browse?filter=Personal Development">
                Personal Development
      </Link> */}
              <Link to="/browse?filter=Media Takeaways">Media Takeaways</Link>
              <Link to="/browse?filter=Misc.">Misc.</Link>
            </div>
          </div>
        </div>
        <div className="theme-toggle-container">
          <span className="theme-icon light-theme-icon">🌞</span>
          <label className="theme-toggle-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
          <span className="theme-icon dark-theme-icon">🌜</span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
