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
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Dynamic Ambient Optical Aura */}
      <span className={styles.ambientAura} />

      {/* Cyber Glass Pill Frame */}
      <div className={styles.trackPill}>
        {/* Background Cosmic Atmosphere */}
        <div className={styles.cosmicSky}>
          {isDark ? (
            <div className={styles.nightSky}>
              <span className={`${styles.star} ${styles.star1}`} />
              <span className={`${styles.star} ${styles.star2}`} />
              <span className={`${styles.star} ${styles.star3}`} />
              <span className={styles.nebulaGlow} />
            </div>
          ) : (
            <div className={styles.daySky}>
              <span className={styles.daySunray1} />
              <span className={styles.daySunray2} />
              <span className={styles.solarCorona} />
            </div>
          )}
        </div>

        {/* Orbiting Laser Ring / Horizon Beam */}
        <span className={styles.orbitBeam} />

        {/* 3D Magnetic Sliding Orb */}
        <motion.div
          className={styles.magneticOrb}
          layout
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 28,
          }}
        >
          {/* Specular Jewel Highlight */}
          <span className={styles.orbSheen} />

          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                className={styles.iconWrapper}
                initial={{ opacity: 0, rotate: -70, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 70, scale: 0.5 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Modern Precision Cyber Moon with Craters */}
                <svg
                  className={styles.moonSvg}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                    fill="url(#moonGrad)"
                    stroke="#c7d2fe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="moonGrad" x1="11" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#e0e7ff" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                className={styles.iconWrapper}
                initial={{ opacity: 0, rotate: 70, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -70, scale: 0.5 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Modern Radiant Cyber Sun */}
                <svg
                  className={styles.sunSvg}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="4.2" fill="url(#sunCoreGrad)" stroke="#f59e0b" strokeWidth="1.2" />
                  <path
                    d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="sunCoreGrad" x1="8" y1="8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.button>
  );
}

