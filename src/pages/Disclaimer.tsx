import React from "react";
import "../assets/disclaimer.css";

const Disclaimer: React.FC = () => {
  return (
    <div className="disclaimer-outer">
      <div className="disclaimer-container">
        <h2 className="disclaimer-title">Disclaimer</h2>
        <p className="disclaimer-text">
          Hey there! The content on this website is for informational and
          educational purposes only. While I do my best to keep everything
          accurate and up-to-date, I'm not perfect so some mistakes might sneak
          in (sorry).
        </p>
        <p className="disclaimer-text">
          If you’re making any big decisions based on what you find here, please
          double-check with a professional in the relevant field.
        </p>
        <p className="disclaimer-text">
          Everything on this site—text, images, videos, and more—belongs to
          existnchill unless otherwise noted. If you’d like to use anything,
          just ask first! I’m all for creative remixes and meaningful additions,
          but reposting for profit isn't cool. Also, my content may not be used
          for AI or ML training without my explicit permission.
        </p>
        <p className="disclaimer-text">Thanks for stopping by!</p>
      </div>
    </div>
  );
};

export default Disclaimer;
