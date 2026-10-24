import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Sparkles, 
  Code2, 
  Compass, 
  BookmarkCheck,
  Share2
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import styles from './BlogDetail.module.css';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Article Not Found</h2>
        <p>The requested blog article does not exist or has been moved.</p>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topNav}>
        <div className={styles.navContainer}>
          <button onClick={() => navigate('/#blog')} className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <button onClick={handleNativeShare} className={styles.shareBtn} title="Share Article">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <article className={styles.articleContainer}>
        <header className={styles.articleHeader}>
          <div className={styles.badgeRow}>
            <span className={styles.categoryBadge}>{post.category}</span>
            <span className={styles.metaItem}>
              <Calendar size={13} /> {post.date}
            </span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>
              <Clock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>

          <div className={styles.authorBar}>
            <div className={styles.authorAvatar}>AW</div>
            <div>
              <div className={styles.authorName}>Abdul Wasay Ali</div>
              <div className={styles.authorRole}>Software Engineer & Mobile App Developer</div>
            </div>
          </div>
        </header>

        <div className={styles.heroImageWrapper}>
          <img src={post.image} alt={post.title} className={styles.heroImage} />
        </div>

        <div className={styles.articleBody}>
          <div className={styles.statusBanner}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <div>
              <strong>Article Drafting in Progress</strong>
              <p>Full walkthrough with architecture schematics, performance benchmarks, and code snippets is being compiled.</p>
            </div>
          </div>

          <section className={styles.proseBlock}>
            <div className={styles.subHeadingLine}>
              <Compass size={18} />
              <h3>Overview & Premise</h3>
            </div>
            <p className={styles.leadText}>{post.fullStory}</p>
          </section>

          <section className={styles.proseBlock}>
            <div className={styles.subHeadingLine}>
              <Code2 size={18} />
              <h3>Key Architecture Points & Learnings</h3>
            </div>
            <div className={styles.pointsGrid}>
              {post.takeaways?.map((point, index) => (
                <div key={index} className={styles.pointCard}>
                  <div className={styles.pointIndex}>0{index + 1}</div>
                  <div className={styles.pointContent}>
                    <p>{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.tagsRow}>
            {post.tags.map((tag, idx) => (
              <span key={idx} className={styles.tagPill}>
                #{tag}
              </span>
            ))}
          </div>

          <footer className={styles.articleFooter}>
            <div className={styles.footerAuthorBadge}>
              <BookmarkCheck size={16} /> Written & Curated by Abdul Wasay Ali
            </div>
            <button onClick={() => navigate('/#blog')} className={styles.footerBackBtn}>
              <ArrowLeft size={16} /> Return to Portfolio
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}
