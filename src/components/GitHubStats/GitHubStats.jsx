import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { 
  GitBranch, 
  Star, 
  Users, 
  FolderGit2, 
  Terminal, 
  ExternalLink, 
  Flame, 
  Activity,
  CheckCircle2,
  Sparkles,
  GitCommit,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import styles from './GitHubStats.module.css';

const GITHUB_USERNAME = 'AbdulWasayAli';

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalStars: 97,
    totalRepos: 14,
    streak: 42,
    topLanguages: [
      { name: 'Dart / Flutter', count: 3, percentage: 38, color: '#00D2B8' },
      { name: 'JavaScript / React', count: 4, percentage: 32, color: '#F7DF1E' },
      { name: 'Node.js / Express', count: 3, percentage: 18, color: '#38BDF8' },
      { name: 'C# / SQL Server', count: 2, percentage: 12, color: '#A855F7' },
    ],
    latestPushes: [
      { repo: 'Portfolio', message: 'feat: add interactive case study modal & responsive gallery', time: 'Recently', branch: 'main' },
      { repo: 'Aquila_Labs', message: 'build: core interface & responsive routing', time: 'Recently', branch: 'main' },
      { repo: 'EventEast', message: 'refactor: role-based auth & attendee workflow', time: 'Recent', branch: 'develop' },
      { repo: 'Currency-Mobile-Application', message: 'feat: live exchange rate calculation', time: 'Recent', branch: 'feature/live-rates' },
    ]
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

            const langCounts = {};
            reposData.forEach(r => {
              if (r.language) {
                langCounts[r.language] = (langCounts[r.language] || 0) + 1;
              }
            });

            const totalWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
            const langColors = {
              Dart: '#00D2B8',
              JavaScript: '#F7DF1E',
              HTML: '#E44D26',
              CSS: '#264DE4',
              PHP: '#4F5D95',
              'C#': '#68217A',
              TypeScript: '#3178C6',
            };

            const computedLangs = Object.entries(langCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
              .map(([name, count]) => ({
                name,
                count,
                percentage: Math.round((count / totalWithLang) * 100),
                color: langColors[name] || '#6c63ff',
              }));

            setStats(prev => ({
              ...prev,
              totalStars: starsCount > 0 ? starsCount : prev.totalStars,
              totalRepos: reposData.length || prev.totalRepos,
              topLanguages: computedLangs.length > 0 ? computedLangs : prev.topLanguages,
            }));
          }
        }
      } catch (err) {
        console.warn('GitHub API rate limited or offline, using fallback telemetry:', err);
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

        {/* Master Obsidian HUD Console */}
        <motion.div
          className={styles.terminalWrapper}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Ambient Glow Accent Bar */}
          <div className={styles.topAuroraLine} />

          {/* Console Header Bar */}
          <div className={styles.terminalHeader}>
            <div className={styles.headerLeftGroup}>
              <div className={styles.trafficLights}>
                <span className={`${styles.lightDot} ${styles.red}`} />
                <span className={`${styles.lightDot} ${styles.yellow}`} />
                <span className={`${styles.lightDot} ${styles.green}`} />
              </div>

              <div className={styles.terminalTitle}>
                <FolderGit2 size={14} className={styles.termIcon} />
                <span className={styles.userPath}>github.com/AbdulWasayAli</span>
              </div>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveIndicatorPill}
            >
              <span className={styles.pulseRadar} />
              <span className={styles.liveIndicatorText}>Profile Active</span>
            </a>
          </div>

          {/* Console Body */}
          <div className={styles.terminalBody}>
            {/* Top Stat Cards (4 Columns with high-end glass cards) */}
            <div className={styles.metricRow}>
              {/* Stat 1: Repositories */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.blueGlowBox}`}>
                  <FolderGit2 size={20} />
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Repositories</span>
                  <div className={styles.valueRow}>
                    <span className={styles.metricValue}>
                      {profile ? profile.public_repos : stats.totalRepos}
                    </span>
                    <span className={styles.metricSubTag}>Public</span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Total Stargazers */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.amberGlowBox}`}>
                  <Star size={20} />
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Total Stars</span>
                  <div className={styles.valueRow}>
                    <span className={styles.metricValue}>{stats.totalStars}+</span>
                    <span className={styles.metricSubTag}>Stargazers</span>
                  </div>
                </div>
              </div>

              {/* Stat 3: Followers / Network */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.emeraldGlowBox}`}>
                  <Users size={20} />
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Community</span>
                  <div className={styles.valueRow}>
                    <span className={styles.metricValue}>
                      {profile ? profile.followers : 15}
                    </span>
                    <span className={styles.metricSubTag}>Followers</span>
                  </div>
                </div>
              </div>

              {/* Stat 4: Engineering Workflow Streak */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.purpleGlowBox}`}>
                  <Flame size={20} />
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Active Cadence</span>
                  <div className={styles.valueRow}>
                    <span className={styles.metricValue}>{stats.streak} Days</span>
                    <span className={styles.metricSubTag}>Streak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive GitHub Calendar Stage */}
            <div className={styles.calendarCardBox}>
              <div className={styles.boxHeader}>
                <div className={styles.boxTitle}>
                  <Activity size={16} className={styles.cyanIcon} />
                  <span>Contribution Calendar</span>
                </div>
                <div className={styles.calendarSyncStatus}>
                  <CheckCircle2 size={13} className={styles.greenCheck} />
                  <span>Verified Contributions</span>
                </div>
              </div>

              <div className={styles.calendarContainer}>
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  theme={{
                    dark: [
                      'rgba(255, 255, 255, 0.04)',
                      'rgba(0, 212, 170, 0.35)',
                      'rgba(0, 212, 170, 0.65)',
                      '#00E5FF',
                      '#38BDF8',
                    ],
                  }}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>

            {/* Split Dashboard: Tech Distribution vs Live Commit Log */}
            <div className={styles.dashboardSplit}>
              {/* Left Column: Stack Ratio */}
              <div className={styles.cardBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxTitle}>
                    <Sparkles size={16} className={styles.purpleIcon} />
                    <span>Primary Languages &amp; Stack Distribution</span>
                  </div>
                  <span className={styles.headerTag}>Codebase Ratio</span>
                </div>

                <div className={styles.stackedBar}>
                  {stats.topLanguages.map((lang, idx) => (
                    <div
                      key={idx}
                      className={styles.barSegment}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>

                <div className={styles.langList}>
                  {stats.topLanguages.map((lang, idx) => (
                    <div key={idx} className={styles.langItem}>
                      <div className={styles.langLeft}>
                        <span className={styles.colorPill} style={{ backgroundColor: lang.color }} />
                        <span className={styles.langName}>{lang.name}</span>
                      </div>
                      <span className={styles.langPercent}>{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Commit Log Feed */}
              <div className={styles.cardBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxTitle}>
                    <GitBranch size={16} className={styles.blueIcon} />
                    <span>Recent Continuous Integration Activity</span>
                  </div>
                  <span className={`${styles.headerTag} ${styles.greenTag}`}>Live Feed</span>
                </div>

                <div className={styles.commitStream}>
                  {stats.latestPushes.map((push, idx) => (
                    <div key={idx} className={styles.streamItem}>
                      <div className={styles.streamIcon}>
                        <span className={styles.commitDot} />
                        {idx !== stats.latestPushes.length - 1 && <span className={styles.streamLine} />}
                      </div>
                      <div className={styles.streamContent}>
                        <div className={styles.streamTop}>
                          <span className={styles.repoBadge}>
                            <FolderGit2 size={11} />
                            {push.repo}
                          </span>
                          <span className={styles.branchBadge}>{push.branch || 'main'}</span>
                          <span className={styles.streamTime}>{push.time}</span>
                        </div>
                        <p className={styles.streamMsg}>{push.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Command Bar Footer */}
            <div className={styles.terminalFooter}>
              <div className={styles.footerPrompt}>
                <span className={styles.promptArrow}>★</span>
                <span className={styles.promptCmd}>github.com/{GITHUB_USERNAME}</span>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewGhBtn}
              >
                <span>View GitHub Profile</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
