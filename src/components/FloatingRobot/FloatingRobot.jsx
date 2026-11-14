import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowUp, X, ExternalLink, Zap, FolderGit2, Cpu, Briefcase, PhoneCall } from 'lucide-react';
import styles from './FloatingRobot.module.css';

// Authentic Wasay brand geometric 'W'
function BrandLogoSvg({ size = 20, glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="brandGrad1" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
        <linearGradient id="brandGrad2" x1="16" y1="10" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        {glow && (
          <filter id="brandNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00e5ff" floodOpacity="0.5" />
          </filter>
        )}
      </defs>
      <path
        d="M5 8L11 24L16 13L21 24L27 8"
        stroke="rgba(255, 255, 255, 0.12)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8L11 24L16 13"
        stroke="url(#brandGrad1)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13L21 24L27 8"
        stroke="url(#brandGrad2)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? "url(#brandNeonGlow)" : undefined}
      />
      <circle
        cx="16"
        cy="13"
        r="2"
        fill="#00e5ff"
      />
    </svg>
  );
}

export default function FloatingRobot() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm Wasay's **AI Companion**. I can guide you through his projects, engineering skills, tech stack, or connect you directly with him. What would you like to explore?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const robotRef = useRef(null);
  const chatEndRef = useRef(null);

  // Clean, professional quick interactive chips with proper Lucide SVG icons
  const quickQuestions = [
    { label: '30s Pitch', icon: Zap, query: 'pitch' },
    { label: 'Top Projects', icon: FolderGit2, query: 'projects' },
    { label: 'Tech Stack', icon: Cpu, query: 'skills' },
    { label: 'Hire Wasay', icon: Briefcase, query: 'hire' },
    { label: 'Direct Contact', icon: PhoneCall, query: 'contact' },
  ];

  const botResponses = {
    pitch: {
      text: "⚡ **Abdul Wasay Ali in 30 Seconds:**\nA versatile **Software Engineer & Mobile App Developer** based in Karachi. He crafts high-performance web applications using **React & Modern Full-Stack** and cross-platform mobile apps with **Flutter & Dart**. Passionate about clean code, scalable architecture, and cutting-edge user experiences.",
    },
    skills: {
      text: "Abdul Wasay specializes in **Full-Stack, Mobile & Data Engineering**:\n• **Frontend:** React.js, JavaScript (ES6+), Modern Responsive CSS, Framer Motion\n• **Mobile:** Flutter, Dart, Cross-Platform Mobile Apps, State Management\n• **Backend & APIs:** Python (Flask), Node.js (Express), PHP (Laravel), C# / .NET\n• **Databases & Tools:** MySQL, MongoDB, Firebase, Git & GitHub, Vite",
    },
    hire: {
      text: "✅ **Yes, absolutely!** Abdul Wasay is actively available for:\n• Full-time Software Engineering roles\n• High-impact Contract & Freelance projects\n• Startup MVPs & Mobile App builds\n\nDirect WhatsApp: **+92 3110214934** | Email: **wasay3105@gmail.com**",
    },
    contact: {
      text: "Connect directly with Wasay:\n• 📧 **Email:** wasay3105@gmail.com\n• 📱 **WhatsApp:** +92 3110214934\n• 💼 **LinkedIn:** linkedin.com/in/abdul-wasay-ali-295480256/\n• 🐙 **GitHub:** github.com/AbdulWasayAli",
    },
    projects: {
      text: "Here are some of Abdul Wasay's highlighted builds. You can click to explore them directly:",
      projects: [
        {
          name: "Watch Store",
          tag: "Luxury Horology Showcase",
          tech: "HTML5 • CSS3 • Bootstrap",
          link: "#projects",
        },
        {
          name: "EventEast Ecosystem",
          tag: "Event & Ticket Platform",
          tech: "Full-Stack • REST API",
          link: "#projects",
        },
        {
          name: "Currency Converter",
          tag: "Real-time Financial Tool",
          tech: "Flutter • Dart • Live API",
          link: "#projects",
        },
      ],
    },
    fallback: {
      text: "I am specifically tuned to help you explore Abdul Wasay's software engineering portfolio, skills, experience, and projects. Feel free to click any quick chip or ask how to hire him!",
    },
  };

  const handleMouseMove = useCallback((e) => {
    if (!robotRef.current) return;
    const rect = robotRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const rotY = Math.max(-18, Math.min(18, (dx / 300) * 18));
    const rotX = Math.max(-14, Math.min(14, (-dy / 300) * 14));
    setRotation({ x: rotX, y: rotY });

    const eyeX = Math.max(-3, Math.min(3, (dx / 200) * 3));
    const eyeY = Math.max(-2.5, Math.min(2.5, (dy / 200) * 2.5));
    setEyePos({ x: eyeX, y: eyeY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleAsk = async (queryText, directKey) => {
    const userMsg = { id: Date.now(), sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const richPreset = directKey && botResponses[directKey];

    if (richPreset) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: richPreset.text,
            projects: richPreset.projects || null,
          },
        ]);
        setIsTyping(false);
      }, 350);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply || botResponses.fallback.text,
        },
      ]);
    } catch {
      const lower = queryText.toLowerCase();
      let matched = botResponses.fallback.text;
      if (lower.includes('project') || lower.includes('work') || lower.includes('build')) {
        matched = botResponses.projects.text;
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        matched = botResponses.skills.text;
      } else if (lower.includes('hire') || lower.includes('job') || lower.includes('available')) {
        matched = botResponses.hire.text;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
        matched = botResponses.contact.text;
      } else if (lower.includes('who') || lower.includes('about') || lower.includes('wasay') || lower.includes('pitch')) {
        matched = botResponses.pitch.text;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: matched,
          projects: matched === botResponses.projects.text ? botResponses.projects.projects : null,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const txt = inputVal.trim();
    setInputVal('');
    handleAsk(txt, null);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const renderMessageText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lIdx} className={styles.textLine}>
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return (
                <strong key={pIdx} className={styles.boldText}>
                  {p.slice(2, -2)}
                </strong>
              );
            }
            return p;
          })}
        </span>
      );
    });
  };

  return (
    <aside aria-label="Interactive AI Assistant" className={styles.companionContainer}>
      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={styles.chatWindow}
          >
            {/* Top subtle clean line */}
            <div className={styles.topAccentBar} />

            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                {/* Premium Brand Logo Avatar */}
                <div className={styles.botAvatarWrapper}>
                  <div className={styles.aiAvatarSquircle}>
                    <BrandLogoSvg size={22} glow />
                  </div>
                </div>

                <div className={styles.headerTitleBlock}>
                  <div className={styles.titleRow}>
                    <h4 className={styles.botTitle}>Wasay AI</h4>
                    <span className={styles.verifiedBadge} title="Verified Assistant">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </div>
                  <span className={styles.botStatus}>
                    Interactive Portfolio Assistant
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
                aria-label="Close Assistant"
              >
                <X size={15} strokeWidth={2.2} />
              </button>
            </div>

            {/* Conversation Feed */}
            <div className={styles.messagesContainer}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`${styles.messageWrapper} ${
                    m.sender === 'user' ? styles.userWrapper : styles.botWrapper
                  }`}
                >
                  {m.sender === 'bot' && (
                    <div className={styles.bubbleAvatar}>
                      <BrandLogoSvg size={14} />
                    </div>
                  )}
                  <div className={styles.bubbleContentGroup}>
                    <div
                      className={`${styles.messageBubble} ${
                        m.sender === 'user' ? styles.userBubble : styles.botBubble
                      }`}
                    >
                      {renderMessageText(m.text)}

                      {/* Interactive Mini Project Cards */}
                      {m.projects && m.projects.length > 0 && (
                        <div className={styles.projectsDeck}>
                          {m.projects.map((proj, pIdx) => (
                            <a
                              key={pIdx}
                              href={proj.link}
                              onClick={() => setIsOpen(false)}
                              className={styles.projectMiniCard}
                            >
                              <div className={styles.projectMiniHeader}>
                                <span className={styles.projectMiniName}>{proj.name}</span>
                                <ExternalLink size={12} className={styles.projectMiniIcon} />
                              </div>
                              <span className={styles.projectMiniTag}>{proj.tag}</span>
                              <div className={styles.projectMiniTech}>{proj.tech}</div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                  <div className={styles.bubbleAvatar}>
                    <BrandLogoSvg size={14} />
                  </div>
                  <div className={`${styles.messageBubble} ${styles.botBubble} ${styles.typingDots}`}>
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Chips with Clean SVG Icons */}
            <div className={styles.quickChips}>
              {quickQuestions.map((q, idx) => {
                const IconComponent = q.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={styles.chipBtn}
                    onClick={() => handleAsk(q.label, q.query)}
                  >
                    <IconComponent size={12} className={styles.chipIcon} />
                    <span>{q.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Dock */}
            <form onSubmit={handleSubmit} className={styles.chatInputForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about skills, projects, background..."
                  className={styles.chatInput}
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className={`${styles.sendBtn} ${inputVal.trim() ? styles.sendBtnActive : ''}`}
                  aria-label="Send query"
                >
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Robot Mascot (Clickable Trigger - Preserved Exactly) */}
      <div
        ref={robotRef}
        className={`${styles.robotStage} ${isOpen ? styles.robotActive : ''}`}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setHasUnread(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Toggle Wasay AI Assistant"
      >
        {/* Unread Alert Ping */}
        {hasUnread && !isOpen && (
          <div className={styles.chatAlertBadge}>
            <span>Chat</span>
          </div>
        )}

        {/* Ambient Glow */}
        <div className={styles.glow} />

        {/* Orbit Ring */}
        <div className={styles.orbitRing} />

        {/* 3D Mesh Body */}
        <div
          className={styles.robotMesh}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* Antenna */}
          <div className={styles.antenna}>
            <div className={styles.antennaBall} />
            <div className={styles.antennaStem} />
          </div>

          {/* Head */}
          <div className={styles.head}>
            <div className={styles.visor}>
              <div className={styles.scanLine} />

              {/* Eyes tracking cursor */}
              <div className={styles.eyeRow}>
                <div className={styles.eyeSocket}>
                  <div
                    className={`${styles.eye} ${isHovered ? styles.blink : ''}`}
                    style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                  />
                </div>
                <div className={styles.eyeSocket}>
                  <div
                    className={`${styles.eye} ${isHovered ? styles.blink : ''}`}
                    style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
                  />
                </div>
              </div>

              {/* Visor Grill */}
              <div className={styles.mouth}>
                <span /><span /><span />
              </div>
            </div>

            {/* Ears */}
            <div className={`${styles.ear} ${styles.earLeft}`}>
              <div className={styles.earDot} />
            </div>
            <div className={`${styles.ear} ${styles.earRight}`}>
              <div className={styles.earDot} />
            </div>
          </div>

          {/* Neck */}
          <div className={styles.neck} />

          {/* Chest */}
          <div className={styles.chest}>
            <div className={styles.coreReactor} />
            <div className={styles.chestLines}>
              <span /><span /><span />
            </div>
          </div>

          {/* Arms */}
          <div className={`${styles.arm} ${styles.armLeft}`}>
            <div className={styles.shoulder} />
            <div className={styles.forearm} />
          </div>
          <div className={`${styles.arm} ${styles.armRight}`}>
            <div className={styles.shoulder} />
            <div className={styles.forearm} />
          </div>
        </div>

        {/* Mascot Status Label */}
        <div className={styles.statusPill}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            {isOpen ? 'Close Chat' : 'Ask Bot'}
          </span>
        </div>
      </div>
    </aside>
  );
}
