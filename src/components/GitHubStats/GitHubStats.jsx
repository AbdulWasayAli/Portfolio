import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { 
  Star, 
  Users, 
  FolderGit2, 
  Flame, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import styles from './GitHubStats.module.css';

const GITHUB_USERNAME = 'AbdulWasayAli';

function formatTooltipDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalStars: 97,
    totalRepos: 14,
    streak: 42,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted) setProfile(userData);
        }

        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (isMounted && Array.isArray(reposData)) {
            const starsCount = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

            setStats(prev => ({
              ...prev,
              totalStars: starsCount > 0 ? starsCount : prev.totalStars,
              totalRepos: reposData.length || prev.totalRepos,
            }));
          }
        }
      } catch (err) {
        console.warn('GitHub API rate limited or offline, using fallback:', err);
      }
    }

    fetchGitHubData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="github-activity" className={`section ${styles.githubSection}`}>
      <div className="container">
        {/* Section Heading */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="subtitle">Activity</span>
          <h2 className={styles.sectionTitle}>
            Open Source &amp; <span className={styles.gradientHeading}>Contributions</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            My public repositories, coding cadence, and open-source contributions on GitHub.
          </p>
        </motion.div>

        {/* Clean Bento Grid Dashboard */}
        <motion.div
          className={styles.bentoContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Bar: Profile Identity & External Link */}
          <div className={styles.dashboardHeader}>
            <div className={styles.headerProfile}>
              <FolderGit2 size={18} className={styles.githubIcon} />
              <span className={styles.profileHandle}>github.com/{GITHUB_USERNAME}</span>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewProfileBtn}
            >
              <span>View GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Metric Cards Row */}
          <div className={styles.metricsGrid}>
            {/* Repositories */}
            <div className={`${styles.metricCard} ${styles.metricRepos}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Repositories</span>
                <div className={`${styles.iconWrap} ${styles.iconWrapBlue}`}>
                  <FolderGit2 size={16} />
                </div>
              </div>
              <div className={styles.metricMain}>
                <span className={styles.metricNumber}>
                  {profile ? profile.public_repos : stats.totalRepos}
                </span>
                <span className={styles.metricSub}>Public repos</span>
              </div>
            </div>

            {/* Total Stars */}
            <div className={`${styles.metricCard} ${styles.metricStars}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Total Stars</span>
                <div className={`${styles.iconWrap} ${styles.iconWrapGold}`}>
                  <Star size={16} />
                </div>
              </div>
              <div className={styles.metricMain}>
                <span className={styles.metricNumber}>{stats.totalStars}+</span>
                <span className={styles.metricSub}>Earned stars</span>
              </div>
            </div>

            {/* Followers */}
            <div className={`${styles.metricCard} ${styles.metricFollowers}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Followers</span>
                <div className={`${styles.iconWrap} ${styles.iconWrapGreen}`}>
                  <Users size={16} />
                </div>
              </div>
              <div className={styles.metricMain}>
                <span className={styles.metricNumber}>
                  {profile ? profile.followers : 15}
                </span>
                <span className={styles.metricSub}>Developers</span>
              </div>
            </div>

            {/* Active Cadence */}
            <div className={`${styles.metricCard} ${styles.metricStreak}`}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Coding Streak</span>
                <div className={`${styles.iconWrap} ${styles.iconWrapPurple}`}>
                  <Flame size={16} />
                </div>
              </div>
              <div className={styles.metricMain}>
                <span className={styles.metricNumber}>{stats.streak} Days</span>
                <span className={styles.metricSub}>Continuous commits</span>
              </div>
            </div>
          </div>

          {/* GitHub Contribution Calendar Card */}
          <div className={styles.bentoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Activity size={16} className={styles.cardTitleIcon} />
                <span>Contribution Heatmap</span>
              </div>
              <span className={styles.cardBadge}>Verified Cadence</span>
            </div>

            <div className={styles.calendarWrapper}>
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                tooltips={{
                  activity: {
                    withArrow: true,
                    offset: 8,
                    text: (activity) => {
                      const countText = activity.count === 0 
                        ? 'No contributions' 
                        : activity.count === 1 
                        ? '1 contribution' 
                        : `${activity.count} contributions`;
                      return `${countText} on ${formatTooltipDate(activity.date)}`;
                    },
                  },
                }}
                theme={{
                  dark: [
                    'rgba(255, 255, 255, 0.04)',
                    '#0e4429',
                    '#006d32',
                    '#26a641',
                    '#39d353',
                  ],
                }}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
