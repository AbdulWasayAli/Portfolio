import styles from './AtmosphericBackground.module.css';

export default function AtmosphericBackground() {
  return (
    <div className={styles.bgWrapper} aria-hidden="true">
      {/* Soft, luxury ambient glow spots — completely static and non-distracting */}
      <div className={styles.glowTopRight} />
      <div className={styles.glowCenterLeft} />
      <div className={styles.glowBottomRight} />
      {/* Ultra-subtle luxury fine grid pattern */}
      <div className={styles.fineGrid} />
    </div>
  );
}
