import { motion } from 'framer-motion';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      className={styles.logoWrapper}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.div
        className={styles.logoIconBox}
        whileHover={{ rotate: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.logoSvg}
        >
          <path
            d="M9 18L3 12L9 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6L21 12L15 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 4L10 20"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <span className={styles.logoText}>
        Wasay
        <motion.span
          className={styles.logoDot}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          .
        </motion.span>
      </span>
    </motion.div>
  );
}
