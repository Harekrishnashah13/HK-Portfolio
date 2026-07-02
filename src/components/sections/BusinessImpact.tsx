import { Database, TrendingUp, BarChart3, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function BusinessImpact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const pillars = [
    {
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      title: "Data Migration & Cloud Scaling",
      metric: "1.2PB Enterprise Migration",
      context: "Designed an automated translation engine in Python/PySpark, converting legacy Teradata database schemas and procedures to Azure Synapse Analytics.",
      impact: "Migrated 1.2 petabytes of historical and operational storage with absolute numerical parity and zero operational downtime."
    },
    {
      icon: <Cpu className="h-5 w-5 text-emerald-400" />,
      title: "AI-Driven Pipeline Operations",
      metric: "94% Autonomous Healing",
      context: "Engineered a production-ready diagnostic agent utilizing the Gemini API to intercept stack traces, analyze logs, and run safe, pre-approved retry scripts.",
      impact: "Reduced average pipeline recovery downtime from 14.2 hours to under 4 minutes across automation cycles."
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
      title: "Executive Business Intelligence",
      metric: "20+ Daily Escalations Triaged",
      context: "Designed and maintained central Power BI reports tracking financial KPIs, AML/KYC metrics, and digital banking platform health for Allied Irish Banks (AIB) stakeholders.",
      impact: "Replaced manual CSV processes with automated gateways, maintaining a clean compliance record with zero regulatory breaches."
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
      title: "Machine Learning & Analytics",
      metric: "94.3% Inference Accuracy",
      context: "Built advanced statistical and deep learning models (such as YOLOv9 and Random Forest) to optimize image classification and transaction profiling.",
      impact: "Established high-performance analytical pipelines optimized for low-resource server environments."
    }
  ];

  return (
    <section
      id="impact"
      className="bg-[#05080c] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [01] The Business Imperative
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-6">
            Translating Complex Data into Commercial ROI
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            Technology is simply a vehicle; business value is the destination. I bridge the gap between heavy technical pipeline engineering and C-suite strategic decisions. Here is the direct value created across key commercial pillars.
          </p>
        </div>

        {/* Pillars Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          id="impact-grid"
        >
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative flex flex-col justify-between bg-slate-950/40 rounded-3xl border border-slate-900/80 hover:border-emerald-500/15 backdrop-blur-md p-6 md:p-8 hover:shadow-xl hover:shadow-emerald-500/2 transition-all duration-300"
            >
              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850 text-slate-400 shrink-0 group-hover:text-emerald-400 transition-colors">
                      {p.icon}
                    </div>
                    <h3 className="text-white text-base font-semibold font-sans">
                      {p.title}
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono">Verified Value</span>
                </div>

                {/* Major High-Impact Metric display */}
                <div className="mb-4">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {p.metric}
                  </span>
                </div>

                {/* Details context */}
                <p className="text-slate-400 text-sm leading-relaxed font-sans font-light mb-6">
                  {p.context}
                </p>
              </div>

              {/* Verified Result Summary */}
              <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-start gap-2 text-xs font-mono text-emerald-300">
                <span className="text-emerald-400 select-none font-bold">↳</span>
                <span className="text-slate-400 font-sans text-xs">
                  <strong className="text-slate-300">Key Output:</strong> {p.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
