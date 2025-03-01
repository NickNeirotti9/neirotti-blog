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
  spotifyURL: string;
  summaryPoints?: string[];
  sections: { title: string; content: string }[];
  resources: { url: string; title: string; description: string }[];
  quotes?: { quote: string }[];
  relatedPosts?: number[];
  hook: string;
  featured: boolean;
}

const formatText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convert **bold** to <b>bold</b>
    .replace(/\[\[bold\]\](.*?)\[\[\/bold\]\]/g, "<b>$1</b>") // Support [[bold]]
    .replace(/_(.*?)_/g, "<i>$1</i>") // Italic
    .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
    .replace(/\[eq\](.*?)\[\/eq\]/g, "<div class='equation'>$1</div>") // Equations
    .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>") // Underline
    .replace(/\[img\](.*?)\[\/img\]/g, "<img src='$1' alt='image' />") // Images
    .replace(
      /\[link (.*?)\]\((.*?)\)/g,
      "<a href='$2' target='_blank' rel='noopener noreferrer'>$1</a>"
    )
    .replace(
      /\[center\](.*?)\[\/center\]/g,
      "<div style='text-align: center;'>$1</div>"
    ) // Centered Text
    .replace(/\[sub\](.*?)\[\/sub\]/g, "<sub>$1</sub>") // Subscript
    .replace(/\[sup\](.*?)\[\/sup\]/g, "<sup>$1</sup>") // Superscript
    .replace(
      /(?:\n|^)\*(.*?)$/gm,
      (match, p1) => `<li>${p1.trim()}</li>` // Convert * item into <li>item</li>
    );
};

const renderTable = (content: string) => {
  const lines = content.trim().split("\n");
  if (lines.length < 2 || !lines[0].includes("|")) return null;

  // Ensure all rows have the same number of columns as the header
  const headers = lines[0]
    .split("|")
    .map((col) => col.trim())
    .filter((col) => col !== ""); // Remove empty columns

  const rows = lines.slice(1).map(
    (line) =>
      line
        .split("|")
        .map((col) => col.trim())
        .filter((col) => col !== "") // Remove empty columns
  );

  return (
    <table className="postTable">
      <thead>
        <tr>
          {headers.map((col, i) => (
            <th
              key={`th-${i}`}
              dangerouslySetInnerHTML={{
                __html: formatText(col),
              }}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`tr-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <td
                key={`td-${rowIndex}-${colIndex}`}
                dangerouslySetInnerHTML={{
                  __html: formatText(col.replace(/<br\s*\/?>/g, "\n")),
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const renderParagraphs = (content: string) => {
  const contentParts = content.split("\n\n");
  const contentElements: JSX.Element[] = [];

  contentParts.forEach((part, index) => {
    if (part.trim() === "[hr]") {
      contentElements.push(<hr key={`hr-${index}`} />);
    } else if (part.includes("|")) {
      const tableElement = renderTable(part);
      if (tableElement) {
        contentElements.push(
          <div key={`table-${index}`} className="tableWrapper">
            {tableElement}
          </div>
        );
        return;
      }
    } else {
      // Handle parts that may contain [hr] within the text
      const subParts = part.split("[hr]");
      subParts.forEach((subPart, subIndex) => {
        if (subPart.trim().startsWith("*")) {
          const bulletPoints = subPart.split("\n").map((bullet, idx) => {
            // Apply formatting
            const formattedBullet = formatText(
              bullet.replace(/^\*/, "").trim()
            );

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
        } else if (/^\d+(\.|\))/.test(subPart.trim())) {
          const numberedPoints = subPart.split("\n").map((numLine, idx) => {
            // Remove the leading "1." or "1)" from each line
            const formattedNumber = formatText(
              numLine.replace(/^\d+(\.|\))/, "").trim()
            );

            return (
              <li
                key={`${index}-${subIndex}-${idx}`}
                dangerouslySetInnerHTML={{ __html: formattedNumber }}
              />
            );
          });

          contentElements.push(
            <ol key={`numlist-${index}-${subIndex}`}>{numberedPoints}</ol>
          );
        } else {
          const lines = subPart.split("\n").map((line, idx) => {
            // Apply formatting
            const formattedLine = formatText(line);
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
  const tocItems = post.sections.map((section, index) => {
    // Check if the title starts with a subchapter format (e.g., "5.1", "5.1.1")
    const subchapterMatch = section.title.match(/^(\d+(\.\d+)*)/);
    const isSubchapter = !!subchapterMatch;

    // Correct the main numbering by only counting main chapters dynamically
    const mainIndex = post.sections
      .slice(0, index + 1) // Look at all sections up to current index
      .filter((sec) => !/^\d+\.\d+/.test(sec.title)).length; // Count only main chapters

    const displayNumber = isSubchapter ? subchapterMatch[1] : mainIndex; // Use extracted subchapter or main index

    return (
      <li
        key={index}
        style={{
          marginLeft: subchapterMatch
            ? `${(subchapterMatch[1].split(".").length - 1) * 20}px`
            : "0px",
        }}
      >
        <a href={`#${generateIdFromTitle(section.title)}`} className="toc-link">
          {displayNumber}) {section.title.replace(/^(\d+(\.\d+)*)\s*/, "")}
        </a>
      </li>
    );
  });

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
    // Count only main chapters (excluding subchapters like 5.1, 5.1.1)
    const mainChaptersCount = post.sections.filter(
      (sec) => !/^\d+\.\d+/.test(sec.title)
    ).length;

    tocItems.push(
      <li key="resources">
        <a href="#resources-references" className="toc-link">
          {mainChaptersCount + 1}) Resources & References
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
        <br></br>
        {post.spotifyURL && (
          <div className="spotifyEmbed">
            <h2>Podcast:</h2>
            <iframe
              src={`https://open.spotify.com/embed/episode/${
                post.spotifyURL?.split("/").pop()?.split("?")[0] || ""
              }`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="encrypted-media"
              title={`Spotify podcast episode ${post.title}`}
            ></iframe>
          </div>
        )}

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
              <h2
                style={{
                  fontSize: section.title.match(/^\d+\.\d+\.\d+/)
                    ? "26px"
                    : section.title.match(/^\d+\.\d+/)
                    ? "32px"
                    : "38px",
                }}
              >
                {section.title.replace(/^(\d+(\.\d+)*)\s*/, "")}
              </h2>

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
