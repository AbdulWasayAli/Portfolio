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
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
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
