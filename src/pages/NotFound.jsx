import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="nf-executive-stage">
      {/* Subtle Ambient Radial Lighting */}
      <div className="nf-backdrop-glow" />

      <div className="nf-executive-container">
        {/* Subtle Status Pill */}
        <div className="nf-status-tag">
          <span className="nf-pulse-dot" />
          <span>Error 404</span>
        </div>

        {/* Clean Hero Headline */}
        <h1 className="nf-main-heading">
          This page could not be found.
        </h1>

        {/* Crisp Subtitle */}
        <p className="nf-description">
          The link you followed may be broken, or the page may have been removed or relocated to a different route.
        </p>

        {/* Refined Minimalist Action Group */}
        <div className="nf-cta-group">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="nf-btn-ghost"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          <Link to="/" className="nf-btn-primary">
            <span>Back to Homepage</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Clean Monospace Route Breadcrumb */}
        <div className="nf-meta-bar">
          <span className="nf-meta-label">Path</span>
          <code className="nf-meta-path">{window.location.pathname}</code>
        </div>
      </div>
    </main>
  );
}
