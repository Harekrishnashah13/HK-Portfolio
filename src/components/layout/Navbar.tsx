import { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, Linkedin, Github, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../../data';
import { useActiveSection } from '../../hooks/useActiveSection';
import { downloadResumePDF } from '../../lib/downloadResume';

interface NavbarProps {
  activeCaseStudyId: string | null;
  onBackHome: () => void;
  onOpenResume?: () => void;
}

const SECTIONS = ['about', 'projects', 'skills', 'experience', 'credentials', 'contact'];

export default function Navbar({ activeCaseStudyId, onBackHome, onOpenResume }: NavbarProps) {
  const activeSection = useActiveSection(SECTIONS);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light') return 'light';
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light', 'light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light', 'light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (activeCaseStudyId) {
      onBackHome();
      // Wait briefly for route transition
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B11]/80 backdrop-blur-xl border-b border-slate-900/40 py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => {
            if (activeCaseStudyId) {
              onBackHome();
            } else {
              scrollToSection('about');
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="nav-logo"
        >
          <span className="font-sans font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            HK<span className="text-emerald-500">.</span>
          </span>
          <span className="h-4 w-px bg-slate-800" />
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none mt-0.5">
            Portfolio
          </span>
        </div>

        {/* Dynamic Nav: Case Study Back Button vs Gorgeous Capsule Nav */}
        {activeCaseStudyId ? (
          <div className="flex items-center gap-4">
            <button
              onClick={onBackHome}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-emerald-400 border border-slate-800 rounded-full font-mono text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-black/40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              [ Return to Home Portfolio ]
            </button>
          </div>
        ) : (
          <>
            {/* Redesigned TOP NAVIGATION: Standard Desktop (md and up) */}
            <div className="hidden md:flex items-center gap-4 xl:gap-5" id="desktop-nav-redesign">
              
              {/* Navigation Pill Container */}
              <nav className="flex items-center gap-1 bg-[#0b1220]/50 border border-slate-900/50 p-1.5 rounded-full shadow-inner backdrop-blur-md">
                <button
                  onClick={() => scrollToSection('about')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'about' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'projects' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'skills' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'experience' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection('credentials')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'credentials' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Credentials
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] xl:text-[11px] font-semibold tracking-[0.05em] transition-all cursor-pointer relative after:absolute after:inset-y-[-8px] after:inset-x-0 after:content-[""] ${
                    activeSection === 'contact' ? 'bg-[#131d31] text-emerald-400 shadow-inner border border-white/[0.03]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Contact
                </button>
              </nav>

              {/* Separator */}
              <span className="text-slate-800 text-xs font-light select-none">│</span>

              {/* Theme Toggle Button */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="theme-toggle-btn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: theme === 'dark' 
                      ? '0.5px solid rgba(255,255,255,0.12)' 
                      : '0.5px solid rgba(15,23,42,0.12)',
                    background: theme === 'dark' 
                      ? 'rgba(255,255,255,0.04)' 
                      : 'rgba(15,23,42,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: theme === 'dark' 
                      ? 'rgba(255,255,255,0.55)' 
                      : 'rgba(15,23,42,0.55)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    setShowTip(true);
                    e.currentTarget.style.borderColor = 'rgba(0,204,136,0.35)';
                    e.currentTarget.style.color = '#00CC88';
                    e.currentTarget.style.background = 'rgba(0,204,136,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    setShowTip(false);
                    e.currentTarget.style.borderColor = theme === 'dark' 
                      ? 'rgba(255,255,255,0.12)' 
                      : 'rgba(15,23,42,0.12)';
                    e.currentTarget.style.color = theme === 'dark' 
                      ? 'rgba(255,255,255,0.55)' 
                      : 'rgba(15,23,42,0.55)';
                    e.currentTarget.style.background = theme === 'dark' 
                      ? 'rgba(255,255,255,0.04)' 
                      : 'rgba(15,23,42,0.04)';
                  }}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? (
                      <Moon size={16} strokeWidth={1.8} />
                    ) : (
                      <Sun size={16} strokeWidth={1.8} />
                    )}
                  </motion.div>
                </button>
                
                {showTip && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}>
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                  </div>
                )}
              </div>

              {/* Separator */}
              <span className="text-slate-800 text-xs font-light select-none">│</span>

              {/* Download Resume Action */}
              <button
                onClick={() => window.open('/resume.html', '_blank')}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-full transition-all shadow-md active:scale-95 cursor-pointer hover:shadow-emerald-500/20"
              >
                Download Resume
              </button>
            </div>

            {/* Mobile Actions with Theme Toggle & Drawer Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="theme-toggle-btn"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: theme === 'dark' 
                    ? '0.5px solid rgba(255,255,255,0.12)' 
                    : '0.5px solid rgba(15,23,42,0.12)',
                  background: theme === 'dark' 
                    ? 'rgba(255,255,255,0.04)' 
                    : 'rgba(15,23,42,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: theme === 'dark' 
                    ? 'rgba(255,255,255,0.55)' 
                    : 'rgba(15,23,42,0.55)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <Moon size={16} strokeWidth={1.8} />
                  ) : (
                    <Sun size={16} strokeWidth={1.8} />
                  )}
                </motion.div>
              </button>
              <button
                className="w-11 h-11 bg-transparent border border-white/15 rounded-lg text-white flex items-center justify-center cursor-pointer hover:text-emerald-400 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !activeCaseStudyId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-[rgba(5,14,9,0.98)] backdrop-blur-[20px] flex flex-col items-center justify-center gap-8"
            id="mobile-nav-overlay"
          >
            {/* X Close Button at Top-Right of Overlay */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center bg-transparent border border-white/15 rounded-lg text-white hover:text-emerald-400 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Nav Links in Overlay */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('about');
              }}
              className="mobile-nav-link text-2xl font-semibold text-white hover:text-emerald-400 transition-colors py-3 text-center cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('projects');
              }}
              className="mobile-nav-link text-2xl font-semibold text-white hover:text-emerald-400 transition-colors py-3 text-center cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('skills');
              }}
              className="mobile-nav-link text-2xl font-semibold text-white hover:text-emerald-400 transition-colors py-3 text-center cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('experience');
              }}
              className="mobile-nav-link text-2xl font-semibold text-white hover:text-emerald-400 transition-colors py-3 text-center cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('credentials');
              }}
              className="mobile-nav-link text-2xl font-semibold text-white hover:text-emerald-400 transition-colors py-3 text-center cursor-pointer"
            >
              Credentials
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('contact');
              }}
              className="mobile-nav-link mobile-nav-link-contact text-2xl font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-3 text-center cursor-pointer"
            >
              Contact
            </button>

            <div className="h-px w-24 bg-white/10 my-2" />

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.open('/resume.html', '_blank');
              }}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-sm rounded-xl transition-colors shadow-lg cursor-pointer"
            >
              Download Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
