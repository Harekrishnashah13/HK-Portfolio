import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import FlagshipCaseStudy from './components/sections/FlagshipCaseStudy';
import ResumeModal from './components/sections/ResumeModal';

export default function App() {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [prog, setProg] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProg(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleBackToHome = () => {
    setActiveCaseStudyId(null);
    window.scrollTo({ top: 0 });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div 
      onMouseMove={e => setMouse({ x: e.clientX, y: e.clientY })}
      className="bg-[#080B11] text-white min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-300 antialiased overflow-x-hidden"
    >
      <div
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(0,204,136,0.06), transparent 80%)`
        }}
      />
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: `${prog}%`, height: '2px',
        background: '#00CC88',
        transition: 'width 0.1s ease',
        pointerEvents: 'none'
      }} />

      {/* Floating Header Navigation */}
      <Navbar 
        activeCaseStudyId={activeCaseStudyId} 
        onBackHome={handleBackToHome} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Main Narrative Sequence */}
      <main id="main-content">
        {activeCaseStudyId === 'teradata-migration' ? (
          <FlagshipCaseStudy onBack={handleBackToHome} />
        ) : (
          <>
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            
            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Projects onSelectFlagship={() => {
                setActiveCaseStudyId('teradata-migration');
                window.scrollTo({ top: 0 });
              }} />
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Skills />
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Experience />
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Certifications />
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Contact />
            </motion.div>
          </>
        )}
      </main>

      {/* Resume ATS Document Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Footer Branding & Social Channels */}
      <Footer />
    </div>
  );
}


