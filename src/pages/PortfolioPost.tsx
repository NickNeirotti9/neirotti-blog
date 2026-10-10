import React from "react";
import { useParams } from "react-router-dom";
import { getPortfolioItem } from "../lib/content";
import PortfolioArticle from "../components/PortfolioArticle";
import "../assets/post.css";

const PortfolioPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getPortfolioItem(slug) : undefined;

  if (!item) {
    return <div className="postPage">Post not found</div>;
  }

  return (
    <div className="postPage">
      <PortfolioArticle item={item} />
    </div>
  );
};

export default PortfolioPost;
