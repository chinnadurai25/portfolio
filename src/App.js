import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import GitHub from './components/GitHub/GitHub';
import Projects from './components/Projects/Projects';
import Testimonials from './components/Testimonials/Testimonials';
import Feedback from './components/Feedback/Feedback';
import FeedbackDisplay from './components/FeedbackDisplay/FeedbackDisplay';
import Certifications from './components/Certifications/Certifications';
import Services from './components/Services/Services';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminFeedback from './pages/AdminFeedback';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center z-50 transition-colors duration-700">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-[1px] border-cyan-500/20 rounded-[2rem] animate-pulse"></div>
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-[2rem] animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
          <div className="absolute inset-4 border border-blue-500/20 rounded-[1.5rem] animate-reverse-spin"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-slate-900 dark:text-white font-black tracking-[0.5em] text-xs uppercase animate-pulse italic">
            CHINNA<span className="text-cyan-500">.</span>
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-200 transition-all duration-1000 ease-in-out relative overflow-hidden`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={
          <main className="relative z-10">
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.02),transparent_50%)]"></div>
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-20">
              <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyan-500/[0.03] dark:bg-cyan-500/[0.02] rounded-full blur-[150px] animate-pulse"></div>
              <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>
            
            <Hero />
            <About />
            <Education />
            <Skills />
            <GitHub />
            <Projects />
            <Experience />
            <Testimonials />
            <Feedback />
            <Certifications />
            <Services />
            <Contact />
            <FeedbackDisplay />
          </main>
        } />
        <Route path="/admin-feedback" element={<AdminFeedback />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </div >
  );
}

export default App;
