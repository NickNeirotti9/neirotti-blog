import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/postcard.css";

interface Post {
  id: number;
  title: string;
  hook: string;
  youtubeID: string;
  subcategory: string;
  subject: string;
  confidenceScore: number;
  datePosted: string;
  featured: boolean;
}

interface PostCardProps {
  post: Post;
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
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          src={`https://www.youtube.com/embed/${post.youtubeID}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post.title}
        ></iframe>
      </div>
      <div className="postCardDetails">
        <h2>{post.title}</h2>
        <p>{post.hook}</p>
        <p>Category: {`${post.subcategory} / ${post.subject}`}</p>
        <p>Confidence Score: {post.confidenceScore}</p>
        <p>Date Posted: {new Date(post.datePosted).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PostCard;
