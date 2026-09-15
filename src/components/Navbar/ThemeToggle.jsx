import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`${styles.toggleSwitch} ${theme === 'dark' ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Mode"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {/* Background Track with stars & rays */}
      <span className={styles.track}>
        <span className={styles.star1}>✦</span>
        <span className={styles.star2}>✧</span>
        <span className={styles.sunRay}>☀️</span>
      </span>

      {/* Sliding Glowing Pill */}
      <span className={styles.thumb}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
