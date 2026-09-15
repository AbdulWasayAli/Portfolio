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
          <span className="subtitle">Education</span>
          <h2>Education & Qualifications</h2>
          <p>My academic journey and qualifications in software engineering.</p>
        </div>

        <div className={styles.timeline}>
          {experienceData.map((item, index) => (
            <div
              key={index}
              className={styles.timelineItem}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className={styles.timelineDot}>{item.icon}</div>
              <div className={styles.timelineCard}>
                <span className={styles.timelinePeriod}>{item.period}</span>
                <h4 className={styles.timelineTitle}>{item.title}</h4>
                <p className={styles.timelineOrg}>{item.organization}</p>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
