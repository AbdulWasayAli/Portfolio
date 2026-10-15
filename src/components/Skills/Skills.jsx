import { useState, useEffect, useRef } from 'react';
import { skillsData } from '../../data/portfolioData';
import { TechIcons } from './TechIcons';
import styles from './Skills.module.css';

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <span className="subtitle">My Skills</span>
          <h2>What I Can Do</h2>
          <p>Technologies and tools I work with to bring ideas to life.</p>
        </div>

        <div className={styles.skillsGrid}>
          {skillsData.categories.map((category, catIndex) => (
            <div key={catIndex} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon} data-cat={category.title.toLowerCase()}>
                  {catIndex === 0 && (
                    /* Frontend: Browser & Layout Vectors */
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                      <line x1="6" y1="7" x2="6.01" y2="7" />
                      <line x1="9" y1="7" x2="9.01" y2="7" />
                      <line x1="12" y1="7" x2="12.01" y2="7" />
                    </svg>
                  )}
                  {catIndex === 1 && (
                    /* Backend: Server & Cloud Architecture Vectors */
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                      <line x1="10" y1="6" x2="14" y2="6" />
                      <line x1="10" y1="18" x2="14" y2="18" />
                    </svg>
                  )}
                  {catIndex === 2 && (
                    /* Mobile: Native Smartphone & Cross-Platform Vectors */
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
                      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                      <line x1="9" y1="5" x2="15" y2="5" />
                    </svg>
                  )}
                  {catIndex === 3 && (
                    /* Tools: Developer Terminal & Git Pipeline Vectors */
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" strokeWidth="2.5" />
                    </svg>
                  )}
                </div>
                <div className={styles.categoryTitleBox}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <span className={styles.categoryCount}>{category.skills.length} Technologies</span>
                </div>
              </div>

              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => {
                  const IconComp = TechIcons[skill.name];
                  return (
                    <div key={skillIndex} className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <div className={styles.skillLeft}>
                          {IconComp && (
                            <span className={styles.brandIconBox}>
                              <IconComp />
                            </span>
                          )}
                          <span className={styles.skillName}>{skill.name}</span>
                        </div>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${animated ? styles.animate : ''}`}
                          style={{
                            width: animated ? `${skill.level}%` : '0%',
                            transitionDelay: `${catIndex * 0.12 + skillIndex * 0.08}s`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
