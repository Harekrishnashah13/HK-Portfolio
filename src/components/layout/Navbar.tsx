import { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, Linkedin, Github, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

interface NavbarProps {
  activeCaseStudyId: string | null;
  onBackHome: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ activeCaseStudyId, onBackHome, onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section
      const sections = ['hero', 'impact', 'projects', 'experience', 'skills', 'credentials', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
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
          ? 'bg-[#080B11]/90 backdrop-blur-md border-b border-slate-900/80 py-3.5 shadow-lg shadow-black/15'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Initial Logo "HS" */}
        <div 
          onClick={() => {
            if (activeCaseStudyId) {
              onBackHome();
            } else {
              scrollToSection('hero');
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="nav-logo"
        >
          <span className="font-sans font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            HK<span className="text-emerald-500">.</span>
          </span>
          <span className="hidden sm:inline-block h-4 w-px bg-slate-800" />
          <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none mt-0.5">
            Portfolio
          </span>
        </div>

        {/* Dynamic Nav: Case Study Back Button vs Redesigned Header Menu */}
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
            {/* Redesigned TOP NAVIGATION: Standard Desktop (lg and up) */}
            <div className="hidden lg:flex items-center gap-5" id="desktop-nav-redesign">
              
              {/* Left Nav links group */}
              <nav className="flex items-center gap-4 bg-slate-950/40 p-1 rounded-full border border-slate-900/40">
                <button
                  onClick={() => scrollToSection('hero')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                    activeSection === 'hero' ? 'bg-slate-900 text-emerald-400 shadow-inner' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                    activeSection === 'projects' ? 'bg-slate-900 text-emerald-400 shadow-inner' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                    activeSection === 'experience' ? 'bg-slate-900 text-emerald-400 shadow-inner' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection('credentials')}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all ${
                    activeSection === 'credentials' ? 'bg-slate-900 text-emerald-400 shadow-inner' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Articles
                </button>
              </nav>

              {/* Separator */}
              <span className="text-slate-800 text-sm font-light select-none">│</span>

              {/* Social Channels group */}
              <div className="flex items-center gap-3.5 text-[11px] font-mono text-slate-400">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Linkedin className="h-3 w-3 text-[#0A66C2]" />
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Github className="h-3 w-3 text-white" />
                  GitHub
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="h-3 w-3 text-emerald-400" />
                  Email
                </a>
              </div>

              {/* Separator */}
              <span className="text-slate-800 text-sm font-light select-none">│</span>

              {/* Download Resume Action */}
              <button
                onClick={onOpenResume}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Download Resume
              </button>
            </div>

            {/* Mobile / Mid-size hamburger menu button */}
            <button
              className="lg:hidden text-slate-400 hover:text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && !activeCaseStudyId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0a0f19] border-b border-slate-900 px-6 py-6"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className={`text-left py-2 text-sm font-mono tracking-wide cursor-pointer hover:text-white transition-colors ${
                  activeSection === 'hero' ? 'text-emerald-400 font-medium' : 'text-slate-400'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`text-left py-2 text-sm font-mono tracking-wide cursor-pointer hover:text-white transition-colors ${
                  activeSection === 'projects' ? 'text-emerald-400 font-medium' : 'text-slate-400'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`text-left py-2 text-sm font-mono tracking-wide cursor-pointer hover:text-white transition-colors ${
                  activeSection === 'experience' ? 'text-emerald-400 font-medium' : 'text-slate-400'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection('credentials')}
                className={`text-left py-2 text-sm font-mono tracking-wide cursor-pointer hover:text-white transition-colors ${
                  activeSection === 'credentials' ? 'text-emerald-400 font-medium' : 'text-slate-400'
                }`}
              >
                Articles
              </button>
              
              <div className="h-px bg-slate-900 my-2" />

              {/* Social Channels in Drawer */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 py-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Linkedin className="h-3 w-3 text-[#0A66C2]" />
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Github className="h-3 w-3 text-white" />
                  GitHub
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Mail className="h-3 w-3 text-emerald-400" />
                  Email
                </a>
              </div>

              <div className="h-px bg-slate-900 my-2" />
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                className="w-full text-center py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-lg transition-colors shadow-lg"
              >
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
