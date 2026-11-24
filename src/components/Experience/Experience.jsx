import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, BookOpen, School } from 'lucide-react';
import { timelineData } from '../../data/portfolioData';
import styles from './Experience.module.css';

const ICON_MAP = {
  Briefcase: Briefcase,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  School: School,
};

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
      { threshold: 0.02, rootMargin: '50px 0px' }
    );

    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <div className="section-heading reveal">
          <span className="subtitle">Career &amp; Learning</span>
          <h2>Experience &amp; <span className="gradient-heading">Education</span></h2>
          <p>My professional engineering track, internships, and academic qualifications.</p>
        </div>

        <div className={styles.timeline}>
          {timelineData.map((item, index) => {
            const isExperience = item.type === 'experience';

            return (
              <div
                key={index}
                className={`${styles.timelineItem} ${isExperience ? styles.experienceItem : ''}`}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                {/* Timeline Dot / Logo */}
                <div className={`${styles.timelineDot} ${isExperience ? styles.experienceDot : styles.educationDot}`}>
                  {isExperience && item.logo ? (
                    <img src={item.logo} alt={item.organization} className={styles.dotLogo} />
                  ) : (
                    (() => {
                      const IconComponent = ICON_MAP[item.iconName] || GraduationCap;
                      return <IconComponent className={styles.dotIcon} size={18} strokeWidth={2.2} />;
                    })()
                  )}
                </div>

                {/* Timeline Card */}
                <div className={`${styles.timelineCard} ${isExperience ? styles.experienceCard : ''}`}>
                  <div className={styles.cardHeaderRow}>
                    <span className={`${styles.timelinePeriod} ${isExperience ? styles.experiencePeriod : ''}`}>
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className={styles.statusBadge}>{item.badge}</span>
                    )}
                  </div>

                  <h4 className={styles.timelineTitle}>{item.title}</h4>

                  {item.program && (
                    <p className={styles.programTitle}>{item.program}</p>
                  )}

                  <p className={styles.timelineOrg}>
                    {item.organizationUrl ? (
                      <a href={item.organizationUrl} target="_blank" rel="noopener noreferrer" className={styles.orgLink}>
                        {item.organization}
                      </a>
                    ) : (
                      item.organization
                    )}
                  </p>

                  <p className={styles.timelineDesc}>{item.description}</p>

                  {/* Skills tags for experience */}
                  {item.skills && (
                    <div className={styles.skillsRow}>
                      {item.skills.map((s, i) => (
                        <span key={i} className={styles.skillPill}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
