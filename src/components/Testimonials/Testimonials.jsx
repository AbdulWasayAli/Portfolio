import { testimonialsData } from '../../data/portfolioData';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="testimonials" className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className="section-heading">
          <span className="subtitle">Testimonials</span>
          <h2>What People Say</h2>
          <p>Feedback from collaborators and peers about working with me.</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonialsData.map((item) => (
            <div key={item.id} className={styles.testimonialCard}>
              <span className={styles.quoteIcon}>"</span>

              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>

              <p className={styles.testimonialText}>{item.text}</p>

              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>{item.avatar}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
