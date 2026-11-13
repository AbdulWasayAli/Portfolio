import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './InteractiveBrandBanner.module.css';

const PHRASES = [
  "Turning ideas into high-performance software.",
  "Architecting scalable web & cross-platform mobile apps.",
  "Writing clean code with modern design & architecture.",
  "Let's build something extraordinary together.",
];

const GLYPHS = 'ABCDEF0123456789!<>-_/[]{}—=+*^?#~';
const TARGET_NAME = 'ABDUL WASAY ALI';

export default function InteractiveBrandBanner() {
  const containerRef = useRef(null);

  // Typewriter State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(65);

  // Scramble / Matrix Decode State for Name
  const [displayName, setDisplayName] = useState(TARGET_NAME);
  const [isScrambling, setIsScrambling] = useState(false);

  // Mouse tilt for subtle luxury 3D feel
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Typewriter Loop
  useEffect(() => {
    let timer;
    const currentPhrase = PHRASES[phraseIndex];

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
          setTypingSpeed(45 + Math.random() * 30);
        }, typingSpeed);
      } else {
        // Pause at end of sentence
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(30);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
          setTypingSpeed(22);
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setTypingSpeed(400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  // Scramble / Hacker Decode Effect for the Big Name
  const triggerScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayName(
        TARGET_NAME.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return TARGET_NAME[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= TARGET_NAME.length) {
        clearInterval(interval);
        setDisplayName(TARGET_NAME);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, 30);
  }, [isScrambling]);

  // Trigger once on mount / view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerScramble();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerScramble]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((clientX - centerX) / centerX) * 6;
    const rotateX = -((clientY - centerY) / centerY) * 6;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      ref={containerRef}
      className={styles.bannerSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Abdul Wasay Ali Signature Showcase"
    >
      <div className={styles.topBeam} />

      {/* Atmospheric ambient glow spots */}
      <div className={styles.centerGlow} />

      <div
        className={styles.bannerInner}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        {/* Terminal Header Prompt */}
        <div className={styles.terminalPrompt}>
          <span className={styles.terminalDotPing}>
            <span className={styles.pingWave} />
            <span className={styles.pingDot} />
          </span>
          <span className={styles.terminalPromptText}>wasay.dev // signature</span>
        </div>

        {/* The Big Prestigious Name with Scramble Decode Effect */}
        <div className={styles.nameContainer} onMouseEnter={triggerScramble}>
          <h2 className={styles.brandTitle} data-text={displayName}>
            <span className={styles.brandGradientText}>{displayName}</span>
          </h2>
          <div className={styles.nameUnderglow} />
        </div>

        {/* Modern Interactive Typing Console */}
        <div className={styles.typingConsole}>
          <span className={styles.consolePromptSymbol}>$&gt;</span>
          <span className={styles.consoleText}>{displayText}</span>
          <span className={styles.cursorBlink}>|</span>
        </div>

        {/* Bottom Technical Identity Bar */}
        <div className={styles.bottomTechBar}>
          <span className={styles.techBadge}>SOFTWARE ENGINEER</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>FULL-STACK &amp; MOBILE</span>
          <span className={styles.dotDivider} />
          <span className={styles.techBadge}>KARACHI, PK</span>
        </div>
      </div>

      <div className={styles.bottomBeam} />
    </section>
  );
}
