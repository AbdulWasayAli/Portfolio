import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      className={`${styles.themeBtn} ${isDark ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className={styles.iconContainer}>
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              className={styles.iconWrapper}
              initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon size={18} strokeWidth={2.2} className={styles.moonIcon} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              className={styles.iconWrapper}
              initial={{ opacity: 0, rotate: 40, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -40, scale: 0.6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun size={18} strokeWidth={2.2} className={styles.sunIcon} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle background glow on hover */}
      <span className={styles.glow} />
    </motion.button>
  );
}
