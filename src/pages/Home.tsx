import React from "react";
import styles from "../assets/home.module.css";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import blogPostsData from "../blogposts.json";

const Home: React.FC = () => {
  const mostRecentPost = blogPostsData.sort(
    (a, b) =>
      new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  )[0];

  const sortedPosts = blogPostsData.sort(
    (a, b) =>
      new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  );
  const recentPosts = sortedPosts.slice(1, 4);

  // Construct the iframe src URL using the most recent post's youtubeID
  const iframeSrc = `https://www.youtube.com/embed/${mostRecentPost.youtubeID}?autoplay=0&rel=0`;

  const featuredPosts = React.useMemo(() => {
    // Filter posts to only include those marked as featured
    const featured = blogPostsData.filter((post) => post.featured === true);
    return featured;
  }, []);

  return (
    <div className={styles.homepageContent}>
      <div className={styles.fullWidthSection}>
        <h2 className={styles.sectionTitle}>About the Page</h2>
        <div className={styles.latestSection}>
          <div className={styles.videoContainer2}>
            <iframe
              src="https://www.youtube.com/embed/TuZIZ_UdWOQ?si=AIMy-PAvundr0EZk?autoplay=0&rel=0"
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
              <br></br>I'm not an expert on anything I plan to talk about here
              but I rely on the shoulders of giants. Unfortunately, these giants
              usually explain things in a way that takes extensive effort to
              grasp practically.
              <br></br>
              <br></br>My goal is to simplify concepts I find interesting, often
              stashed in time-consuming media or gated by cost. I hope you find
              some of it valuable!
            </p>
            <div style={{ textAlign: "center" }}>
              {" "}
              {/* Inline style for demonstration */}
              <Link to="/about" className={styles.learnMoreButton}>
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.fullWidthSection}>
        <h2 className={styles.sectionTitle}>Latest</h2>
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
            <p>{new Date(mostRecentPost.datePosted).toLocaleDateString()}</p>

            <Link
              to={`/browse?filter=${encodeURIComponent(
                mostRecentPost.subcategory
              )}`}
              className={styles.filterLink}
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
            <p>Confidence Score: {mostRecentPost.confidenceScore}</p>

            <Link
              to={`/post/${mostRecentPost.id}`}
              className={styles.learnMoreButton}
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="postsContainer">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <h2 className={styles.sectionTitle2}>Featured</h2>
        <div className="postsContainer">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className={styles.section2}>
          <h2 className={styles.sectionTitle2}>Browse</h2>
          <div className={styles.categoriesContainer}>
            <div className={styles.category}>
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

            <div className={styles.category}>
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
              <Link to={`/browse?filter=Mindfulness`} className={styles.link}>
                Mindfulness
              </Link>
              <Link
                to={`/browse?filter=General Wellness`}
                className={styles.link}
              >
                General Wellness
              </Link>
            </div>

            <div className={styles.category}>
              <Link to={`/browse?filter=LIFE`} className={styles.categoryTitle}>
                <h3>LIFE</h3>
              </Link>
              <Link to={`/browse?filter=Philosophy`} className={styles.link}>
                Philosophy
              </Link>
              <Link to={`/browse?filter=Ecology`} className={styles.link}>
                Ecology
              </Link>
              <Link
                to={`/browse?filter=Media Takeaways`}
                className={styles.link}
              >
                Media Takeaways
              </Link>
              <Link to={`/browse?filter=Misc.`} className={styles.link}>
                Misc.
              </Link>
            </div>
          </div>
          <Link to={`/browse?filter=Browse All`} className={styles.aboutButton}>
            Browse All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
