import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // 4.2s smooth full showcase time
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 700);
    }, 4200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 400);
  };

  return (
    <div 
      className={`${styles.splashContainer} ${isFadingOut ? styles.fadeOut : ''}`}
      data-theme={theme}
    >
      {/* Ambient Depth Orbs */}
      <div className={styles.glowingOrb} />
      <div className={styles.glowingOrb2} />
      
      {/* Floating Starlight Particles */}
      <div className={styles.particlesContainer}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }} />
        ))}
      </div>
      
      {/* Pure Name and Clean Line Showcase */}
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
