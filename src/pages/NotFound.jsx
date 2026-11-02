import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className="not-found-container">
      {/* Dynamic ambient gradient shapes matching portfolio tokens */}
      <div className="not-found-bg-shape shape-1" />
      <div className="not-found-bg-shape shape-2" />
      <div className="not-found-bg-shape shape-3" />

      {/* Subtle grid texture */}
      <div className="not-found-grid-overlay" />

      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle pill tag */}
        <div className="not-found-badge">
          <Sparkles size={14} className="badge-icon" />
          <span>Error 404 • Lost in Cyber Space</span>
        </div>

        {/* 404 Glowing Number matching portfolio gradient-text */}
        <div className="error-code-container">
          <h1 className="error-code">404</h1>
        </div>

        <h2 className="error-title">Page Not Found</h2>
        
        <p className="error-message">
          Oops! It seems you've wandered into the digital void. The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Enhanced Home button with portfolio design system */}
        <Link to="/" className="home-button">
          <ArrowLeft size={16} className="btn-icon" />
          <span className="button-text">Go Back Home</span>
          <div className="button-glow" />
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
