import { motion } from 'framer-motion';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      className={styles.logoWrapper}
      whileHover="hover"
      initial="idle"
    >
      {/* 1. Ambient Violet-Cyan Glow Halo behind Badge on Hover */}
      <div className={styles.ambientGlow} />

      {/* 2. Deep Obsidian Curved Tile with Gradient Border */}
      <motion.div
        className={styles.logoIconBox}
        variants={{
          idle: { rotate: 0, scale: 1 },
          hover: { rotate: -6, scale: 1.07 }
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {/* Specular Diagonal Sheen Sweep */}
        <span className={styles.sheen} />

        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.logoSvg}
        >
          {/* Left Bracket */}
          <motion.path
            d="M9 18L3 12L9 6"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              idle: { x: 0 },
              hover: { x: -1.5 }
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          />

          {/* Glowing Mint Slash */}
          <motion.path
            d="M14 4L10 20"
            stroke="#00E5FF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.electricSlash}
            variants={{
              idle: { opacity: 0.95 },
              hover: { opacity: 1, scaleY: 1.05 }
            }}
          />

          {/* Right Bracket */}
          <motion.path
            d="M15 6L21 12L15 18"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              idle: { x: 0 },
              hover: { x: 1.5 }
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          />
        </svg>
      </motion.div>

      {/* 3. Typography: "Wasa" (Bold White) + "y" (Cyan Accent) + Quantum Orb Dot */}
      <span className={styles.logoText}>
        <span className={styles.nameBase}>Wasa</span>
        <span className={styles.nameY}>y</span>

        {/* 4. Glowing 3D Quantum Orb with Radar Ripple */}
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
