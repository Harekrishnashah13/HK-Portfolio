import { useState } from 'react';
import { Calendar, MapPin, Briefcase, Award, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCE_DATA } from '../../data';
import AnimatedHeading from './AnimatedHeading';

const sidebarVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Experience() {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  return (
    <section
      id="experience"
      className="bg-[#080B11] py-[48px] md:py-[80px] relative overflow-hidden border-t border-slate-900/40"
    >
      <style>{`
        @keyframes custom-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .custom-pulse-dot {
          animation: custom-pulse 2s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-0">
          <AnimatedHeading eyebrow="[04] EXPERIENCE TIMELINE" title="Experience" />
          <p 
            className="font-sans"
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              color: 'rgba(255,255,255,0.55)', 
              maxWidth: '520px', 
              marginBottom: '32px', 
              fontWeight: 400 
            }}
          >
            2+ years delivering data engineering and analytics across financial services, fintech, and enterprise environments.
          </p>
        </div>

        {/* Master Timeline Structure */}
        <div 
          className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-[32px] items-start" 
          id="experience-timeline"
        >
          
          {/* Navigation Sidebar/Timeline nodes (Left) */}
          <div
            className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-[12px] md:pb-0 mb-[16px] md:mb-0 scrollbar-none sticky top-24 z-10 bg-[#080B11]/80 backdrop-blur-sm md:bg-transparent w-full md:w-[280px] shrink-0"
          >
            {EXPERIENCE_DATA.map((role, idx) => {
              const isActive = activeRoleIndex === idx;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`cursor-pointer focus:outline-none select-none transition-all duration-200 shrink-0 md:shrink-1 md:w-full text-left
                    ${isActive 
                      ? 'md:bg-[rgba(0,204,136,0.08)] md:border-[0.5px] md:border-[rgba(0,204,136,0.2)] md:rounded-lg md:p-[10px_12px] md:opacity-100 bg-[#00CC88] text-[#050E09] border-[#00CC88] rounded-[20px] p-[6px_14px] text-[13px] font-medium border-[0.5px]' 
                      : 'md:p-[10px_12px] md:rounded-lg md:opacity-60 md:hover:opacity-100 md:hover:bg-[rgba(255,255,255,0.04)] text-white/60 bg-transparent border-[rgba(255,255,255,0.15)] rounded-[20px] p-[6px_14px] text-[13px] font-medium border-[0.5px] hover:text-white hover:border-white/30'
                    }
                  `}
                >
                  {/* On Mobile: just show role.role */}
                  <span className="md:hidden whitespace-nowrap">
                    {role.role}
                  </span>

                  {/* On Desktop: show structured card */}
                  <div className="hidden md:flex flex-col w-full">
                    {/* Date text */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span 
                        className={`rounded-full transition-all duration-300 shrink-0 ${
                          isActive ? 'custom-pulse-dot' : ''
                        }`}
                        style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: isActive ? '#00CC88' : '#334155'
                        }}
                      />
                      <span 
                        className="font-mono text-[11px] font-normal"
                        style={{ color: isActive ? '#00CC88' : 'rgba(255,255,255,0.45)' }}
                      >
                        {role.period}
                      </span>
                    </div>

                    {/* Role Title */}
                    <span 
                      className="font-sans font-semibold tracking-tight leading-[1.3] mb-[2px]"
                      style={{ 
                        fontSize: '14px', 
                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)' 
                      }}
                    >
                      {role.role}
                    </span>

                    {/* Company name */}
                    <span 
                      style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#00CC88',
                        marginBottom: 0
                      }}
                    >
                      {role.company}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card (Right) */}
          <div className="w-full">
            {EXPERIENCE_DATA.map((role, idx) => {
              if (idx !== activeRoleIndex) return null;
              return (
                <div
                  key={role.id}
                  className="w-full bg-transparent md:bg-slate-950/40 p-0 md:p-10 rounded-3xl md:border border-transparent md:border-slate-900/80 backdrop-blur-md shadow-none md:shadow-xl md:shadow-black/35 animate-fadeIn"
                  id={`milestone-${role.id}`}
                >
                  {/* Job Metadata Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6 mb-6">
                    <div className="flex flex-col">
                      <h3 className="text-white font-sans" style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                        {role.role}
                      </h3>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#00CC88',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        {role.company} · {role.location}
                      </div>
                    </div>

                    {/* Metric Spotlight Pill */}
                    {role.period && (
                      <div className="flex items-center px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/15 rounded-full self-start md:self-auto shrink-0">
                        <span className="text-emerald-400 font-mono text-xs font-medium">
                          {role.period}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Duties Bullet points */}
                  <div className="mb-8">
                    <h4 
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        marginBottom: '14px',
                        marginTop: '20px'
                      }}
                    >
                      Key Deliverables &amp; Outcomes
                    </h4>
                    <div>
                      {role.description.map((bullet, bIdx) => (
                        <div 
                          key={bIdx} 
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                            marginBottom: '12px'
                          }}
                        >
                          <Check className="h-4 w-4 shrink-0" style={{ color: '#00CC88', marginTop: '2px' }} />
                          <span 
                            style={{
                              fontSize: '14px',
                              lineHeight: '1.7',
                              color: 'rgba(255,255,255,0.75)',
                              fontWeight: 400
                            }}
                          >
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Tagged block */}
                  <div className="pt-6 border-t border-white/[0.06]">
                    <h4 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest font-semibold mb-3">
                      Core Tooling Applied
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span key={skill} className="text-xs text-slate-300 font-mono bg-slate-900 border border-slate-850 px-3 py-1 rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
