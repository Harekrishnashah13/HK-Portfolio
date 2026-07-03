import { useState, useRef, HTMLAttributes, ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../../data';
import { Project } from '../../types';
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
  FolderGit2
} from 'lucide-react';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  key?: string | number;
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

interface ProjectsProps {
  onSelectFlagship?: () => void;
}

export default function Projects({ onSelectFlagship }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'professional' | 'academic' | 'personal'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const pinnedIds = ['project-1', 'project-7', 'project-4'];

  // Interactive Sandbox states
  const [aibTab, setAibTab] = useState<'sla' | 'audit'>('sla');
  const [yoloThreshold, setYoloThreshold] = useState<number>(0.75);
  const [diagState, setDiagState] = useState<'idle' | 'running' | 'healed'>('idle');
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const [healthDept, setHealthDept] = useState<'all' | 'ae' | 'pediatric' | 'cardiology'>('all');
  const [transitRoute, setTransitRoute] = useState<'46A' | '39A' | '14'>('46A');
  const [financeRisk, setFinanceRisk] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');

  // Filter based on project type
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'professional') {
      return p.id === 'project-1' || p.id === 'project-3';
    }
    if (filter === 'academic') {
      return p.id === 'project-4';
    }
    if (filter === 'personal') {
      return p.id === 'project-5' || p.id === 'project-6' || p.id === 'project-7';
    }
    return p.projectType === filter;
  });

  const projectsToRender = filteredProjects.filter((p) => {
    if (showAll) return true;
    return pinnedIds.includes(p.id);
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
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
            <Layers className="h-3 w-3" />
            Professional Work
          </span>
        );
      case 'academic':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
            <BookOpen className="h-3 w-3" />
            Academic Research
          </span>
        );
      case 'personal':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono font-semibold px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded">
            <Code className="h-3 w-3" />
            Personal Projects
          </span>
        );
      default:
        return null;
    }
  };

  // ----------------------------------------------------
  // INTERACTIVE CODE & BI ARTIFACT SIMULATIONS
  // ----------------------------------------------------

  const runDiagnostics = () => {
    setDiagState('running');
    setDiagLogs([]);
    const logs = [
      "Intercepting exception traceback...",
      "Analyzing logs: Connection timeout with api.hicounselor.com...",
      "Matching exception against pre-approved recovery signatures...",
      "Signature matched: HTTPS Connection Retries Exceeded.",
      "Dispatching auto-heal script: docker restart pipeline_worker_1",
      "Validating heartbeat handshake..."
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
    }, 400);
  };

  // 1. Flagship Migration Parser Engine Mockup
  const renderMigrationMockup = () => (
    <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-5 font-mono text-[10px] text-slate-400 relative overflow-hidden select-none shadow-inner h-[280px] flex flex-col justify-between">
      {/* Dashboard Top Navigation bar */}
      <div className="flex items-center justify-between border-b border-slate-900/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[9px] text-slate-400 font-sans font-medium">SQL translation &amp; Parity Parser</span>
        </div>
        <span className="text-[8px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
          Interactive Pipeline Sandbox
        </span>
      </div>

      {/* Code comparison split pane */}
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
        {/* Teradata Source */}
        <div className="bg-slate-950/80 border border-slate-900 p-2.5 rounded-lg flex flex-col justify-between">
          <div>
            <span className="text-[8px] text-red-400 font-bold block mb-1">SOURCE TERADATA SQL</span>
            <pre className="text-[7px] text-slate-500 leading-tight font-mono whitespace-pre-wrap">
{`SELECT emp_id,
  dept_id,
  salary,
  QUALIFY ROW_NUMBER() 
  OVER (PARTITION BY dept_id 
        ORDER BY salary DESC) = 1
FROM raw.employee_billing;`}
            </pre>
          </div>
          <span className="text-[7px] text-slate-600">Regex Tokenizer Input</span>
        </div>

        {/* PySpark Destination */}
        <div className="bg-slate-950/80 border border-slate-900 p-2.5 rounded-lg flex flex-col justify-between border-l-emerald-500/20">
          <div>
            <span className="text-[8px] text-emerald-400 font-bold block mb-1">TARGET PYSPARK (DATABRICKS)</span>
            <pre className="text-[7px] text-emerald-300 leading-tight font-mono whitespace-pre-wrap font-medium">
{`windowSpec = Window.partitionBy("dept_id")\\
  .orderBy(col("salary").desc())

df = raw_df.withColumn("rn", 
  row_number().over(windowSpec))\\
  .filter(col("rn") == 1)\\
  .drop("rn")`}
            </pre>
          </div>
          <span className="text-[7px] text-emerald-500/70">✔ AST Map Compiled</span>
        </div>
      </div>

      {/* Bottom checksum row */}
      <div className="mt-3 flex items-center justify-between bg-emerald-950/15 border border-emerald-900/20 px-2 py-1.5 rounded-lg text-[8px] text-emerald-400">
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3 shrink-0" />
          Checksum validation: 100% row-by-row parity (1.2PB)
        </span>
        <span className="font-sans text-[7px] text-slate-500">Migration Completed</span>
      </div>
    </div>
  );

  // 2. Self-Healing Pipeline Diagnostics (HiCounselor)
  const renderAIDiagnosticMockup = () => (
    <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
        <span className="text-[8px] text-slate-500">JENKINS INTERCEPTOR (GEMINI DIALOGUE)</span>
        <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-900/20 px-1.5 py-0.2 rounded text-[7px]">
          Simulated Interactive Terminal
        </span>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto pr-1">
        {diagState === 'idle' && (
          <div className="space-y-2">
            <div className="bg-slate-950/80 border border-slate-900 p-2 rounded">
              <span className="text-red-400 font-bold block text-[7.5px] mb-0.5">❌ Pipeline Crash Trace:</span>
              <p className="text-[7px] text-slate-500 leading-tight">
                ConnectionError: HTTPSConnectionPool(host='api.hicounselor.com', port=443): Max retries exceeded
              </p>
            </div>
            <button
              onClick={runDiagnostics}
              className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-[8.5px] font-bold rounded transition-all cursor-pointer"
            >
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
            <p className="text-[7px] text-emerald-400 font-bold animate-pulse">Running heal scripts...</p>
          </div>
        )}

        {diagState === 'healed' && (
          <div className="space-y-2">
            <div className="bg-emerald-950/15 border border-emerald-500/10 p-2 rounded">
              <span className="text-emerald-400 font-bold block text-[7.5px] mb-0.5">✔ Autonomic Agent Output:</span>
              <p className="text-[7px] text-slate-300 leading-tight">
                Connection cleared. Docker container 'worker_1' restarted. Handshake OK. SLA secured under 4 minutes.
              </p>
            </div>
            <button
              onClick={() => setDiagState('idle')}
              className="w-full py-1 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-mono text-[8px] rounded transition-all cursor-pointer"
            >
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

  // 3. Banking Fraud & Operational SLA Dashboard (AIB)
  const renderAIBDashboardMockup = () => (
    <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
        <span className="text-[8px] text-slate-500">EXECUTIVE FRAUD & SLA DASHBOARD (AIB)</span>
        <div className="flex gap-1">
          <button
            onClick={() => setAibTab('sla')}
            className={`px-1 rounded text-[6.5px] font-mono ${
              aibTab === 'sla' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            SLA
          </button>
          <button
            onClick={() => setAibTab('audit')}
            className={`px-1 rounded text-[6.5px] font-mono ${
              aibTab === 'audit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Audits
          </button>
        </div>
      </div>

      {/* Mock metric indicators */}
      <div className="flex-1 flex flex-col justify-center my-1.5">
        {aibTab === 'sla' ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950/80 border border-slate-900 p-2 rounded">
              <span className="text-slate-500 text-[7px] block">KYC/AML Review SLA</span>
              <span className="text-emerald-400 text-xs font-sans font-bold">100% Compliance</span>
              <span className="text-[6.5px] text-slate-500 block mt-0.5">Audit-Ready</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-2 rounded">
              <span className="text-slate-500 text-[7px] block">Daily Case Triage</span>
              <span className="text-white text-xs font-sans font-bold">20+ Resolved</span>
              <span className="text-[6.5px] text-emerald-400 block mt-0.5">Slashed Lag by 30%</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/80 border border-slate-900 p-2 rounded space-y-1 text-left">
            <span className="text-slate-400 text-[7.5px] font-bold block uppercase border-b border-slate-900 pb-1 mb-1">
              Central Bank Parity Logs (Audit Suite)
            </span>
            <p className="text-[6.5px] text-emerald-400 leading-normal">
              ✔ 2,240 financial ledger checks completed successfully.
            </p>
            <p className="text-[6.5px] text-emerald-400 leading-normal">
              ✔ Absolute Parity Certificate issued dec-2024.
            </p>
            <p className="text-[6.5px] text-slate-500 leading-normal">
              ✔ No regulatory or compliance discrepancies detected.
            </p>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-900/80 text-[7px] text-slate-600 flex justify-between items-center">
        <span>Mainframe / Arcot Gateway Synced</span>
        <span>Secure Gateway</span>
      </div>
    </div>
  );

  // 4. YOLOv9 Spatial Localization Mockup (MSc Dissertation)
  const renderYOLOMockup = () => (
    <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
        <span className="text-[8px] text-slate-500">YOLOV9 DEEP LEARNING WORKBOOK</span>
        <span className="text-purple-400 bg-purple-950/20 border border-purple-900/20 px-1.5 py-0.2 rounded text-[7px]">
          Interactive Model Testing
        </span>
      </div>

      {/* Visual representation of detection bounding box overlay */}
      <div className="flex-1 bg-slate-950 border border-slate-900/70 rounded-lg p-2.5 flex flex-col justify-between relative items-stretch my-1">
        <div className="flex-1 flex flex-col justify-center items-center border border-dashed border-slate-800 rounded mb-2 bg-slate-900/20">
          <div className="w-4/5 h-10 border border-emerald-500 relative flex items-start p-1 bg-emerald-500/5 rounded">
            <span className="absolute top-[-7px] left-1 bg-emerald-500 text-slate-950 text-[5.5px] font-bold px-1 rounded">
              Class: Active Object [{(yoloThreshold * 100).toFixed(1)}% Match]
            </span>
            <span className="text-[6.5px] text-slate-500 font-mono mt-2 leading-none">
              {yoloThreshold < 0.40 
                ? "Multiple detections: [active, shadow, artifact]" 
                : yoloThreshold >= 0.40 && yoloThreshold <= 0.85 
                ? "Primary classification: [active, target]" 
                : "Singular confident match: [active]"}
            </span>
          </div>
        </div>

        {/* Confidence interactive threshold slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[7px] text-slate-500">
            <span>Confidence Threshold</span>
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

  // 5. Healthcare Operations / NHS A&E Medallion Pipeline Mockup
  const renderHealthcareMockup = () => {
    // Data based on selected department
    const metricsMap = {
      all: { wait: "3.4h", breach: "18.5%", capacity: "88%", state: "Normal" },
      ae: { wait: "4.8h", breach: "31.2%", capacity: "114%", state: "Critical" },
      pediatric: { wait: "1.9h", breach: "4.8%", capacity: "62%", state: "Stable" },
      cardiology: { wait: "2.5h", breach: "12.0%", capacity: "78%", state: "Stable" }
    };
    const current = metricsMap[healthDept];

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
          <span className="text-[8px] text-slate-500">EXECUTIVE HSE/NHS CONGESTION HUB</span>
          <div className="flex gap-1">
            {(['all', 'ae', 'pediatric', 'cardiology'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setHealthDept(d)}
                className={`px-1 rounded text-[6px] font-mono uppercase tracking-tight ${
                  healthDept === d ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {d === 'ae' ? 'A&E' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard visuals with real HSE KPIs */}
        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Avg Waiting Time</span>
              <span className={`text-[11px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : 'text-white'}`}>{current.wait}</span>
              <span className="text-[5.5px] text-slate-500 block">NHS Target: &lt;4h</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Breach Rate (&gt;4h)</span>
              <span className={`text-[11px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : current.state === 'Normal' ? 'text-amber-400' : 'text-emerald-400'}`}>{current.breach}</span>
              <span className="text-[5.5px] text-slate-500 block">HSE SLA Limit: 15%</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Ward Capacity</span>
              <span className={`text-[11px] font-sans font-bold ${current.state === 'Critical' ? 'text-red-400' : 'text-white'}`}>{current.capacity}</span>
              <span className="text-[5.5px] text-slate-500 block">Active Beds</span>
            </div>
          </div>

          {/* Medallion pipeline validation status check */}
          <div className="bg-slate-950/40 border border-slate-900/60 px-2 py-1 rounded flex items-center justify-between text-[6.5px]">
            <span className="text-slate-400 flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${current.state === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              Silver Layer: Cleaned admissions &amp; formatting
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
      '46A': { speed: "18 km/h", status: "Heavy Delay", index: "0.82", color: "text-red-400", active: 14 },
      '39A': { speed: "29 km/h", status: "Moderate Delay", index: "0.45", color: "text-amber-400", active: 18 },
      '14': { speed: "42 km/h", status: "On Time", index: "0.15", color: "text-emerald-400", active: 8 }
    };
    const current = routeMap[transitRoute];

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
          <span className="text-[8px] text-slate-500 font-sans tracking-wide">LIVE DUBLIN BUS GTFS-RT MONITOR</span>
          <div className="flex gap-1">
            {(['46A', '39A', '14'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTransitRoute(r)}
                className={`px-1.5 py-0.5 rounded text-[6px] font-mono tracking-tight cursor-pointer ${
                  transitRoute === r ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Route {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Average Speed</span>
              <span className="text-[11px] font-sans font-bold text-white">{current.speed}</span>
              <span className="text-[5.5px] text-slate-500 block">GPS Stream</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Delay Index</span>
              <span className={`text-[11px] font-sans font-bold ${current.color}`}>{current.index}</span>
              <span className="text-[5.5px] text-slate-500 block">SLA Target &lt; 0.3</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Active Buses</span>
              <span className="text-[11px] font-sans font-bold text-white">{current.active}</span>
              <span className="text-[5.5px] text-slate-500 block">Active Kafka Ingestion</span>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900/60 px-2 py-1 rounded flex items-center justify-between text-[6.5px]">
            <span className="text-slate-400 flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${transitRoute === '46A' ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
              Kafka Queue: {transitRoute === '46A' ? 'Accumulating lag' : 'Processing healthy'}
            </span>
            <span className="text-emerald-400 font-bold font-mono">✔ 500 msg/sec Ingested</span>
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
    const riskMap = {
      conservative: { bonds: "50%", bluechip: "30%", cash: "15%", crypto: "5%", sharpe: "1.24", expected: "6.2%" },
      moderate: { bonds: "25%", bluechip: "45%", cash: "10%", crypto: "20%", sharpe: "1.98", expected: "12.5%" },
      aggressive: { bonds: "5%", bluechip: "35%", cash: "5%", crypto: "55%", sharpe: "2.42", expected: "24.8%" }
    };
    const current = riskMap[financeRisk];

    return (
      <div className="w-full bg-[#03060a] border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-slate-400 h-[210px] flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-slate-900/80 pb-2 mb-2">
          <span className="text-[8px] text-slate-500 font-sans tracking-wide font-medium">MARKOWITZ PORTFOLIO ALLOCATOR</span>
          <div className="flex gap-1">
            {(['conservative', 'moderate', 'aggressive'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFinanceRisk(r)}
                className={`px-1 py-0.5 rounded text-[6px] font-mono uppercase tracking-tight cursor-pointer ${
                  financeRisk === r ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {r === 'conservative' ? 'Cons' : r === 'moderate' ? 'Mod' : 'Aggr'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center my-1.5 space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Sharpe Ratio</span>
              <span className="text-[11px] font-sans font-bold text-emerald-400">{current.sharpe}</span>
              <span className="text-[5.5px] text-slate-500 block">Risk-Adjusted</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Est. Annual Return</span>
              <span className="text-[11px] font-sans font-bold text-white">{current.expected}</span>
              <span className="text-[5.5px] text-slate-500 block">Log return model</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-900 p-1.5 rounded text-center">
              <span className="text-slate-500 text-[6.5px] block uppercase">Rebalance Trigger</span>
              <span className="text-[11px] font-sans font-bold text-white">Monthly</span>
              <span className="text-[5.5px] text-slate-500 block">Automated CRON</span>
            </div>
          </div>

          {/* Allocation Weights Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[5.5px] text-slate-500">
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
            ✔ Optimal Weights Found
          </span>
        </div>
      </div>
    );
  };

  // Dynamic selector for supporting project mockups
  const getProjectMockup = (projectId: string) => {
    switch (projectId) {
      case 'project-2':
        return renderAIDiagnosticMockup();
      case 'project-3':
        return renderAIBDashboardMockup();
      case 'project-4':
        return renderYOLOMockup();
      case 'project-5':
        return renderHealthcareMockup();
      case 'project-6':
        return renderTransitMockup();
      case 'project-7':
        return renderFinanceMockup();
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className="bg-[#05080c] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              whileHover={{ scale: 1.05, x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold inline-block mb-3 cursor-default origin-left"
            >
              [03] Featured Projects
            </motion.span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-4 flex items-center gap-3.5">
              <FolderGit2 className="h-7 w-7 text-emerald-400/70 shrink-0" />
              <span>Real Impact, Proven Architecture</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
              Each study represents an active system addressing real-world operational blocks, highlighting technical architecture paired with clear business value.
            </p>
          </div>

          {/* Filtering Tabs (Clearly Distinguishing Types) */}
          <div className="flex flex-col items-start md:items-end gap-2 self-start md:self-auto">
            <div className="flex flex-wrap gap-1 bg-slate-900/40 p-1.5 rounded-xl border border-slate-900/80">
              {(['all', 'professional', 'personal', 'academic'] as const).map((cat) => (
                <button
                   key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setShowAll(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                    filter === cat
                      ? 'bg-slate-800 text-emerald-400 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' 
                    ? 'All Case Studies' 
                    : cat === 'professional' 
                      ? 'Professional Work' 
                      : cat === 'personal' 
                        ? 'Personal Projects' 
                        : 'Academic Research'}
                </button>
              ))}
            </div>
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mt-2 md:text-right max-w-sm md:max-w-md">
              Professional work reflects real client deliveries. Personal projects use public datasets and are built for learning and portfolio demonstration.
            </p>
          </div>
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
                    <p className="text-slate-400 text-sm font-sans font-light leading-relaxed mb-6">
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
                        View Flagship Dedicated Case Study Page
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
                      Schedule Discussion
                    </button>
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white font-sans font-light text-xs rounded-xl border border-slate-900 transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto"
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

        {/* ----------------------------------------------------
            SUPPORTING PROJECTS: LIGHTWEIGHT EDITORIAL CARDS
            ---------------------------------------------------- */}
        {filteredProjects.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            id="project-grid"
          >
            {supportingProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative flex flex-col justify-between bg-slate-950/40 rounded-3xl border border-slate-900/80 hover:border-slate-800/80 backdrop-blur-md p-6 hover:shadow-xl hover:shadow-black/45 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Badges Strip */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      {getProjectTypeBadge(project.projectType)}
                      {pinnedIds.includes(project.id) && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                          ★ FEATURED
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">Completed</span>
                  </div>

                  {project.projectType === 'personal' && (
                    <span className="text-[10px] text-purple-400 font-mono font-bold tracking-wider block mb-2">
                      PERSONAL PROJECT &middot; OPEN SOURCE
                    </span>
                  )}

                  {/* Title & Short Desc */}
                  <h3 className="text-white text-lg font-bold font-sans tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-sans font-light leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Interactive visual mockup in card */}
                  <div className="mb-4">
                    {getProjectMockup(project.id)}
                  </div>

                  {project.id === 'project-5' && (
                    <p className="text-[10px] text-slate-500 italic mb-4 leading-normal">
                      Note: Built using publicly available HSE Ireland open datasets and synthetic A&E performance data for demonstration purposes. No real patient data was used.
                    </p>
                  )}

                  {/* Quick metrics row */}
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-900/40 py-3 mb-4 text-center">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">{m.value}</span>
                        <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Top outcomes preview */}
                  <div className="mb-4 flex gap-2 items-start bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/10">
                    <Award className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-emerald-300 font-mono leading-relaxed">
                      <strong>Outcomes:</strong> {project.impact}
                    </p>
                  </div>
                </div>

                {/* Interaction row */}
                <div className="flex flex-col gap-3 mt-auto pt-2 border-t border-slate-900/40">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] text-slate-400 font-mono bg-slate-900/40 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[9px] text-slate-600 font-mono py-0.5">+{project.tags.length - 3}</span>
                      )}
                    </div>
                    {project.projectType === 'personal' && (
                      <span className="text-[10px] text-slate-500 italic leading-snug mt-1 block">
                        Built independently using public datasets for learning and portfolio demonstration.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-mono font-medium flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Read Structured Case Study
                      <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-900 rounded transition-colors"
                      title="View Source Code"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

              </SpotlightCard>
            ))}
          </div>
        ) : (
          /* High-End Empty State Container when no projects match the filter */
          <div className="text-center py-16 px-6 bg-slate-950/20 border border-slate-900 rounded-3xl max-w-md mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <Layers className="h-8 w-8 text-slate-600 mx-auto mb-4 animate-pulse relative z-10" />
            <h4 className="text-white text-sm font-semibold font-sans relative z-10">No Case Studies Found</h4>
            <p className="text-slate-400 text-xs font-sans mt-2 leading-relaxed relative z-10">
              There are currently no active case studies categorized under <strong className="text-emerald-400 font-mono font-medium">"{filter}"</strong>. I prioritize showcasing high-impact enterprise and dissertation work.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-5 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-emerald-400 text-[11px] font-mono rounded-lg border border-slate-800 transition-all cursor-pointer relative z-10 hover:border-emerald-500/20 active:scale-95"
            >
              Reset to All Case Studies
            </button>
          </div>
        )}

        {/* View all projects button */}
        {!showAll && filteredProjects.length > projectsToRender.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-[#080b11] hover:bg-slate-900 text-emerald-400 hover:text-emerald-300 font-mono text-xs rounded-xl border border-slate-900 hover:border-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 group/all"
            >
              View all projects &rarr;
            </button>
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

                  {/* Section 1: BUSINESS OUTCOMES */}
                  <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/15">
                    <h4 className="text-emerald-400 font-sans font-bold text-sm uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Award className="h-4 w-4 shrink-0" />
                      Verified Business Outcomes
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed font-sans font-normal">
                      {selectedProject.businessOutcomes}
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

                </div>

                {/* Call to Action Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-900/60 mt-8">
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
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Discuss this Case Study
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-sans font-medium text-xs rounded-xl border border-slate-800 transition-all cursor-pointer"
                  >
                    Close Review
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
