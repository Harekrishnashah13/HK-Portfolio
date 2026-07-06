import { X, Copy, Check, Printer, FileText, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PERSONAL_INFO, EXPERIENCE_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../../data';
import { trackEvent } from '../../lib/analytics';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackEvent('resume_modal_open');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
HAREKRISHNA SHAH
Dublin, Ireland | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.linkedin} | ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.about.summary}

WORK EXPERIENCE
${EXPERIENCE_DATA.map(exp => `
${exp.role} - ${exp.company} (${exp.location})
${exp.period}
${exp.description.map(desc => `• ${desc}`).join('\n')}
`).join('\n')}

EDUCATION
${EDUCATION_DATA.map(edu => `
${edu.degree} in ${edu.specialization}
${edu.institution} (${edu.period})
${edu.highlights.join('\n')}
`).join('\n')}

CERTIFICATIONS
${CERTIFICATIONS_DATA.map(cert => `• ${cert.name} - ${cert.issuer} (${cert.date})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    trackEvent('resume_copy_text');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    trackEvent('resume_print');
    const printContent = document.getElementById('resume-document-content')?.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - Harekrishna Shah</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      emerald: {
                        50: '#ecfdf5',
                        100: '#d1fae5',
                        200: '#a7f3d0',
                        300: '#6ee7b7',
                        400: '#34d399',
                        500: '#10b981',
                        600: '#059669',
                        700: '#047857',
                        800: '#065f46',
                        900: '#064e3b',
                      }
                    },
                    fontFamily: {
                      sans: ['Inter', 'sans-serif'],
                      mono: ['JetBrains Mono', 'monospace'],
                    }
                  }
                }
              }
            </script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
              body {
                background-color: white;
                color: #0f172a;
                font-family: 'Inter', sans-serif;
              }
              @media print {
                @page {
                  size: A4;
                  margin: 15mm;
                }
                body {
                  background-color: white;
                  color: #0f172a;
                  padding: 0;
                }
                .no-print {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body class="p-6 md:p-12">
            <div class="no-print mb-8 flex justify-center gap-3 border-b border-gray-100 pb-5">
              <button onclick="window.print()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer">
                Print / Save PDF
              </button>
              <button onclick="window.close()" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans font-medium text-xs rounded-lg transition-all cursor-pointer">
                Close Tab
              </button>
            </div>
            <div class="max-w-3xl mx-auto">
              ${printContent || ''}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownloadTxt = () => {
    trackEvent('resume_download_txt');
    const resumeText = `
HAREKRISHNA SHAH
Dublin, Ireland
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

======================================================================
PROFESSIONAL SUMMARY
======================================================================
${PERSONAL_INFO.about.summary}

======================================================================
WORK EXPERIENCE
======================================================================
${EXPERIENCE_DATA.map(exp => `
${exp.role.toUpperCase()}
${exp.company} - ${exp.location}
${exp.period}
${exp.description.map(desc => `* ${desc}`).join('\n')}
`).join('\n')}

======================================================================
EDUCATION
======================================================================
${EDUCATION_DATA.map(edu => `
${edu.degree.toUpperCase()} (Specialization: ${edu.specialization})
${edu.institution}
${edu.period}
${edu.highlights.map(h => `* ${h}`).join('\n')}
`).join('\n')}

======================================================================
CERTIFICATIONS & CREDENTIALS
======================================================================
${CERTIFICATIONS_DATA.map(cert => `* ${cert.name} - Issued by ${cert.issuer} (${cert.date}) [ID: ${cert.credentialId}]`).join('\n')}
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "Harekrishna_Shah_Resume_ATS_Optimized.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" id="resume-modal-container">
      <div id="resume-modal" className="bg-[#0b0f19] border border-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-slate-900/80 px-4 py-3 sm:px-6 sm:py-4 bg-slate-950/40">
          <div className="flex items-center gap-2 max-w-[45%] sm:max-w-none">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0" />
            <h3 className="text-white font-sans font-bold text-xs sm:text-sm tracking-tight truncate">
              Curriculum Vitae — ATS Document
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopyText}
              className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Copy Clean Text for ATS Copy-Paste"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 animate-scale-up" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Download ATS-Friendly Plain Text file"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download .TXT</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Print Resume or Save to PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic High Fidelity ATS Resume Render */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white text-slate-900 font-sans print:p-0 selection:bg-emerald-100 selection:text-emerald-900" id="resume-document-content">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Header info */}
            <div className="text-center border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-semibold text-emerald-600 font-mono tracking-wide mt-1 uppercase">
                {PERSONAL_INFO.title}
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono mt-3">
                <span>📍 {PERSONAL_INFO.location}</span>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1">
                Professional Profile
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                {PERSONAL_INFO.about.summary}
              </p>
            </div>

            {/* Core Skills */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1">
                Technical Expertise Stack
              </h2>
              <div className="grid grid-cols-3 gap-4 text-xs text-slate-600 font-sans">
                <div>
                  <strong className="text-slate-900 block font-semibold mb-1">Data Engineering</strong>
                  <p className="font-light leading-relaxed">Databricks, PySpark, Azure ADF, Synapse Analytics, Delta Lake, Teradata SQL, Python</p>
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold mb-1">BI &amp; Visualization</strong>
                  <p className="font-light leading-relaxed">Power BI (DAX, PowerQuery), Dimensional Modeling, Incremental Data Refresh, Excel Modeling</p>
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold mb-1">AI, Cloud &amp; QA</strong>
                  <p className="font-light leading-relaxed">Gemini API, Selenium, Jenkins CI/CD, Terraform, Postman, Oracle SQL, AML/KYC Audits</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {EXPERIENCE_DATA.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 font-sans">
                          {exp.role}
                        </h3>
                        <span className="text-xs text-emerald-600 font-medium font-sans">
                          {exp.company} &mdash; {exp.location}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono font-medium shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600 font-sans font-light leading-relaxed">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1">
                Academic Foundation
              </h2>
              <div className="space-y-4">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 font-sans">
                          {edu.degree} in {edu.specialization}
                        </h3>
                        <span className="text-xs text-emerald-600 font-medium font-sans">
                          {edu.institution}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono font-medium shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-600 font-sans font-light leading-relaxed">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-900/80 px-6 py-4 bg-slate-950/40 text-center">
          <p className="text-[10px] text-slate-500 font-mono">
            ATS Compatibility Rating: 100%. Print/Save as PDF is formatted for standard A4 margins.
          </p>
        </div>

      </div>
    </div>
  );
}
