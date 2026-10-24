import { motion } from 'framer-motion';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      className={styles.logoWrapper}
      whileHover="hover"
      initial="idle"
    >
      <div className={styles.ambientGlow} />

      <motion.div
        className={styles.logoIconBox}
        variants={{
          idle: { rotate: 0, scale: 1 },
          hover: { rotate: -4, scale: 1.08 }
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      >
        <span className={styles.sheen} />

        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.logoSvg}
        >
          <defs>
            <linearGradient id="wGrad1" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#00e5ff" />
            </linearGradient>

            <linearGradient id="wGrad2" x1="16" y1="10" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00e5ff" floodOpacity="0.6" />
            </filter>
          </defs>

          <path
            d="M5 8L11 24L16 13L21 24L27 8"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <motion.path
            d="M5 8L11 24L16 13"
            stroke="url(#wGrad1)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <motion.path
            d="M16 13L21 24L27 8"
            stroke="url(#wGrad2)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          <motion.circle
            cx="16"
            cy="13"
            r="2"
            fill="#00e5ff"
            variants={{
              idle: { scale: 1 },
              hover: { scale: 1.5 }
            }}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </motion.div>

      <span className={styles.logoText}>
        <span className={styles.nameBase}>Wasa</span>
        <span className={styles.nameY}>y</span>

        <span className={styles.orbContainer}>
          <motion.span
            className={styles.quantumOrb}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <span className={styles.radarRing1} />
          <span className={styles.radarRing2} />
        </span>
      </span>
    </motion.div>
  );
}
