import React from "react";
import "../assets/index.css";
import "../assets/footer.css"; // Ensure the CSS file is named 'footer.css'

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
          nick neirotti
        </button>
      </div>
      <div className="footerLinks">
        <a href="/suggestions" className="footerLink">
          Suggestions
        </a>
        <span className="footerSeparator">|</span>
        <a href="/contact" className="footerLink">
          Contact
        </a>
        <span className="footerSeparator">|</span>
        <a href="/disclaimer" className="footerLink">
          Disclaimer
        </a>
      </div>
    </footer>
  );
};

export default Footer;
