import { useState } from 'react';
import { ArrowLeft, Check, Terminal, Play, FileText, Database, Shield, Layers, Award, AlertCircle, RefreshCw, ChevronRight, HelpCircle, Code } from 'lucide-react';
import { motion } from 'motion/react';

interface FlagshipCaseStudyProps {
  onBack: () => void;
}

export default function FlagshipCaseStudy({ onBack }: FlagshipCaseStudyProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'compiler' | 'architecture' | 'decisions'>('narrative');
  
  // Compiler Demo State
  const [selectedSqlIndex, setSelectedSqlIndex] = useState(0);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationLog, setTranslationLog] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(true);

  const preloadedSql = [
    {
      title: "Qualify Row Number",
      source: `SELECT emp_id, dept_id, salary, hire_date,\n  QUALIFY ROW_NUMBER() \n  OVER (PARTITION BY dept_id \n        ORDER BY salary DESC, hire_date ASC) = 1\nFROM raw.employee_billing;`,
      target: `from pyspark.sql import Window\nfrom pyspark.sql.functions import col, row_number\n\n# Automatically converted from QUALIFY ROW_NUMBER() clause\nwindowSpec = Window.partitionBy("dept_id") \\\n    .orderBy(col("salary").desc(), col("hire_date").ascii())\n\ndf = raw_df.withColumn("rn", row_number().over(windowSpec)) \\\n    .filter(col("rn") == 1) \\\n    .drop("rn")`,
      logs: [
        "Analyzing AST from legacy Teradata dialect...",
        "Found QUALIFY constraint mapped to window function partition.",
        "Generating equivalent PySpark Window partition schema...",
        "Injecting dynamic filter layer and dropping helper partition column.",
        "Compilation succeeded with 100% syntactic parity."
      ]
    },
    {
      title: "Nested Outer Joins & COALESCE",
      source: `SELECT a.cust_id, COALESCE(b.total_amount, 0.00) AS rev_usd,\n  b.txn_date\nFROM core.customers a\nLEFT OUTER JOIN transactional.ledger b\n  ON a.cust_id = b.customer_id\n  AND b.status = 'ACTIVE'\nWHERE a.region_code IN ('IE', 'UK');`,
      target: `from pyspark.sql.functions import col, coalesce, lit\n\n# Converted left outer join with conditional filter on join-keys\nledger_filtered = ledger_df.filter(col("status") == "ACTIVE")\n\ndf = customers_df.filter(col("region_code").isin("IE", "UK")) \\\n    .join(ledger_filtered, customers_df.cust_id == ledger_filtered.customer_id, "left_outer") \\\n    .withColumn("rev_usd", coalesce(col("total_amount"), lit(0.00))) \\\n    .select("cust_id", "rev_usd", "txn_date")`,
      logs: [
        "Scanning select attributes for Teradata-specific COALESCE calls...",
        "Interpreting conditional JOIN constraint (status = 'ACTIVE')...",
        "Refactoring: Pushed conditional status filter upstream of join to optimize shuffle partition footprint.",
        "Generating DataFrame outer-join syntax with explicit projection...",
        "Parity verified. Compilation successful."
      ]
    },
    {
      title: "Date Truncation & Casting",
      source: `SELECT CAST(txn_timestamp AS DATE FORMAT 'YYYY-MM-DD') AS day_id,\n  SUM(amount) as daily_aggregate\nFROM core.ledger\nGROUP BY 1\nHAVING daily_aggregate > 10000.00;`,
      target: `from pyspark.sql.functions import col, sum, to_date\n\n# Mapped Teradata FORMAT cast pattern to standard Spark Date format\ndf = ledger_df.withColumn("day_id", to_date(col("txn_timestamp"), "yyyy-MM-dd")) \\\n    .groupBy("day_id") \\\n    .agg(sum("amount").alias("daily_aggregate")) \\\n    .filter(col("daily_aggregate") > 10000.00)`,
      logs: [
        "Identifying group index 1 reference...",
        "Resolving format string pattern: 'YYYY-MM-DD'...",
        "Injecting spark aggregated dataframe syntax...",
        "Applying HAVING condition post-aggregation via filter call.",
        "Optimized execution tree generated successfully."
      ]
    }
  ];

  const handleTranslate = () => {
    setIsTranslating(true);
    setTranslationLog([]);
    setShowResult(false);
    
    let logIndex = 0;
    const logs = preloadedSql[selectedSqlIndex].logs;
    
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        setTranslationLog(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsTranslating(false);
        setShowResult(true);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-white pt-28 pb-24 font-sans relative">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation back header */}
        <div className="mb-10 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            [ Return to Portfolio ]
          </button>
          
          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase bg-slate-900/60 border border-slate-900 px-3 py-1 rounded-full">
            Flagship Case Study &middot; Enterprise Cloud Migration
          </span>
        </div>

        {/* Hero Header */}
        <div className="mb-12">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [ PROFESSIONAL CASE STUDY ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
            Enterprise Cloud Data Warehouse Migration &amp; Automated Code Translation Engine
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg font-sans font-light leading-relaxed max-w-3xl mb-8">
            An in-depth review of how we migrated a legacy, high-volume on-premise Teradata SQL infrastructure to Azure Synapse and Databricks with absolute numerical parity, 40% performance gains, and zero downtime.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/60 border border-slate-900/60 p-6 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Migrated Footprint</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">1.2 PB</span>
              <span className="text-[10px] text-slate-500 font-sans mt-1">Core financial &amp; audit ledgers</span>
            </div>
            <div className="flex flex-col border-t border-slate-900 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Uptake Accuracy</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">+40%</span>
              <span className="text-[10px] text-slate-500 font-sans mt-1">Lifting data reporting quality</span>
            </div>
            <div className="flex flex-col border-t border-slate-900 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Defect Rates</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">-30%</span>
              <span className="text-[10px] text-slate-500 font-sans mt-1">Fewer runtime pipeline errors</span>
            </div>
            <div className="flex flex-col border-t border-slate-900 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
              <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Automated Speed</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">9 Months</span>
              <span className="text-[10px] text-slate-500 font-sans mt-1">Saved from manual rewrite cycle</span>
            </div>
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-900 pb-px mb-12 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`pb-4 px-1 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'narrative' 
                ? 'border-emerald-500 text-emerald-400 font-medium' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            [ Complete Case Narrative ]
          </button>
          <button
            onClick={() => setActiveTab('compiler')}
            className={`pb-4 px-1 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'compiler' 
                ? 'border-emerald-500 text-emerald-400 font-medium' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            [ Interactive SQL Compiler ]
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-4 px-1 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture' 
                ? 'border-emerald-500 text-emerald-400 font-medium' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            [ Technical Architecture ]
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`pb-4 px-1 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'decisions' 
                ? 'border-emerald-500 text-emerald-400 font-medium' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            [ Engineering Trade-offs ]
          </button>
        </div>

        {/* TAB 1: NARRATIVE */}
        {activeTab === 'narrative' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Main Narrative Text */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Executive Summary Block */}
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <h3 className="text-emerald-400 text-sm font-sans font-bold flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4" />
                  Verified Business Outcomes
                </h3>
                <p className="text-slate-300 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  Successfully migrated a 1.2 Petabyte core database warehouse footprint from an on-premise Teradata cluster to Azure Synapse and Databricks. Designed a Python-based custom compiler to automate translating legacy queries with zero downtime, reducing standard business reporting error rates by 30% and saving approximately 9 months of engineering efforts.
                </p>
              </div>

              {/* 1. Context & Business Problem */}
              <section className="space-y-4">
                <h2 className="text-white font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  1. Business Context &amp; Core Challenge
                </h2>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  At <strong className="text-slate-200">Itelligence Infotech</strong>, our Fortune 500 SaaS and banking clients relied heavily on a legacy, on-premise Teradata cluster for financial analytics, KYC auditing, and daily ledger reports. Over time, query concurrency reached capacity, causing report generation delays of up to 4 hours. Licensing and infrastructure maintenance costs ballooned into a seven-figure annual overhead.
                </p>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  A strategic decision was made to move the entire enterprise datamart cluster into cloud infrastructures utilizing 
                  <strong className="text-slate-200 font-medium"> Azure Synapse Analytics</strong> and <strong className="text-slate-200 font-medium">Databricks Delta Lake</strong> to unlock elastic scalability and reduce compute costs.
                </p>
                <div className="p-4.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-normal font-sans">
                    <strong>Critical Constraint:</strong> The migration had to satisfy absolute numerical parity down to individual decimal floats across historical records. Additionally, standard billing, KYC, and operational workflows had to experience a zero-downtime cutover.
                  </p>
                </div>
              </section>

              {/* 2. Problem Statement */}
              <section className="space-y-4">
                <h2 className="text-white font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  2. The Syntax Migration Bottleneck
                </h2>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  The primary roadblock was not moving the raw bytes, but translating the code. The legacy Teradata database operated thousands of highly nested SQL procedures, incorporating proprietary syntaxes like <code className="bg-slate-900 text-slate-300 text-xs px-1.5 py-0.5 rounded">QUALIFY</code>, specialized string dates formatting, and platform-specific index hints.
                </p>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  An initial planning estimate indicated that manually refactoring these complex SQL chains into PySpark/Spark-SQL scripts would require a dedicated team of 8 senior database analysts working for 14 months. This timeline would stall subsequent business roadmaps and introduced high risks of syntax drift, resulting in reporting inaccuracies.
                </p>
              </section>

              {/* 3. The Solution */}
              <section className="space-y-4">
                <h2 className="text-white font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  3. Solution: Automated SQL Compiler &amp; Delta Validation
                </h2>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  Rather than taking the manual rewrite path, I proposed and developed a custom <strong className="text-slate-200">Python SQL Translation Compiler</strong>. This script maps Teradata dialects to Spark DataFrame operations using localized AST mapping and regular expression tokenizers.
                </p>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  To ensure complete data integrity, I implemented an automated row-by-row validation loop in Databricks. The validation engine compared MD5 hash balances of primary key rows between source and target, immediately flagging any variance above 0%.
                </p>
              </section>

              {/* 4. Retrospective & Lessons */}
              <section className="space-y-4">
                <h2 className="text-white font-display" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  4. Retrospective &amp; Engineering Lessons
                </h2>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  A crucial lesson learned during this massive migration was that <strong className="text-slate-200 font-medium">dynamic source schema drifts</strong> represent the highest risk to cloud pipelines. Upstream database administrators periodically renamed columns or altered float precisions without downstream notification, breaking the compiler engine.
                </p>
                <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                  To solve this, I designed a pre-execution catalog checker inside Azure Data Factory. Before spinning up compute clusters, the checker validated metadata schemas against a central Git repository config. If drift was detected, the run was paused, alerting engineers immediately and preventing expensive cluster execution failures.
                </p>
              </section>

            </div>

            {/* Sidebar metadata column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Project Metadata Card */}
              <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-4">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-2">
                  CASE SPECIFICATIONS
                </h4>
                
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <span className="text-slate-500 block">Organization</span>
                    <span className="text-slate-200 font-medium">Itelligence Infotech (Pune, India)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Role Played</span>
                    <span className="text-slate-200 font-medium">Data Analyst &amp; Tech Business Analyst</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Time Horizon</span>
                    <span className="text-slate-200 font-medium">2 Years, Dec 2022 - Dec 2024</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Target Architecture</span>
                    <span className="text-emerald-400 font-mono">Azure Synapse &amp; Databricks</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Validation Standard</span>
                    <span className="text-slate-200 font-medium">Row-by-Row Checksum Hash Check</span>
                  </div>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl">
                <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider border-b border-slate-900 pb-2 mb-4">
                  APPLIED TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Azure Synapse", "Azure ADF", "Databricks", "PySpark", "Delta Lake", "Python", "SQL Translation", "AST Parsing", "Terraform", "Git", "UAT Integration"].map(tech => (
                    <span key={tech} className="text-[10px] text-slate-300 font-mono bg-slate-900/80 border border-slate-850 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SQL COMPILER DEMO */}
        {activeTab === 'compiler' && (
          <div className="space-y-6">
            <div className="max-w-3xl">
              <h2 className="text-white font-sans" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                Simulated Interactive Code Translation Sandbox
              </h2>
              <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                This sandbox demonstrates the core algorithmic parsing of our Python compiler. Select a typical Teradata query below to simulate parsing AST syntax rules and translating them into production-ready PySpark code.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {preloadedSql.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSqlIndex(idx);
                    setTranslationLog([]);
                    setShowResult(true);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedSqlIndex === idx 
                      ? 'bg-slate-900 border-emerald-500/40 text-white' 
                      : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-mono font-bold block mb-1">
                    0{idx+1}. {item.title}
                  </span>
                  <span className="text-[9px] text-slate-500 font-sans truncate block w-full">
                    {item.source.split('\n')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Split Screen compiler terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Source Teradata Panel */}
              <div className="bg-[#03060a] border border-slate-900 rounded-2xl flex flex-col overflow-hidden">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-900 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                    INPUT: Legacy Teradata SQL Format
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">Source Server</span>
                </div>
                <div className="p-4 font-mono text-xs text-red-300 leading-relaxed bg-[#020408]/50 flex-1 whitespace-pre-wrap select-text">
                  {preloadedSql[selectedSqlIndex].source}
                </div>
                <div className="bg-slate-950/80 px-4 py-3 border-t border-slate-900/60 flex justify-between items-center">
                  <span className="text-[9px] text-slate-500 font-mono">Dialect: Teradata 16.20</span>
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-mono text-xs rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:text-slate-500"
                  >
                    <Play className="h-3 w-3 shrink-0" />
                    {isTranslating ? 'Parsing...' : 'Compile Translate'}
                  </button>
                </div>
              </div>

              {/* Target PySpark Panel */}
              <div className="bg-[#03060a] border border-slate-900 rounded-2xl flex flex-col overflow-hidden">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-900 flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                    OUTPUT: Translated PySpark Framework
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Parity OK
                  </span>
                </div>
                
                <div className="p-4 font-mono text-xs flex-1 flex flex-col justify-between overflow-y-auto min-h-[180px]">
                  
                  {/* Logs loading */}
                  {!showResult && (
                    <div className="space-y-1">
                      {translationLog.map((log, i) => (
                        <div key={i} className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 animate-fadeIn">
                          <span className="text-emerald-500 font-bold">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {isTranslating && (
                        <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                          <RefreshCw className="h-3 w-3 animate-spin text-emerald-500" />
                          <span>Mapping syntaxes to AST schemas...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Output Code block */}
                  {showResult && (
                    <pre className="text-emerald-300 leading-relaxed font-mono text-xs whitespace-pre select-text">
                      {preloadedSql[selectedSqlIndex].target}
                    </pre>
                  )}
                </div>

                <div className="bg-slate-950/80 px-4 py-3 border-t border-slate-900/60 text-[9px] text-slate-500 font-mono flex justify-between items-center">
                  <span>Engine Output: Spark-3.4 DataFrame</span>
                  <span>100% Automated conversion rate</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: TECHNICAL ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-10">
            <div className="max-w-2xl">
              <h2 className="text-white font-sans" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                System Integration &amp; Processing Lineage
              </h2>
              <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                The migration framework was engineered as an automated pipeline connecting legacy on-prem networks securely to high-performance cloud data warehouses.
              </p>
            </div>

            {/* Interactive SVG Diagram representing real pipeline architectures */}
            <div className="bg-[#03060a] border border-slate-900 rounded-3xl p-6 lg:p-10 font-mono text-xs">
              <div className="text-center mb-8 border-b border-slate-900 pb-4">
                <span className="text-slate-500 block text-[10px] uppercase">Lineage Visualization</span>
                <span className="text-white font-bold font-sans">End-to-End Enterprise Data Migration Framework</span>
                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded block w-max mx-auto mt-2">
                  Interactive Pipeline Schema Map
                </span>
              </div>

              {/* Responsive custom-crafted flow representing architectures */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative text-center">
                
                {/* Node 1: Teradata */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-36">
                  <span className="text-red-400 font-bold text-[10px] uppercase block mb-1">SOURCE</span>
                  <Database className="h-6 w-6 text-red-400 mx-auto my-1" />
                  <span className="text-white block font-sans font-semibold">Teradata Server</span>
                  <span className="text-[8px] text-slate-500 block">On-Premises Table Clusters</span>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:flex justify-center flex-col items-center">
                  <ChevronRight className="h-6 w-6 text-slate-700" />
                  <span className="text-[8px] text-slate-500 font-mono mt-1">ADF Copy</span>
                </div>

                {/* Node 2: ADLS Storage */}
                <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-36">
                  <span className="text-blue-400 font-bold text-[10px] uppercase block mb-1">STAGING</span>
                  <Layers className="h-6 w-6 text-blue-400 mx-auto my-1" />
                  <span className="text-white block font-sans font-semibold">ADLS Gen2</span>
                  <span className="text-[8px] text-slate-500 block">Raw CSV / Staged Parquets</span>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex justify-center flex-col items-center">
                  <ChevronRight className="h-6 w-6 text-slate-700" />
                  <span className="text-[8px] text-slate-500 font-mono mt-1">Databricks Job</span>
                </div>

                {/* Node 3: Databricks Processor */}
                <div className="bg-emerald-950/15 border border-emerald-500/20 p-4 rounded-xl flex flex-col justify-between h-36">
                  <span className="text-emerald-400 font-bold text-[10px] uppercase block mb-1">PROCESSING &amp; COMPILATION</span>
                  <Terminal className="h-6 w-6 text-emerald-400 mx-auto my-1" />
                  <span className="text-white block font-sans font-semibold">Azure Databricks</span>
                  <span className="text-[8px] text-emerald-400 block font-bold">PySpark Compiler Engine</span>
                </div>

              </div>

              {/* Sub lineage row */}
              <div className="hidden md:block my-6 border-l border-r border-dashed border-slate-800 h-8 max-w-[80%] mx-auto" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center">
                
                {/* Node 4: Unity Catalog */}
                <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl flex flex-col justify-between h-32">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">GOVERNANCE</span>
                  <Shield className="h-5 w-5 text-slate-400 mx-auto my-1" />
                  <span className="text-white block font-sans font-semibold">Unity Catalog</span>
                  <span className="text-[8px] text-slate-500 block">PII Masking &amp; Table Lineage</span>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex justify-center flex-col items-center">
                  <ChevronRight className="h-6 w-6 text-slate-700" />
                  <span className="text-[8px] text-slate-500 font-mono mt-1">Parity Merge</span>
                </div>

                {/* Node 5: Azure Synapse */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between h-32 border-l-emerald-500/25">
                  <span className="text-emerald-400 font-bold text-[10px] uppercase block mb-1">TARGET SYNASPE</span>
                  <Database className="h-5 w-5 text-emerald-400 mx-auto my-1" />
                  <span className="text-white block font-sans font-semibold">Synapse Analytics</span>
                  <span className="text-[8px] text-emerald-400 block">✔ Production Datamarts Ready</span>
                </div>

              </div>

              <div className="mt-8 p-4 bg-slate-950/60 border border-slate-900 rounded-xl text-slate-400 leading-normal text-xs font-sans font-light">
                <span className="font-bold text-white block mb-1">Data Ingestion Details:</span>
                Azure Data Factory coordinated scheduling triggers, extracting 1.2 Petabytes of transactional snapshots during low-load intervals over Azure ExpressRoute, staging raw files securely inside ADLS Gen2 before Databricks execution threads completed compiling, transforming, and row checksum auditing.
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: DECISIONS & TRADE-OFFS */}
        {activeTab === 'decisions' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-white font-sans" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                Decisions, Trade-offs &amp; Rationale
              </h2>
              <p className="text-slate-400 font-sans" style={{ fontSize: '15px', lineHeight: '1.7', fontWeight: 400 }}>
                A summary of the core technology decisions, trade-offs, and logical rationale made during the system design cycle.
              </p>
            </div>

            {/* Decision Log Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Decision 1 */}
              <div className="bg-[#03060a] border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold block mb-2">DECISION 1: CUSTOM PYSPARK COMPILER VS SAAS WAREHOUSE TRANSPILER</span>
                  <h4 className="text-white text-sm font-sans font-bold mb-3">
                    Why We Constructed a Python Regular Expression / AST Compiler In-House
                  </h4>
                  <p className="text-slate-400 text-xs font-sans font-light leading-relaxed mb-4">
                    Enterprise SaaS transpilers required expensive upfront licensing fees and required exposing raw queries to external third-party servers. We constructed a dedicated Python engine with AST support, mapping 85% of query syntaxes natively and manual refactoring for the highly specific 15% remaining.
                  </p>
                </div>
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-905 flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-mono text-emerald-300">Save Estimated €80k+ licenses &amp; kept queries entirely internal.</span>
                </div>
              </div>

              {/* Decision 2 */}
              <div className="bg-[#03060a] border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold block mb-2">DECISION 2: INCREMENTAL STAGED COMPACTION VS REAL-TIME SYNCS</span>
                  <h4 className="text-white text-sm font-sans font-bold mb-3">
                    Implementing Staged Batch Runs Over DirectQuery Systems
                  </h4>
                  <p className="text-slate-400 text-xs font-sans font-light leading-relaxed mb-4">
                    Connecting live BI queries directly to transactional databases via DirectQuery slowed transactional performance. We opted to execute 4x daily scheduled incremental loads inside Databricks, compacting parquet records and maintaining complete database integrity with minimal compute waste.
                  </p>
                </div>
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-905 flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-mono text-emerald-300">Reduced warehouse compute load by 35% with zero impact on operational lag.</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 border-t border-slate-900 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-sans font-bold text-sm">Want to look at the exact Databricks notebook structures?</h4>
            <p className="text-slate-400 text-xs font-sans font-light mt-0.5">Let's schedule a deep technical review of our translation compiler patterns.</p>
          </div>
          
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
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-center"
          >
            Discuss Migration Project
          </button>
        </div>

      </div>
    </div>
  );
}
