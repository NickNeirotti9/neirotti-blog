import React from "react";
import styles from "../assets/home.module.css";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { posts, postsByDate, formatDate } from "../lib/content";
import { getCategorySlug } from "../data/categories";

const Home: React.FC = () => {
  const mostRecentPost = postsByDate()[0];

  // Construct the iframe src URL using the most recent post's youtubeID
  const iframeSrc = `https://www.youtube.com/embed/${mostRecentPost.youtubeID}?autoplay=0&rel=0`;

  const featuredPosts = React.useMemo(() => {
    // Filter posts to only include those marked as featured
    const featured = posts.filter((post) => post.featured === true);
    return featured;
  }, []);

  return (
    <div className={styles.homepageContent}>
      <div className={styles.heroBlock} aria-hidden="true"></div>
      <div className={styles.fullWidthSection}>
        <div className={styles.sectionHeading}>
          <span className="eyebrow">Welcome</span>
          <h2 className={styles.sectionTitle}>About the Page</h2>
        </div>
        <div className={styles.aboutSection}>
          <div className={styles.videoContainer2}>
            <iframe
              src="https://www.youtube.com/embed/drsJuptygaQ?si=32J2Lx63s127_JjA?autoplay=0&rel=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className={styles.infoContainer}>
            <p>
              Welcome to my website!
              <br></br>
              <br></br>My goal is to simplify concepts I find interesting, often
              stashed in time-consuming media or gated by cost. I hope you find
              some of it valuable!
            </p>
            <div style={{ textAlign: "center" }}>
              {" "}
              {/* Inline style for demonstration */}
              <Link
                to="/about"
                className={`${styles.learnMoreButton} btn-hard`}
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.fullWidthSection}>
        <div className={styles.sectionHeading}>
          <span className="eyebrow">From The Channel</span>
          <h2 className={styles.sectionTitle}>Latest</h2>
        </div>
        <div className={styles.latestSection}>
          <div className={styles.videoContainer2}>
            <iframe
              src={iframeSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className={styles.infoContainer}>
            <p>{formatDate(mostRecentPost.datePosted)}</p>
            <Link
              to={`/browse?filter=${encodeURIComponent(
                mostRecentPost.subcategory,
              )}`}
              className={`tag tag-${getCategorySlug(mostRecentPost.subcategory)} ${styles.filterLink}`}
            >
              {mostRecentPost.subcategory} / {mostRecentPost.subject}
            </Link>

            <Link
              to={`/post/${mostRecentPost.id}`}
              className={styles.latestTitle}
            >
              <h2>{mostRecentPost.title}</h2>
            </Link>
            <p>{mostRecentPost.hook}</p>

            <Link
              to={`/post/${mostRecentPost.id}`}
              className={`${styles.learnMoreButton} btn-hard`}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className={styles.sectionHeading}>
          <span className="eyebrow">Worth A Watch</span>
          <h2 className={styles.sectionTitle2}>Featured</h2>
        </div>
        <div className="postsContainer">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className={styles.section2}>
          <div className={styles.sectionHeading}>
            <span className="eyebrow">Find Your Thing</span>
            <h2 className={styles.sectionTitle2}>Browse</h2>
          </div>
          <div className={styles.categoriesContainer}>
            <div className={`${styles.category} ${styles.categoryStem}`}>
              <Link to={`/browse?filter=STEM`} className={styles.categoryTitle}>
                <h3>STEM</h3>
              </Link>
              <Link to={`/browse?filter=Science`} className={styles.link}>
                Science
              </Link>
              <Link to={`/browse?filter=Technology`} className={styles.link}>
                Technology
              </Link>
              <Link to={`/browse?filter=Engineering`} className={styles.link}>
                Engineering
              </Link>
              <Link to={`/browse?filter=Mathematics`} className={styles.link}>
                Mathematics
              </Link>
            </div>

            <div className={`${styles.category} ${styles.categoryHealth}`}>
              <Link
                to={`/browse?filter=HEALTH`}
                className={styles.categoryTitle}
              >
                <h3>HEALTH</h3>
              </Link>
              <Link to={`/browse?filter=Nutrition`} className={styles.link}>
                Nutrition
              </Link>
              <Link to={`/browse?filter=Fitness`} className={styles.link}>
                Fitness
              </Link>
              <Link to={`/browse?filter=Lifestyle`} className={styles.link}>
                Lifestyle
              </Link>
              <Link to={`/browse?filter=Body`} className={styles.link}>
                Body Systems
              </Link>
            </div>

            <div className={`${styles.category} ${styles.categoryMind}`}>
              <Link to={`/browse?filter=MIND`} className={styles.categoryTitle}>
                <h3>MIND</h3>
              </Link>
              <Link to={`/browse?filter=Philosophy`} className={styles.link}>
                Philosophy
              </Link>
              <Link to={`/browse?filter=Psychology`} className={styles.link}>
                Psychology
              </Link>
              <Link to={`/browse?filter=Consciousness`} className={styles.link}>
                Consciousness
              </Link>
              <Link to={`/browse?filter=Reflections`} className={styles.link}>
                Reflections
              </Link>
            </div>
          </div>
          <Link
            to={`/browse?filter=ALL`}
            className={`${styles.aboutButton} btn-hard`}
          >
            Browse All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
