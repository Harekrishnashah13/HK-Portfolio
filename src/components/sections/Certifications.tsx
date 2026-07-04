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
  ExternalLink,
  Database,
  Cloud,
  BarChart3,
  FileSpreadsheet,
  Code
} from 'lucide-react';
import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '../../data';
import { Certification } from '../../types';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const getCertIcon = (id: string) => {
    switch (id) {
      case 'cert-1': // Databricks
        return <Database className="h-5 w-5" style={{ color: '#00CC88' }} />;
      case 'cert-2': // AWS
        return <Cloud className="h-5 w-5" style={{ color: '#00CC88' }} />;
      case 'cert-6': // Google Analytics
        return <BarChart3 className="h-5 w-5" style={{ color: '#00CC88' }} />;
      case 'cert-3': // Tableau
        return <BarChart3 className="h-5 w-5" style={{ color: '#00CC88' }} />;
      case 'cert-4': // SQL
        return <FileSpreadsheet className="h-5 w-5" style={{ color: '#00CC88' }} />;
      case 'cert-5': // Python
        return <Code className="h-5 w-5" style={{ color: '#00CC88' }} />;
      default:
        return <CheckCircle2 className="h-5 w-5" style={{ color: '#00CC88' }} />;
    }
  };

  const getCertDownloadInfo = (id: string) => {
    switch (id) {
      case 'cert-1':
        return { path: '/certificates/databricks-cert.pdf', filename: 'Harekrishna-Shah-Databricks-Cert.pdf', isAvailable: true };
      case 'cert-2':
        return { path: '/certificates/aws-cert.pdf', filename: 'Harekrishna-Shah-AWS-Solutions-Architecture.pdf', isAvailable: true };
      case 'cert-6':
        return { path: '/certificates/google-analytics-cert.pdf', filename: 'Harekrishna-Shah-Google-Analytics-Cert.pdf', isAvailable: true };
      case 'cert-3':
        return { path: '/certificates/tableau-cert.pdf', filename: 'Harekrishna-Shah-Tableau-Data-Visualization.pdf', isAvailable: true };
      case 'cert-4':
        return { path: '/certificates/sql-datasci-cert.pdf', filename: 'Harekrishna-Shah-SQL-for-Data-Science.pdf', isAvailable: true };
      case 'cert-5':
        return { path: '#', filename: '', isAvailable: false };
      default:
        return null;
    }
  };

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
      className="bg-[#05080c] py-[48px] px-5 md:py-[80px] md:px-12 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-0">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [06] Verified Credentials
          </span>
          <h2 className="text-white font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Credentials
          </h2>
          <p 
            className="font-sans"
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              color: 'rgba(255,255,255,0.55)', 
              maxWidth: '540px', 
              marginBottom: '32px', 
              fontWeight: 400 
            }}
          >
            Verified industry certifications and First Class academic credentials — every credential ID is real and checkable.
          </p>
        </div>

        {/* Credentials Split Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" 
          id="credentials-grid"
        >
          
          {/* Certifications Column - Shown second on mobile */}
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <h3 
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '0.5px solid rgba(255,255,255,0.08)',
                paddingBottom: '12px',
                marginBottom: '20px',
                letterSpacing: 0
              }}
            >
              Industry Certifications
            </h3>

            <div className="flex flex-col gap-[10px]">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div
                  key={cert.id}
                  id={`cert-card-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  className="flex flex-col text-left cursor-pointer group select-none transition-all duration-300 p-4 md:py-[18px] md:px-[20px]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    marginBottom: '10px',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,204,136,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {/* Row 1: [icon] [cert name] [date — right aligned] */}
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon */}
                      <div 
                        style={{
                          background: 'rgba(0,204,136,0.1)',
                          border: '0.5px solid rgba(0,204,136,0.2)',
                          borderRadius: '10px',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        className="shrink-0"
                      >
                        {getCertIcon(cert.id)}
                      </div>
                      {/* Cert name */}
                      <h4 className="text-white font-sans truncate" style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.3 }}>
                        {cert.name}
                      </h4>
                    </div>
                    {/* Date */}
                    <span className="font-mono text-[11px] whitespace-nowrap shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {cert.date}
                    </span>
                  </div>

                  {/* Row 2: [issuer name] */}
                  <div className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#00CC88', marginTop: '2px' }}>
                    {cert.issuer}
                  </div>

                  {/* Row 3: ID: [credential ID] */}
                  {cert.credentialId && (
                    <div className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>
                      ID: {cert.credentialId}
                    </div>
                  )}

                  {/* Row 4: Action row (bottom) */}
                  <div 
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '0.5px solid rgba(255,255,255,0.06)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span 
                      className="cursor-pointer font-sans"
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#00CC88',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => setSelectedCert(cert)}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      Verify Secure Credential <ArrowUpRight className="h-3 w-3" />
                    </span>
                    {(() => {
                      const downloadInfo = getCertDownloadInfo(cert.id);
                      if (!downloadInfo) return null;
                      if (!downloadInfo.isAvailable) {
                        return (
                          <span 
                            style={{
                              fontSize: '12px',
                              fontWeight: 400,
                              color: 'rgba(255,255,255,0.2)'
                            }}
                            className="font-sans cursor-default"
                          >
                            ↓ Download Certificate
                          </span>
                        );
                      }
                      return (
                        <a
                          href={downloadInfo.path}
                          download={downloadInfo.filename}
                          style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.4)',
                            textDecoration: 'none'
                          }}
                          className="font-sans transition-colors"
                          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        >
                          ↓ Download Certificate
                        </a>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Background Column - Shown first on mobile */}
          <div className="order-1 md:order-2 flex flex-col gap-6">
            <h3 
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '0.5px solid rgba(255,255,255,0.08)',
                paddingBottom: '12px',
                marginBottom: '20px',
                letterSpacing: 0
              }}
            >
              Academic Development
            </h3>

            <div className="flex flex-col gap-[10px]" style={{ paddingLeft: 0, marginLeft: 0 }}>
              {EDUCATION_DATA.map((edu, idx) => (
                <div 
                  key={idx} 
                  id={`edu-card-${idx}`}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    marginBottom: '10px'
                  }}
                  className="text-left"
                >
                  {/* Date */}
                  <div 
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: '6px'
                    }}
                  >
                    {edu.period}
                  </div>

                  {/* Degree title */}
                  <h4 
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                    className="font-sans"
                  >
                    {edu.degree}
                    {edu.degree.includes("MSc") && (
                      <span 
                        style={{
                          background: 'rgba(0,204,136,0.12)',
                          border: '0.5px solid rgba(0,204,136,0.35)',
                          color: '#00CC88',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '20px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          marginLeft: '8px'
                        }}
                      >
                        First Class Distinction
                      </span>
                    )}
                  </h4>

                  {/* Institution */}
                  <div 
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      color: '#00CC88',
                      marginBottom: '8px'
                    }}
                  >
                    {edu.institution}
                  </div>

                  {/* Specialisation text */}
                  {edu.specialization && (
                    <div 
                      style={{
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        marginBottom: '12px'
                      }}
                      className="font-sans"
                    >
                      Specialization: {edu.specialization}
                    </div>
                  )}

                  {/* Highlights Bullet points */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      {edu.highlights.map((highlight, hIdx) => (
                        <div 
                          key={hIdx} 
                          className="font-sans"
                          style={{
                            fontSize: '14px',
                            lineHeight: '1.7',
                            color: 'rgba(255,255,255,0.7)',
                            paddingLeft: '14px',
                            position: 'relative',
                            marginBottom: '8px'
                          }}
                        >
                          <span 
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: '#00CC88'
                            }}
                          >
                            ·
                          </span>
                          {highlight}
                        </div>
                      ))}
                    </div>
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

                <p className="text-slate-400 text-xs font-sans font-normal leading-relaxed mb-4">
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

              {/* Cryptographic Verification Badge */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4.5 font-mono text-[10px] text-slate-400">
                <div className="flex items-center justify-between border-b border-slate-900/60 pb-2.5 mb-2.5">
                  <span className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    AUTHENTICITY SIGNATURE
                  </span>
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SECURED
                  </span>
                </div>
                <div className="space-y-1.5 text-slate-400">
                  <div className="flex justify-between">
                    <span>Validation Authority:</span>
                    <span className="text-slate-300">{getCertDetails(selectedCert.id).authority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Algorithm:</span>
                    <span>SHA-256 &middot; TLS 1.3</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="shrink-0">Fingerprint:</span>
                    <span className="text-slate-500 text-right font-mono text-[9px] break-all max-w-[220px]">
                      {selectedCert.id === 'cert-1' ? '8f5a2b8e3c1d4e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f' :
                       selectedCert.id === 'cert-2' ? 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2' :
                       'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                    </span>
                  </div>
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
