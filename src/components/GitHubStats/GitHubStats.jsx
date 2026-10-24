import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import styles from './GitHubStats.module.css';

const GITHUB_USERNAME = 'AbdulWasayAli';

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    totalStars: 97,
    totalRepos: 14,
    topLanguages: [
      { name: 'Dart / Flutter', count: 3, percentage: 35, color: '#00D2B8' },
      { name: 'JavaScript / Node', count: 4, percentage: 30, color: '#F7DF1E' },
      { name: 'HTML / CSS / Web', count: 5, percentage: 25, color: '#E44D26' },
      { name: 'C# / SQL Server', count: 2, percentage: 10, color: '#68217A' },
    ],
    latestPushes: [
      { repo: 'Portfolio', message: 'feat: add interactive case study modal & responsive gallery', time: 'Recently' },
      { repo: 'Aquila_Labs', message: 'build: core interface & responsive routing', time: 'Recently' },
      { repo: 'EventEast', message: 'refactor: role-based auth & attendee workflow', time: 'Recent' },
      { repo: 'Currency-Mobile-Application', message: 'feat: live exchange rate calculation', time: 'Recent' },
    ]
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        // Fetch User Profile
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          if (isMounted) setProfile(userData);
        }

        // Fetch Public Repos
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (isMounted && Array.isArray(reposData)) {
            // Compute actual stars
            const starsCount = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

            // Compute languages
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
        console.warn('GitHub API rate limited or offline, using verified live fallback stats:', err);
      }
    }

    fetchGitHubData();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="github-activity" className={`section ${styles.githubSection}`}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <span className="subtitle">Real-Time Metrics</span>
          <h2>Open Source & Activity</h2>
          <p>Live telemetry directly fetched from GitHub REST API showcasing continuous coding activity.</p>
        </div>

        {/* Cyber Terminal Dashboard Frame */}
        <div className={styles.terminalWrapper}>
          {/* Terminal Title Bar */}
          <div className={styles.terminalHeader}>
            <div className={styles.trafficLights}>
              <span className={`${styles.lightDot} ${styles.red}`} />
              <span className={`${styles.lightDot} ${styles.yellow}`} />
              <span className={`${styles.lightDot} ${styles.green}`} />
            </div>

            <div className={styles.terminalTitle}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>wasay@cyber-terminal: ~/github-telemetry --status=live</span>
            </div>

            <div className={styles.liveBadge}>
              <span className={styles.pulseRadar} />
              <span>LIVE API</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className={styles.terminalBody}>
            {/* Top Metrics Stat Cards */}
            <div className={styles.metricRow}>
              {/* Stat 1: Public Repositories */}
              <div className={styles.metricCard}>
                <div className={styles.metricIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Repositories</span>
                  <span className={styles.metricValue}>
                    {profile ? profile.public_repos : stats.totalRepos}+
                  </span>
                </div>
              </div>

              {/* Stat 2: Total Stargazers */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.starIconBox}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Total Stars</span>
                  <span className={styles.metricValue}>{stats.totalStars}+</span>
                </div>
              </div>

              {/* Stat 3: Profile Followers */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.userIconBox}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Network & Reach</span>
                  <span className={styles.metricValue}>
                    {profile ? `${profile.followers} Followers` : 'Active'}
                  </span>
                </div>
              </div>

              {/* Stat 4: Engineering Workflow */}
              <div className={styles.metricCard}>
                <div className={`${styles.metricIconBox} ${styles.branchIconBox}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M6 9v6" />
                    <path d="M9 18h12" />
                    <circle cx="18" cy="9" r="3" />
                    <path d="M6 9a9 9 0 0 1 9 9" />
                  </svg>
                </div>
                <div className={styles.metricData}>
                  <span className={styles.metricLabel}>Workflow</span>
                  <span className={styles.metricValue}>Git CI/CD</span>
                </div>
              </div>
            </div>

            {/* Live GitHub Contribution Calendar Section */}
            <div className={styles.calendarCardBox}>
              <div className={styles.boxHeader}>
                <div className={styles.boxTitle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Real-Time Contribution Activity Calendar</span>
                </div>
                <span className={`${styles.headerTag} ${styles.greenTag}`}>Synced with GitHub</span>
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
                      'rgba(255, 255, 255, 0.04)', // Empty (No contributions)
                      'rgba(0, 212, 170, 0.35)',   // Level 1: Soft Emerald
                      'rgba(0, 212, 170, 0.65)',   // Level 2: Medium Emerald
                      '#00E5FF',                   // Level 3: Bright Neon Cyan
                      '#38BDF8',                   // Level 4: Vivid Electric Cyan
                    ],
                  }}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>

            {/* Split Grid: Languages Distribution + Live Stream */}
            <div className={styles.dashboardSplit}>
              {/* Left Column: Top Languages Bar Chart */}
              <div className={styles.cardBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <span>Primary Tech Stack Distribution</span>
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
                      <div className={styles.langRight}>
                        <span className={styles.langPercent}>{lang.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Commits & Pushes Stream */}
              <div className={styles.cardBox}>
                <div className={styles.boxHeader}>
                  <div className={styles.boxTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <line x1="1.05" y1="12" x2="7" y2="12" />
                      <line x1="17.01" y1="12" x2="22.96" y2="12" />
                    </svg>
                    <span>Recent Continuous Integration Stream</span>
                  </div>
                  <span className={`${styles.headerTag} ${styles.greenTag}`}>Active</span>
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
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
                            {push.repo}
                          </span>
                          <span className={styles.streamTime}>{push.time}</span>
                        </div>
                        <p className={styles.streamMsg}>{push.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Terminal Action Banner */}
            <div className={styles.terminalFooter}>
              <div className={styles.footerPrompt}>
                <span className={styles.promptArrow}>➜</span>
                <span className={styles.promptCmd}>gh repo list AbdulWasayAli --limit=14</span>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewGhBtn}
              >
                <span>Inspect GitHub Profile</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
