import { useState, useEffect } from 'react';
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
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
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
    <header className={styles.navHeader}>
      <div className={`${styles.jitterBar} ${scrolled ? styles.scrolled : ''}`}>
        {/* Left: Logo */}
        <a
          className={styles.logoBox}
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          aria-label="Home"
        >
          <Logo />
        </a>

        {/* Center: Clean Jitter-Style Text Links */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`} aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.name}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                <span>{link.name}</span>
                {isActive && <span className={styles.activeLine} />}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Mobile Menu */}
        <div className={styles.navActions}>
          <ThemeToggle />

          {/* Mobile Hamburger */}
          <button
            className={`${styles.mobileMenuBtn} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.show : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </header>
  );
}
