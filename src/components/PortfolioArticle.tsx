import React from "react";
import { PortfolioItem, formatDate } from "../lib/content";
import ArticleBody from "./ArticleBody";
import "../assets/post.css";

interface PortfolioArticleProps {
  item: PortfolioItem;
}

// Portfolio images live in src/assets/images and are referenced by file name.
export const getPortfolioImage = (imageName: string): string | null => {
  if (!imageName) return null;
  try {
    return require(`../assets/images/${imageName}`);
  } catch {
    return null;
  }
};

/** The full article for a portfolio item: header, dates, media, body. */
const PortfolioArticle: React.FC<PortfolioArticleProps> = ({ item }) => {
  const imageSrc = !item.youtubeID ? getPortfolioImage(item.image) : null;
  return (
    <article className="post">
      <header className="postHeader">
        <h1 className="postTitle">{item.title}</h1>
      </header>
      <div className="postMeta">
        <time dateTime={item.dateFrom}>
          {formatDate(item.dateFrom)} – {item.dateTo ? formatDate(item.dateTo) : "Present"}
        </time>
        <span className="postCategory"></span>
      </div>

      {item.youtubeID ? (
        <div
          className="postVideo"
          style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
        >
          <iframe
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            src={`https://www.youtube.com/embed/${item.youtubeID}?rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title}
          ></iframe>
        </div>
      ) : imageSrc ? (
        <img src={imageSrc} alt={item.title} className="postHeroImage" />
      ) : null}
      <br />

      <ArticleBody
        body={item.body}
        summaryPoints={item.summaryPoints}
        resources={item.resources}
      />
    </article>
  );
};

export default PortfolioArticle;
