import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldAlert, 
  ChevronRight,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CountUpProps {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, decimals = 0, suffix = '', duration = 1200 }: CountUpProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out quad
      const easeProgress = progress * (2 - progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
}

export default function HealthcareDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<'Dublin-East' | 'Dublin-North' | 'South-West' | 'West'>('Dublin-East');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(100);

  // Default region matches the exact specs (Dublin-East)
  const regionalMetrics = {
    'Dublin-East': {
      avgWait: 3.4,
      breachRate: 18.5,
      bedOccupancy: 88,
      qaPassRate: 99.8,
      wards: [
        { name: 'Emergency', percentage: 88, color: '#A32D2D' }, // Red (Critical)
        { name: 'ICU', percentage: 91, color: '#A32D2D' }, // Red (Critical)
        { name: 'Surgical', percentage: 82, color: '#3886D4' }, // Blue
        { name: 'Medical', percentage: 76, color: '#BA7517' }, // Amber
        { name: 'Paediatric', percentage: 64, color: '#1AAF69' } // Green (OK)
      ],
      compliance: [
        { name: 'PII masking', status: 'Pass' },
        { name: '4hr breach flag', status: 'Pass' },
        { name: 'Duplicate records', status: 'Pass' },
        { name: 'Null discharge codes', status: 'Review' },
        { name: 'Schema validation', status: 'Pass' }
      ]
    },
    'Dublin-North': {
      avgWait: 4.1,
      breachRate: 24.2,
      bedOccupancy: 94,
      qaPassRate: 99.6,
      wards: [
        { name: 'Emergency', percentage: 94, color: '#A32D2D' },
        { name: 'ICU', percentage: 96, color: '#A32D2D' },
        { name: 'Surgical', percentage: 89, color: '#A32D2D' },
        { name: 'Medical', percentage: 82, color: '#BA7517' },
        { name: 'Paediatric', percentage: 70, color: '#BA7517' }
      ],
      compliance: [
        { name: 'PII masking', status: 'Pass' },
        { name: '4hr breach flag', status: 'Review' },
        { name: 'Duplicate records', status: 'Pass' },
        { name: 'Null discharge codes', status: 'Review' },
        { name: 'Schema validation', status: 'Pass' }
      ]
    },
    'South-West': {
      avgWait: 2.8,
      breachRate: 12.1,
      bedOccupancy: 79,
      qaPassRate: 100.0,
      wards: [
        { name: 'Emergency', percentage: 79, color: '#BA7517' },
        { name: 'ICU', percentage: 85, color: '#3886D4' },
        { name: 'Surgical', percentage: 74, color: '#BA7517' },
        { name: 'Medical', percentage: 68, color: '#1AAF69' },
        { name: 'Paediatric', percentage: 55, color: '#1AAF69' }
      ],
      compliance: [
        { name: 'PII masking', status: 'Pass' },
        { name: '4hr breach flag', status: 'Pass' },
        { name: 'Duplicate records', status: 'Pass' },
        { name: 'Null discharge codes', status: 'Pass' },
        { name: 'Schema validation', status: 'Pass' }
      ]
    },
    'West': {
      avgWait: 3.1,
      breachRate: 15.8,
      bedOccupancy: 81,
      qaPassRate: 99.9,
      wards: [
        { name: 'Emergency', percentage: 81, color: '#3886D4' },
        { name: 'ICU', percentage: 88, color: '#A32D2D' },
        { name: 'Surgical', percentage: 78, color: '#BA7517' },
        { name: 'Medical', percentage: 71, color: '#BA7517' },
        { name: 'Paediatric', percentage: 59, color: '#1AAF69' }
      ],
      compliance: [
        { name: 'PII masking', status: 'Pass' },
        { name: '4hr breach flag', status: 'Pass' },
        { name: 'Duplicate records', status: 'Pass' },
        { name: 'Null discharge codes', status: 'Review' },
        { name: 'Schema validation', status: 'Pass' }
      ]
    }
  };

  const data = regionalMetrics[selectedRegion];

  const handleTriggerSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div 
      id="ae-performance-dashboard"
      className="font-sans text-xs text-slate-400 select-none w-full"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '0.5px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.06] pb-3 mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/15">
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-white font-sans font-bold text-sm tracking-tight">
              A&amp;E Performance Dashboard
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase">
                Pipeline active
              </span>
            </div>
          </div>
        </div>

        {/* Region & Actions Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-slate-950 border border-slate-900 rounded-lg p-0.5">
            {(['Dublin-East', 'Dublin-North', 'South-West', 'West'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => {
                  setSelectedRegion(reg);
                }}
                className={`px-2 py-1 rounded text-[10px] font-mono tracking-tight cursor-pointer whitespace-nowrap transition-all ${
                  selectedRegion === reg 
                    ? 'bg-emerald-500/15 text-emerald-400 font-semibold' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <button
            onClick={handleTriggerSim}
            disabled={isSimulating}
            className={`px-2.5 py-1 rounded-lg border font-mono text-[9px] font-semibold flex items-center gap-1.5 cursor-pointer h-7 transition-all ${
              isSimulating 
                ? 'bg-slate-900 text-slate-600 border-slate-800' 
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 active:scale-95'
            }`}
          >
            <RefreshCw className={`h-3 w-3 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? `Syncing (${simulationProgress}%)` : 'Run Pipeline'}
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Card 1: Avg Wait Time */}
        <div className="bg-slate-950/65 border border-slate-900/60 p-3 rounded-xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] font-mono uppercase tracking-wider block">
            Avg Wait Time (hrs)
          </span>
          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-emerald-400 mt-2 block">
            <CountUp end={data.avgWait} decimals={1} suffix="h" />
          </span>
          <span className="text-[8px] text-slate-500 mt-1 block">
            NHS 4h Standard Threshold
          </span>
        </div>

        {/* Card 2: Breach Rate */}
        <div className="bg-slate-950/65 border border-slate-900/60 p-3 rounded-xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] font-mono uppercase tracking-wider block">
            Breach Rate (4hr target)
          </span>
          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-amber-500 mt-2 block">
            <CountUp end={data.breachRate} decimals={1} suffix="%" />
          </span>
          <span className="text-[8px] text-slate-500 mt-1 block">
            SLA Compliance Limit: 20%
          </span>
        </div>

        {/* Card 3: Bed Occupancy */}
        <div className="bg-slate-950/65 border border-slate-900/60 p-3 rounded-xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] font-mono uppercase tracking-wider block">
            Bed Occupancy
          </span>
          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-cyan-400 mt-2 block">
            <CountUp end={data.bedOccupancy} decimals={0} suffix="%" />
          </span>
          <span className="text-[8px] text-slate-500 mt-1 block">
            Target capacity zone: 85%
          </span>
        </div>

        {/* Card 4: QA Pass Rate */}
        <div className="bg-slate-950/65 border border-slate-900/60 p-3 rounded-xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] font-mono uppercase tracking-wider block">
            QA Check Pass Rate
          </span>
          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-emerald-400 mt-2 block">
            <CountUp end={data.qaPassRate} decimals={1} suffix="%" />
          </span>
          <span className="text-[8px] text-slate-500 mt-1 block">
            Gold layer parity check
          </span>
        </div>
      </div>

      {/* Two-Column Grid Below Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* LEFT - Bed Occupancy by Ward Bar Chart */}
        <div className="bg-slate-950/40 border border-white/[0.04] rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-slate-400 font-mono text-[9px] font-bold block uppercase tracking-wider mb-3">
              Bed Occupancy by Ward
            </span>
            <div className="space-y-2.5">
              {data.wards.map((ward, idx) => (
                <div key={ward.name} className="flex items-center">
                  {/* Label (90px width, right-aligned) */}
                  <div className="w-[90px] text-right pr-2 text-[10px] text-slate-400 font-sans truncate font-medium">
                    {ward.name}
                  </div>
                  {/* Bar Container */}
                  <div className="flex-1 bg-white/[0.04] h-[18px] rounded-[3px] overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ward.percentage}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.12, ease: 'easeOut' }}
                      className="h-full rounded-[3px]"
                      style={{ backgroundColor: ward.color }}
                    />
                  </div>
                  {/* Percentage (30px width, left-aligned) */}
                  <div className="w-[30px] pl-2 text-[10px] text-slate-400 font-mono text-left font-bold">
                    {ward.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] text-slate-600 font-mono mt-3.5 pt-2 border-t border-white/[0.03]">
            <span>HSE Bed Capacity Threshold Limit</span>
            <span>Critical Zone &gt; 85%</span>
          </div>
        </div>

        {/* RIGHT - HSE Compliance Checks */}
        <div className="bg-slate-950/40 border border-white/[0.04] rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-slate-400 font-mono text-[9px] font-bold block uppercase tracking-wider mb-3">
              HSE Compliance Checks
            </span>
            <div className="space-y-2">
              {data.compliance.map((item) => {
                const isPass = item.status === 'Pass';
                return (
                  <div 
                    key={item.name} 
                    className="flex justify-between items-center py-2 border-b border-white/[0.02] last:border-0"
                  >
                    <span className="text-[10px] text-slate-300 font-sans">
                      {item.name}
                    </span>
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-medium border ${
                        isPass 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {isPass ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          Pass
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-3 w-3" />
                          Review
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] text-slate-600 font-mono mt-3.5 pt-2 border-t border-white/[0.03]">
            <span>GDPR Security Compliant Masking</span>
            <span>✔ Integrity Confirmed</span>
          </div>
        </div>
      </div>

      {/* Pipeline Architecture Strip (Bottom) */}
      <div className="bg-slate-950/70 border border-white/[0.04] rounded-xl p-3.5 space-y-2.5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-slate-400 font-mono text-[9px] font-bold uppercase tracking-wider">
            Medallion Pipeline — PySpark &middot; Databricks
          </span>
          <span className="text-[8.5px] text-slate-500 font-mono">
            Structured Streaming Ingest Process
          </span>
        </div>

        {/* Stages pills chain */}
        <div className="grid grid-cols-5 gap-1.5 items-center bg-slate-900/60 p-2 rounded-lg border border-white/[0.02]">
          <div className="text-center py-1.5 px-1 rounded-md text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/15 font-semibold">
            HSE Logs
          </div>
          <div className="flex justify-center text-slate-600">
            <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
          </div>
          <div className="text-center py-1.5 px-1 rounded-md text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/15 font-semibold">
            Bronze &Delta;
          </div>
          <div className="flex justify-center text-slate-600">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          <div className="text-center py-1.5 px-1 rounded-md text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 font-semibold">
            Silver &Delta;
          </div>
          <div className="flex justify-center text-slate-600">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          <div className="text-center py-1.5 px-1 rounded-md text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-semibold">
            Gold &Delta;
          </div>
          <div className="flex justify-center text-slate-600">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
          <div className="text-center py-1.5 px-1 rounded-md text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/15 font-semibold">
            Power BI
          </div>
        </div>

        {/* Key stats monospace bottom text */}
        <div className="text-center text-[9px] font-mono text-slate-500 tracking-wide mt-2">
          8,800+ records &middot; 99.8% accuracy &middot; &lt;15min latency &middot; HSE Compliant
        </div>
      </div>
    </div>
  );
}
