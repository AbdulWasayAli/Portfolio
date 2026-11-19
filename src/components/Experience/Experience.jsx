import { useEffect, useRef } from 'react';
import { workExperienceData } from '../../data/portfolioData';
import styles from './Experience.module.css';

export default function Experience() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.cardVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className={`section ${styles.experienceSection}`}>
      <div className="container">
        <div className="section-heading reveal">
          <span className="subtitle">Work Experience</span>
          <h2>Professional <span className="gradient-heading">Experience</span></h2>
          <p>Real-world engineering internships, software development, and industry tracks.</p>
        </div>

        <div className={styles.experienceGrid}>
          {workExperienceData.map((exp, index) => (
            <div
              key={index}
              className={styles.experienceCard}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              {/* Top ambient luxury glow */}
              <div className={styles.cardAura} />

              <div className={styles.cardHeader}>
                {/* 10Pearls Company Logo Badge */}
                <div className={styles.logoBadgeContainer}>
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className={styles.companyLogo}
                    loading="lazy"
                  />
                </div>

                <div className={styles.headerInfo}>
                  <div className={styles.metaRow}>
                    <span className={styles.periodPill}>{exp.period}</span>
                    <span className={styles.roleBadge}>{exp.badge}</span>
                  </div>
                  <h3 className={styles.roleTitle}>{exp.role}</h3>
                  <div className={styles.companyRow}>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyName}
                    >
                      {exp.company}
                    </a>
                    <span className={styles.dotDivider}>•</span>
                    <span className={styles.programName}>{exp.program}</span>
                  </div>
                  <span className={styles.locationText}>{exp.location}</span>
                </div>
              </div>

              <p className={styles.summaryText}>{exp.description}</p>

              {/* Key Contributions & Highlights */}
              <div className={styles.highlightsContainer}>
                <h4 className={styles.highlightsHeading}>Core Engineering Contributions:</h4>
                <ul className={styles.highlightsList}>
                  {exp.highlights.map((item, hIndex) => (
                    <li key={hIndex} className={styles.highlightItem}>
                      <span className={styles.checkIcon}>▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Footer */}
              <div className={styles.skillsFooter}>
                <span className={styles.skillsLabel}>Technologies:</span>
                <div className={styles.skillsTags}>
                  {exp.skills.map((skill, sIndex) => (
                    <span key={sIndex} className={styles.skillPill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
