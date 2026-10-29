import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowUp, X, ExternalLink } from 'lucide-react';
import styles from './FloatingRobot.module.css';

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

  // Quick interactive chips with category icons
  const quickQuestions = [
    { label: '⚡ 30s Pitch', query: 'pitch' },
    { label: '🚀 Top Projects', query: 'projects' },
    { label: '🛠️ Tech Stack', query: 'skills' },
    { label: '💼 Hire Wasay', query: 'hire' },
    { label: '📞 Direct Contact', query: 'contact' },
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

  const handleAsk = async (queryText, directKey) => {
    const userMsg = { id: Date.now(), sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Check if direct key maps to rich bot response
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
      // Try calling serverless backend /api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, sender: 'bot', text: data.reply },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Serverless not available locally; use grounded fallback
    }

    // Grounded Fallback
    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let replyData = botResponses.fallback;

      if (lower.match(/^(hi|hello|hey|salam|assalam|aoa)/)) {
        replyData = {
          text: "👋 Hello! I'm Wasay's AI Companion. How can I help you explore his portfolio, tech stack, or projects today?",
        };
      } else if (lower.includes('pitch') || lower.includes('about') || lower.includes('who is')) {
        replyData = botResponses.pitch;
      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
        replyData = botResponses.skills;
      } else if (lower.includes('hire') || lower.includes('job') || lower.includes('available')) {
        replyData = botResponses.hire;
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('whatsapp')) {
        replyData = botResponses.contact;
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('build')) {
        replyData = botResponses.projects;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyData.text,
          projects: replyData.projects || null,
        },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal('');
    handleAsk(text);
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  // Render message text with **bold** and newline support
  const renderMessageText = (text) => {
    return text.split('\n').map((line, idx) => (
      <span key={idx} className={styles.textLine}>
        {line.split(/(\*\*.*?\*\*)/).map((part, pidx) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={pidx} className={styles.boldText}>{part.slice(2, -2)}</strong>
            : part
        )}
      </span>
    ));
  };

  // Smooth mouse tracking
  const handleMouseMove = useCallback((e) => {
    if (!robotRef.current) return;
    const rect = robotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // 3D rotation based on mouse
    const rotY = Math.max(-18, Math.min(18, (deltaX / window.innerWidth) * 36));
    const rotX = Math.max(-18, Math.min(18, -(deltaY / window.innerHeight) * 36));
    setRotation({ x: rotX, y: rotY });

    // Independent pupil tracking
    const angle = Math.atan2(deltaY, deltaX);
    const dist = Math.min(3.2, Math.hypot(deltaX, deltaY) / 55);
    setEyePos({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <aside aria-label="Interactive AI Assistant" className={styles.companionContainer}>
      {/* Interactive Chat Window with Framer Motion spring physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={styles.chatWindow}
          >
            {/* Top ambient accent glow */}
            <div className={styles.topAccentBar} />

            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                {/* 3D Premium Robot Mascot Avatar */}
                <div className={styles.botAvatarWrapper}>
                  <div className={styles.avatarGlowLayer} />
                  <div className={styles.aiAvatarSquircle}>
                    <img
                      src="/robot-avatar.webp"
                      alt="Wasay AI Robot"
                      className={styles.robotAvatarImg}
                    />
                  </div>
                  <span className={styles.onlinePill} />
                </div>

                <div className={styles.headerTitleBlock}>
                  <div className={styles.titleRow}>
                    <h4 className={styles.botTitle}>Wasay AI</h4>
                    <span className={styles.verifiedBadge} title="Verified Assistant">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </div>
                  <span className={styles.botStatus}>
                    <span className={styles.statusLiveDot} />
                    Active & ready to assist
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
                      <img
                        src="/robot-avatar.webp"
                        alt="Bot"
                        className={styles.bubbleAvatarImg}
                      />
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
                    <img
                      src="/robot-avatar.webp"
                      alt="Bot"
                      className={styles.bubbleAvatarImg}
                    />
                  </div>
                  <div className={`${styles.messageBubble} ${styles.botBubble} ${styles.typingDots}`}>
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className={styles.quickChips}>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.chipBtn}
                  onClick={() => handleAsk(q.label, q.query)}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSend} className={styles.chatInputForm}>
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
                  aria-label="Send message"
                >
                  <ArrowUp size={16} strokeWidth={2.6} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Robot Mascot (Clickable Trigger) */}
      <div
        ref={robotRef}
        className={`${styles.robotStage} ${isOpen ? styles.robotActive : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
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
