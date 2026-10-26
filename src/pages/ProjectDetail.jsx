import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Share2, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Palette
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project by id (numerical or string comparison)
  const projectIndex = projectsData.findIndex((p) => String(p.id) === String(id));
  const project = projectsData[projectIndex];

  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!project) {
    return (
      <div className={styles.notFoundWrapper}>
        <div className={styles.notFoundCard}>
          <h2>Project Not Found</h2>
          <p>The requested engineering project does not exist or may have been relocated.</p>
          <Link to="/#projects" className={styles.backBtn}>
            <ArrowLeft size={16} /> Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${project.title} — Abdul Wasay Ali`,
        text: project.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'mobile':
        return <Smartphone size={14} />;
      case 'development':
        return <Globe size={14} />;
      default:
        return <Palette size={14} />;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Ambient background glows */}
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />

      {/* Top Floating Glass Navigation */}
      <nav className={styles.topNavigation}>
        <div className={styles.navInner}>
          <button onClick={() => navigate('/#projects')} className={styles.backNavBtn}>
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>

          <div className={styles.navRightActions}>
            <button onClick={handleShare} className={styles.shareBtn} title="Share Case Study">
              <Share2 size={15} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Case Study Article */}
      <main className={styles.caseStudyMain}>
        {/* Header Hero Section */}
        <header className={styles.caseStudyHero}>
          <div className={styles.metaBadgeRow}>
            <span className={styles.categoryBadge}>
              {getCategoryIcon(project.category)}
              <span>{project.category.toUpperCase()}</span>
            </span>
            <span className={styles.badgeDivider}>•</span>
            <span className={styles.roleTag}>Architected & Developed by Abdul Wasay Ali</span>
          </div>

          <h1 className={styles.projectHeroTitle}>{project.title}</h1>
          {project.subtitle && (
            <p className={styles.projectHeroSubtitle}>{project.subtitle}</p>
          )}

          {/* Quick CTAs & Tags Row */}
          <div className={styles.heroActionsRow}>
            <div className={styles.techTagsList}>
              {project.tags.map((tag, idx) => (
                <span key={idx} className={styles.techTagPill}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.externalLinksGroup}>
              {project.github && project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.gitActionBtn}
                >
                  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveActionBtn}
                >
                  <span>Live Preview</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* High-Definition Media Showcase Stage */}
        <section className={styles.showcaseStage}>
          <div className={styles.mediaFrame} data-category={project.category}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={styles.showcaseImage}
              />
            ) : (
              <div className={styles.placeholderMedia}>
                <Sparkles size={36} />
                <span>Engineering Showcase</span>
              </div>
            )}
            <div className={styles.glassReflection} />
          </div>
        </section>

        {/* Deep Dive Bento Grid */}
        <div className={styles.deepDiveGrid}>
          {/* Section 1: Overview & Mission */}
          <div className={`${styles.bentoCard} ${styles.overviewCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle}>
                <Layers size={18} />
              </div>
              <div>
                <span className={styles.cardLabel}>Executive Summary</span>
                <h3 className={styles.cardTitle}>Project Overview & Problem Statement</h3>
              </div>
            </div>
            <p className={styles.cardBodyText}>
              {project.overview || project.description}
            </p>
          </div>

          {/* Section 2: Key Capabilities & Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className={`${styles.bentoCard} ${styles.featuresCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className={styles.cardLabel}>Product Capabilities</span>
                  <h3 className={styles.cardTitle}>Key Features & Engineering Deliverables</h3>
                </div>
              </div>
              <ul className={styles.featuresList}>
                {project.keyFeatures.map((feat, index) => (
                  <li key={index} className={styles.featureItem}>
                    <div className={styles.bulletCheck}>✓</div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 3: Architecture & System Stack */}
          {project.architecture && (
            <div className={`${styles.bentoCard} ${styles.archCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  <Cpu size={18} />
                </div>
                <div>
                  <span className={styles.cardLabel}>Under The Hood</span>
                  <h3 className={styles.cardTitle}>Architecture & Tech Stack</h3>
                </div>
              </div>
              <div className={styles.archInnerBlock}>
                <p className={styles.cardBodyText}>{project.architecture}</p>
              </div>
            </div>
          )}
        </div>

        {/* Next / Previous Project Pagination Bar */}
        <footer className={styles.projectFooterNav}>
          {prevProject ? (
            <button
              onClick={() => navigate(`/project/${prevProject.id}`)}
              className={`${styles.navProjectCard} ${styles.prevCard}`}
            >
              <ArrowLeft size={20} className={styles.navArrow} />
              <div className={styles.navInfo}>
                <span className={styles.navSub}>Previous Project</span>
                <span className={styles.navTitle}>{prevProject.title}</span>
              </div>
            </button>
          ) : <div className={styles.navSpacer} />}

          {nextProject ? (
            <button
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className={`${styles.navProjectCard} ${styles.nextCard}`}
            >
              <div className={styles.navInfo}>
                <span className={styles.navSub}>Next Project</span>
                <span className={styles.navTitle}>{nextProject.title}</span>
              </div>
              <ArrowRight size={20} className={styles.navArrow} />
            </button>
          ) : <div className={styles.navSpacer} />}
        </footer>
      </main>
    </div>
  );
}
