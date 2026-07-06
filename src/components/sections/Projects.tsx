import { useState, useRef, HTMLAttributes, ReactNode, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../../data';
import { Project } from '../../types';
import HealthcareDashboard from './HealthcareDashboard';
import AnimatedHeading from './AnimatedHeading';
import { 
  ExternalLink, 
  Github, 
  Database, 
  BarChart3, 
  TrendingUp, 
  X, 
  Check, 
  Award, 
  Layers, 
  AlertTriangle, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Lock,
  User,
  Activity,
  Code,
  CodeXml,
  FolderGit2,
  Play,
  Sliders,
  RefreshCw
} from 'lucide-react';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  key?: string | number;
  style?: any;
}

function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      <div 
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--spotlight-color), transparent 80%)'
        }}
      />
      {children}
    </div>
  );
}

function AePerformanceDashboard({ compact }: { compact?: boolean }) {
  return (
    <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/[0.04] pb-2 mb-3">
        <span className="text-white font-sans font-bold text-xs flex items-center gap-1.5">
          A&E Performance Dashboard
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </span>
      </div>

      {/* 4 metrics in 2x2 grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-950/80 border border-white/[0.02] p-2 rounded">
          <span className="text-slate-500 text-[7px] block uppercase">Avg wait time</span>
          <span className="text-white text-[12px] font-sans font-bold">3.4hrs</span>
        </div>
        <div className="bg-slate-950/80 border border-white/[0.02] p-2 rounded">
          <span className="text-slate-500 text-[7px] block uppercase">Breach rate</span>
          <span className="text-red-400 text-[12px] font-sans font-bold">18.5%</span>
        </div>
        <div className="bg-slate-950/80 border border-white/[0.02] p-2 rounded">
          <span className="text-slate-500 text-[7px] block uppercase">Bed occupancy</span>
          <span className="text-cyan-400 text-[12px] font-sans font-bold">88%</span>
        </div>
        <div className="bg-slate-950/80 border border-white/[0.02] p-2 rounded">
          <span className="text-slate-500 text-[7px] block uppercase">QA pass rate</span>
          <span className="text-emerald-400 text-[12px] font-sans font-bold">99.8%</span>
        </div>
      </div>

      {/* Horizontal Bar Chart (hidden if compact) */}
      {!compact && (
        <div className="space-y-1.5 mb-3">
          <span className="text-slate-500 text-[7px] uppercase block mb-1">Bed Occupancy by Ward</span>
          {[
            { name: "Emergency", percentage: 88, color: "#A32D2D" },
            { name: "ICU", percentage: 91, color: "#A32D2D" },
            { name: "Oncology", percentage: 72, color: "#BA7517" },
            { name: "Pediatrics", percentage: 64, color: "#1AAF69" },
            { name: "Cardiology", percentage: 78, color: "#BA7517" }
          ].map(ward => (
            <div key={ward.name} className="flex items-center text-[8px]">
              <span className="w-16 text-slate-400 truncate text-right pr-2">{ward.name}</span>
              <div className="flex-1 bg-white/[0.04] h-2 rounded overflow-hidden">
                <div style={{ width: `${ward.percentage}%`, backgroundColor: ward.color }} className="h-full rounded" />
              </div>
              <span className="w-8 text-slate-400 pl-2 font-bold">{ward.percentage}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Pipeline Strip at bottom */}
      <div className="flex items-center justify-between gap-1 bg-slate-950 p-1.5 rounded border border-white/[0.02] text-[7px] text-center font-mono overflow-x-auto scrollbar-none whitespace-nowrap">
        <div className="bg-red-500/10 text-red-400 border border-red-500/15 py-0.5 px-1.5 rounded text-[7px] font-bold shrink-0">HSE Logs</div>
        <div className="text-slate-600 text-[8px] shrink-0">→</div>
        <div className="bg-amber-500/10 text-amber-400 border border-amber-500/15 py-0.5 px-1.5 rounded text-[7px] font-bold shrink-0">Bronze</div>
        <div className="text-slate-600 text-[8px] shrink-0">→</div>
        <div className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 py-0.5 px-1.5 rounded text-[7px] font-bold shrink-0">Silver</div>
        <div className="text-slate-600 text-[8px] shrink-0">→</div>
        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 py-0.5 px-1.5 rounded text-[7px] font-bold shrink-0">Gold</div>
        <div className="text-slate-600 text-[8px] shrink-0">→</div>
        <div className="bg-blue-500/10 text-blue-400 border border-blue-500/15 py-0.5 px-1.5 rounded text-[7px] font-bold shrink-0">Power BI</div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  onSelectFlagship?: () => void;
}

export default function Projects({ onSelectFlagship }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'bi' | 'analytics'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const pinnedIds = ['project-1', 'healthcare-pipeline', 'project-4'];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredProjects = PROJECTS_DATA.filter(p => pinnedIds.includes(p.id));
  const activeFeatured = featuredProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'engineering') return p.category === 'engineering';
    if (filter === 'analytics') return p.category === 'analytics';
    if (filter === 'bi') {
      return p.category === 'bi' || p.tags.includes('Power BI') || p.tags.includes('Tableau BI');
    }
    return true;
  });

  const nonFeaturedProjects = PROJECTS_DATA.filter(p => !pinnedIds.includes(p.id));
  const activeNonFeatured = nonFeaturedProjects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'engineering') return p.category === 'engineering';
    if (filter === 'analytics') return p.category === 'analytics';
    if (filter === 'bi') {
      return p.category === 'bi' || p.tags.includes('Power BI') || p.tags.includes('Tableau BI');
    }
    return true;
  });

  // Interactive Sandbox states
  const [aibTab, setAibTab] = useState<'sla' | 'audit'>('sla');
  const [yoloThreshold, setYoloThreshold] = useState<number>(0.75);
  const [diagState, setDiagState] = useState<'idle' | 'running' | 'healed'>('idle');
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const [healthDept, setHealthDept] = useState<'all' | 'ae' | 'pediatric' | 'cardiology'>('all');
  const [transitRoute, setTransitRoute] = useState<'46A' | '39A' | '14'>('46A');
  const [financeRisk, setFinanceRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  // Expanded high-fidelity simulator states
  const [selectedMigTemplate, setSelectedMigTemplate] = useState<number>(0);
  const [isMigTranslating, setIsMigTranslating] = useState<boolean>(false);
  const [migTranslationLogs, setMigTranslationLogs] = useState<string[]>([]);
  const [selectedDiagError, setSelectedDiagError] = useState<'db' | 'rate' | 'schema'>('db');
  const [selectedAibDept, setSelectedAibDept] = useState<'retail' | 'wealth' | 'corporate'>('retail');
  const [isAibAuditing, setIsAibAuditing] = useState<boolean>(false);
  const [aibAuditLogs, setAibAuditLogs] = useState<string[]>([]);
  const [isHealthcareSpiked, setIsHealthcareSpiked] = useState<boolean>(false);
  const [yoloActiveScene, setYoloActiveScene] = useState<'dublin' | 'motorway' | 'junction'>('dublin');
  const [financePrincipal, setFinancePrincipal] = useState<string>('10000');
  const [transitPoints, setTransitPoints] = useState<number[]>([18, 19, 18, 17, 18, 20, 18, 17, 18, 19]);

  // Real-time flowing graph ticker for Irish Transit Congestion Monitor
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitPoints(prev => {
        const routeSpeeds = { '46A': 18, '39A': 29, '14': 42 };
        const baseSpeed = routeSpeeds[transitRoute] || 18;
        const noise = Math.sin(Date.now() / 1000) * 3 + (Math.random() - 0.5) * 4;
        const nextSpeed = Math.max(5, Math.min(60, Math.round(baseSpeed + noise)));
        return [...prev.slice(1), nextSpeed];
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [transitRoute]);

  // Filter based on project category (Data Engineering, Business Intelligence, Machine Learning)
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const projectsToRender = filteredProjects.filter((p, index) => {
    if (showAll) return true;
    if (filter === 'all') {
      return pinnedIds.includes(p.id);
    } else {
      return index < 3;
    }
  });

  // Supporting projects are mapped to projectsToRender
  const supportingProjects = projectsToRender;
  const showFlagship = false;
  const flagshipProject = PROJECTS_DATA.find(p => p.id === 'project-1');

  // Badge mapping for project types
  const getProjectTypeBadge = (type: string) => {
    switch (type) {
      case 'professional':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[4px]">
            <Layers className="h-3 w-3" />
            Professional Work
          </span>
        );
      case 'academic':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-[4px]">
            <BookOpen className="h-3 w-3" />
            Academic Research
          </span>
        );
      case 'personal':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-[4px]">
            <Code className="h-3 w-3" />
            Personal Projects
          </span>
        );
      default:
        return null;
    }
  };

  // Badge mapping for project categories
  const getProjectCategoryBadge = (category: 'engineering' | 'bi' | 'analytics') => {
    switch (category) {
      case 'engineering':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-[4px]">
            <Database className="h-3 w-3" />
            Data Engineering
          </span>
        );
      case 'bi':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-[4px]">
            <BarChart3 className="h-3 w-3" />
            Business Intelligence
          </span>
        );
      case 'analytics':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.06em] font-mono font-medium py-[3px] px-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-[4px]">
            <TrendingUp className="h-3 w-3" />
            Machine Learning
          </span>
        );
      default:
        return null;
    }
  };

  // ----------------------------------------------------
  // INTERACTIVE CODE & BI ARTIFACT SIMULATIONS
  // ----------------------------------------------------

  const migrationTemplates = [
    {
      id: 'qualify',
      title: 'QUALIFY',
      sql: `SELECT emp_id, dept_id, salary,\n  QUALIFY ROW_NUMBER() \n  OVER (PARTITION BY dept_id \n        ORDER BY salary DESC) = 1\nFROM raw.employee_billing;`,
      pyspark: `windowSpec = Window.partitionBy("dept_id") \\\n  .orderBy(col("salary").desc())\n\ndf = raw_df.withColumn("rn", \n  row_number().over(windowSpec)) \\\n  .filter(col("rn") == 1) \\\n  .drop("rn")`,
      desc: 'QUALIFY ➔ Window function'
    },
    {
      id: 'coalesce',
      title: 'COALESCE',
      sql: `SELECT cust_id,\n  COALESCE(total_amount, 0.00) AS rev_usd,\n  CAST(txn_date AS DATE) AS day_id\nFROM core.customers;`,
      pyspark: `from pyspark.sql.functions import col, coalesce, lit, to_date\n\ndf = customers_df.withColumn("rev_usd", \n  coalesce(col("total_amount"), lit(0.00))) \\\n  .withColumn("day_id", to_date(col("txn_date")))`,
      desc: 'COALESCE & CAST ➔ Spark functions'
    },
    {
      id: 'groupby',
      title: 'GROUP BY',
      sql: `SELECT dept_id, SUM(salary) AS total\nFROM raw.employee_billing\nGROUP BY dept_id\nHAVING total > 100000;`,
      pyspark: `df = raw_df.groupBy("dept_id") \\\n  .agg(sum("salary").alias("total")) \\\n  .filter(col("total") > 100000)`,
      desc: 'GROUP BY ➔ Spark Aggregation'
    }
  ];

  const handleMigrationTranspile = () => {
    setIsMigTranslating(true);
    setMigTranslationLogs([]);
    const logs = [
      "Analyzing AST from legacy Teradata dialect...",
      "Identifying Dialect-specific clauses...",
      "Generating equivalent PySpark execution plan...",
      "Optimizing partition footprints...",
      "Compilation succeeded with 100% parity."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setMigTranslationLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsMigTranslating(false);
      }
    }, 200);
  };

  const diagErrorsList = {
    db: {
      name: "Database Timeout",
      log: "psycopg2.OperationalError: connection to 'db.internal' (10.0.1.42) failed: Connection refused",
      diagnosis: "Target DB container is offline due to ungraceful heap overflow. Spark task failed.",
      heal: "docker restart dev_postgresql_db_1 && python3 verify_migrations.py",
      success: "Container restarted successfully. Connection handshake verified. Spark session recovered."
    },
    rate: {
      name: "API Rate Limit",
      log: "requests.exceptions.HTTPError: 429 Client Error: Too Many Requests for v1/jobs",
      diagnosis: "API gateway is rate-limiting the job scraper due to thread concurrency peaks.",
      heal: "sed -i 's/CONCURRENCY=10/CONCURRENCY=2/g' .env && docker-compose restart scraper",
      success: "Throttling resolved. Backoff policy injected. Latency recovered to normal SLA parameters."
    },
    schema: {
      name: "Schema Drift",
      log: "ValueError: Column count mismatch. Expected 14 columns, received 16 columns at line 4381",
      diagnosis: "Upstream transactional table changed schema. Appended 2 unmapped audit tags.",
      heal: "python3 apply_schema_evolution.py --table billing_records",
      success: "Delta schema evolved automatically. Partition schema matched. Records ingested."
    }
  };

  const runSelectedDiagnostics = () => {
    setDiagState('running');
    setDiagLogs([]);
    const selectedError = diagErrorsList[selectedDiagError];
    const logs = [
      "Intercepting traceback log...",
      `Parsing signature: "${selectedError.name}"`,
      `Root cause: ${selectedError.diagnosis}`,
      `Executing autonomic recovery command: \`${selectedError.heal}\``,
      "Performing health check ping..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setDiagLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setDiagState('healed');
      }
    }, 250);
  };

  const runAibAudit = () => {
    setIsAibAuditing(true);
    setAibAuditLogs([]);
    const logs = [
      "✔ Verified 2,240 financial ledger checks.",
      "✔ Absolute Parity Certificate issued dec-2024.",
      "✔ No compliance discrepancies detected."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setAibAuditLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsAibAuditing(false);
      }
    }, 400);
  };

  // 1. Flagship Migration Parser Engine Mockup
  const renderMigrationMockup = () => {
    const currentTpl = migrationTemplates[selectedMigTemplate] || migrationTemplates[0];
    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 relative overflow-hidden select-none shadow-inner h-auto min-h-[290px] flex flex-col justify-between">
        {/* Dashboard Top Navigation bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2.5 mb-2.5 gap-2">
          <div className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[8.5px] text-slate-400 font-sans font-medium">SQL Translation &amp; Parity Parser</span>
          </div>
          <div className="flex gap-1">
            {migrationTemplates.map((tpl, idx) => (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedMigTemplate(idx);
                  setMigTranslationLogs([]);
                }}
                className={`px-1.5 py-0.5 rounded text-[7px] font-mono cursor-pointer transition-colors ${
                  selectedMigTemplate === idx ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tpl.title}
              </button>
            ))}
          </div>
        </div>

        {/* Code comparison split pane */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 my-1">
          {/* Teradata Source */}
          <div className="bg-slate-950/80 border border-slate-900 p-2 rounded-lg flex flex-col justify-between min-h-[80px]">
            <div>
              <span className="text-[7.5px] text-red-400 font-bold block mb-1">SOURCE TERADATA SQL</span>
              <pre className="text-[6.5px] text-slate-500 leading-tight font-mono whitespace-pre-wrap">
                {currentTpl.sql}
              </pre>
            </div>
            <span className="text-[6.5px] text-slate-600 mt-1">{currentTpl.desc}</span>
          </div>

          {/* PySpark Destination */}
          <div className="bg-slate-950/80 border border-slate-900 p-2 rounded-lg flex flex-col justify-between border-l-emerald-500/20 min-h-[80px]">
            <div>
              <span className="text-[7.5px] text-emerald-400 font-bold block mb-1">TARGET PYSPARK (DATABRICKS)</span>
              {isMigTranslating ? (
                <div className="space-y-1">
                  {migTranslationLogs.map((log, lIdx) => (
                    <p key={lIdx} className="text-[6px] text-slate-500 leading-tight font-mono">&gt; {log}</p>
                  ))}
                  <p className="text-[6.5px] text-emerald-400 font-bold animate-pulse font-mono">Compiling execution plan...</p>
                </div>
              ) : (
                <pre className="text-[6.5px] text-emerald-300 leading-tight font-mono whitespace-pre-wrap font-medium">
                  {currentTpl.pyspark}
                </pre>
              )}
            </div>
            <span className="text-[6.5px] text-emerald-500/70 mt-1 flex items-center justify-between">
              <span>{isMigTranslating ? "Translating..." : "✔ AST Map Compiled"}</span>
              <button
                onClick={handleMigrationTranspile}
                disabled={isMigTranslating}
                className="px-1.5 py-0.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-[6.5px] rounded cursor-pointer transition-colors font-mono"
              >
                Run Transpiler
              </button>
            </span>
          </div>
        </div>

        {/* Bottom checksum row */}
        <div className="mt-2.5 flex items-center justify-between bg-emerald-950/15 border border-emerald-900/20 px-2 py-1 rounded text-[7.5px] text-emerald-400">
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3 shrink-0" />
            Checksum validation: 100% parity (1.2PB)
          </span>
          <span className="font-sans text-[7px] text-slate-500">Migration Completed</span>
        </div>
      </div>
    );
  };

  // 2. Self-Healing Pipeline Diagnostics (HiCounselor)
  const renderAIDiagnosticMockup = () => {
    const currentError = diagErrorsList[selectedDiagError] || diagErrorsList.db;
    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500">JENKINS INTERCEPTOR (GEMINI DIALOGUE)</span>
          <div className="flex gap-1">
            {(['db', 'rate', 'schema'] as const).map((errKey) => (
              <button
                key={errKey}
                onClick={() => {
                  setSelectedDiagError(errKey);
                  setDiagState('idle');
                  setDiagLogs([]);
                }}
                className={`px-1.5 py-0.5 rounded text-[6.5px] font-mono cursor-pointer transition-colors ${
                  selectedDiagError === errKey ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {errKey === 'db' ? 'DB Error' : errKey === 'rate' ? 'Rate Limit' : 'Schema'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 flex-1 overflow-y-auto pr-1 my-1">
          {diagState === 'idle' && (
            <div className="space-y-2">
              <div className="bg-slate-950/80 border border-slate-900 p-2 rounded">
                <span className="text-red-400 font-bold block text-[7.5px] mb-0.5">❌ Pipeline Crash Trace:</span>
                <p className="text-[7px] text-slate-400 leading-tight">
                  {currentError.log}
                </p>
              </div>
              <button
                onClick={runSelectedDiagnostics}
                className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-[8.5px] font-bold rounded transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Play className="h-3 w-3 shrink-0" />
                Run Gemini Diagnostic Agent
              </button>
            </div>
          )}

          {diagState === 'running' && (
            <div className="space-y-1">
              {diagLogs.map((log, index) => (
                <p key={index} className="text-[7px] text-slate-400 leading-normal">
                  <span className="text-emerald-500 mr-1">&gt;</span> {log}
                </p>
              ))}
              <p className="text-[7px] text-emerald-400 font-bold animate-pulse">Running autonomic recovery agent...</p>
            </div>
          )}

          {diagState === 'healed' && (
            <div className="space-y-2">
              <div className="bg-emerald-950/15 border border-emerald-500/10 p-2 rounded">
                <span className="text-emerald-400 font-bold block text-[7.5px] mb-0.5">✔ Autonomic Recovery Success:</span>
                <p className="text-[7px] text-slate-300 leading-tight">
                  {currentError.success}
                </p>
              </div>
              <button
                onClick={() => setDiagState('idle')}
                className="w-full py-1 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-mono text-[8px] rounded transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCw className="h-2.5 w-2.5 shrink-0" />
                Reset Simulation State
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>Failure Resolution: 94%</span>
          <span>Latency: 14.2h ➔ <span className="text-emerald-400 font-bold">4 mins</span></span>
        </div>
      </div>
    );
  };

  // 3. Banking Fraud & Operational SLA Dashboard
  const renderBankingDashboardMockup = () => {
    const aibDeptsMap = {
      retail: { compliance: "100% SLA", cases: "42 Resolved", triage: "18m Triage", color: "text-emerald-400" },
      wealth: { compliance: "98.9% SLA", cases: "12 Resolved", triage: "24m Triage", color: "text-emerald-400" },
      corporate: { compliance: "100% SLA", cases: "8 Resolved", triage: "11m Triage", color: "text-emerald-400" }
    };
    const currentDeptInfo = aibDeptsMap[selectedAibDept] || aibDeptsMap.retail;

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500">EXECUTIVE FRAUD &amp; SLA DASHBOARD</span>
          <div className="flex gap-1">
            <button
              onClick={() => setAibTab('sla')}
              className={`px-1.5 py-0.5 rounded text-[6.5px] font-mono cursor-pointer transition-colors ${
                aibTab === 'sla' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              SLA Tracker
            </button>
            <button
              onClick={() => setAibTab('audit')}
              className={`px-1.5 py-0.5 rounded text-[6.5px] font-mono cursor-pointer transition-colors ${
                aibTab === 'audit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Compliance Audits
            </button>
          </div>
        </div>

        {/* Mock metric indicators */}
        <div className="flex-1 flex flex-col justify-center my-1.5">
          {aibTab === 'sla' ? (
            <div className="space-y-2 text-left">
              {/* Department Selector */}
              <div className="flex gap-1 mb-1">
                {(['retail', 'wealth', 'corporate'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedAibDept(d)}
                    className={`px-1 py-0.2 rounded text-[6px] tracking-tight font-mono ${
                      selectedAibDept === d ? 'bg-slate-850 text-emerald-400 border border-slate-800' : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
                  <span className="text-slate-500 text-[6px] block uppercase">Compliance</span>
                  <span className="text-emerald-400 text-[10px] font-sans font-bold">{currentDeptInfo.compliance}</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
                  <span className="text-slate-500 text-[6px] block uppercase">Triage Vol</span>
                  <span className="text-white text-[10px] font-sans font-bold">{currentDeptInfo.cases}</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
                  <span className="text-slate-500 text-[6px] block uppercase">Avg Speed</span>
                  <span className="text-emerald-400 text-[10px] font-sans font-bold">{currentDeptInfo.triage}</span>
                </div>
              </div>
              {/* Small SVG Sparkline of fraud triage status */}
              <div className="h-6 w-full bg-slate-950 rounded border border-slate-900 flex items-center justify-between px-2 text-[6.5px] text-slate-500">
                <span>Central Bank SLA Standard: 100%</span>
                <span className="text-emerald-400 font-bold">✔ Target Safe</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/80 border border-slate-900 p-2 rounded space-y-1.5 text-left">
              <div className="flex justify-between items-center border-b border-slate-900 pb-1 mb-1">
                <span className="text-slate-400 text-[7px] font-bold block uppercase">
                  Central Bank Parity Logs
                </span>
                <button
                  onClick={runAibAudit}
                  disabled={isAibAuditing}
                  className="px-1.5 py-0.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-[6px] rounded transition-colors"
                >
                  {isAibAuditing ? 'Auditing...' : 'Run Audit'}
                </button>
              </div>
              {isAibAuditing ? (
                <div className="space-y-0.5">
                  <p className="text-[6px] text-slate-500 font-mono animate-pulse">Running transactional reconciliation...</p>
                  <p className="text-[6.5px] text-emerald-400 font-mono">&gt; Verified 2,240 digital checks.</p>
                </div>
              ) : aibAuditLogs.length > 0 ? (
                <div className="space-y-0.5">
                  {aibAuditLogs.map((log, idx) => (
                    <p key={idx} className="text-[6.5px] text-emerald-400 leading-normal font-mono">{log}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[7px] text-slate-500 leading-normal font-mono italic">
                  Reconciliation logs are offline. Click 'Run Audit' to verify real-time Central Bank parity.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-2 pt-2 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>Mainframe / Arcot Gateway Synced</span>
          <span>Secure Gateway</span>
        </div>
      </div>
    );
  };

  // 4. YOLOv9 Spatial Localization Mockup (MSc Dissertation)
  const renderYOLOMockup = () => {
    const yoloScenes = {
      dublin: {
        name: "Dublin L301 (Day)",
        bg: "bg-slate-900/60",
        objects: [
          { label: "License Plate", confidence: 0.94, bbox: "top-[40%] left-[20%] w-[35%] h-[18%] border-emerald-500 bg-emerald-500/10 text-emerald-400" },
          { label: "Vehicle ID", confidence: 0.78, bbox: "top-[10%] left-[5%] w-[85%] h-[80%] border-blue-500 bg-blue-500/10 text-blue-400" },
          { label: "Roadsign/Glare", confidence: 0.38, bbox: "top-[5%] left-[70%] w-[12%] h-[15%] border-red-500 bg-red-500/10 text-red-400" }
        ]
      },
      motorway: {
        name: "M50 Toll (Night)",
        bg: "bg-slate-950",
        objects: [
          { label: "License Plate", confidence: 0.91, bbox: "top-[45%] left-[25%] w-[25%] h-[15%] border-emerald-500 bg-emerald-500/10 text-emerald-400" },
          { label: "HGV/Truck", confidence: 0.82, bbox: "top-[15%] left-[15%] w-[65%] h-[75%] border-blue-500 bg-blue-500/10 text-blue-400" },
          { label: "Rain Artifact", confidence: 0.25, bbox: "top-[55%] left-[78%] w-[10%] h-[10%] border-red-500 bg-red-500/10 text-red-400" }
        ]
      },
      junction: {
        name: "Grafton St (Dusk)",
        bg: "bg-neutral-900/80",
        objects: [
          { label: "License Plate", confidence: 0.89, bbox: "top-[35%] left-[15%] w-[30%] h-[20%] border-emerald-500 bg-emerald-500/10 text-emerald-400" },
          { label: "Transit Van", confidence: 0.74, bbox: "top-[10%] left-[8%] w-[82%] h-[78%] border-blue-500 bg-blue-500/10 text-blue-400" },
          { label: "Distant Post", confidence: 0.32, bbox: "top-[50%] left-[85%] w-[8%] h-[18%] border-red-500 bg-red-500/10 text-red-400" }
        ]
      }
    };
    const scene = yoloScenes[yoloActiveScene] || yoloScenes.dublin;

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500">YOLOV9 LIVE DETECTION WORKBOOK</span>
          <div className="flex gap-1">
            {(['dublin', 'motorway', 'junction'] as const).map(sc => (
              <button
                key={sc}
                onClick={() => setYoloActiveScene(sc)}
                className={`px-1.5 py-0.5 rounded text-[6.5px] font-mono cursor-pointer transition-colors ${
                  yoloActiveScene === sc ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {sc === 'dublin' ? 'Dublin L301' : sc === 'motorway' ? 'M50 Night' : 'Grafton St'}
              </button>
            ))}
          </div>
        </div>

        {/* Visual representation of detection bounding box overlay */}
        <div className="flex-1 flex flex-col justify-between my-1">
          {/* Simulated Active Frame Canvas */}
          <div className={`h-24 rounded-lg relative overflow-hidden border border-slate-900/80 ${scene.bg} flex items-center justify-center`}>
            {/* Dotted Lane Line */}
            <div className="absolute left-0 right-0 h-0.5 border-t border-dashed border-slate-800/60 top-1/2" />
            {scene.objects.map((obj, i) => {
              const isVisible = yoloThreshold <= obj.confidence;
              if (!isVisible) return null;
              return (
                <div key={i} className={`absolute border rounded text-[6px] font-mono p-1 transition-all duration-300 ${obj.bbox}`}>
                  <span className="absolute -top-3 left-0 bg-slate-950 text-[5px] font-bold border border-slate-900 px-1 py-0.2 rounded scale-75 origin-left shadow-lg">
                    {obj.label} ({(obj.confidence * 100).toFixed(0)}%)
                  </span>
                </div>
              );
            })}
            {scene.objects.filter(o => yoloThreshold <= o.confidence).length === 0 && (
              <span className="text-[8px] text-slate-600 font-mono italic z-10">All objects filtered by threshold</span>
            )}
          </div>

          {/* Confidence interactive threshold slider */}
          <div className="space-y-1 mt-2">
            <div className="flex justify-between items-center text-[7.5px] text-slate-500">
              <span className="flex items-center gap-1">
                <Sliders className="h-3 w-3 text-purple-400" />
                Confidence Filter Limit
              </span>
              <span className="text-emerald-400 font-bold font-mono">{(yoloThreshold).toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="1.00"
              step="0.05"
              value={yoloThreshold}
              onChange={(e) => setYoloThreshold(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>Dataset Scale: 8,800+ frames</span>
          <span>Validation mAP: 94.3%</span>
        </div>
      </div>
    );
  };

  // 5. Healthcare Operations / NHS A&E Medallion Pipeline Mockup
  const renderHealthcareMockup = () => {
    // Data based on selected department and surge toggle
    const metricsMap = {
      normal: {
        all: { wait: "2.4h", breach: "8.5%", capacity: "82%", state: "Stable" },
        ae: { wait: "3.6h", breach: "14.2%", capacity: "98%", state: "Critical" },
        pediatric: { wait: "1.4h", breach: "2.1%", capacity: "54%", state: "Stable" },
        cardiology: { wait: "1.8h", breach: "4.0%", capacity: "70%", state: "Stable" }
      },
      surge: {
        all: { wait: "4.5h", breach: "28.5%", capacity: "110%", state: "Critical" },
        ae: { wait: "5.8h", breach: "44.8%", capacity: "128%", state: "Critical" },
        pediatric: { wait: "2.9h", breach: "11.5%", capacity: "85%", state: "Stable" },
        cardiology: { wait: "3.4h", breach: "18.0%", capacity: "94%", state: "Stable" }
      }
    };
    const activeMetricsGroup = isHealthcareSpiked ? metricsMap.surge : metricsMap.normal;
    const current = activeMetricsGroup[healthDept] || activeMetricsGroup.all;

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500">EXECUTIVE HSE/NHS CONGESTION HUB</span>
          <div className="flex gap-1">
            {(['all', 'ae', 'pediatric', 'cardiology'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setHealthDept(d)}
                className={`px-1.5 py-0.5 rounded text-[6px] font-mono tracking-tight cursor-pointer ${
                  healthDept === d ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {d === 'ae' ? 'A&E' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard visuals with real HSE KPIs */}
        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2 text-left">
          {/* Simulation Toggle control */}
          <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded border border-slate-900/80">
            <span className="text-[7.5px] text-slate-500 flex items-center gap-1">
              <Activity className="h-3 w-3 text-red-500" />
              Surge Model: {isHealthcareSpiked ? 'Winter Inflow Surge' : 'Normal Capacity'}
            </span>
            <button
              onClick={() => setIsHealthcareSpiked(!isHealthcareSpiked)}
              className={`px-2 py-0.5 text-[6.5px] font-bold rounded cursor-pointer transition-all ${
                isHealthcareSpiked ? 'bg-red-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Toggle Surge
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Avg Waiting Time</span>
              <span className={`text-[10px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : 'text-white'}`}>{current.wait}</span>
              <span className="text-[5px] text-slate-500 block">NHS Goal &lt;4h</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Breach Rate (&gt;4h)</span>
              <span className={`text-[10px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : 'text-emerald-400'}`}>{current.breach}</span>
              <span className="text-[5px] text-slate-500 block">SLA Limit 15%</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Ward Capacity</span>
              <span className={`text-[10px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : 'text-white'}`}>{current.capacity}</span>
              <span className="text-[5px] text-slate-500 block">Active Beds</span>
            </div>
          </div>

          {/* Medallion pipeline validation status check */}
          <div className="bg-slate-950/40 border border-slate-900/60 px-2 py-1 rounded flex items-center justify-between text-[6.5px]">
            <span className="text-slate-400 flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${current.state === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
              Silver Layer: Format Normalization
            </span>
            <span className="text-emerald-400 font-bold font-mono">✔ Gold KPI Models Synced</span>
          </div>
        </div>

        <div className="mt-1 pt-1 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>Daily refresh via Databricks Workflows</span>
          <span className="text-[6px] bg-slate-900 text-slate-400 px-1 py-0.2 rounded font-mono uppercase">
            HSE Compliant (No PII)
          </span>
        </div>
      </div>
    );
  };

  // 6. Real-Time Irish Transit Congestion Analytics Pipeline Mockup
  const renderTransitMockup = () => {
    const routeMap = {
      '46A': { speed: "18 km/h", status: "Heavy Delay", index: "0.82", color: "text-red-400", active: 14, trackColor: "border-red-500/30" },
      '39A': { speed: "29 km/h", status: "Moderate Delay", index: "0.45", color: "text-amber-400", active: 18, trackColor: "border-amber-500/30" },
      '14': { speed: "42 km/h", status: "On Time", index: "0.15", color: "text-emerald-400", active: 8, trackColor: "border-emerald-500/30" }
    };
    const current = routeMap[transitRoute] || routeMap['46A'];

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500 font-sans tracking-wide">LIVE DUBLIN BUS GTFS-RT MONITOR</span>
          <div className="flex gap-1">
            {(['46A', '39A', '14'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTransitRoute(r)}
                className={`px-1.5 py-0.5 rounded text-[6px] font-mono tracking-tight cursor-pointer transition-colors ${
                  transitRoute === r ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Route {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2 text-left">
          {/* Visual track with flowing bus dot indicator */}
          <div className={`h-8 rounded-lg relative overflow-hidden border border-dashed flex items-center px-4 bg-slate-950 ${current.trackColor}`}>
            <span className="text-[7px] text-slate-600 font-mono select-none">Route {transitRoute} Route Lane</span>
            {/* Pulsing animated bus indicator */}
            <motion.div
              animate={{ x: [0, 160, 0] }}
              transition={{ repeat: Infinity, duration: transitRoute === '14' ? 4 : transitRoute === '39A' ? 7 : 12, ease: "linear" }}
              className="absolute h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Live Speed</span>
              <span className="text-[10px] font-sans font-bold text-white">{current.speed}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Delay Index</span>
              <span className={`text-[10px] font-sans font-bold ${current.color}`}>{current.index}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Active Buses</span>
              <span className="text-[10px] font-sans font-bold text-white">{current.active}</span>
            </div>
          </div>

          {/* Spark streaming flowing graph visualizer */}
          <div className="space-y-1">
            <span className="text-[6.5px] text-slate-500 uppercase tracking-widest block font-bold">Spark Ingestion Speed (1.2s Poll Rate)</span>
            <svg className="w-full h-8 bg-slate-950 rounded border border-slate-900 p-1" viewBox="0 0 100 20">
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="1.2"
                points={transitPoints.map((val, idx) => `${idx * 11},${20 - (val / 60) * 16}`).join(' ')}
              />
            </svg>
          </div>
        </div>

        <div className="mt-1 pt-1 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>Spark Streaming Realtime Engine</span>
          <span className="text-[6px] bg-slate-900 text-slate-400 px-1 py-0.2 rounded font-mono uppercase">
            No Static Cache
          </span>
        </div>
      </div>
    );
  };

  // 7. Automated Financial Portfolio Optimization Engine Mockup
  const renderFinanceMockup = () => {
    const currentRiskObj = {
      conservative: { bonds: "50%", bluechip: "30%", cash: "15%", crypto: "5%", sharpe: "1.24", expected: 0.062 },
      moderate: { bonds: "25%", bluechip: "45%", cash: "10%", crypto: "20%", sharpe: "1.98", expected: 0.125 },
      aggressive: { bonds: "5%", bluechip: "35%", cash: "5%", crypto: "55%", sharpe: "2.42", expected: 0.248 }
    };
    const current = currentRiskObj[financeRisk] || currentRiskObj.moderate;
    const numPrincipal = parseFloat(financePrincipal) || 10000;
    const projected10Yr = Math.round(numPrincipal * Math.pow(1 + current.expected, 10));

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-auto min-h-[220px] sm:h-[220px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900/80 pb-2 mb-2 gap-1.5">
          <span className="text-[8px] text-slate-500 font-sans tracking-wide font-medium">MARKOWITZ PORTFOLIO ALLOCATOR</span>
          <div className="flex gap-1">
            {(['conservative', 'moderate', 'aggressive'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFinanceRisk(r)}
                className={`px-1 py-0.5 rounded text-[6px] font-mono tracking-tight cursor-pointer transition-all ${
                  financeRisk === r ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {r === 'conservative' ? 'Cons' : r === 'moderate' ? 'Mod' : 'Aggr'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2 text-left">
          {/* Principal interactive input field */}
          <div className="flex items-center justify-between bg-slate-950 border border-slate-900 p-1.5 rounded">
            <span className="text-[7px] text-slate-500">Principal Investment:</span>
            <div className="flex items-center gap-1">
              <span className="text-[7.5px] text-emerald-400 font-bold">€</span>
              <input
                type="number"
                value={financePrincipal}
                onChange={(e) => setFinancePrincipal(e.target.value)}
                className="w-16 bg-transparent border-none text-right font-mono text-white text-[7.5px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="10000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Est Sharpe Ratio</span>
              <span className="text-[10px] font-sans font-bold text-emerald-400">{current.sharpe}</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6px] block uppercase">Expected Return</span>
              <span className="text-[10px] font-sans font-bold text-white">+{(current.expected * 100).toFixed(1)}% / yr</span>
            </div>
          </div>

          {/* Projected Growth calculation */}
          <div className="bg-emerald-950/10 border border-emerald-950/30 p-1.5 rounded text-[7px] text-emerald-400/90 flex justify-between items-center">
            <span>Projected Value (10 Years):</span>
            <span className="font-bold">€{projected10Yr.toLocaleString()}</span>
          </div>

          {/* Allocation Weights Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[5px] text-slate-500 leading-none">
              <span>Bonds ({current.bonds})</span>
              <span>Blue-Chip ({current.bluechip})</span>
              <span>Cash ({current.cash})</span>
              <span>Crypto ({current.crypto})</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full flex overflow-hidden">
              <div style={{ width: current.bonds }} className="h-full bg-emerald-500/80" />
              <div style={{ width: current.bluechip }} className="h-full bg-cyan-500/80" />
              <div style={{ width: current.cash }} className="h-full bg-slate-500/80" />
              <div style={{ width: current.crypto }} className="h-full bg-amber-500/80" />
            </div>
          </div>
        </div>

        <div className="mt-1 pt-1 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
          <span>FastAPI Monte Carlo (10k Sim Runs)</span>
          <span className="text-[6.5px] text-emerald-400 font-mono font-bold">
            ✔ Weights Found
          </span>
        </div>
      </div>
    );
  };

  const renderWideProjectCard = (project: Project) => {
    if (project.id === 'healthcare-pipeline') {
      const desc = "Designed a secure Databricks Lakehouse pipeline to ingest NHS A&E performance reports, standardizing patient waiting metrics. Deployed an automated Executive Power BI Dashboard to track HSE breach rates in real-time.";
      return (
        <SpotlightCard
          key={project.id}
          id={`project-card-${project.id}`}
          className="group relative bg-[#ffffff]/[0.03] rounded-[14px] border border-[#00cc88]/15 backdrop-blur-md p-7 md:p-8 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
          style={{ minHeight: '320px' }}
        >
          <div className="healthcare-card-inner" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
            gap: '32px',
            alignItems: 'start'
          }}>
            {/* LEFT Column */}
            <div className="healthcare-text flex flex-col justify-between h-full">
              <div>
                {/* Badges row (Fix 5) */}
                <div className="flex flex-row items-center gap-[6px] flex-wrap mb-3 w-full">
                  {getProjectCategoryBadge(project.category)}
                  {getProjectTypeBadge(project.projectType)}
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
                    Completed
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-sans tracking-tight" style={{ fontSize: '22px', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-0.01em', marginBottom: '10px' }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm leading-[1.65] text-white/60 mb-4">
                  {desc}
                </p>

                {/* 3 metric chips in a row */}
                <div className="flex flex-row items-center gap-2.5 text-xs text-emerald-400 font-mono mt-3 mb-5">
                  <span>99.8% accuracy</span>
                  <span className="text-slate-700 font-bold">·</span>
                  <span>&lt;15min latency</span>
                  <span className="text-slate-700 font-bold">·</span>
                  <span>100% parity</span>
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="text-[10px] text-slate-400 font-mono bg-slate-900/60 border border-slate-800/40 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06] mt-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 bg-transparent hover:bg-white/[0.04] border border-white/10 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  Open Case Study &rarr;
                </button>
                
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[6px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#00CC88] hover:border-[#00CC88]/30 transition-all cursor-pointer"
                  title="View Source Code"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* RIGHT Column */}
            <div className={`healthcare-viz ${isMobile ? 'h-[220px] overflow-hidden' : ''} w-full`}>
              <AePerformanceDashboard compact={isMobile} />
            </div>
          </div>
        </SpotlightCard>
      );
    }

    // Generic wide card
    return (
      <SpotlightCard
        key={project.id}
        id={`project-card-${project.id}`}
        className="group relative bg-[#ffffff]/[0.03] rounded-[14px] border border-white/10 backdrop-blur-md p-7 md:p-8 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
        style={{ minHeight: '320px' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '45% 55%',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* LEFT Column */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Badges row (Fix 5) */}
              <div className="flex flex-row items-center gap-[6px] flex-wrap mb-3 w-full">
                {getProjectCategoryBadge(project.category)}
                {getProjectTypeBadge(project.projectType)}
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
                  Completed
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-sans tracking-tight" style={{ fontSize: '22px', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-0.01em', marginBottom: '10px' }}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm leading-[1.65] text-white/60 mb-4">
                {project.description}
              </p>

              {/* Metrics or outcomes block */}
              {project.id === 'project-1' ? (
                /* Enterprise Cloud Migration outcome accent (Fix 3) */
                <div style={{
                  borderLeft: '2px solid #00CC88',
                  paddingLeft: '14px',
                  marginTop: '14px',
                  marginBottom: '14px'
                }}>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: '1.65',
                    margin: 0
                  }}>
                    100% data parity with zero operational downtime. Automated translation saved 9 months of manual work.
                  </p>
                </div>
              ) : (
                /* Improved metrics row for other wide cards */
                <div className="grid grid-cols-3 gap-2 border-t border-b border-white/[0.04] py-3 mb-4 text-center">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col text-center">
                      <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#FFFFFF',
                        display: 'block'
                      }}>
                        {m.value}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)',
                        marginTop: '3px'
                      }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Outcome pattern below (Fix 6) - only if not project-1 since project-1 outcome is already displayed above */}
              {project.id !== 'project-1' && (
                <div style={{
                  borderLeft: '2px solid rgba(0,204,136,0.5)',
                  paddingLeft: '14px',
                  marginTop: '14px',
                  marginBottom: '14px'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#00CC88',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '4px'
                  }}>Outcome</span>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.65',
                    color: 'rgba(255,255,255,0.65)',
                    margin: 0
                  }}>
                    {project.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06] mt-4">
              <button
                onClick={() => setSelectedProject(project)}
                className="px-4 py-2 bg-transparent hover:bg-white/[0.04] border border-white/10 rounded-lg text-xs font-semibold text-white/80 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                Open Case Study &rarr;
              </button>
              
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[6px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#00CC88] hover:border-[#00CC88]/30 transition-all cursor-pointer"
                title="View Source Code"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT Column (Preview/Mockup) */}
          <div className={`${isMobile ? 'h-[200px] overflow-hidden' : ''} w-full`}>
            {getProjectMockup(project.id)}
          </div>
        </div>
      </SpotlightCard>
    );
  };

  const renderStandardProjectCard = (project: Project) => {
    const isProject1 = project.id === 'project-1';

    return (
      <SpotlightCard
        key={project.id}
        id={`project-card-${project.id}`}
        className="group relative flex flex-col justify-between bg-slate-950/40 rounded-3xl border-[0.5px] border-[rgba(255,255,255,0.08)] hover:border-[#00CC88]/35 backdrop-blur-md p-4 md:p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-[3px] transition-all duration-200 ease-out h-full"
        style={{ minHeight: '320px' }}
      >
        <div className="flex-1 flex flex-col">
          {/* Badges row (Fix 5) */}
          <div className="flex flex-row items-center gap-[6px] flex-wrap mb-3 w-full">
            {getProjectCategoryBadge(project.category)}
            {getProjectTypeBadge(project.projectType)}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
              Completed
            </span>
          </div>

          {/* Title & Short Desc */}
          <h3 className="text-white font-sans tracking-tight" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '1.3', letterSpacing: '-0.01em', marginBottom: '10px' }}>
            {project.title}
          </h3>
          <p 
            className="font-sans"
            style={{
              fontSize: '14px',
              lineHeight: '1.65',
              color: 'rgba(255,255,255,0.6)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '16px'
            }}
          >
            {project.description}
          </p>

          {/* Preview mockup (height: 200px, overflow: hidden) */}
          <div className="hidden md:block mb-4 h-[200px] overflow-hidden rounded-lg">
            {getProjectMockup(project.id)}
          </div>

          {/* Mobile-only Simulation Banner */}
          <div className="block md:hidden mb-4 p-2.5 bg-slate-900/50 border border-slate-800/60 rounded-xl text-center">
            <button
              onClick={() => setSelectedProject(project)}
              className="text-[10px] text-emerald-400 font-mono font-medium inline-flex items-center gap-1.5 cursor-pointer w-full justify-center h-10 min-h-[40px]"
            >
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Tap to View Case Study &amp; Interactive Demo
            </button>
          </div>

          {/* Metrics row (OMITTED for project-1) */}
          {!isProject1 && (
            <div className="grid grid-cols-3 gap-2 border-t border-b border-white/[0.04] py-3 mb-4 text-center">
              {project.metrics.map((m, mIdx) => (
                <div key={mIdx} className="flex flex-col text-center">
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#FFFFFF',
                    display: 'block'
                  }}>
                    {m.value}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: '3px'
                  }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Outcomes pattern (Fix 6, Fix 3) */}
          {isProject1 ? (
            /* Enterprise Cloud Migration outcome style (Fix 3) */
            <div style={{
              borderLeft: '2px solid #00CC88',
              paddingLeft: '14px',
              marginTop: '14px',
              marginBottom: '14px'
            }}>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: '1.65',
                margin: 0
              }}>
                100% data parity with zero operational downtime. Automated translation saved 9 months of manual work.
              </p>
            </div>
          ) : (
            /* Global outcome Pattern (Fix 6) */
            <div style={{
              borderLeft: '2px solid rgba(0,204,136,0.5)',
              paddingLeft: '14px',
              marginTop: '14px',
              marginBottom: '14px'
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#00CC88',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '4px'
              }}>Outcome</span>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.65',
                color: 'rgba(255,255,255,0.65)',
                margin: 0
              }}>
                {project.impact}
              </p>
            </div>
          )}
        </div>

        {/* Consistent bottom actions bar (Fix 7) */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          paddingTop: '14px',
          marginTop: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* LEFT: Tech tag pills (max 3 visible + "+N more" if overflow) */}
          <div className="flex flex-row items-center gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: '5px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[11px] text-slate-500 font-medium pl-1">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* RIGHT: Two icon-style links */}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-[6px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#00CC88] hover:border-[#00CC88]/30 transition-all cursor-pointer"
              title="View Source Code"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            
            <button
              onClick={() => setSelectedProject(project)}
              className="w-8 h-8 rounded-[6px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#00CC88] hover:border-[#00CC88]/30 transition-all cursor-pointer"
              title="Open Case Study"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </SpotlightCard>
    );
  };

  // Dynamic selector for supporting project mockups
  const getProjectMockup = (projectId: string) => {
    switch (projectId) {
      case 'project-2':
        return renderAIDiagnosticMockup();
      case 'project-3':
        return renderBankingDashboardMockup();
      case 'project-4':
        return renderYOLOMockup();
      case 'project-5':
        return renderHealthcareMockup();
      case 'project-6':
        return renderTransitMockup();
      case 'project-1':
        return renderMigrationMockup();
      case 'project-7':
        return renderFinanceMockup();
      case 'healthcare-pipeline':
        return <AePerformanceDashboard compact={true} />;
      default:
        return null;
    }
  };

  const getFilterDisplayName = (f: 'all' | 'engineering' | 'bi' | 'analytics') => {
    switch (f) {
      case 'engineering': return 'Data Engineering';
      case 'bi': return 'Business Intelligence';
      case 'analytics': return 'Machine Learning';
      default: return 'All Projects';
    }
  };

  return (
    <section
      id="projects"
      className="bg-[#05080c] py-[48px] md:py-[80px] relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <AnimatedHeading eyebrow="[02] FEATURED PROJECTS" title="Real Impact, Proven Architecture" />
          <p className="font-sans" style={{ fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.55)', maxWidth: '560px', marginBottom: '32px', fontWeight: 400 }}>
            Each study represents an active system addressing real-world operational blocks, highlighting technical architecture paired with clear business value.
          </p>
        </div>

        {/* Filtering Tabs (Single Left-Aligned Row) */}
        <div className="filter-tabs flex flex-wrap gap-1.5 md:gap-2 mb-7 justify-start items-center">
          {(['all', 'engineering', 'bi', 'analytics'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setShowAll(false);
              }}
              className={`font-sans tracking-normal capitalize transition-all duration-200 cursor-pointer text-xs md:text-[13px] py-[5px] px-[12px] md:py-[7px] md:px-[16px] rounded-full border-[0.5px] ${
                filter === cat
                  ? 'bg-[#00CC88] text-[#050E09] border-[#00CC88] font-semibold'
                  : 'border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.6)] bg-transparent font-medium hover:border-[#00CC88]/40 hover:text-[rgba(255,255,255,0.9)]'
              }`}
            >
              {cat === 'all' 
                ? 'All Areas' 
                : cat === 'engineering' 
                  ? 'Data Engineering' 
                  : cat === 'bi' 
                    ? 'Business Intelligence' 
                    : 'Machine Learning'}
            </button>
          ))}
        </div>

        {/* ----------------------------------------------------
            FLAGSHIP CASE STUDY: FULL-WIDTH INTENTIONAL BLOCK
            ---------------------------------------------------- */}
        {showFlagship && (
          <div className="mb-16" id="flagship-case-study">
            <SpotlightCard className="bg-slate-950/40 border border-slate-900/80 rounded-3xl backdrop-blur-md overflow-hidden p-6 md:p-10 hover:border-emerald-500/10 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
              
              {/* Header Badge Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/80 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  {getProjectTypeBadge(flagshipProject.projectType)}
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono font-medium px-2 py-0.5 bg-slate-900 text-slate-400 border border-slate-850 rounded">
                    Flagship Project
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Itelligence Infotech &middot; Enterprise Cloud Migration
                </span>
              </div>

              {/* Grid: Mockup on Left (or top), Context & outcomes on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Side: Custom Interactive Dashboard Visual Asset */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="sticky top-24">
                    <span className="text-[10px] text-slate-500 font-mono block mb-2 text-center lg:text-left">
                      [ Automated Code Translation Pipeline ]
                    </span>
                    {renderMigrationMockup()}
                    
                    {/* Tech Stack Pills in Sidebar */}
                    <div className="mt-6">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                        Core Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {flagshipProject.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-slate-300 font-mono bg-slate-900/60 border border-slate-850 px-2.5 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Narrative Storytelling Case Study */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Title & Slogan */}
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight mb-2">
                      {flagshipProject.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-sans font-normal leading-relaxed mb-6">
                      {flagshipProject.description}
                    </p>

                    {/* Metric Badges Summary */}
                    <div className="grid grid-cols-3 gap-3 bg-slate-950/80 border border-slate-900/50 p-4 rounded-2xl mb-8">
                      {flagshipProject.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">{m.value}</span>
                          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-1">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Section 1: BUSINESS OUTCOMES (Appears FIRST!) */}
                    <div className="mb-8 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl">
                      <h4 className="text-emerald-400 font-sans font-bold text-base mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 shrink-0" />
                        Verified Business Outcomes
                      </h4>
                      <p className="text-slate-200 text-[15px] leading-relaxed font-sans font-normal">
                        {flagshipProject.businessOutcomes}
                      </p>
                    </div>

                    {/* Section 2: BUSINESS CONTEXT & PROBLEM */}
                    <div className="mb-8">
                      <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                        Business Context &amp; Problem Statement
                      </h4>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal mb-3">
                        {flagshipProject.businessContext}
                      </p>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal">
                        <strong className="text-slate-200 font-medium">Problem:</strong> {flagshipProject.problemStatement}
                      </p>
                    </div>

                    {/* Section 3: WHY IT MATTERED */}
                    <div className="mb-8">
                      <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                        Why This Problem Mattered
                      </h4>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal">
                        {flagshipProject.whyItMattered}
                      </p>
                    </div>

                    {/* Section 4: MY ROLE & CONSTRAINTS */}
                    <div className="mb-8">
                      <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                        My Direct Contribution &amp; Constraints
                      </h4>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal mb-3">
                        I acted as the <strong className="text-emerald-400 font-medium">{flagshipProject.myRole}</strong>.
                      </p>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal">
                        <strong className="text-slate-200 font-medium">Constraints faced:</strong> {flagshipProject.constraints}
                      </p>
                    </div>

                    {/* Section 5: TECHNICAL APPROACH & ARCHITECTURE */}
                    <div className="mb-8">
                      <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                        Technical Approach &amp; Ingestion Strategy
                      </h4>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal mb-4">
                        {flagshipProject.technicalApproach}
                      </p>
                      {flagshipProject.architectureSummary && (
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 font-mono text-[11px] text-emerald-400/90 flex items-center gap-2.5">
                          <Terminal className="h-4 w-4 text-slate-500 shrink-0" />
                          <span>{flagshipProject.architectureSummary}</span>
                        </div>
                      )}
                    </div>

                    {/* Section 5.5: TRADE-OFFS & DECISIONS */}
                    {flagshipProject.tradeoffs && (
                      <div className="mb-8">
                        <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                          Trade-offs &amp; Decisions
                        </h4>
                        <div className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal bg-slate-950/40 p-5 rounded-xl border border-slate-900/60 space-y-3">
                          {flagshipProject.tradeoffs.split(/(?=\d\.\s)/).map((part, i) => (
                            <p key={i} className="font-normal">
                              {part.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 6: REFLECTION & LESSONS LEARNED */}
                    <div className="mb-8">
                      <h4 className="text-white font-sans font-semibold text-[17px] mb-3 border-b border-slate-900 pb-2">
                        Retrospective &amp; Lessons Learned
                      </h4>
                      <p className="text-slate-300 text-[15px] leading-relaxed font-sans font-normal">
                        {flagshipProject.lessonsLearned}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-900/60 pt-6 mt-6">
                    {onSelectFlagship && (
                      <button
                        onClick={onSelectFlagship}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="h-4 w-4 shrink-0" />
                        Open Case Study →
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const contactSec = document.getElementById('contact');
                        if (contactSec) {
                          window.scrollTo({
                            top: contactSec.offsetTop - 80,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-sans font-medium text-xs rounded-xl border border-slate-800 transition-all active:scale-95 cursor-pointer w-full sm:w-auto text-center"
                    >
                      Book a Call →
                    </button>
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-sans font-normal text-xs rounded-xl border border-slate-900 transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto"
                    >
                      <Github className="h-3.5 w-3.5" />
                      View Schema Code
                    </a>
                  </div>

                </div>

              </div>

            </SpotlightCard>
          </div>
        )}

        {/* Section divider label if flagship is active */}
        {showFlagship && supportingProjects.length > 0 && (
          <div className="mb-8 border-t border-slate-900/40 pt-12">
            <h3 className="text-white font-sans font-bold text-sm uppercase tracking-wider font-mono text-slate-500">
              Supporting Case Studies ({supportingProjects.length})
            </h3>
          </div>
        )}

        {/* Featured Projects Grid */}
        <div className="projects-grid space-y-5 md:space-y-6">
          {activeFeatured.length === 3 ? (
            <>
              {/* Row 1 - Wide Treatment for Healthcare Analytics Pipeline */}
              {activeFeatured.filter(p => p.id === 'healthcare-pipeline').map((project) => (
                <div key={project.id}>
                  {renderWideProjectCard(project)}
                </div>
              ))}

              {/* Row 2 - 2 Column Side-by-Side for other featured cards */}
              <div className="projects-row-2 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {activeFeatured.filter(p => p.id !== 'healthcare-pipeline').map((project) => (
                  <div key={project.id}>
                    {renderStandardProjectCard(project)}
                  </div>
                ))}
              </div>
            </>
          ) : activeFeatured.length === 2 ? (
            /* 2 columns layout when 2 results exist */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {activeFeatured.map((project) => (
                <div key={project.id}>
                  {renderStandardProjectCard(project)}
                </div>
              ))}
            </div>
          ) : activeFeatured.length === 1 ? (
            /* Full-width wide card when single result matches the active filter */
            <div className="w-full">
              {activeFeatured.map((project) => (
                <div key={project.id}>
                  {renderWideProjectCard(project)}
                </div>
              ))}
            </div>
          ) : (
            /* High-End Empty State Container when no projects match the filter */
            <div className="text-center py-16 px-6 bg-slate-950/20 border border-slate-900 rounded-3xl max-w-md mx-auto relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <Layers className="h-8 w-8 text-slate-600 mx-auto mb-4 animate-pulse relative z-10" />
              <h4 className="text-white text-sm font-semibold font-sans relative z-10">No Case Studies Found</h4>
              <p className="text-slate-400 text-xs font-sans mt-2 leading-relaxed relative z-10">
                There are currently no active case studies categorized under <strong className="text-emerald-400 font-mono font-medium">"{getFilterDisplayName(filter)}"</strong>.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="mt-5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-emerald-400 text-[11px] font-mono rounded-lg border border-slate-800 transition-all cursor-pointer relative z-10 hover:border-emerald-500/20 active:scale-95"
              >
                Reset to All Areas
              </button>
            </div>
          )}
        </div>

        {/* View All Projects and Remaining Projects Slider Grid */}
        {activeNonFeatured.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={toggleShowAll}
                className="h-10 px-6 border border-white/20 hover:border-[#00CC88]/50 text-white/70 hover:text-white rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 bg-transparent active:scale-95"
              >
                {showAll 
                  ? 'Show less ↑' 
                  : `View all ${activeNonFeatured.length} projects ↓`
                }
              </button>
            </div>

            <AnimatePresence>
              {showAll && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-2">
                    {activeNonFeatured.map((project) => (
                      <div key={project.id}>
                        {renderStandardProjectCard(project)}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* ----------------------------------------------------
          DEEP-DIVE CASE STUDY MODAL: STRICTLY ORDERED BY STORY
          ---------------------------------------------------- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-[#090d16] rounded-3xl border border-slate-800/80 shadow-2xl shadow-black/80 max-h-[85vh] overflow-y-auto z-10"
              id="case-study-modal"
            >
              {/* Header Visual Bar */}
              <div className="h-1 bg-emerald-500 w-full sticky top-0 left-0" />

              {/* Modal Body */}
              <div className="p-6 md:p-10">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {getProjectTypeBadge(selectedProject.projectType)}
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                      &middot; Case Study
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Structured Text Breakdown - STRICT NARRATIVE ORDER */}
                <div className="space-y-6">
                  
                  {/* Metric highlights */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-900">
                    {selectedProject.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="text-base font-bold font-mono text-emerald-400">
                          {m.value}
                        </span>
                        <span className="text-[8px] text-slate-500 font-mono uppercase mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Embedded Interactive Mockup / Simulation inside Deep Dive */}
                  <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-900">
                    <span className="text-slate-500 text-[9px] font-mono block mb-2.5 uppercase tracking-widest font-semibold">
                      Interactive Visual Simulation
                    </span>
                    {getProjectMockup(selectedProject.id)}
                  </div>

                  {/* Section 1: BUSINESS OUTCOMES */}
                  <div style={{
                    borderLeft: '2px solid rgba(0,204,136,0.5)',
                    paddingLeft: '14px',
                    marginTop: '14px',
                    marginBottom: '14px'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#00CC88',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      display: 'block',
                      marginBottom: '4px'
                    }}>Outcome</span>
                    <p style={{
                      fontSize: '13px',
                      lineHeight: '1.65',
                      color: 'rgba(255,255,255,0.65)',
                      margin: 0
                    }}>
                      {selectedProject.id === 'project-1'
                        ? '100% data parity with zero operational downtime. Automated translation saved 9 months of manual work.'
                        : selectedProject.businessOutcomes}
                    </p>
                  </div>

                  {/* Section 2: THE CHALLENGE */}
                  <div className="pt-2">
                    <h4 className="text-white font-sans font-semibold text-xs uppercase tracking-wider mb-2.5 border-b border-slate-900 pb-1.5 font-mono text-slate-500">
                      1. The Challenge
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans font-normal">
                      {selectedProject.businessContext} {selectedProject.problemStatement}
                    </p>
                    {selectedProject.id === 'project-5' && (
                      <p className="text-[11px] text-slate-500 italic mt-1.5 leading-relaxed">
                        Note: Built using publicly available HSE Ireland open datasets and synthetic A&E performance data for demonstration purposes. No real patient data was used.
                      </p>
                    )}
                    <p className="text-slate-300 text-sm leading-relaxed font-sans font-normal mt-2">
                      <strong className="text-slate-200 font-medium">Core Constraint:</strong> {selectedProject.constraints}
                    </p>
                  </div>

                  {/* Section 3: ARCHITECTURE & APPROACH */}
                  <div className="pt-2">
                    <h4 className="text-white font-sans font-semibold text-xs uppercase tracking-wider mb-2.5 border-b border-slate-900 pb-1.5 font-mono text-slate-500">
                      2. Engineering &amp; Execution
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans font-normal">
                      As the <strong className="text-emerald-400 font-medium">{selectedProject.myRole}</strong>, {selectedProject.technicalApproach}
                    </p>
                    {selectedProject.architectureSummary && (
                      <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-900 font-mono text-[9px] text-emerald-400/90 leading-relaxed">
                        <strong>System Flow:</strong> {selectedProject.architectureSummary}
                      </div>
                    )}
                    <p className="text-slate-300 text-sm leading-relaxed font-sans font-normal mt-3">
                      <strong className="text-slate-200 font-medium">Key Takeaway:</strong> {selectedProject.lessonsLearned}
                    </p>
                  </div>

                  {/* Section 4: UNIFIED TOOLCHAIN */}
                  <div>
                    <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider mb-2">
                      3. Unified Toolchain
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-white font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action Footer */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-900/60 mt-8">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      const contactSec = document.getElementById('contact');
                      if (contactSec) {
                        window.scrollTo({
                          top: contactSec.offsetTop - 80,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="h-12 min-h-[48px] px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto text-center flex items-center justify-center"
                  >
                    Discuss this Case Study
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="h-12 min-h-[48px] px-6 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-sans font-medium text-xs rounded-xl border border-slate-800 transition-all cursor-pointer w-full sm:w-auto text-center flex items-center justify-center"
                  >
                    Close Review
                  </button>
                </div>
              </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
