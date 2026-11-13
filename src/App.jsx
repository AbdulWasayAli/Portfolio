import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Blog from './components/Blog/Blog';
import GitHubStats from './components/GitHubStats/GitHubStats';
import Contact from './components/Contact/Contact';
import InteractiveBrandBanner from './components/InteractiveBrandBanner/InteractiveBrandBanner';
import Footer from './components/Footer/Footer';
import FloatingControls from './components/FloatingControls';
import FloatingRobot from './components/FloatingRobot/FloatingRobot';
import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import SplashScreen from './components/SplashScreen/SplashScreen';
import AtmosphericBackground from './components/AtmosphericBackground/AtmosphericBackground';
import CyberCursor from './components/CyberCursor/CyberCursor';
import './styles/globals.css';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="scroll-progress-bar" style={{ width: `${width}%` }} />;
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

  return (
    <ThemeProvider>
      <CyberCursor />
      {isHomePage && showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Routes>
        <Route path="/" element={
          <>

            <ScrollProgress />
            <AtmosphericBackground />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Blog />
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
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
