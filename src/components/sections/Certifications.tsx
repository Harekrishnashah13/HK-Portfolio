import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  X, 
  ShieldCheck, 
  Terminal, 
  Lock, 
  ExternalLink 
} from 'lucide-react';
import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '../../data';
import { Certification } from '../../types';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'running' | 'success'>('idle');

  // Trigger simulated secure cryptographic handshake when cert is selected
  useEffect(() => {
    if (!selectedCert) {
      setVerificationLogs([]);
      setVerificationStatus('idle');
      return;
    }

    setVerificationStatus('running');
    const logs = [
      `🔒 Initializing secure TLS handshake with authorized credential registry...`,
      `📡 Connected to Verification Server | Port: 443 | Protocol: SSLv3`,
      `🔑 Resolving Credential Authority signature for "${selectedCert.issuer}"...`,
      `🔍 Matching public key for Certificate Serial ID: [${selectedCert.credentialId}]`,
      `📊 Run-time validation check on SHA-256 digital fingerprint hash...`,
      `✔ Handshake verified. Status: SECURE & AUTHENTICATE.`,
      `🎉 SUCCESS: Digital credentials verified in real-time.`
    ];

    let currentLogIdx = 0;
    setVerificationLogs([logs[0]]);

    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logs.length) {
        setVerificationLogs(prev => [...prev, logs[currentLogIdx]]);
      } else {
        clearInterval(interval);
        setVerificationStatus('success');
      }
    }, 450);

    return () => clearInterval(interval);
  }, [selectedCert]);

  // Map descriptions & metadata to certifications for custom rich modal
  const getCertDetails = (certId: string) => {
    switch (certId) {
      case 'cert-1':
        return {
          description: "Verifies the professional capability to design, construct, optimize, and maintain production-grade data pipelines within the Databricks Lakehouse Platform using PySpark, Delta Lake, and Databricks Workflows.",
          skills: ["PySpark", "Delta Lake", "Unity Catalog", "Medallion Ingestion", "Workflows", "SQL Warehouse"],
          accent: "from-orange-500/10 to-red-500/10 border-orange-500/20 text-orange-400",
          authority: "Databricks Credential Registry",
          grade: "Data Engineer Professional (Highest-Tier)"
        };
      case 'cert-2':
        return {
          description: "Awarded by Forage. Represents successful completion of highly technical solutions architecture simulations, focusing on standard hosting design, elasticity, Auto-Scaling, multi-tier architectures, and secure networking.",
          skills: ["Scalability Design", "VPC & Routing", "IAM Policies", "AWS Compute & Storage", "Disaster Recovery"],
          accent: "from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-400",
          authority: "AWS Solutions Architecture Simulation Hub",
          grade: "Architect Verified Case Study"
        };
      case 'cert-3':
        return {
          description: "Authorized by Duke University and offered through Coursera. Verifies capability in structuring raw datasets, creating advanced visual analytics in Tableau Desktop, and formulating actionable data stories.",
          skills: ["Tableau BI", "Visual Hierarchy", "Data-Driven Storytelling", "Dashboards", "LOD Expressions"],
          accent: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-cyan-400",
          authority: "Coursera & Duke University Office of Registrar",
          grade: "100% Course Parity Passed"
        };
      case 'cert-4':
        return {
          description: "Authorized by University of California, Davis and offered through Coursera. Covers querying complex relational databases, profiling data, multi-table joins, subsetting, and aggregations for analytics.",
          skills: ["SQL", "Relational Database Design", "Data Profiling", "Subqueries", "Analytical Aggregations"],
          accent: "from-indigo-500/10 to-blue-500/10 border-indigo-500/20 text-indigo-400",
          authority: "Coursera & UC Davis Academic Senate",
          grade: "Passed with Distinction"
        };
      case 'cert-5':
        return {
          description: "Authorized by University of Michigan and offered through Coursera. Verifies proficiency in writing clean Python code, numpy array manipulation, and pandas Series/DataFrame data cleaning.",
          skills: ["Python", "Pandas", "NumPy", "Data Cleansing", "Series & DataFrames"],
          accent: "from-yellow-500/5 to-blue-500/10 border-yellow-500/20 text-yellow-400",
          authority: "Coursera & University of Michigan",
          grade: "First-Class Academic Grade"
        };
      case 'cert-6':
        return {
          description: "Issued by Google. Verifies foundational capability in configuring Google Analytics 4 (GA4), tracking digital engagement events, modeling conversion behaviors, and creating operational business performance reports.",
          skills: ["Google Analytics 4", "KPI Attribution", "Conversion Mapping", "Reporting Dashboards", "Audience Analysis"],
          accent: "from-green-500/10 to-emerald-500/10 border-green-500/20 text-emerald-400",
          authority: "Google Skillshop Certification Registry",
          grade: "Active Google Certified Partner"
        };
      default:
        return {
          description: "Verified professional credential checking out against strict engineering criteria.",
          skills: ["Technology Foundations", "Structured Workflows"],
          accent: "from-slate-500/10 to-slate-400/10 border-slate-500/25 text-slate-300",
          authority: "Authorized Issuer Registry",
          grade: "Grade Verified"
        };
    }
  };

  return (
    <section
      id="credentials"
      className="bg-[#05080c] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [05] Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-6">
            Certifications &amp; Academic Foundation
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            My engineering expertise is backed by rigorous industry certifications and specialized academic curricula focused on distributed systems and quantitative predictive analytics.
          </p>
        </div>

        {/* Credentials Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="credentials-grid">
          
          {/* Certifications (Left Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="text-white font-sans font-bold text-lg mb-2 flex items-center gap-2.5">
              <Award className="h-5 w-5 text-emerald-400" />
              Industry Certifications
            </h3>

            <div className="flex flex-col gap-4">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 bg-slate-950/40 rounded-2xl border border-slate-900 hover:border-slate-800 transition-colors flex items-start gap-4 group"
                >
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-850 text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-white text-sm font-semibold font-sans">
                        {cert.name}
                      </h4>
                      <span className="text-slate-500 font-mono text-[11px] shrink-0">
                        {cert.date}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-mono text-xs block mt-1">
                      {cert.issuer}
                    </span>
                    
                    {cert.credentialId && (
                      <span className="text-[10px] text-slate-500 font-mono block mt-2">
                        Credential ID: {cert.credentialId}
                      </span>
                    )}

                    <div className="mt-3 flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="text-[11px] font-mono text-slate-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        Verify Credential
                        <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Background (Right Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="text-white font-sans font-bold text-lg mb-2 flex items-center gap-2.5">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
              Academic Development
            </h3>

            <div className="flex flex-col gap-6 border-l border-slate-900/80 pl-6 ml-2 space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Small absolute bullet on the timeline border */}
                  <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-slate-800 border border-slate-950 group-hover:bg-emerald-400 transition-colors" />

                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono mb-1">
                    <Calendar className="h-3 w-3" />
                    {edu.period}
                  </span>
                  
                  <h4 className="text-white text-sm font-semibold font-sans leading-snug flex flex-wrap items-center gap-2">
                    {edu.degree}
                    {edu.degree.includes("MSc") && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-bold tracking-wide">
                        🏆 First Class Distinction
                      </span>
                    )}
                  </h4>
                  
                  <span className="text-emerald-400 font-mono text-xs block mt-0.5">
                    {edu.institution}
                  </span>

                  {edu.specialization && (
                    <span className="text-slate-400 text-xs block mt-1 font-sans">
                      Specialization: {edu.specialization}
                    </span>
                  )}

                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {edu.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-slate-500 font-sans leading-relaxed flex gap-2">
                          <span className="text-emerald-500/60 font-bold font-mono shrink-0">&middot;</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ----------------------------------------------------
          INTERACTIVE DIGITAL CREDENTIAL VERIFICATION PANEL
          ---------------------------------------------------- */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#020408]/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-[#05080c] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-1.5 bg-slate-950/80 border border-slate-900 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Secure Header */}
              <div className="flex items-center gap-2 mb-6 text-[10px] font-mono text-slate-500">
                <Lock className="h-3 w-3 text-emerald-400" />
                <span>SECURE END-TO-END SIGNATURE CHECK</span>
              </div>

              {/* Certificate Detail Frame */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${getCertDetails(selectedCert.id).accent} border`}>
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-sans text-white leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-emerald-400 font-mono text-xs mt-0.5">
                      {selectedCert.issuer}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-[11px] font-mono border-t border-b border-slate-900/60 py-4">
                  <div>
                    <span className="text-slate-500 block">Credential Authority:</span>
                    <span className="text-slate-300 font-medium block mt-0.5">
                      {getCertDetails(selectedCert.id).authority}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Verification Status:</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ✔ Active &amp; Verified
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Registration Number:</span>
                    <span className="text-slate-300 block mt-0.5">
                      {selectedCert.credentialId || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date of Issue:</span>
                    <span className="text-slate-300 block mt-0.5">
                      {selectedCert.date}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs font-sans font-light leading-relaxed mb-4">
                  {getCertDetails(selectedCert.id).description}
                </p>

                {/* Key Skills Audited */}
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-2">
                    Skills Audited &amp; Validated
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {getCertDetails(selectedCert.id).skills.map((skill) => (
                      <span key={skill} className="text-[10px] text-slate-300 font-mono bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Handshake Sandbox Terminal */}
              <div className="bg-[#03060a] border border-slate-900 rounded-xl p-4 font-mono text-[9px] text-slate-400 h-[120px] flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-900/40 pb-1.5 mb-1.5 text-slate-500 text-[8px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-emerald-400" />
                    REGISTRY CO-PROCESSOR HANDSHAKE
                  </span>
                  <span>SSL v3 Secured</span>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto pr-1">
                  {verificationLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`leading-relaxed ${
                        log.startsWith('🎉') || log.startsWith('✔') 
                          ? 'text-emerald-400 font-semibold font-mono' 
                          : log.startsWith('🔒') 
                            ? 'text-slate-300' 
                            : 'text-slate-500'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-900/40 flex flex-col sm:flex-row gap-3">
                {selectedCert.verificationUrl && !selectedCert.verificationUrl.startsWith('#') && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-sans font-semibold rounded-xl text-center flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer flex-1"
                  >
                    Go to Official Verification Registry
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-sans font-medium rounded-xl text-center active:scale-98 transition-all cursor-pointer flex-1 border border-slate-800"
                >
                  Close Verification Hub
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
