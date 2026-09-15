import { aboutData, personalInfo } from '../../data/portfolioData';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Image — slide in from left */}
          <div className={`${styles.imageWrapper} reveal-left`}>
            <div className={styles.imageContainer}>
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className={styles.profileImage}
                loading="lazy"
              />
            </div>
            <div className={styles.imageBgDecor} />
          </div>

          {/* Content — slide in from right */}
          <div className={`${styles.contentWrapper} reveal-right`}>
            <span className={styles.aboutLabel}>About Me</span>
            <h2 className={styles.aboutTitle}>
              Passionate <span>Software Engineer</span> based in Karachi
            </h2>

            {aboutData.paragraphs.map((text, index) => (
              <p key={index} className={styles.aboutText}>{text}</p>
            ))}

            {/* Stats */}
            <div className={styles.statsGrid}>
              {aboutData.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${styles.statCard} reveal-scale delay-${index + 1}`}
                >
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className={styles.aboutButtons}>
              <a
                href={personalInfo.resumeUrl}
                className="btn btn-primary"
                download="Abdul_Wasay_Ali_Resume.pdf"
              >
                📄 Download Resume
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                💬 Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
