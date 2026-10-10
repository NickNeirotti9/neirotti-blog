import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/postcard.css";
import { getCategorySlug } from "../data/categories";
import { BlogPost, formatDate } from "../lib/content";

export type PostCardData = Pick<
  BlogPost,
  "id" | "title" | "hook" | "youtubeID" | "subcategory" | "subject" | "datePosted"
> &
  Partial<Pick<BlogPost, "featured" | "draft">>;

interface PostCardProps {
  post: PostCardData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div
      className="postCard"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div
        className="postCardVideo"
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 Aspect Ratio */,
          height: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${post.youtubeID}/maxresdefault.jpg`}
          alt={post.title}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="postCardDetails">
        <span className={`tag tag-${getCategorySlug(post.subcategory)}`}>
          {post.subcategory} / {post.subject}
        </span>
        {post.draft && <span className="draftBadge">Draft</span>}
        <h2>{post.title}</h2>
        <p className="hook-margin">{post.hook}</p>
        <p className="postCardDate">{formatDate(post.datePosted)}</p>
      </div>
    </div>
  );
};

export default PostCard;
