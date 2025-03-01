import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import "../assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const navigateToBROWSE = () => {
    navigate("/browse?filter=ALL");
    setIsMenuOpen(false);
  };

  // Input change handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
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
    setIsSearchOpen(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      (menuRef.current && menuRef.current.contains(event.target as Node)) ||
      (navbarRef.current && navbarRef.current.contains(event.target as Node)) ||
      (searchRef.current && searchRef.current.contains(event.target as Node))
    ) {
      return;
    }
    closeMenu();
    setIsSearchOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isSearchOpen, handleClickOutside]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <button className="search-toggle" onClick={toggleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <div
        ref={searchRef}
        className={`mobile-search-container ${isSearchOpen ? "open" : ""}`}
      >
        <form onSubmit={handleSearchSubmit}>
          <div
            className={`search-input-wrapper ${
              isInputFocused ? "focused" : ""
            }`}
          >
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
            <div className="icon-container">
              {searchQuery && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
              <button
                type="submit"
                className="search-button"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="logo">
        <Link to="/">existnchill</Link>
      </div>

      <button className="dropdown-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        ref={menuRef}
        className={`menu-and-toggle ${isMenuOpen ? "open" : ""}`}
      >
        <div className="menu">
          <div className="dropdown">
            <button className="dropbtn" onClick={navigateToBROWSE}>
              BROWSE
            </button>
            <div className="dropdown-content">
              <Link to="/browse?filter=STEM" onClick={closeMenu}>
                STEM
              </Link>
              <Link to="/browse?filter=HEALTH" onClick={closeMenu}>
                HEALTH
              </Link>
              <Link to="/browse?filter=LIFE" onClick={closeMenu}>
                LIFE
              </Link>
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
