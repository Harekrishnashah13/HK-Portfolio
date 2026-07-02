import { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, FileText, Briefcase, Linkedin, Github, Mail, MapPin, Award, BarChart3, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [imageError, setImageError] = useState(false);
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#080B11] flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Premium Backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Storytelling Copy (Left Side) */}
          <div className="lg:col-span-7 flex flex-col items-start" id="hero-story">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-[11px] font-mono tracking-wider uppercase font-medium">
                Stamp 1G &middot; Dublin, Ireland &middot; Open to Opportunities
              </span>
            </div>

            {/* Main Display Headlines */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Hey, I'm <span className="text-emerald-400 font-medium">{PERSONAL_INFO.name}</span>.<br />
              <span className="text-slate-300">I transform data into </span>
              <span className="relative inline-block text-white">
                business decisions.
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-emerald-500/40 rounded-full" />
              </span>
            </h1>

            {/* Human-First Mission Summary */}
            <p className="text-slate-400 text-base md:text-lg font-sans font-light leading-relaxed mb-8 max-w-xl">
              I am a <strong className="text-slate-200 font-medium">Databricks Certified Data Engineer &amp; Analyst</strong> with an MSc in Data Science (First Class Distinction) and 3+ years of professional experience in financial services, fintech, and enterprise analytics. I bridge the gap between cloud data pipelines and executive dashboards — building clean, governed, and scalable data systems that drive real business decisions.
            </p>

            {/* Repeated Recruiter-Optimized Key Ingestion Actions */}
            <div className="space-y-4 mb-10 w-full">
              <div className="flex flex-wrap items-center gap-3 w-full">
                {/* 1. Download Resume */}
                <button
                  onClick={onOpenResume}
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <FileText className="h-4 w-4" />
                  Download Resume
                </button>

                {/* 2. View Projects */}
                <button
                  onClick={scrollToProjects}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-sans font-semibold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                  View Projects
                </button>

                {/* Social links grouped together so they wrap gracefully as a unit */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* 3. LinkedIn */}
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-mono text-xs rounded-xl border border-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                    LinkedIn
                  </a>

                  {/* 4. GitHub */}
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-mono text-xs rounded-xl border border-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Github className="h-3.5 w-3.5 text-white" />
                    GitHub
                  </a>

                  {/* 5. Email */}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="px-4 py-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-mono text-xs rounded-xl border border-slate-900 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Mail className="h-3.5 w-3.5 text-emerald-400" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-900/80 pt-8 w-full">
              <div className="flex flex-col">
                <span className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">01. Pipeline Scale</span>
                <span className="text-slate-400 text-xs font-sans font-light">Robust cloud warehouses engineered with Databricks, PySpark, and Azure ADF.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">02. BI Adoption</span>
                <span className="text-slate-400 text-xs font-sans font-light">Audit-ready Power BI dashboard suites built for corporate SLA tracking.</span>
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">03. Real Outcomes</span>
                <span className="text-slate-400 text-xs font-sans font-light">Direct business impact verified across massive cloud migrations and AML compliance.</span>
              </div>
            </div>

          </div>

          {/* Recruiter Cheat-Sheet / Executive Overview (Right Side) */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="hero-overview-card">
            
            {/* Elegant Portrait Frame with Grayscale-to-Color Editorial Transition */}
            <div className="relative aspect-[4/5] rounded-3xl border border-slate-900 overflow-hidden group shadow-2xl shadow-black/80 bg-slate-950/40 flex flex-col justify-between">
              
              {!imageError ? (
                <>
                  <img
                    src="/profile.jpg"
                    alt="Harekrishna Shah Professional Portrait"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700 ease-out scale-[1.02] group-hover:scale-100 z-0"
                    onError={() => setImageError(true)}
                  />
                  
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 z-10 pointer-events-none" />
                  
                  {/* Floating Identity Overlay */}
                  <div className="relative z-20 p-6 mt-auto">
                    <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 px-3.5 py-2 rounded-2xl w-fit">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-slate-300 font-mono uppercase tracking-widest font-semibold">
                        HAREKRISHNA SHAH
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* High-End Editorial Typographic Fallback Card (Loads if profile.jpg is not present yet) */
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#0c111e]/90 overflow-hidden">
                  {/* Abstract subtle grid lines background */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none font-mono text-[8px] text-emerald-400 select-none overflow-hidden leading-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="whitespace-nowrap mb-1">
                        010101010101 DATA_FLOW_ACTIVE SYNC_OK PIPELINE_METRICS_PARITY_100
                      </div>
                    ))}
                  </div>
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-500" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-center font-sans font-extrabold text-white text-sm">
                        HK<span className="text-emerald-400">.</span>
                      </div>
                      <div>
                        <h3 className="text-slate-100 font-sans font-bold text-xs tracking-tight">
                          Harekrishna Shah
                        </h3>
                        <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
                          Verified Portfolio Identity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 text-[9px] font-mono uppercase tracking-widest font-semibold">
                        SYSTEMS_LIVE
                      </span>
                    </div>
                  </div>

                  <div className="my-auto py-8 relative z-10 text-center">
                    <div className="h-16 w-16 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                      <Sparkles className="h-6 w-6 animate-pulse" />
                    </div>
                    <h4 className="text-white text-xs font-semibold font-sans tracking-tight uppercase">
                      Portrait Slot Active
                    </h4>
                    <p className="text-slate-400 text-[10px] font-sans max-w-[240px] mx-auto mt-2 leading-relaxed">
                      To display your professional photo here, drop your portrait file named <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">profile.jpg</code> into the <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">/public</code> folder.
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-slate-900/60 pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Databricks ID:
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                      620583 (Active)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Professional Snapshot Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 1: Geographic Location */}
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-32 group hover:shadow-lg hover:shadow-black/25">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Location</span>
                  <MapPin className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold font-sans">Dublin, Ireland</h4>
                  <p className="text-slate-400 text-[10px] font-mono mt-1">
                    53.3498° N, 6.2603° W
                  </p>
                </div>
              </div>

              {/* Card 2: Work Authorization status */}
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-32 group hover:shadow-lg hover:shadow-black/25">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Visa Status</span>
                  <Award className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold font-sans">Stamp 1G Visa</h4>
                  <p className="text-slate-400 text-[10px] font-mono mt-1">
                    Sponsorship Eligible
                  </p>
                </div>
              </div>

              {/* Card 3: Opportunities Availability */}
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-32 group hover:shadow-lg hover:shadow-black/25">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Opportunities</span>
                  <Briefcase className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold font-sans">Open to Permanent</h4>
                  <p className="text-emerald-400 text-[10px] font-mono mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    Interview Ready
                  </p>
                </div>
              </div>

              {/* Card 4: Domain expertise focus */}
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-32 group hover:shadow-lg hover:shadow-black/25">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Expertise</span>
                  <BarChart3 className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold font-sans">Data Analytics</h4>
                  <p className="text-slate-400 text-[10px] font-mono mt-1">
                    Databricks &amp; Power BI
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
