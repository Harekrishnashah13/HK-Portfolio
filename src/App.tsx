import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import './lib/downloadResume';

// Lazy load non-critical below-the-fold elements to optimize initial load times
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));
const FlagshipCaseStudy = lazy(() => import('./components/sections/FlagshipCaseStudy'));
const ResumeModal = lazy(() => import('./components/sections/ResumeModal'));

const SectionLoader = () => (
  <div className="w-full min-h-[300px] flex flex-col items-center justify-center py-24 px-5 animate-pulse bg-[#080B11]/50">
    <div className="h-2.5 w-32 bg-slate-800 rounded-full mb-4" />
    <div className="h-4 w-64 bg-slate-800 rounded-full mb-6" />
    <div className="max-w-md w-full flex flex-col gap-2">
      <div className="h-2 w-full bg-slate-800/60 rounded" />
      <div className="h-2 w-3/4 bg-slate-800/60 rounded" />
      <div className="h-2 w-1/2 bg-slate-800/60 rounded" />
    </div>
  </div>
);

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
          <Suspense fallback={<SectionLoader />}>
            <FlagshipCaseStudy onBack={handleBackToHome} />
          </Suspense>
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
              <Suspense fallback={<SectionLoader />}>
                <Projects onSelectFlagship={() => {
                  setActiveCaseStudyId('teradata-migration');
                  window.scrollTo({ top: 0 });
                }} />
              </Suspense>
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Suspense fallback={<SectionLoader />}>
                <Certifications />
              </Suspense>
            </motion.div>

            <div className="border-t border-slate-900/60 w-full" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={sectionVariants}
            >
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
            </motion.div>
          </>
        )}
      </main>

      {/* Resume ATS Document Modal */}
      <Suspense fallback={null}>
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </Suspense>

      {/* Footer Branding & Social Channels */}
      <Footer />
    </div>
  );
}


