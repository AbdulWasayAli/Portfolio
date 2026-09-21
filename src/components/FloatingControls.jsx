import { useState, useEffect } from 'react';
import styles from './FloatingControls.module.css';

export default function FloatingControls() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.floatingContainer}>
      {/* WhatsApp Quick Chat Button */}
      <a
        href={`https://wa.me/923110214934?text=${encodeURIComponent("Hi Abdul Wasay, I saw your portfolio and would like to connect!")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatingBtn} ${styles.whatsappBtn}`}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg className={styles.whatsappIcon} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.53 1.777.817 2.796.817 3.181 0 5.767-2.587 5.767-5.766.001-3.181-2.585-5.768-5.767-5.768zm0-2.172c4.379 0 7.938 3.559 7.938 7.94 0 4.38-3.559 7.939-7.938 7.939-1.378 0-2.671-.352-3.799-.968l-4.232 1.109 1.129-4.127c-.689-1.183-1.076-2.548-1.076-3.953 0-4.381 3.559-7.94 7.978-7.94zm-3.086 5.864c-.168-.372-.345-.379-.505-.386-.131-.006-.28-.006-.43-.006s-.393.056-.599.281c-.206.225-.786.768-.786 1.872 0 1.104.805 2.172.917 2.321.112.15 1.554 2.483 3.823 3.376 1.886.742 2.27.594 2.682.556.411-.038 1.328-.543 1.515-1.068.187-.525.187-.975.131-1.069-.056-.094-.206-.15-.43-.263-.225-.112-1.328-.656-1.534-.731-.206-.075-.356-.113-.505.112-.15.225-.58 1.069-.711 1.219-.131.15-.262.169-.487.056-.225-.112-.949-.35-1.808-1.115-.668-.596-1.119-1.332-1.25-1.557-.131-.225-.014-.347.098-.459.102-.102.225-.262.337-.394.112-.131.15-.225.225-.375.075-.15.037-.281-.019-.394-.056-.113-.505-1.218-.692-1.668z"/>
        </svg>
        <span className={styles.whatsappText}>WhatsApp</span>
      </a>

      {/* Let's Connect Button */}
      <button
        className={`${styles.floatingBtn} ${styles.connectBtn}`}
        onClick={scrollToContact}
        title="Send me a message"
        aria-label="Let's Connect"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.connectSvg}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className={styles.connectText}>Let's Connect</span>
      </button>
    </div>
  );
}
