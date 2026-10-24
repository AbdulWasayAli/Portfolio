import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X, 
  Code2, 
  Compass, 
  BookmarkCheck,
  Share2
} from 'lucide-react';
import { blogPosts } from '../../data/blogData';
import styles from './Blog.module.css';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const scrollRef = useRef(null);

  const isPaused = useRef(false);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const totalMoved = useRef(0);
  const animFrameId = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const autoLoop = () => {
      if (!isPaused.current && !selectedPost && !isDown.current) {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 1.2;
        }
      }
      animFrameId.current = requestAnimationFrame(autoLoop);
    };

    animFrameId.current = requestAnimationFrame(autoLoop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const handleMouseDown = (e) => {
    isDown.current = true;
    totalMoved.current = 0;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    startScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    totalMoved.current += Math.abs(walk);
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleCardClick = (post) => {
    if (totalMoved.current > 10) return;
    setSelectedPost(post);
  };

  const handleShare = () => {
    if (navigator.share && selectedPost) {
      navigator.share({
        title: selectedPost.title,
        text: selectedPost.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="blog" className={`section ${styles.blogSection}`}>
      <div className="container">
        <div className="section-heading">
          <span className="subtitle">My Blog & Thoughts</span>
          <h2>Insights, Articles & Journey</h2>
          <p>
            Documenting my learnings across AI workflows, full-stack architecture, and real-world mobile app development.
          </p>
        </div>

        <div 
          className={styles.carouselTrack} 
          ref={scrollRef}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { 
            isPaused.current = false; 
            isDown.current = false; 
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={() => { isPaused.current = true; }}
          onTouchEnd={() => { isPaused.current = false; }}
        >
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className={styles.blogCard}
              onClick={() => handleCardClick(post)}
            >
              <div className={styles.imageFrame}>
                <img src={post.image} alt={post.title} className={styles.coverImg} loading="lazy" />
                <div className={styles.imageGradientOverlay} />
                
                <div className={styles.badgeRow}>
                  <span className={styles.categoryBadge}>{post.category}</span>
                  <span className={styles.statusPill}>
                    <span className={styles.pulseDot} />
                    {post.status}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.metaInfo}>
                  <span className={styles.metaItem}>
                    <Calendar size={13} /> {post.date}
                  </span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.metaItem}>
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                <h3 className={styles.cardHeading}>{post.title}</h3>
                <p className={styles.cardText}>{post.excerpt}</p>

                <div className={styles.tagList}>
                  {post.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.tagItem}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className={styles.actionRow}>
                  <span className={styles.readPrompt}>
                    Read Article Preview <ArrowRight size={15} className={styles.arrow} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setSelectedPost(null)}
        >
          <div className={styles.ambientAura} />
          
          <div 
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setSelectedPost(null)}
              aria-label="Close Modal"
              title="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className={styles.modalHero}>
              <img src={selectedPost.image} alt={selectedPost.title} className={styles.modalHeroImage} />
              <div className={styles.modalHeroGlow} />
              
              <div className={styles.modalHeroBadge}>
                <span className={styles.heroCategory}>{selectedPost.category}</span>
                <span className={styles.heroTime}>
                  <Clock size={13} /> {selectedPost.readTime}
                </span>
                <span className={styles.heroDate}>
                  <Calendar size={13} /> {selectedPost.date}
                </span>
              </div>
            </div>

            <div className={styles.modalContentWrapper}>
              <h2 className={styles.modalTitle}>{selectedPost.title}</h2>

              <div className={styles.authorBadgeRow}>
                <div className={styles.authorProfile}>
                  <div className={styles.authorAvatar}>AW</div>
                  <div>
                    <h4 className={styles.authorName}>Abdul Wasay Ali</h4>
                    <span className={styles.authorTitle}>Software Engineer & Mobile App Developer</span>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button 
                    className={styles.actionBtn}
                    onClick={handleShare}
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className={styles.statusPillBanner}>
                <Sparkles size={16} className={styles.sparkleIcon} />
                <div>
                  <strong>Editorial In Progress</strong>
                  <p>Full article with architecture blueprints, benchmark data, and runnable snippets is currently being compiled.</p>
                </div>
              </div>

              <div className={styles.editorialSection}>
                <div className={styles.sectionHeadingLine}>
                  <Compass size={16} />
                  <span>Executive Summary & Context</span>
                </div>
                <p className={styles.editorialLead}>{selectedPost.fullStory}</p>
              </div>

              <div className={styles.takeawaysSection}>
                <div className={styles.sectionHeadingLine}>
                  <Code2 size={16} />
                  <span>Key Architectural Points & Insights</span>
                </div>

                <div className={styles.takeawayGrid}>
                  {selectedPost.takeaways?.map((item, i) => (
                    <div key={i} className={styles.takeawayCard}>
                      <div className={styles.takeawayIndex}>0{i + 1}</div>
                      <div className={styles.takeawayBody}>
                        <p>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.tagsContainer}>
                {selectedPost.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={styles.topicTag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.footerNote}>
                  <BookmarkCheck size={14} /> Curated by Abdul Wasay Ali
                </div>
                <button 
                  className={styles.closeFooterBtn}
                  onClick={() => setSelectedPost(null)}
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
