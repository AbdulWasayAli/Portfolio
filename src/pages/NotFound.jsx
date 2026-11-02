import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  // 3D Magnetic Tilt Physics for the central card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="not-found-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Dynamic Animated Ambient Shapes with Fluid Drifts */}
      <div className="not-found-bg-shape shape-1" />
      <div className="not-found-bg-shape shape-2" />
      <div className="not-found-bg-shape shape-3" />

      {/* Subtle Portfolio Cyber Grid Overlay */}
      <div className="not-found-grid-overlay" />

      {/* Floating Particle Stars */}
      <div className="nf-stars-field">
        <span className="nf-star s1" />
        <span className="nf-star s2" />
        <span className="nf-star s3" />
        <span className="nf-star s4" />
        <span className="nf-star s5" />
      </div>

      {/* Main 3D Magnetic Interactive Glass Card */}
      <motion.div 
        className="not-found-content"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Card Shimmer Border */}
        <div className="card-border-glow" />

        {/* Pulsing Pill Tag */}
        <motion.div 
          className="not-found-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="badge-pulse-beacon" />
          <Sparkles size={13} className="badge-icon" />
          <span>Error 404 • Lost in Cyber Space</span>
        </motion.div>

        {/* 404 Glowing Number with Holographic Shimmer & Float Animation */}
        <div className="error-code-container">
          <motion.h1 
            className="error-code"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 4.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            404
          </motion.h1>
          <div className="error-reflection">404</div>
        </div>

        <motion.h2 
          className="error-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          className="error-message"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          Oops! It seems you've wandered into the digital void. The page you are looking for doesn't exist or has been moved.
        </motion.p>

        {/* Enhanced Interactive Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Link to="/" className="home-button">
            <ArrowLeft size={16} className="btn-icon" />
            <span className="button-text">Go Back Home</span>
            <div className="button-shimmer" />
            <div className="button-glow" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;
