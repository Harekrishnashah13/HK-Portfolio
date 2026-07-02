import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import BusinessImpact from './components/sections/BusinessImpact';
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

  const handleBackToHome = () => {
    setActiveCaseStudyId(null);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="bg-[#080B11] text-white min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-300 antialiased overflow-x-hidden">
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
            <BusinessImpact />
            <Projects onSelectFlagship={() => {
              setActiveCaseStudyId('teradata-migration');
              window.scrollTo({ top: 0 });
            }} />
            <Experience />
            <Skills />
            <Certifications />
            <Contact />
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


