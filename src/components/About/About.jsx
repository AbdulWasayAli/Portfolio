import { aboutData, personalInfo } from '../../data/portfolioData';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        {/* Section Heading — same reveal animation as Education */}
        <div className="section-heading reveal">
          <span className="subtitle">About Me</span>
          <h2>Get To Know Me</h2>
        </div>

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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Let's Talk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
