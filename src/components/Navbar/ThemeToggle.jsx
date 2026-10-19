import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      className={`${styles.toggleButton} ${isDark ? styles.isDark : styles.isLight}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {/* Background ambient halo / specular rim */}
      <span className={styles.ambientGlow} />

      {/* Cyber pill track */}
      <div className={styles.track}>
        {/* Subtle grid pattern / status indicators */}
        <div className={styles.trackDetails}>
          {/* Dark Mode: subtle constellation dots */}
          <span className={`${styles.constellationDot} ${styles.dot1}`} />
          <span className={`${styles.constellationDot} ${styles.dot2}`} />
          <span className={`${styles.constellationDot} ${styles.dot3}`} />
          
          {/* Light Mode: ambient solar warmth rays */}
          <span className={styles.solarAura} />
        </div>

        {/* Floating spring thumb */}
        <motion.div
          className={styles.thumb}
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          {/* Specular sheen on top of thumb */}
          <span className={styles.thumbSheen} />

          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                className={styles.iconContainer}
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Modern Crisp Cyber Moon Icon */}
                <svg
                  className={styles.moonSvg}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                className={styles.iconContainer}
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Modern Crisp Solar Sun Icon */}
                <svg
                  className={styles.sunSvg}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.button>
  );
}
