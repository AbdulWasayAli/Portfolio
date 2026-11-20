import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './SplashScreen.module.css';

export default function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // 5.5s full cinematic viewing time: smooth continuous line loading then graceful fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onFinish();
      }, 800);
    }, 5500);

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
      
      {/* Main Center Stage */}
      <div className={styles.content}>
        <div className={styles.nameWrapper}>
          <h1 className={styles.name}>ABDUL WASAY ALI</h1>
          
          {/* Continuous Full-Width Loading Track */}
          <div className={styles.loadingTrack}>
            <div className={styles.loadingProgress} />
          </div>
        </div>
      </div>

      <button className={styles.skipButton} onClick={handleSkip}>
        Skip Intro
      </button>
    </div>
  );
}
