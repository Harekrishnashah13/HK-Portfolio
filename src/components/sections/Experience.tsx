import { useState } from 'react';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';
import { EXPERIENCE_DATA } from '../../data';

export default function Experience() {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  return (
    <section
      id="experience"
      className="bg-[#080B11] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [03] Employment History
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Production Experience &amp; Professional Milestones
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            An overview of structural contributions across enterprise SaaS and digital platform environments, combining server-side data systems with board-level business intelligence.
          </p>
        </div>

        {/* Master Timeline Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="experience-timeline">
          
          {/* Navigation Sidebar/Timeline nodes (Left) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none sticky top-24 z-10 bg-[#080B11]/80 backdrop-blur-sm lg:bg-transparent">
            {EXPERIENCE_DATA.map((role, idx) => (
              <button
                key={role.id}
                onClick={() => setActiveRoleIndex(idx)}
                className={`flex flex-col items-start p-4 rounded-2xl border transition-all cursor-pointer min-w-[220px] lg:min-w-0 text-left w-full ${
                  activeRoleIndex === idx
                    ? 'bg-slate-950 border-emerald-500/20 shadow-lg'
                    : 'bg-transparent border-transparent hover:border-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    activeRoleIndex === idx ? 'bg-emerald-400' : 'bg-slate-700'
                  }`} />
                  <span className={`text-xs font-mono font-medium ${
                    activeRoleIndex === idx ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {role.period}
                  </span>
                </div>
                <span className="text-white font-sans font-bold text-sm line-clamp-1">
                  {role.role}
                </span>
                <span className="text-slate-500 font-mono text-[11px] mt-0.5">
                  {role.company}
                </span>
              </button>
            ))}
          </div>

          {/* Active Milestone Card (Right) */}
          <div className="lg:col-span-8">
            {EXPERIENCE_DATA.map((role, idx) => {
              if (idx !== activeRoleIndex) return null;
              return (
                <div
                  key={role.id}
                  className="bg-slate-950/40 p-6 md:p-10 rounded-3xl border border-slate-900/80 backdrop-blur-md shadow-xl shadow-black/35 animate-fadeIn"
                  id={`milestone-${role.id}`}
                >
                  {/* Job Metadata Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-900 rounded-2xl border border-slate-850 text-slate-400 shrink-0">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-sans font-extrabold text-lg sm:text-xl leading-snug">
                          {role.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-mono mt-1">
                          <span className="text-emerald-400 font-medium">@{role.company}</span>
                          <span className="text-slate-700">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {role.location}
                          </span>
                          <span className="text-slate-700">•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {role.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metric Spotlight Pill */}
                    {role.highlightMetric && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl self-start md:self-auto shrink-0 shadow-inner">
                        <Award className="h-4.5 w-4.5 text-emerald-400" />
                        <div className="flex flex-col">
                          <span className="text-emerald-300 font-mono text-xs font-bold leading-none">
                            {role.highlightMetric.value}
                          </span>
                          <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider mt-0.5 leading-none">
                            {role.highlightMetric.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Duties Bullet points */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest font-semibold">
                      Key Deliverables &amp; Outcomes
                    </h4>
                    <ul className="space-y-3">
                      {role.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-3 text-slate-300 text-sm leading-relaxed font-sans font-light">
                          <span className="text-emerald-400 select-none shrink-0 mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tagged block */}
                  <div className="pt-6 border-t border-slate-900">
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
