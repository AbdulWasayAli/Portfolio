import { useState, useEffect, useRef, useCallback } from 'react';
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
      text: "👋 Hi! I'm Wasay's AI Companion. How can I help you explore his portfolio today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const robotRef = useRef(null);
  const chatEndRef = useRef(null);

  // Quick interactive chips
  const quickQuestions = [
    { label: '🚀 Primary Skills?', query: 'skills' },
    { label: '💼 Available for Hire?', query: 'hire' },
    { label: '📬 Contact Info?', query: 'contact' },
    { label: '🏆 Featured Projects?', query: 'projects' },
  ];

  const botResponses = {
    skills:
      "Abdul Wasay specializes in **Modern Frontend & Full-Stack Development**:\n• **Core:** React.js, Next.js, TypeScript, JavaScript (ES6+)\n• **Mobile:** Flutter, Dart, Cross-platform Apps\n• **Styling:** CSS3, Glassmorphism, Tailwind, Responsive UI\n• **Backend & Tools:** Node.js, Firebase, REST APIs, Git/GitHub, Vite",
    hire:
      "✅ **Yes, absolutely!** Abdul Wasay is actively open to:\n• Full-time Software Engineering roles\n• High-impact contract & freelance projects\n• Startup collaborations & MVP developments\n\nReach out directly through WhatsApp or the Contact form!",
    contact:
      "You can connect with Wasay instantly via:\n• 📧 **Email:** abdulwasayali77@gmail.com\n• 📱 **WhatsApp:** Use the green floating button on the bottom-right!\n• 💼 **LinkedIn / GitHub:** Links available in the Hero & Footer sections.",
    projects:
      "Check out his top builds in the **Projects Section**:\n• **Aquila Labs:** Modern high-performance web platform\n• **EventEast:** Full-scale event booking ecosystem\n• **Currency App:** Flutter-powered real-time finance tool\n\nScroll up to the Projects section to explore all live demos!",
    fallback:
      "Thanks for your message! For direct communication, feel free to drop an email to abdulwasayali77@gmail.com or click the WhatsApp button to chat with Wasay directly!",
  };

  const handleAsk = (queryKey, customLabel) => {
    const userMsg = { id: Date.now(), sender: 'user', text: customLabel || queryKey };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = botResponses[queryKey] || botResponses.fallback;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: replyText },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal('');

    const lower = text.toLowerCase();
    let matchedKey = 'fallback';
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      matchedKey = 'skills';
    } else if (lower.includes('hire') || lower.includes('job') || lower.includes('available') || lower.includes('freelance')) {
      matchedKey = 'hire';
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
      matchedKey = 'contact';
    } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) {
      matchedKey = 'projects';
    }

    handleAsk(matchedKey, text);
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

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
      {/* Interactive Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <span className={styles.botAvatar}>🤖</span>
              <div>
                <h4 className={styles.botTitle}>Wasay AI Assistant</h4>
                <span className={styles.botStatus}>Online • Ready to help</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
              aria-label="Close Assistant"
            >
              ✕
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageWrapper} ${
                  m.sender === 'user' ? styles.userWrapper : styles.botWrapper
                }`}
              >
                <div
                  className={`${styles.messageBubble} ${
                    m.sender === 'user' ? styles.userBubble : styles.botBubble
                  }`}
                >
                  {m.text.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={`${styles.messageBubble} ${styles.botBubble} ${styles.typingDots}`}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className={styles.quickChips}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className={styles.chipBtn}
                onClick={() => handleAsk(q.query, q.label)}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} className={styles.chatInputForm}>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about Wasay..."
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn} aria-label="Send message">
              ➤
            </button>
          </form>
        </div>
      )}

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
