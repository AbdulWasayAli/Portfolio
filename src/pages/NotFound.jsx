import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  ArrowLeft, 
  Compass, 
  Terminal, 
  Layers, 
  BookOpen, 
  Mail, 
  Sparkles,
  WifiOff
} from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const [autoRedirect, setAutoRedirect] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Optional subtle auto-redirect countdown if user stays idle
  useEffect(() => {
    if (!autoRedirect) return;
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [autoRedirect, countdown, navigate]);

  const quickLinks = [
    { label: 'Featured Projects', href: '/#projects', icon: Layers, desc: 'Mobile & Web Case Studies' },
    { label: 'Engineering Blog', href: '/#blog', icon: BookOpen, desc: 'AI Tooling & Workflows' },
    { label: 'Contact Developer', href: '/#contact', icon: Mail, desc: 'Direct WhatsApp & Email' },
  ];

  return (
    <section className="not-found-container">
      {/* Dynamic Quantum Horizon Background Grid & Aurora Mesh */}
      <div className="nf-aurora nf-aurora-cyan" />
      <div className="nf-aurora nf-aurora-violet" />
      <div className="nf-aurora nf-aurora-coral" />
      <div className="nf-quantum-grid" />
      <div className="nf-stars-field" />

      {/* Main Luxury Obsidian Glass Capsule */}
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Telemetry Diagnostic Status Pill */}
        <div className="nf-status-bar">
          <div className="nf-status-pill">
            <span className="nf-radar-pulse">
              <span className="nf-radar-ring" />
              <span className="nf-radar-dot" />
            </span>
            <span className="nf-status-tag">SYSTEM TELEMETRY</span>
          </div>

          <div className="nf-path-tag">
            <Terminal size={12} className="nf-mono-icon" />
            <code>{currentPath || 'UNKNOWN_ROUTE'}</code>
            <span className="nf-error-label">404_NOT_FOUND</span>
          </div>
        </div>

        {/* Hero 404 Specular Hologram Visual */}
        <div className="error-code-container">
          <div className="nf-ambient-glow" />
          <h1 className="error-code">404</h1>
          <div className="error-reflection">404</div>
        </div>

        {/* Headline & High-End Copy */}
        <div className="nf-text-block">
          <h2 className="error-title">
            <span>Coordinate Lost in the</span>{' '}
            <span className="nf-title-gradient">Quantum Void</span>
          </h2>
          <p className="error-message">
            The requested sub-path does not exist or has been refactored into a higher-dimensional structure. 
            No data was lost — calibrate your trajectory with the quick teleports below.
          </p>
        </div>

        {/* Interactive Quick Teleport Route Cards */}
        <div className="nf-quick-routes">
          <span className="nf-routes-label">
            <Compass size={13} />
            <span>CALIBRATE DESTINATION</span>
          </span>

          <div className="nf-routes-grid">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="nf-route-card"
                >
                  <div className="nf-route-icon-box">
                    <Icon size={16} />
                  </div>
                  <div className="nf-route-info">
                    <span className="nf-route-title">{item.label}</span>
                    <span className="nf-route-desc">{item.desc}</span>
                  </div>
                  <div className="nf-route-arrow">&rarr;</div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Primary Command Actions */}
        <div className="not-found-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="nf-secondary-button"
          >
            <ArrowLeft size={16} />
            <span>Previous Coordinate</span>
          </button>

          <Link to="/" className="home-button">
            <Home size={16} />
            <span className="button-text">Return to Command Center</span>
            <div className="button-glow" />
          </Link>
        </div>

        {/* Bottom Safety Footnote */}
        <div className="nf-safety-footer">
          <WifiOff size={12} />
          <span>PORTFOLIO KERNEL RUNNING SECURELY // ABDUL WASAY ALI</span>
        </div>
      </motion.div>
    </section>
  );
}
