import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Mail, ChevronDown, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../../data';
import WaveCanvas from '../layout/WaveCanvas';
import { downloadResumePDF } from '../../lib/downloadResume';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Subtitle roles slide-up cycling list
  const roles = [
    'Databricks Certified Data Engineer & Analyst',
    'MSc Data Science — First Class Distinction',
    'Power BI · SQL · Python · AWS · Databricks',
    'Building data systems organisations can trust'
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((i) => (i + 1) % roles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Main tagline typewriter cycling list
  const typewriterPhrases = [
    "Business Decisions",
    "Trusted Pipelines",
    "Analytics Intelligence",
    "Executive Insights"
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  useEffect(() => {
    if (subIndex === typewriterPhrases[phraseIndex].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, phraseIndex]);

  useEffect(() => {
    setTypewriterText(typewriterPhrases[phraseIndex].substring(0, subIndex));
  }, [subIndex, phraseIndex]);

  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'light' : 'dark');
    };

    // Initial check
    checkTheme();

    // Observe changes on documentElement's class
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
        background: 'radial-gradient(ellipse 800px 500px at 60% 40%, rgba(0,204,136,0.04) 0%, transparent 70%), #050E09'
      }}
    >
      <style>{`
        #hero-content-grid {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 48px;
          align-items: center;
          min-height: 75vh;
          padding: 80px clamp(24px, 6vw, 80px) 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        #hero-photo-col {
          width: 220px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 768px) {
          #hero-content-grid {
            display: flex;
            flex-direction: column-reverse;
            align-items: flex-start;
            text-align: left;
            padding: 110px 20px 48px;
            gap: 24px;
          }
          #hero-photo-col {
            width: 130px !important;
            margin-bottom: 8px;
            align-items: flex-start;
          }
          #hero-photo-container {
            width: 130px !important;
            height: 130px !important;
          }
          #hero-photo-container img, #hero-photo-container div {
            width: 130px !important;
            height: 130px !important;
          }
          #hero-name {
            font-size: clamp(32px, 9vw, 48px) !important;
          }
          #hero-cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          #hero-cta-buttons button, #hero-cta-buttons a {
            width: 100% !important;
            min-height: 48px !important;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(4px) translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>

      {/* Absolute Flowing Wave Ribbon Canvas Background */}
      <WaveCanvas theme={theme} />

      {/* Hero Content Wrapper */}
      <div id="hero-content-grid" className="hero-grid relative z-10 w-full">
        
        {/* Brand Information & Social Group (Left column on desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          id="hero-text-col"
        >
          {/* Large Name Headline */}
          <motion.h1 
            variants={itemVariants}
            id="hero-name"
            className="hero-name font-sans"
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '6px',
            }}
          >
            Harekrishna Shah
          </motion.h1>

          {/* Main Tagline with Typewriter Effect */}
          <motion.div 
            variants={itemVariants}
            className="hero-tagline font-sans" 
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              marginBottom: '8px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <span className="shrink-0">I transform data into&nbsp;</span>
            <span style={{ color: '#00CC88', fontWeight: 700 }} className="inline-flex items-center min-h-[1.2em] whitespace-nowrap">
              {typewriterText || "\u00A0"}
              <span className="inline-block w-[2px] h-[1.1em] bg-[#00CC88] ml-1 animate-pulse shrink-0" style={{ animationDuration: '0.9s' }} />
            </span>
          </motion.div>

          {/* Subtitle / Professional Role Designation with Cycling Slide-Up Effect */}
          <motion.div variants={itemVariants} className="relative overflow-hidden w-full h-7 mb-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute left-0 top-0 w-full block text-left text-[13px] md:text-[15px] font-medium tracking-wide text-white/55 font-sans leading-tight sm:leading-normal whitespace-nowrap"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Styled MSc badge */}
          <motion.div 
            variants={itemVariants}
            className="hero-metrics"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              marginTop: '8px',
              flexWrap: 'wrap'
            }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.04em'
            }}>
              MSc Data Science
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(0,204,136,0.1)',
              border: '0.5px solid rgba(0,204,136,0.3)',
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#00CC88',
              letterSpacing: '0.04em'
            }}>
              First Class Distinction
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.35)'
            }}>
              · Dublin Business School
            </span>
          </motion.div>

          {/* Professional Bio Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="font-sans"
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '560px',
              marginBottom: '20px',
              fontWeight: 400,
            }}
          >
            I'm a Databricks Certified Data Engineer & Analyst with an MSc in Data Science (First Class Distinction) and 4+ years of professional experience in financial services and enterprise analytics.
          </motion.p>

          {/* Location Block with Interview Ready Signal */}
          <motion.div 
            variants={itemVariants}
            className="font-sans font-normal text-slate-500 tracking-wide text-xs sm:text-sm mb-6 max-w-xl flex items-center gap-2 flex-wrap"
          >
            <span>Dublin, Ireland &middot; Stamp 1G</span>
            <span style={{
              background: 'rgba(0,204,136,0.1)',
              border: '0.5px solid rgba(0,204,136,0.25)',
              color: '#00CC88',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 500,
            }}>
              Interview Ready &rarr;
            </span>
          </motion.div>

          {/* CTA Buttons Row */}
          <motion.div 
            variants={itemVariants}
            id="hero-cta-buttons" 
            className="hero-cta flex flex-wrap items-center gap-3 mb-6"
          >
            <button
              onClick={() => window.open('/resume.html', '_blank')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:shadow-emerald-500/20"
            >
              <FileText className="h-4 w-4" />
              <span>Download Resume</span>
            </button>
            <a
              href="#projects"
              className="px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/15 font-sans font-medium text-sm rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:border-white/45 no-underline"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div 
            variants={itemVariants}
            className="hero-social"
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '0.5px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              className="hover:border-[#00CC88]/40 hover:text-[#00CC88] hover:bg-[#00CC88]/[0.06]"
              title="GitHub Profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '0.5px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              className="hover:border-[#00CC88]/40 hover:text-[#00CC88] hover:bg-[#00CC88]/[0.06]"
              title="LinkedIn Profile"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '0.5px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              className="hover:border-[#00CC88]/40 hover:text-[#00CC88] hover:bg-[#00CC88]/[0.06]"
              title="Email Contact"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </motion.div>

          {/* Scroll Down Indicator - aligned below content */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
              marginTop: '32px',
              animation: 'bounce 2s ease-in-out infinite'
            }}
          >
            <span 
              style={{
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                fontFamily: 'JetBrains Mono, monospace'
              }}
            >
              Scroll Down
            </span>
            <ChevronDown 
              style={{
                width: '16px',
                color: 'rgba(255,255,255,0.25)',
              }}
            />
          </motion.div>

        </motion.div>

        {/* Grayscale Circular Portrait Avatar (Right column on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          id="hero-photo-col"
          className="hero-photo select-none"
        >
          <div 
            id="hero-photo-container"
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
            }}
          >
            {!imageError ? (
              <img
                src="/profile.jpg"
                alt="Harekrishna Shah Portrait"
                loading="eager"
                decoding="async"
                width={200}
                height={200}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) drop-shadow(0 0 20px rgba(0,204,136,0.08))',
                  display: 'block',
                  outline: '2px solid rgba(0,204,136,0.3)',
                  outlineOffset: '6px',
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              /* Premium Typographic Circular Fallback Badge */
              <div 
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  outline: '2px solid rgba(0,204,136,0.3)',
                  outlineOffset: '6px',
                  filter: 'drop-shadow(0 0 20px rgba(0,204,136,0.08))',
                }}
                className="bg-slate-950/90 flex flex-col items-center justify-center relative select-none overflow-hidden"
              >
                <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-[6px] text-emerald-400 leading-none overflow-hidden select-none">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx} className="whitespace-nowrap mb-0.5">010101 DATA PIPELINE ACTIVE</div>
                  ))}
                </div>
                <span className="text-3xl font-display font-extrabold text-white tracking-wider group-hover:text-emerald-400 transition-colors">
                  HS<span className="text-emerald-500 font-bold">.</span>
                </span>
                <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-1 shrink-0">
                  Dublin
                </span>
              </div>
            )}
          </div>
        </motion.div>

      </div>

    </section>
  );
}
