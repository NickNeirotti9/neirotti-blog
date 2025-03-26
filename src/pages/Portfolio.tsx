import React from "react";
import styles from "../assets/Portfolio.module.css";
import portfolioItems from "../portfolioItems.json";
import { useNavigate } from "react-router-dom";

// Dynamically require images from src
const getImage = (imageName: string) => {
  try {
    return require(`../assets/images/${imageName}`);
  } catch {
    return null;
  }
};

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  const sortedPortfolioItems = portfolioItems.sort((a, b) => {
    const endDateA = a.dateTo ? new Date(a.dateTo) : new Date();
    const endDateB = b.dateTo ? new Date(b.dateTo) : new Date();

    // First sort by endDate (dateTo if it exists, or Present)
    if (endDateB.getTime() !== endDateA.getTime()) {
      return endDateB.getTime() - endDateA.getTime();
    }

    // If end dates are equal (both "Present"), fallback to dateFrom
    const startDateA = new Date(a.dateFrom);
    const startDateB = new Date(b.dateFrom);

    return startDateB.getTime() - startDateA.getTime();
  });

  const handleCardClick = (slug: string) => {
    navigate(`/portfolio/${slug}`);
  };

  return (
    <div className={styles.portfolioContainer}>
      <h1 className={styles.portfolioTitle}>Nick Neirotti</h1>
      <p className={styles.portfolioDescription}>
        Welcome to my portfolio! Here are some selected projects showcasing my
        experience, skills, and interests.
      </p>
      <div className={styles.itemsGrid}>
        {sortedPortfolioItems.map((item, index) => {
          const imageSrc = item.image ? getImage(item.image) : null;

          return (
            <div
              key={index}
              className={styles.portfolioItem}
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
                {new Date(item.dateFrom).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                –{" "}
                {item.dateTo
                  ? new Date(item.dateTo).toLocaleDateString("en-US", {
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
