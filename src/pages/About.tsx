import React, { useState } from "react";
import styles from "../assets/About.module.css";
import myImage from "../assets/images/frijolesSelf.png";

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
          Hey! I'm Nick, and I created this platform out of my passion for
          learning and teaching. I believe that education is a fundamental force
          that shapes our identities and societies. Making it accessible is
          crucial for the well-being of everyone. Here, I strive to summarize
          interesting concepts simply, inspired by the elegance of Zen Buddhism.
          In a world where your attention is constantly under siege by
          time-wasting content, my goal is to provide a meaningful alternative.
          I want you to leave this site feeling enriched, having spent your time
          wisely, learning, and improving yourself.
        </p>
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
              As an engineering student, I naturally find STEM topics relevant
              and endlessly fascinating. There's so much to learn, more than
              anyone could ever fully grasp. Understanding STEM subjects helps
              us develop a better sense of how the world works, which in turn
              makes us appreciate things more deeply. Our brains crave new
              experiences and knowledge, and these topics provide a never-ending
              stream of curiosity to satisfy that craving.
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
              Taking care of both physical and mental health is essential for a
              high-quality life. What we eat, how we exercise, and the mental
              practices we engage in all contribute to our overall well-being.
              Prioritizing health leads to greater happiness, longevity, and
              vitality. By understanding more about health, we can make
              better-informed choices to achieve this. It's about more than just
              avoiding illness; it's about thriving and feeling our best every
              day.
            </p>
          )}
        </div>

        <div className={styles.dropdownSection}>
          <button
            className={styles.dropdownHeader}
            onClick={() => toggleSection("LIFE")}
          >
            LIFE
          </button>
          {openSection === "LIFE" && (
            <p className={styles.dropdownContent}>
              Life is a complex and fascinating journey, and understanding our
              existence can lead to greater empathy and freedom from many of
              life's constraints. Delving into philosophy, psychology, and the
              wisdom found in literature and art helps us navigate the
              challenges we face. These insights can help address anxiety, boost
              confidence, improve social relationships, and alleviate
              depression. By exploring these ideas, we can make better-informed
              decisions and discover what genuinely makes life meaningful and
              satisfying. No need for existential angst, just exist n' chill :)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
