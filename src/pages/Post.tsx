import React from "react";
import { useParams } from "react-router-dom";
import blogPostsData from "../blogposts.json";
import PostCard from "../components/PostCard";
import "../assets/post.css";

// Define an interface for the structure of each blog post
interface IPost {
  id: number;
  title: string;
  datePosted: string;
  subcategory: string;
  subject: string;
  confidenceScore: number;
  youtubeID: string;
  summaryPoints?: string[]; // Assuming these exist in every post, make optional if not
  detailedContent: string; // Assuming this exists in every post, make optional if not
  practicalExamples?: string; // Assuming this exists in every post, make optional if not
  resources: { url: string; title: string; description: string }[];
  quotes?: { quote: string }[];
  relatedPosts?: number[];
  hook: string; // Add this if it's optional
  featured: boolean;
}

// The Post component
const Post: React.FC = () => {
  // Use useParams to get the current post ID from the URL
  const { id } = useParams<{ id: string }>();

  // Find the post that matches the ID
  const post = blogPostsData.find((post: IPost) => post.id.toString() === id);

  // If the post doesn't exist, render a not found message
  if (!post) {
    return <div>Post not found</div>;
  }

  // Function to "fetch" posts by ID – replace this with actual fetching logic if necessary
  const getPostById = (id: number): IPost | undefined => {
    return blogPostsData.find((post: IPost) => post.id === id);
  };

  // Retrieve the related posts using the relatedPostsIds
  const relatedPostsComponents = post.relatedPosts?.map((postId) => {
    const relatedPost = getPostById(postId);
    return relatedPost ? (
      <PostCard key={relatedPost.id} post={relatedPost} />
    ) : null;
  });

  // Helper function to render paragraphs from detailedContent
  const renderParagraphs = (content: string) => {
    const contentParts = content.split("\n");
    const contentElements: JSX.Element[] = [];

    let bulletList: string[] = [];

    contentParts.forEach((part, index) => {
      if (part.startsWith("*")) {
        // Add bullet point to the list (removing the asterisk)
        bulletList.push(part.substring(1).trim());
      } else {
        // Check if there are accumulated bullet points to render
        if (bulletList.length > 0) {
          // Add the bullet list to content elements
          contentElements.push(
            <ul key={`list-${index}`}>
              {bulletList.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
          bulletList = []; // Reset the bullet list for next accumulation
        }
        // For non-list content, add paragraphs with indent (if not empty)
        if (part.trim() !== "") {
          contentElements.push(<p key={index}>{part}</p>);
        }
      }
    });

    // Check if content ended with a bullet list
    if (bulletList.length > 0) {
      contentElements.push(
        <ul key="list-end">
          {bulletList.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    }

    return contentElements;
  };

  return (
    <div className="postPage">
      <article className="post">
        <header className="postHeader">
          <h1 className="postTitle">{post.title}</h1>
          <div className="postMeta">
            <time dateTime={post.datePosted}>
              {new Date(post.datePosted).toLocaleDateString()}
            </time>
            <span className="postCategory">
              {post.subcategory} / {post.subject}
            </span>
            <span>Confidence Score: {post.confidenceScore}</span>
          </div>
        </header>

        <div
          className="postVideo"
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

        <div className="postDetailedContent">
          {post.detailedContent && (
            <section className="postDetailedExplanation">
              <h2>Elaboration</h2>
              {renderParagraphs(post.detailedContent)}
            </section>
          )}

          {post.practicalExamples && (
            <section className="postPracticalExamples">
              <h2>Practical Examples</h2>
              <p>{post.practicalExamples}</p>
            </section>
          )}
          {/* Conditional rendering of sections if their respective data exists */}
          {post.summaryPoints && post.summaryPoints.length > 0 && (
            <section className="postSummaryPoints">
              <h2>Key Takeaways</h2>
              <ul>
                {post.summaryPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          {post.quotes && post.quotes.length > 0 && (
            <section className="postQuotes">
              <h2>Quotes I Like</h2>
              {post.quotes.map((quote, index) => (
                <div key={index} className="quoteItem">
                  <blockquote>{quote.quote}</blockquote>
                </div>
              ))}
            </section>
          )}

          {post.resources && post.resources.length > 0 && (
            <section className="postResources">
              <h2>Resources & References</h2>
              <div>
                {post.resources.map((resource, index) => (
                  <div key={index} className="resourceItem">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resourceTitle"
                    >
                      {resource.title}
                    </a>
                    <p className="resourceDescription">
                      {resource.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <div className="related">
        <h2>Related Posts</h2>
      </div>
      <div className="relatedContainer">
        <div className="postsContainer">{relatedPostsComponents}</div>
      </div>
    </div>
  );
};

export default Post;
