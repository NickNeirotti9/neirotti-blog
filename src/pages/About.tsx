import React, { useState } from "react";
import styles from "../assets/About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSpotify,
  faLetterboxd,
} from "@fortawesome/free-brands-svg-icons";
//import { Link } from "react-router-dom";
//import myImage from "../assets/images/aboutIMG.png";
import myImage from "../assets/images/IMG_0004.png";

const About: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>About Me</h1>
        <div className={styles.imageWrapper}>
          <img className={styles.aboutImage} src={myImage} alt="About me" />
        </div>
        <p className={styles.aboutDescription}>
          Hey! I'm Nick Neirotti, and I created this platform out of my passion
          for learning and teaching. I believe that education is a fundamental
          force that shapes our identities and societies, making its
          accessibility crucial for everyone's well-being. Here, I strive to
          inspire empathy, rationality, and open-mindedness. I hope your
          experience reflects that vision.
        </p>
        {/* <Link to="/portfolio" className={styles.learnMoreButton}>
          My Portfolio
        </Link> */}
        <div className={styles.socialLinks}>
          <a
            href="https://www.linkedin.com/in/nickneirotti"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://open.spotify.com/user/nert118"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
          >
            <FontAwesomeIcon icon={faSpotify} size="2x" />
          </a>
          <a
            href="https://letterboxd.com/nert118"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLetterboxd} size="2x" />
          </a>
          <a
            href="https://venmo.com/nert118"
            target="_blank"
            rel="noreferrer"
            aria-label="Venmo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M373.8 32c47.8 0 74.2 30.5 74.2 92.4 0 121.1-92.7 261.4-168.8 356.2H158.6L113.5 32h105.1l23.9 241.5c28.4-45.2 63.6-116.5 63.6-167.2 0-26.3-4.5-42.5-11.9-57.4h79.6z" />
            </svg>
          </a>
        </div>
        <h2>Why These Categories?</h2>
        <div className={styles.dropdownSection}>
          <button
            className={styles.dropdownHeader}
            onClick={() => toggleSection("STEM")}
          >
            STEM
          </button>
          {openSection === "STEM" && (
            <p className={styles.dropdownContent}>
              As an engineer, I naturally find STEM topics relevant and
              endlessly fascinating. There's so much to learn, more than anyone
              could ever fully grasp. Understanding STEM subjects helps us
              develop a better sense of how the world works, which in turn makes
              us appreciate things more deeply. Our brains crave new experiences
              and knowledge, and these topics provide a never-ending stream of
              curiosity to satisfy that craving.
            </p>
          )}
        </div>

        <div className={styles.dropdownSection}>
          <button
            className={styles.dropdownHeader}
            onClick={() => toggleSection("HEALTH")}
          >
            HEALTH
          </button>
          {openSection === "HEALTH" && (
            <p className={styles.dropdownContent}>
              Taking care of both physical and cognitive health is essential for
              a high-quality life. What we eat, how we exercise, and the mental
              practices we engage in all contribute to our overall well-being.
              Prioritizing health leads to greater happiness, longevity, and
              vitality. But to be healthy is to know healthy. Understanding the
              difference between good and bad practices, we can make
              better-informed choices to achieve our goals. It's about more than
              just avoiding illness; it's about thriving and feeling our best
              every day.
            </p>
          )}
        </div>

        <div className={styles.dropdownSection}>
          <button
            className={styles.dropdownHeader}
            onClick={() => toggleSection("MIND")}
          >
            MIND
          </button>
          {openSection === "MIND" && (
            <p className={styles.dropdownContent}>
              Life is a complex and fascinating journey, and understanding our
              existence can foster greater empathy and liberate us from many of
              life’s constraints. Exploring philosophy, psychology, and creative
              works offers valuable tools to navigate the challenges we
              encounter. These insights can deepen our relationships, enhance
              self-awareness, and nurture a sense of inner peace. By engaging
              with these ideas, we empower ourselves to think critically about
              what truly brings meaning and satisfaction to life. No need for
              existential angst—just exist n' chill :)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
