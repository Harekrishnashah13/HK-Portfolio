import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Database, Brain, Cloud, CodeXml, Info, HelpCircle } from 'lucide-react';

// Unified details dictionary for every single technical tool and framework
const TOOL_DETAILS: Record<string, { desc: string; level: string; exp: string }> = {
  "Power BI": {
    desc: "Enterprise reporting, high-performance data modeling, and custom interactive dashboard suites.",
    level: "Expert",
    exp: "2+ years"
  },
  "DAX": {
    desc: "Complex statistical calculations, custom time-intelligence logic, and optimized filter context.",
    level: "Expert",
    exp: "2+ years"
  },
  "Tableau": {
    desc: "Visual analytics, interactive storyboarding, and cross-source database joins.",
    level: "Advanced",
    exp: "2+ years"
  },
  "Power Query": {
    desc: "M-code programming for robust data ingestion, multi-source cleaning, and custom transforms.",
    level: "Expert",
    exp: "2+ years"
  },
  "SSRS": {
    desc: "Paginated financial reports, automated subscriptions, and legacy SQL Server reporting.",
    level: "Advanced",
    exp: "2+ years"
  },
  "KPI Dashboards": {
    desc: "Converting complex corporate data streams into clean, actionable, executive metrics.",
    level: "Expert",
    exp: "2+ years"
  },
  "SQL": {
    desc: "Writing production-grade queries, CTEs, complex analytical window functions, and indexing.",
    level: "Expert",
    exp: "2+ years"
  },
  "Apache Airflow": {
    desc: "Designing DAGs, scheduling complex dependent jobs, and monitoring server-side ETL pipelines.",
    level: "Advanced",
    exp: "2+ years"
  },
  "AWS Glue": {
    desc: "Serverless data integration, cataloging enterprise metadata, and running scalable PySpark jobs.",
    level: "Proficient",
    exp: "1.5 years"
  },
  "SSIS": {
    desc: "Building traditional SQL Server Integration Services packages and high-volume data workflows.",
    level: "Advanced",
    exp: "2+ years"
  },
  "PySpark": {
    desc: "Distributed processing on big data, DataFrame APIs, and cluster job tuning on large-scale nodes.",
    level: "Advanced",
    exp: "2+ years"
  },
  "Delta Lake": {
    desc: "Enforcing ACID transactions, schema enforcement, and instant time-travel querying.",
    level: "Advanced",
    exp: "2+ years"
  },
  "Python": {
    desc: "Object-oriented scripting, automated testing, math modeling, and custom data wrappers.",
    level: "Expert",
    exp: "2+ years"
  },
  "scikit-learn": {
    desc: "Implementing classical ML algorithms, regression models, Random Forest, and custom pipelines.",
    level: "Advanced",
    exp: "2.5 years"
  },
  "Pandas": {
    desc: "High-performance data manipulation, exploratory data analysis, and multi-format file parsing.",
    level: "Expert",
    exp: "2+ years"
  },
  "TensorFlow": {
    desc: "Deep learning models, CNNs for computer vision, and neural network weight optimization.",
    level: "Proficient",
    exp: "1.5 years"
  },
  "OpenCV": {
    desc: "Real-time image pre-processing, object detection filters, and matrix operations.",
    level: "Proficient",
    exp: "1.5 years"
  },
  "Jupyter": {
    desc: "Exploratory modeling, research scratchpad workflows, and narrative documentation.",
    level: "Expert",
    exp: "2+ years"
  },
  "Databricks": {
    desc: "Unified analytics platform, shared notebook pipelines, and Lakehouse server management.",
    level: "Expert (Certified)",
    exp: "2+ years"
  },
  "AWS S3": {
    desc: "Highly durable cloud object storage, secure partition design, and lifecycle policies.",
    level: "Advanced",
    exp: "3+ years"
  },
  "Azure ADF": {
    desc: "Orchestrating Azure Data Factory pipelines, copy activities, and automated trigger schedules.",
    level: "Advanced",
    exp: "2 years"
  },
  "AWS Lambda": {
    desc: "Serverless event-driven microservices for lightweight automated pipeline triggers.",
    level: "Proficient",
    exp: "1.5 years"
  },
  "GDPR": {
    desc: "Data minimization, personal identifiable info (PII) masking, and compliance audits.",
    level: "Advanced",
    exp: "2+ years"
  },
  "Data Governance": {
    desc: "Schema registries, data lineage tracking, and role-based access control (RBAC).",
    level: "Advanced",
    exp: "3+ years"
  },
  "Excel / DAX": {
    desc: "Advanced financial modeling, cohort analysis, and automated Excel VBA logic.",
    level: "Expert",
    exp: "2+ years"
  }
};

const SKILLS_DATA = [
  {
    icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
    title: "Business Intelligence",
    subtitle: "Primary delivery skill",
    primaryTags: ["Power BI", "DAX"],
    secondaryTags: ["Tableau", "Power Query", "SSRS", "KPI Dashboards"],
    proficiency: 4,
    proficiencyLabel: "Advanced",
    description: "Designing end-to-end telemetry and reporting suites that slash triage times by 30% and drive strategic executive leadership decisions."
  },
  {
    icon: <Database className="h-5 w-5 text-emerald-400" />,
    title: "Data Engineering & ETL",
    subtitle: "2+ years professional use",
    primaryTags: ["SQL", "Apache Airflow"],
    secondaryTags: ["AWS Glue", "SSIS", "PySpark", "Delta Lake"],
    proficiency: 4,
    proficiencyLabel: "Advanced",
    description: "Building production pipelines, automated SQL translation engines, and migrating large-scale enterprise cloud footprints up to 1.2PB."
  },
  {
    icon: <Brain className="h-5 w-5 text-emerald-400" />,
    title: "Python & Machine Learning",
    subtitle: "MSc thesis · 94.3% accuracy",
    primaryTags: ["Python", "scikit-learn"],
    secondaryTags: ["Pandas", "TensorFlow", "OpenCV", "Jupyter"],
    proficiency: 3,
    proficiencyLabel: "Proficient",
    description: "Developing custom ML models, customer churn predictors, Swiggy marketing BI models, and computer vision classification pipelines."
  },
  {
    icon: <Cloud className="h-5 w-5 text-emerald-400" />,
    title: "Cloud & Governance",
    subtitle: "Databricks Certified",
    primaryTags: ["Databricks", "AWS S3"],
    secondaryTags: ["Azure ADF", "AWS Lambda", "GDPR", "Data Governance"],
    proficiency: 4,
    proficiencyLabel: "Advanced",
    description: "Securing sensitive enterprise footprints with role-based governance, Delta Lake consistency, and audit-ready data compliance."
  }
];

// Interactive Core Tool Badge Component
function CoreTool({ label, icon }: { label: string; icon: string; key?: string }) {
  const details = TOOL_DETAILS[label] || {
    desc: `Core expertise in ${label} for analytics and data delivery.`,
    level: "Expert",
    exp: "2+ years"
  };

  return (
    <div className="relative group/core inline-block">
      <div 
        className="flex items-center gap-1.5 font-sans text-white bg-[rgba(255,255,255,0.06)] border-[0.5px] border-[rgba(255,255,255,0.12)] rounded-[7px] cursor-help hover:bg-[rgba(0,204,136,0.1)] hover:border-[rgba(0,204,136,0.3)] transition-all duration-200 text-xs md:text-[13px] py-[5px] px-[10px] md:py-[6px] md:px-[14px]"
        style={{ fontWeight: 500 }}
      >
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </div>

      {/* High-Contrast Interactive Tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-60 p-3.5 bg-[#0d121f] border border-emerald-500/35 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-50 text-left opacity-0 translate-y-1 group-hover/core:opacity-100 group-hover/core:translate-y-0 transition-all duration-200">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2">
          <span className="text-[12px] font-bold text-white flex items-center gap-1.5">
            <span>{icon}</span>
            <span>{label}</span>
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold">
            {details.level}
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed font-sans mb-2.5 font-normal">
          {details.desc}
        </p>
        <div className="flex items-center justify-between text-[9px] font-mono text-white/35 pt-1.5 border-t border-white/[0.04]">
          <span>DAILY UTILITY:</span>
          <span className="text-emerald-400 font-medium">{details.exp}</span>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#0d121f] z-50" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-emerald-500/30 -z-10 mt-[1px]" />
      </div>
    </div>
  );
}

// Tool / Tag Component with dynamic tooltip
function SkillTag({ tag }: { tag: string; isPrimary?: boolean; key?: string }) {
  const details = TOOL_DETAILS[tag] || {
    desc: `Enterprise-grade proficiency in ${tag} workflows.`,
    level: "Advanced",
    exp: "2+ years"
  };

  return (
    <div className="relative group/tool inline-block">
      <span
        className="cursor-help flex items-center gap-1 transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '0.5px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          padding: '4px 11px',
          borderRadius: '5px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0,204,136,0.4)';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
        }}
      >
        {tag}
      </span>

      {/* Smart Positioning Tooltip (w-48 for mobile compatibility) */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-52 p-3 bg-[#0d121f] border border-emerald-500/25 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.65)] z-50 text-left opacity-0 translate-y-1 group-hover/tool:opacity-100 group-hover/tool:translate-y-0 transition-all duration-200">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5 mb-1.5">
          <span className="text-[11px] font-bold text-white font-sans truncate">{tag}</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 shrink-0">
            {details.level}
          </span>
        </div>
        <p className="text-[10px] text-slate-300 leading-normal font-sans mb-2 font-normal">
          {details.desc}
        </p>
        <div className="flex items-center justify-between text-[9px] font-mono text-white/30 pt-1.5 border-t border-white/[0.04]">
          <span>RECORD:</span>
          <span className="text-emerald-400/80 font-medium">{details.exp}</span>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#0d121f] z-50" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-emerald-500/20 -z-10 mt-[1px]" />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#080B11] py-[48px] md:py-[80px] relative overflow-hidden border-t border-slate-900/40"
    >
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-0">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [04] Technical Skills
          </span>
          <h2 className="text-white font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Skills &amp; Expertise
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-normal max-w-2xl">
            A working toolkit built through real enterprise delivery — not tutorials. Every skill below is demonstrated in at least one case study.
          </p>
        </div>

        {/* Core Tools Bar (full-width strip above cards) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-5 flex-wrap"
          style={{
            background: 'rgba(0,204,136,0.05)',
            border: '0.5px solid rgba(0,204,136,0.15)',
            borderRadius: '10px',
            padding: '12px 20px',
            marginBottom: '24px',
            marginTop: '28px',
          }}
        >
          <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-[#00CC88] uppercase whitespace-nowrap flex-shrink-0">
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
              <CoreTool key={tool.label} label={tool.label} icon={tool.icon} />
            ))}
          </div>
        </motion.div>

        {/* Four Skill Category Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[14px] xl:gap-[16px]"
        >
          {SKILLS_DATA.map((skill, idx) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              className="flex flex-col text-left transition-all duration-200 group relative"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px 22px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,204,136,0.25)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Row 1: Icon + Title + Subtitle */}
              <div className="flex items-center gap-3.5">
                {/* Card icon wrapper */}
                <div 
                  className="shrink-0 flex items-center justify-center text-[#00CC88]"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(0,204,136,0.1)'
                  }}
                >
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-sans text-white leading-snug" style={{ fontSize: '15px', fontWeight: 600, marginBottom: '2px' }}>
                    {skill.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                    {skill.subtitle}
                  </p>
                </div>
              </div>

              {/* Row 2: Skill tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '14px 0' }}>
                {skill.primaryTags.map(tag => (
                  <SkillTag key={tag} tag={tag} isPrimary={true} />
                ))}
                {skill.secondaryTags.map(tag => (
                  <SkillTag key={tag} tag={tag} isPrimary={false} />
                ))}
              </div>

              {/* Row 3: Proficiency dots + label */}
              <div 
                className="flex items-center"
                style={{
                  marginTop: 'auto',
                  paddingTop: '12px',
                  borderTop: '0.5px solid rgba(255,255,255,0.06)',
                  gap: '8px'
                }}
              >
                <div className="flex" style={{ gap: '3px' }}>
                  {[1, 2, 3, 4, 5].map(dot => (
                    <span
                      key={dot}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: '7px',
                        height: '7px',
                        background: dot <= skill.proficiency ? '#00CC88' : 'rgba(255,255,255,0.12)'
                      }}
                    />
                  ))}
                </div>
                <span 
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.4)',
                    marginLeft: '4px'
                  }}
                >
                  {skill.proficiencyLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <p 
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            marginTop: '20px',
            fontStyle: 'italic'
          }}
        >
          Every skill above is demonstrated in a case study — explore the projects ↓
        </p>

      </div>
    </section>
  );
}
