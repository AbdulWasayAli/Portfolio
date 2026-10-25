import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../../data/portfolioData';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo Left */}
        <a
          className={styles.logoLink}
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          aria-label="Home"
        >
          <Logo />
        </a>

        {/* Center Minimalist Navigation Links with Laser Underline */}
        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                <span className={styles.navLinkText}>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className={styles.activeLaserLine}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action (Theme Toggle & Mobile Menu) */}
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

      {/* Mobile Backdrop Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}
