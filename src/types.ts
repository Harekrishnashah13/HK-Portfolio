export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'engineering' | 'analytics' | 'bi';
  projectType: 'professional' | 'academic' | 'personal';
  tags: string[];
  metrics: { label: string; value: string }[];
  tools: string[];
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
  
  // Refined case-study specific narrative sections
  businessContext: string;
  problemStatement: string;
  whyItMattered: string;
  myRole: string;
  constraints: string;
  technicalApproach: string;
  architectureSummary?: string;
  businessOutcomes: string;
  lessonsLearned: string;
  tradeoffs?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  highlightMetric?: { label: string; value: string };
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  specialization?: string;
  highlights?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
  credentialId?: string;
}
