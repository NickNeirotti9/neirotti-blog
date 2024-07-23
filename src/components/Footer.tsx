import React from "react";
import { Link } from "react-router-dom";
import "../assets/index.css";
import "../assets/footer.css";

const Footer = () => {
  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <button onClick={handleLogoClick} className="logoButton">
          existnchill
        </button>
        <Link to="/disclaimer" className="footer-link">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
