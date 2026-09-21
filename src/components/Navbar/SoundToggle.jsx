import { useState, useEffect } from 'react';
import { setSoundEnabled, getSoundEnabled, playHoverSound } from '../../utils/soundFx';
import styles from './SoundToggle.module.css';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getSoundEnabled());
  }, []);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    setSoundEnabled(nextState);
  };

  return (
    <button
      className={`${styles.soundBtn} ${enabled ? styles.active : ''}`}
      onClick={handleToggle}
      onMouseEnter={playHoverSound}
      title={enabled ? 'Mute Interactive Sound Effects' : 'Enable Interactive Sound Effects'}
      aria-label={enabled ? 'Mute Audio' : 'Enable Audio'}
    >
      {enabled ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.soundIcon}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={styles.soundIcon}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
      <span className={styles.soundLabel}>{enabled ? 'SFX ON' : 'SFX'}</span>
    </button>
  );
}
