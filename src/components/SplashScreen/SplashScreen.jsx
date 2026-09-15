import { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Total animation time is around 4.5 seconds
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 800); // Wait for the fade-out CSS transition
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 800);
  };

  return (
    <div className={`${styles.splashContainer} ${isFadingOut ? styles.fadeOut : ''}`}>
      {/* Animated Background Elements */}
      <div className={styles.glowingOrb} />
      <div className={styles.glowingOrb2} />
      <div className={styles.particlesContainer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }} />
        ))}
      </div>
      
      {/* Main Text Content */}
      <div className={styles.content}>
        <div className={styles.nameWrapper}>
          <h1 className={styles.name}>ABDUL WASAY ALI</h1>
          <div className={styles.underline} />
        </div>
      </div>

      <button className={styles.skipButton} onClick={handleSkip}>
        Skip Intro
      </button>
    </div>
  );
}
