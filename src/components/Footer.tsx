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
      <div className="logo">
        <button onClick={handleLogoClick} className="logoButton">
          existnchill
        </button>
      </div>
      <div className="footerLinks">
        {/* <Link to="/contact" className="footerLink">
          Contact
        </Link> 
        <span className="footerSeparator">|</span>*/}
        <Link to="/disclaimer" className="footerLink">
          Disclaimer
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
