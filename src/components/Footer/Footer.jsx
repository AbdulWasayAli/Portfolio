import { motion } from 'framer-motion';
import { personalInfo, navLinks } from '../../data/portfolioData';
import styles from './Footer.module.css';

export default function Footer() {
  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <motion.div
              className={styles.footerLogoWrapper}
              onClick={scrollToTop}
              whileHover="hover"
              initial="idle"
            >
              <div className={styles.footerLogoAura} />
              <motion.div
                className={styles.footerLogoIconBox}
                variants={{
                  idle: { rotate: 0, scale: 1 },
                  hover: { rotate: -6, scale: 1.08 }
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <div className={styles.footerScanline} />
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.footerLogoSvg}
                >
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
                  <motion.path
                    d="M14 4L10 20"
                    stroke="var(--accent)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.footerElectricSlash}
                  />
                </svg>
              </motion.div>
              <span className={styles.footerLogoText}>
                <span className={styles.footerChar}>W</span>
                <span className={styles.footerChar}>a</span>
                <span className={styles.footerChar}>s</span>
                <span className={styles.footerChar}>a</span>
                <span className={styles.footerChar}>y</span>
                <span className={styles.footerDotBox}>
                  <motion.span
                    className={styles.footerLogoDot}
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
                  <span className={styles.footerRadarRing} />
                </span>
              </span>
            </motion.div>
            <p className={styles.footerDesc}>
              Turning ideas into high-performance web & cross-platform mobile apps with clean code and intuitive design.
            </p>
            <div className={styles.footerSocial}>
              <a href={personalInfo.social.github} className={styles.socialBtn} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
              <a href={personalInfo.social.linkedin} className={styles.socialBtn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href={personalInfo.social.twitter} className={styles.socialBtn} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href={personalInfo.social.instagram} className={styles.socialBtn} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <div className={styles.footerLinks}>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  className={styles.footerLink}
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4>Get In Touch</h4>
            <div className={styles.footerLinks}>
              <div className={styles.footerContactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <button className={styles.backToTop} onClick={scrollToTop}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
