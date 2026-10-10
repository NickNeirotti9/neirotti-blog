import React from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../lib/content";
import PostArticle from "../components/PostArticle";
import PostCard from "../components/PostCard";
import "../assets/post.css";

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return <div className="postPage">Post not found</div>;
  }

  const relatedPosts = post.relatedPosts
    .map((relatedId) => getPostById(relatedId))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="postPage">
      <PostArticle post={post} />
      {relatedPosts.length > 0 && (
        <>
          <div className="related">
            <h2>You Might Like</h2>
          </div>
          <div className="relatedContainer">
            <div className="postsContainer">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
