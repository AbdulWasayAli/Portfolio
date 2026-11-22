import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Activity, 
  Mail, 
  FileText, 
  Sun, 
  Moon, 
  Copy, 
  Check, 
  Phone, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Command
} from 'lucide-react';
import { projectsData, personalInfo } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import styles from './CommandMenu.module.css';

export default function CommandMenu({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input whenever menu opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Copy helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText('');
      onClose();
    }, 700);
  };

  // Scroll to section helper
  const scrollToSection = (sectionId) => {
    onClose();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build command palette items
  const staticCommands = [
    // Navigation
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home / Hero',
      subtitle: 'Back to top overview',
      icon: Home,
      action: () => scrollToSection('home'),
      shortcut: 'H'
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Me',
      subtitle: 'Background & education summary',
      icon: User,
      action: () => scrollToSection('about'),
      shortcut: 'A'
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Experience & Education',
      subtitle: '10Pearls internship & Aptech engineering track',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
      shortcut: 'E'
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills & Tech Stack',
      subtitle: 'Languages, frameworks & architectures',
      icon: Code2,
      action: () => scrollToSection('skills'),
      shortcut: 'S'
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Featured Projects',
      subtitle: 'Explore full engineering case studies',
      icon: FolderGit2,
      action: () => scrollToSection('projects'),
      shortcut: 'P'
    },
    {
      id: 'nav-github',
      category: 'Navigation',
      title: 'GitHub Telemetry & Activity',
      subtitle: 'Live commits & contribution graph',
      icon: Activity,
      action: () => scrollToSection('github'),
      shortcut: 'G'
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Get In Touch',
      subtitle: 'Direct email form & channels',
      icon: Mail,
      action: () => scrollToSection('contact'),
      shortcut: 'C'
    },

    // Actions & Quick Shortcuts
    {
      id: 'action-resume',
      category: 'Quick Actions',
      title: 'View Resume (CV)',
      subtitle: 'Open official PDF in new tab',
      icon: FileText,
      action: () => {
        onClose();
        window.open(personalInfo.resumeUrl, '_blank');
      },
      shortcut: 'R'
    },
    {
      id: 'action-theme',
      category: 'Quick Actions',
      title: `Toggle Theme (${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`,
      subtitle: 'Switch between Obsidian and Pure White mode',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
      shortcut: 'T'
    },
    {
      id: 'action-copy-email',
      category: 'Quick Actions',
      title: 'Copy Email Address',
      subtitle: personalInfo.email,
      icon: copiedText === 'email' ? Check : Copy,
      action: () => handleCopy(personalInfo.email, 'email'),
      badge: copiedText === 'email' ? 'Copied!' : undefined
    },
    {
      id: 'action-copy-phone',
      category: 'Quick Actions',
      title: 'Copy WhatsApp / Phone',
      subtitle: personalInfo.phone,
      icon: copiedText === 'phone' ? Check : Phone,
      action: () => handleCopy(personalInfo.phone, 'phone'),
      badge: copiedText === 'phone' ? 'Copied!' : undefined
    },
    {
      id: 'action-chat',
      category: 'Quick Actions',
      title: 'Talk with AI Cyber Robot',
      subtitle: 'Ask questions in English or Roman Urdu',
      icon: MessageSquare,
      action: () => {
        onClose();
        document.getElementById('robotChatWindow')?.focus();
        window.dispatchEvent(new CustomEvent('openRobotChat'));
      }
    },

    // Social Links
    {
      id: 'social-github',
      category: 'Social & Profiles',
      title: 'GitHub Profile',
      subtitle: 'github.com/AbdulWasayAli',
      icon: ExternalLink,
      action: () => {
        onClose();
        window.open(personalInfo.social.github, '_blank');
      }
    },
    {
      id: 'social-linkedin',
      category: 'Social & Profiles',
      title: 'LinkedIn Profile',
      subtitle: 'Connect with Abdul Wasay Ali',
      icon: ExternalLink,
      action: () => {
        onClose();
        window.open(personalInfo.social.linkedin, '_blank');
      }
    }
  ];

  // Projects as Searchable Commands
  const projectCommands = projectsData.map(proj => ({
    id: `project-${proj.id}`,
    category: 'Projects',
    title: proj.title,
    subtitle: `${proj.category} · ${proj.tags?.slice(0, 3).join(', ')}`,
    icon: Sparkles,
    action: () => {
      onClose();
      navigate(`/project/${proj.id}`);
    }
  }));

  const allItems = [...staticCommands, ...projectCommands];

  // Filter based on search query
  const filteredItems = allItems.filter(item => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Group by category
  const categories = Array.from(new Set(filteredItems.map(item => item.category)));

  // Keyboard navigation inside list
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Input */}
          <div className={styles.searchHeader}>
            <Search className={styles.searchIcon} size={18} />
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Type a command, project, or section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.escBadge} onClick={onClose}>
              <span>ESC</span>
            </div>
          </div>

          {/* Command Results List */}
          <div className={styles.resultsList} ref={listRef}>
            {filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No results found for "{query}"</p>
                <span>Try searching for 'Resume', 'Contact', 'Projects', or 'Theme'</span>
              </div>
            ) : (
              categories.map(category => {
                const categoryItems = filteredItems.filter(item => item.category === category);
                return (
                  <div key={category} className={styles.categoryGroup}>
                    <div className={styles.categoryTitle}>{category}</div>
                    {categoryItems.map(item => {
                      const itemIndex = filteredItems.findIndex(fi => fi.id === item.id);
                      const isSelected = itemIndex === selectedIndex;
                      const IconComponent = item.icon;

                      return (
                        <div
                          key={item.id}
                          data-index={itemIndex}
                          className={`${styles.itemRow} ${isSelected ? styles.selected : ''}`}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                        >
                          <div className={styles.itemLeft}>
                            <div className={styles.itemIconWrapper}>
                              <IconComponent size={16} />
                            </div>
                            <div className={styles.itemInfo}>
                              <span className={styles.itemTitle}>{item.title}</span>
                              {item.subtitle && (
                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
                              )}
                            </div>
                          </div>

                          <div className={styles.itemRight}>
                            {item.badge && (
                              <span className={styles.itemBadge}>{item.badge}</span>
                            )}
                            {item.shortcut && (
                              <span className={styles.shortcutKey}>{item.shortcut}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className={styles.footerHints}>
            <div className={styles.hintItem}>
              <span className={styles.hintKey}>↑</span>
              <span className={styles.hintKey}>↓</span>
              <span className={styles.hintLabel}>Navigate</span>
            </div>
            <div className={styles.hintItem}>
              <span className={styles.hintKey}>↵</span>
              <span className={styles.hintLabel}>Select</span>
            </div>
            <div className={styles.hintItem}>
              <span className={styles.hintKey}>Esc</span>
              <span className={styles.hintLabel}>Close</span>
            </div>
            <div className={styles.quickWatermark}>
              <Command size={12} />
              <span>Raycast Speed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
