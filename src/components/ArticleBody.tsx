import React, { useEffect, useMemo, useRef } from "react";
import { parseBody, Section } from "../lib/markup";
import { Resource } from "../lib/content";
import "katex/dist/katex.min.css";

interface ArticleBodyProps {
  /** Markdown body (see src/lib/markup.ts for the format) */
  body: string;
  quotes?: string[];
  summaryPoints?: string[];
  resources?: Resource[];
}

interface TocEntry {
  id: string;
  label: string;
  level: 1 | 2 | 3;
}

const scrollToId = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const href = event.currentTarget.getAttribute("href") || "";
  const target = document.getElementById(href.replace(/^#/, ""));
  if (target) {
    event.preventDefault();
    window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }
};

const Heading: React.FC<{ section: Section }> = ({ section }) => {
  const className = `sectionHeading level-${section.level}`;
  if (section.level === 1) return <h2 className={className}>{section.title}</h2>;
  if (section.level === 2) return <h3 className={className}>{section.title}</h3>;
  return <h4 className={className}>{section.title}</h4>;
};

/**
 * Table of contents + the rendered body + the optional closing sections.
 * Used by the live post and portfolio pages and by the /editor preview.
 */
const ArticleBody: React.FC<ArticleBodyProps> = ({
  body,
  quotes = [],
  summaryPoints = [],
  resources = [],
}) => {
  const parsed = useMemo(() => parseBody(body), [body]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Equations are typeset after render, and the KaTeX library is only
  // downloaded for posts that actually contain one.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-math]"));
    if (!nodes.length) return;
    let cancelled = false;
    import("katex").then(({ default: katex }) => {
      if (cancelled) return;
      nodes.forEach((el) => {
        el.innerHTML = katex.renderToString(el.dataset.latex || "", {
          displayMode: el.dataset.math === "block",
          throwOnError: false,
          strict: "ignore",
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, [parsed]);

  const chapters = parsed.sections.filter((s) => s.level === 1).length;
  const toc: TocEntry[] = parsed.sections.map((s) => ({
    id: s.id,
    label: `${s.number}) ${s.title}`,
    level: s.level,
  }));
  let extra = chapters;
  if (quotes.length) toc.push({ id: "quotes-i-like", label: `${++extra}) Quotes I Like`, level: 1 });
  if (summaryPoints.length) toc.push({ id: "key-takeaways", label: `${++extra}) Key Takeaways`, level: 1 });
  if (resources.length) toc.push({ id: "resources-references", label: `${++extra}) Resources & References`, level: 1 });

  return (
    <>
      {toc.length > 0 && (
        <nav className="postToc">
          <h2>Table of Contents</h2>
          <ul>
            {toc.map((entry) => (
              <li key={entry.id} style={{ marginLeft: `${(entry.level - 1) * 20}px` }}>
                <a href={`#${entry.id}`} className="toc-link" onClick={scrollToId}>
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="postDetailedContent" ref={contentRef}>
        {parsed.preamble.trim() && (
          <div className="postPreamble" dangerouslySetInnerHTML={{ __html: parsed.preamble }} />
        )}

        {parsed.sections.map((section) => (
          <section key={section.id} id={section.id} className="postSection">
            <Heading section={section} />
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          </section>
        ))}

        {quotes.length > 0 && (
          <section id="quotes-i-like" className="postQuotes">
            <h2>Quotes I Like</h2>
            {quotes.map((quote, index) => (
              <div key={index} className="quoteItem">
                <blockquote>{quote}</blockquote>
              </div>
            ))}
          </section>
        )}

        {summaryPoints.length > 0 && (
          <section id="key-takeaways" className="postSummaryPoints">
            <h2>Key Takeaways</h2>
            <ul>
              {summaryPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {resources.length > 0 && (
          <section id="resources-references" className="postResources">
            <h2>Resources & References</h2>
            <div>
              {resources.map((resource, index) => (
                <div key={index} className="resourceItem">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resourceTitle"
                  >
                    {resource.title}
                  </a>
                  {resource.description && (
                    <p className="resourceDescription">{resource.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ArticleBody;
