import { useEffect, useRef } from 'react';
import { educationData } from '../../data/portfolioData';
import styles from './Education.module.css';

export default function Education() {
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
    <section id="education" className={`section ${styles.education}`}>
      <div className="container">
        <div className="section-heading reveal">
          <span className="subtitle">Academic Journey</span>
          <h2>Education &amp; <span className="gradient-heading">Qualifications</span></h2>
          <p>My foundational learning in computer science and software engineering.</p>
        </div>

        <div className={styles.timeline}>
          {educationData.map((item, index) => (
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
