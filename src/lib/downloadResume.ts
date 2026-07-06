import { PERSONAL_INFO, EXPERIENCE_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA } from '../data';

export function downloadResumePDF() {
  const resumeText = `
HAREKRISHNA SHAH
Dublin, Ireland | Stamp 1G (Interview Ready)
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
ROLE: ${exp.role}
COMPANY: ${exp.company} - ${exp.location}
PERIOD: ${exp.period}
${exp.description.map(desc => `• ${desc}`).join('\n')}
`).join('\n')}

======================================================================
EDUCATION
======================================================================
${EDUCATION_DATA.map(edu => `
DEGREE: ${edu.degree} (${edu.specialization})
INSTITUTION: ${edu.institution}
PERIOD: ${edu.period}
${edu.highlights.map(h => `• ${h}`).join('\n')}
`).join('\n')}

======================================================================
CERTIFICATIONS & CREDENTIALS
======================================================================
${CERTIFICATIONS_DATA.map(cert => `• ${cert.name} - Issued by ${cert.issuer} (${cert.date}) [Credential ID: ${cert.credentialId}]`).join('\n')}
  `.trim();

  const element = document.createElement("a");
  const file = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  element.href = URL.createObjectURL(file);
  element.download = "Harekrishna_Shah_Resume_ATS_Optimized.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Bind to window for global access
if (typeof window !== 'undefined') {
  (window as any).downloadResumePDF = downloadResumePDF;
}
