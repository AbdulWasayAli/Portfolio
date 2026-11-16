import { useState, useEffect, useRef } from 'react';
import { navLinks } from '../../data/portfolioData';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled style when past 20px
      setScrolled(currentScrollY > 20);

      // Smart Hide/Show Logic
      if (currentScrollY <= 80) {
        // Always show near the very top of the page
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        // Scrolling DOWN -> smoothly hide navbar
        if (!menuOpen) {
          setVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling UP -> reveal navbar smoothly
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Active Section Spy
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
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.navHeader} ${visible ? styles.navVisible : styles.navHidden}`}>
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
