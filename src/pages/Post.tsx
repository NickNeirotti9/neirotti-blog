import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import blogPostsData from "../blogposts.json";
import PostCard from "../components/PostCard";
import "../assets/post.css";

interface IPost {
  id: number;
  title: string;
  datePosted: string;
  subcategory: string;
  subject: string;
  youtubeID: string;
  summaryPoints?: string[];
  sections: { title: string; content: string }[];
  resources: { url: string; title: string; description: string }[];
  quotes?: { quote: string }[];
  relatedPosts?: number[];
  hook: string;
  featured: boolean;
}

const renderParagraphs = (content: string) => {
  const contentParts = content.split("\n\n");
  const contentElements: JSX.Element[] = [];

  contentParts.forEach((part, index) => {
    if (part.trim() === "[hr]") {
      contentElements.push(<hr key={`hr-${index}`} />);
    } else {
      // Handle parts that may contain [hr] within the text
      const subParts = part.split("[hr]");
      subParts.forEach((subPart, subIndex) => {
        if (subPart.trim() === "") {
          contentElements.push(<hr key={`hr-${index}-${subIndex}`} />);
        } else if (subPart.trim().startsWith("*")) {
          const bulletPoints = subPart.split("\n").map((bullet, idx) => {
            // Apply formatting
            const formattedBullet = bullet
              .replace(/_(.*?)_/g, "<i>$1</i>") // Italic
              .replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, "<b>$1</b>") // Bold
              .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
              .replace(/\[eq\](.*?)\[\/eq\]/g, "<div class='equation'>$1</div>") // Equation
              .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>") // Underline
              .replace(/\[img\](.*?)\[\/img\]/g, "<img src='$1' alt='image' />") // Image
              .replace(
                /\[link (.*?)\]\((.*?)\)/g,
                "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
              ); // Custom link syntax

            return (
              <li
                key={`${index}-${subIndex}-${idx}`}
                dangerouslySetInnerHTML={{
                  __html: formattedBullet.replace(/^\*/, "").trim(),
                }}
              />
            );
          });

          contentElements.push(
            <ul key={`list-${index}-${subIndex}`}>{bulletPoints}</ul>
          );
        } else {
          const lines = subPart.split("\n").map((line, idx) => {
            // Apply formatting
            const formattedLine = line
              .replace(/_(.*?)_/g, "<i>$1</i>") // Italic
              .replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, "<b>$1</b>") // Bold
              .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
              .replace(/\[eq\](.*?)\[\/eq\]/g, "<div class='equation'>$1</div>") // Equation
              .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>") // Underline
              .replace(/\[img\](.*?)\[\/img\]/g, "<img src='$1' alt='image' />") // Image
              .replace(
                /\[link (.*?)\]\((.*?)\)/g,
                "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
              );

            // Check if line should be indented
            const isIndented =
              formattedLine.startsWith("\t") ||
              formattedLine.startsWith("[indent]");

            const cleanLine = formattedLine
              .replace(/^\t|\[indent\]/, "")
              .trim();

            return (
              <p
                key={`${index}-${subIndex}-${idx}`}
                style={isIndented ? { textIndent: "2em" } : {}}
                dangerouslySetInnerHTML={{ __html: cleanLine }}
              />
            );
          });

          contentElements.push(<div key={`${index}-${subIndex}`}>{lines}</div>);
        }
      });
    }
  });

  return contentElements;
};

const generateIdFromTitle = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPostsData.find((post: IPost) => post.id.toString() === id);

  useEffect(() => {
    const handleSmoothScroll = (event: Event) => {
      event.preventDefault();
      const targetId = (event.currentTarget as HTMLAnchorElement)
        .getAttribute("href")
        ?.substring(1);
      const targetElement = document.getElementById(targetId!);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const tocLinks = document.querySelectorAll(".toc-link");
    tocLinks.forEach((link) =>
      link.addEventListener("click", handleSmoothScroll)
    );

    return () => {
      tocLinks.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);

  if (!post) {
    return <div>Post not found</div>;
  }

  const getPostById = (id: number): IPost | undefined => {
    return blogPostsData.find((post: IPost) => post.id === id);
  };

  const relatedPostsComponents = post.relatedPosts?.map((postId) => {
    const relatedPost = getPostById(postId);
    return relatedPost ? (
      <PostCard key={relatedPost.id} post={relatedPost} />
    ) : null;
  });

  // Generate Table of Contents
  const tocItems = post.sections.map((section, index) => (
    <li key={index}>
      <a href={`#${generateIdFromTitle(section.title)}`} className="toc-link">
        {index + 1}) {section.title}
      </a>
    </li>
  ));

  if (post.quotes && post.quotes.length > 0) {
    tocItems.push(
      <li key="quotes">
        <a href="#quotes-i-like" className="toc-link">
          {tocItems.length + 1}) Quotes I Like
        </a>
      </li>
    );
  }

  if (post.summaryPoints && post.summaryPoints.length > 0) {
    tocItems.push(
      <li key="summaryPoints">
        <a href="#key-takeaways" className="toc-link">
          {tocItems.length + 1}) Key Takeaways
        </a>
      </li>
    );
  }

  if (post.resources && post.resources.length > 0) {
    tocItems.push(
      <li key="resources">
        <a href="#resources-references" className="toc-link">
          {tocItems.length + 1}) Resources & References
        </a>
      </li>
    );
  }

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
          </div>
        </header>

        <div
          className="postVideo"
          style={{
            position: "relative",
            paddingBottom: "56.25%",
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
            src={`https://www.youtube.com/embed/${post.youtubeID}?rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post.title}
          ></iframe>
        </div>

        <nav className="postToc">
          <h2>Table of Contents</h2>
          <ul>{tocItems}</ul>
        </nav>

        <div className="postDetailedContent">
          {post.sections.map((section, index) => (
            <section
              key={index}
              id={generateIdFromTitle(section.title)}
              className="postSection"
            >
              <h2>{section.title}</h2>
              {renderParagraphs(section.content)}
            </section>
          ))}

          {post.quotes && post.quotes.length > 0 && (
            <section id="quotes-i-like" className="postQuotes">
              <h2>Quotes I Like</h2>
              {post.quotes.map((quote, index) => (
                <div key={index} className="quoteItem">
                  <blockquote>{quote.quote}</blockquote>
                </div>
              ))}
            </section>
          )}

          {post.summaryPoints && post.summaryPoints.length > 0 && (
            <section id="key-takeaways" className="postSummaryPoints">
              <h2>Key Takeaways</h2>
              <ul>
                {post.summaryPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>
          )}

          {post.resources && post.resources.length > 0 && (
            <section id="resources-references" className="postResources">
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
        <h2>You Might Like</h2>
      </div>
      <div className="relatedContainer">
        <div className="postsContainer">{relatedPostsComponents}</div>
      </div>
    </div>
  );
};

export default Post;
