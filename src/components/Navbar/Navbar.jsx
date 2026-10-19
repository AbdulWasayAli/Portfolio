import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks, personalInfo } from '../../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <motion.a
          className={styles.logoWrapper}
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          aria-label="Home"
          whileHover="hover"
          initial="idle"
        >
          {/* Animated Ambient Cyber Aura */}
          <div className={styles.logoAura} />

          {/* Futuristic Glass Icon Box */}
          <motion.div
            className={styles.logoIconBox}
            variants={{
              idle: { rotate: 0, scale: 1 },
              hover: { rotate: -6, scale: 1.08 }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {/* Shimmer Scanline */}
            <div className={styles.scanline} />

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
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  idle: { x: 0 },
                  hover: { x: -1.5 }
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              />
              {/* Right Bracket */}
              <motion.path
                d="M15 6L21 12L15 18"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  idle: { x: 0 },
                  hover: { x: 1.5 }
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              />
              {/* Electric Slash with Pulse */}
              <motion.path
                d="M14 4L10 20"
                stroke="var(--accent)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  idle: { opacity: 0.9, pathLength: 1 },
                  hover: { opacity: 1, scale: 1.05 }
                }}
                className={styles.electricSlash}
              />
            </svg>
          </motion.div>

          {/* Brand Typography */}
          <span className={styles.logoText}>
            <span className={styles.nameChar}>W</span>
            <span className={styles.nameChar}>a</span>
            <span className={styles.nameChar}>s</span>
            <span className={styles.nameChar}>a</span>
            <span className={styles.nameChar}>y</span>
            
            {/* Pulsing Quantum Cyber Dot */}
            <span className={styles.dotContainer}>
              <motion.span
                className={styles.logoDot}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.85, 1, 0.85]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className={styles.dotRadarRing} />
            </span>
          </span>
        </motion.a>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`${styles.navLink} ${
                activeSection === link.href.replace('#', '') ? styles.active : ''
              }`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className={styles.navRight}>
          <ThemeToggle />

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}
