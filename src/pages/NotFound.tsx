import React from "react";
import { Link } from "react-router-dom";
import "../assets/notfound.css";

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-motif sun-motif" aria-hidden="true"></div>
      <span className="eyebrow">Lost in space</span>
      <h1 className="notfound-code">404</h1>
      <p className="notfound-text">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-hard notfound-link">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
