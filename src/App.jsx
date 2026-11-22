import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import GitHubStats from './components/GitHubStats/GitHubStats';
import Contact from './components/Contact/Contact';
import InteractiveBrandBanner from './components/InteractiveBrandBanner/InteractiveBrandBanner';
import Footer from './components/Footer/Footer';
import FloatingControls from './components/FloatingControls/FloatingControls';
import FloatingRobot from './components/FloatingRobot/FloatingRobot';
import CommandMenu from './components/CommandMenu/CommandMenu';
import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import { motion, useScroll, useSpring } from 'framer-motion';
import SplashScreen from './components/SplashScreen/SplashScreen';
import AtmosphericBackground from './components/AtmosphericBackground/AtmosphericBackground';
import './styles/globals.css';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 800,
    damping: 35,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
    />
  );
}

function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showSplash, setShowSplash] = useState(isHomePage);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  // Global Keyboard Shortcut: Ctrl + K or Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      {isHomePage && showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      
      {/* Global Command Palette Spotlight */}
      <CommandMenu 
        isOpen={isCommandMenuOpen} 
        onClose={() => setIsCommandMenuOpen(false)} 
      />

      <Routes>
        <Route path="/" element={
          <>
            <ScrollProgress />
            <AtmosphericBackground />
            <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <GitHubStats />
              <Contact />
              <InteractiveBrandBanner />
              <ScrollRevealInit />
            </main>
            <Footer />
            <FloatingControls />
            <FloatingRobot />
          </>
        } />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
