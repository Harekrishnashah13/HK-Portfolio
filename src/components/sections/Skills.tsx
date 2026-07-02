import { useState } from 'react';
import { Cpu, Terminal, BarChart2, Briefcase } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data';

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Terminal className="h-5 w-5 text-emerald-400" />;
      case 1:
        return <BarChart2 className="h-5 w-5 text-emerald-400" />;
      case 2:
        return <Briefcase className="h-5 w-5 text-emerald-400" />;
      default:
        return <Cpu className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <section
      id="skills"
      className="bg-[#080B11] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [04] Unified Toolchain
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-6">
            Technical Competence &amp; Frameworks
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            I select the optimal tool for the commercial objective. Here is my active production stack, categorised by domain depth and relative technical alignment.
          </p>
        </div>

        {/* Technical Competence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" id="skills-grid">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.title}
              onMouseEnter={() => setHoveredCategory(catIdx)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`p-6 md:p-8 rounded-3xl border bg-slate-950/40 backdrop-blur-md transition-all duration-300 h-full ${
                hoveredCategory === catIdx
                  ? 'border-emerald-500/20 shadow-xl shadow-emerald-500/2 -translate-y-1'
                  : 'border-slate-900'
              }`}
            >
              {/* Category Title with Dynamic Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-850">
                  {getCategoryIcon(catIdx)}
                </div>
                <h3 className="text-white text-base font-semibold font-sans">
                  {cat.title}
                </h3>
              </div>

              {/* Skill Bars */}
              <div className="flex flex-col gap-5">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="group/skill flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium group-hover/skill:text-emerald-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">
                        {skill.level}% Mastery
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Level Indicator Disclaimer */}
        <div className="mt-12 flex items-start gap-2.5 text-slate-500 font-mono text-[10px] leading-relaxed max-w-xl">
          <span>*</span>
          <p>
            Mastery levels represent structural ownership in production environments—covering custom schema design, dbt incremental optimization, dynamic visualization architecture, and orchestration SLA management.
          </p>
        </div>

      </div>
    </section>
  );
}
