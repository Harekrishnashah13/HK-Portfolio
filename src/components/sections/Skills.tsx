import { motion } from 'motion/react';
import { BarChart3, Database, Brain, Cloud, CodeXml } from 'lucide-react';

const SKILLS_DATA = [
  {
    icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
    title: "Business Intelligence",
    subtitle: "Primary delivery skill",
    primaryTags: ["Power BI", "DAX"],
    secondaryTags: ["Tableau", "Power Query", "SSRS", "KPI Dashboards"],
    proficiency: 4,
    proficiencyLabel: "Advanced"
  },
  {
    icon: <Database className="h-5 w-5 text-emerald-400" />,
    title: "Data Engineering & ETL",
    subtitle: "2+ years professional use",
    primaryTags: ["SQL", "Apache Airflow"],
    secondaryTags: ["AWS Glue", "SSIS", "PySpark", "Delta Lake"],
    proficiency: 4,
    proficiencyLabel: "Advanced"
  },
  {
    icon: <Brain className="h-5 w-5 text-emerald-400" />,
    title: "Python & Machine Learning",
    subtitle: "MSc thesis · 94.3% accuracy",
    primaryTags: ["Python", "scikit-learn"],
    secondaryTags: ["Pandas", "TensorFlow", "OpenCV", "Jupyter"],
    proficiency: 3,
    proficiencyLabel: "Proficient"
  },
  {
    icon: <Cloud className="h-5 w-5 text-emerald-400" />,
    title: "Cloud & Governance",
    subtitle: "Databricks Certified",
    primaryTags: ["Databricks", "AWS S3"],
    secondaryTags: ["Azure ADF", "AWS Lambda", "GDPR", "Data Governance"],
    proficiency: 4,
    proficiencyLabel: "Advanced"
  }
];

export default function Skills() {
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
            [04] Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-6 flex items-center gap-3.5">
            <CodeXml className="h-7 w-7 text-emerald-400/70 shrink-0" />
            <span>Skills &amp; Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            A working toolkit built through real enterprise delivery — not tutorials. Every skill below is demonstrated in at least one case study.
          </p>
        </div>

        {/* Core Tools Bar (full-width strip above cards) */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 md:py-4 md:px-5 flex flex-wrap items-center gap-3.5 mb-5">
          <span className="text-white/40 font-mono text-[11px] uppercase tracking-widest font-semibold">
            CORE TOOLS — USED DAILY
          </span>
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: 'Power BI', icon: '📊' },
              { label: 'SQL', icon: '🗄️' },
              { label: 'Python', icon: '🐍' },
              { label: 'Databricks', icon: '⚡' },
              { label: 'Excel / DAX', icon: '📋' }
            ].map(tool => (
              <div
                key={tool.label}
                className="text-[13px] font-medium px-3.5 py-[7px] rounded-lg border border-[rgba(0,204,136,0.25)] bg-[rgba(0,204,136,0.06)] text-white flex items-center gap-2"
              >
                <span>{tool.icon}</span>
                <span>{tool.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Four Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {SKILLS_DATA.map((skill, idx) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
              className="bg-slate-950/40 border border-white/[0.08] rounded-xl p-4 md:p-5 hover:border-emerald-500/30 hover:-translate-y-[2px] transition-all duration-200 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-[38px] h-[38px] rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white mb-0.5 leading-snug">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-white/45 font-sans">
                    {skill.subtitle}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skill.primaryTags.map(tag => (
                  <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-[5px] bg-emerald-500/12 border border-emerald-500/35 text-[#00CC88]">
                    {tag}
                  </span>
                ))}
                {skill.secondaryTags.map(tag => (
                  <span key={tag} className="text-[11px] font-medium px-2.5 py-0.5 rounded-[5px] bg-white/5 border border-white/10 text-white/60">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Proficiency Dots */}
              <div className="flex items-center mt-3.5 pt-2.5 border-t border-slate-900/60">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(dot => (
                    <span
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        dot <= skill.proficiency ? 'bg-[#00CC88]' : 'bg-white/12'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-white/40 ml-2">
                  {skill.proficiencyLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-[13px] text-white/35 text-center mt-5">
          Every skill above is demonstrated in a case study — explore the projects to see them in action ↓
        </p>

      </div>
    </section>
  );
}
