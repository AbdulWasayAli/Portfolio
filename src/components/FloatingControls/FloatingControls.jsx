import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingControls.module.css';

export default function FloatingControls() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isConnectHovered, setIsConnectHovered] = useState(false);

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

  const springConfig = {
    type: "spring",
    stiffness: 450,
    damping: 32,
    mass: 0.8
  };

  return (
    <div className={styles.floatingContainer}>
      {/* Jitter-Style Morphing WhatsApp Button: circle → pill on hover */}
      <motion.a
        href={`https://wa.me/923110214934?text=${encodeURIComponent("Hi Abdul Wasay, I saw your portfolio and would like to connect!")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatingBtn} ${styles.whatsappBtn}`}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setIsWhatsappHovered(true)}
        onMouseLeave={() => setIsWhatsappHovered(false)}
        layout
        transition={springConfig}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div layout="position" className={styles.whatsappIconBox}>
          <svg className={styles.whatsappIcon} width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          {isWhatsappHovered && (
            <motion.span
              className={styles.whatsappText}
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Morphing Let's Connect Button: circle → pill on hover */}
      <motion.button
        className={`${styles.floatingBtn} ${styles.connectBtn}`}
        onClick={scrollToContact}
        title="Send me a message"
        aria-label="Let's Connect"
        onMouseEnter={() => setIsConnectHovered(true)}
        onMouseLeave={() => setIsConnectHovered(false)}
        layout
        transition={springConfig}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div layout="position" className={styles.connectIconBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.connectSvg}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </motion.div>
        <AnimatePresence mode="wait">
          {isConnectHovered && (
            <motion.span
              className={styles.connectText}
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Let's Connect
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
