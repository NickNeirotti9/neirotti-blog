import React from "react";
import { BlogPost, formatDate } from "../lib/content";
import { getCategorySlug } from "../data/categories";
import ArticleBody from "./ArticleBody";
import "../assets/post.css";

interface PostArticleProps {
  post: BlogPost;
}

const spotifyEpisodeId = (url: string) =>
  url.split("/").pop()?.split("?")[0] || "";

/** The full article for a blog post: header, video, podcast, body. */
const PostArticle: React.FC<PostArticleProps> = ({ post }) => (
  <article className="post">
    <header className="postHeader">
      <h1 className="postTitle">{post.title}</h1>
      <div className="postMeta">
        <time dateTime={post.datePosted}>{formatDate(post.datePosted)}</time>
        <span className={`tag tag-${getCategorySlug(post.subcategory)} postCategory`}>
          {post.subcategory} / {post.subject}
        </span>
        {post.draft && <span className="draftBadge">Draft</span>}
      </div>
    </header>

    {post.youtubeID && (
      <div
        className="postVideo"
        style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
      >
        <iframe
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          src={`https://www.youtube.com/embed/${post.youtubeID}?rel=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post.title}
        ></iframe>
      </div>
    )}
    <br />

    {post.spotifyURL && (
      <div className="spotifyEmbed">
        <h2>Podcast:</h2>
        <iframe
          src={`https://open.spotify.com/embed/episode/${spotifyEpisodeId(post.spotifyURL)}`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="encrypted-media"
          title={`Spotify podcast episode ${post.title}`}
        ></iframe>
      </div>
    )}

    <ArticleBody
      body={post.body}
      quotes={post.quotes}
      summaryPoints={post.summaryPoints}
      resources={post.resources}
    />
  </article>
);

export default PostArticle;
