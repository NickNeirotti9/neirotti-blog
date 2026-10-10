import React from "react";
import styles from "../assets/Portfolio.module.css";
import { portfolioItems, parseDate } from "../lib/content";
import { getPortfolioImage } from "../components/PortfolioArticle";
import { useNavigate } from "react-router-dom";

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  const sortedPortfolioItems = [...portfolioItems].sort((a, b) => {
    const endDateA = a.dateTo ? parseDate(a.dateTo) : new Date();
    const endDateB = b.dateTo ? parseDate(b.dateTo) : new Date();

    // First sort by endDate (dateTo if it exists, or Present)
    if (endDateB.getTime() !== endDateA.getTime()) {
      return endDateB.getTime() - endDateA.getTime();
    }

    // If end dates are equal (both "Present"), fallback to dateFrom
    const startDateA = parseDate(a.dateFrom);
    const startDateB = parseDate(b.dateFrom);

    return startDateB.getTime() - startDateA.getTime();
  });

  const handleCardClick = (slug: string) => {
    navigate(`/portfolio/${slug}`);
  };

  return (
    <div className={styles.portfolioContainer}>
      <span className={`eyebrow ${styles.portfolioEyebrow}`}>Portfolio</span>
      <h1 className={styles.portfolioTitle}>Nick Neirotti</h1>
      <p className={styles.portfolioDescription}>
        Welcome to my portfolio! Here are some selected projects showcasing my
        experience, skills, and interests.
      </p>
      <div className={styles.itemsGrid}>
        {sortedPortfolioItems.map((item, index) => {
          const imageSrc = getPortfolioImage(item.image);

          return (
            <div
              key={index}
              className={`${styles.portfolioItem} card-hard card-hard-hover`}
              onClick={() => handleCardClick(item.slug)}
            >
              <h3 className={styles.itemTitle}>{item.title}</h3>

              {item.youtubeID ? (
                <img
                  src={`https://img.youtube.com/vi/${item.youtubeID}/maxresdefault.jpg`}
                  alt={item.title}
                  className={styles.portfolioThumbnail}
                />
              ) : imageSrc ? (
                <img
                  src={imageSrc}
                  alt={item.title}
                  className={styles.portfolioImage}
                />
              ) : null}

              <p className={styles.portfolioDescription}>{item.description}</p>
              <p className={styles.itemDate}>
                {parseDate(item.dateFrom).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                –{" "}
                {item.dateTo
                  ? parseDate(item.dateTo).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Present"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
