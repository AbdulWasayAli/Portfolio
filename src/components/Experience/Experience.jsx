import { useEffect, useRef } from 'react';
import { experienceData } from '../../data/portfolioData';
import styles from './Experience.module.css';

export default function Experience() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.timelineItemVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className={`section ${styles.experience}`}>
      <div className="container">
        <div className="section-heading reveal">
          <span className="subtitle">Experience &amp; Education</span>
          <h2>Career &amp; <span className="gradient-heading">Qualifications</span></h2>
          <p>My professional engineering internship and academic journey.</p>
        </div>

        <div className={styles.timeline}>
          {experienceData.map((item, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${item.type === 'experience' ? styles.timelineItemExperience : ''}`}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className={styles.timelineDot}>{item.icon}</div>
              <div className={styles.timelineCard}>
                <div className={styles.cardHeaderRow}>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                  {item.badge && <span className={styles.statusBadge}>{item.badge}</span>}
                </div>
                <h4 className={styles.timelineTitle}>{item.title}</h4>
                {item.subtitle && <p className={styles.timelineSubtitle}>{item.subtitle}</p>}
                <p className={styles.timelineOrg}>{item.organization}</p>
                <p className={styles.timelineDesc}>{item.description}</p>
                {item.skills && (
                  <div className={styles.skillTagsRow}>
                    {item.skills.map((s, i) => (
                      <span key={i} className={styles.skillTag}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
