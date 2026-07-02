# Harekrishna Shah — Data Analytics Portfolio

<div align="center">


[![Live Site](https://img.shields.io/badge/Live%20Site-harekrishnashah.vercel.app-00CC88?style=for-the-badge&logo=vercel&logoColor=white)](https://harekrishnashah.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hshah13-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hshah13)
[![GitHub](https://img.shields.io/badge/GitHub-Harekrishnashah13-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Harekrishnashah13)
[![Email](https://img.shields.io/badge/Email-harekrishnashah13@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:harekrishnashah13@gmail.com)

**Databricks Certified Data Engineer & Analyst · MSc Data Science (First Class Distinction) · Dublin, Ireland**

</div>

---

## Overview

A fully interactive, production-grade personal portfolio built to showcase data engineering, analytics, and machine learning expertise. Every design and engineering decision mirrors how I approach data problems — structured, purposeful, and outcome-driven.

The portfolio is not a static CV. It is a live demonstration: interactive case studies with architectural trade-offs, a verifiable credential hub, a real-time GitHub activity feed, and a recruiter-optimised contact system with response SLA commitments.

**Live URL →** [harekrishnashah.vercel.app](https://harekrishnashah.vercel.app/)

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Core framework with full type safety |
| Framer Motion | Page-level and component scroll animations |
| D3.js | Interactive data visualisations and skill radar chart |
| WebGL / GLSL Shaders | Animated background particle system |
| Tailwind CSS | Utility-first styling system |
| Lucide React | Icon system |

### Data & Integrations
| Technology | Purpose |
|---|---|
| GitHub REST API | Live activity feed — real commits and repo events |
| Web Crypto API | Credential signature verification simulation |
| Navigator Clipboard API | One-click email copy with toast feedback |
| IntersectionObserver API | Scroll-triggered counter animations |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Production deployment with CI/CD on push |
| Google Cloud Run | Secondary deployment environment |

---

## Features

### Core Portfolio
- **Interactive Case Studies** — 5 detailed project write-ups with business context, architectural decisions, trade-off reasoning, lessons learned, and unified toolchain breakdown
- **Credential Verification Hub** — Each certification displays a real credential ID with a simulated secure signature check and link to the official verification registry
- **Horizontal Case Carousel** — Snap-scroll case study gallery with keyboard navigation, touch-swipe support, and dot progress indicators
- **Filterable Project Grid** — Filter projects by Professional, Academic, or Personal/Open Source categories

### Technical Showcase
- **WebGL Shader Background** — Custom GLSL fragment shader with animated particle system responding to viewport
- **D3 Skill Radar Chart** — Animated spider chart rendering skill proficiency scores across 6 axes
- **Animated Metric Counters** — Count-up physics triggered by IntersectionObserver on first viewport entry
- **Live GitHub Feed** — Real-time commit and repository activity fetched from the GitHub public API with graceful failsafe on rate limits

### Recruiter Experience
- **Recruiter Response SLA** — Commitment to respond to all hiring enquiries within 4 business hours
- **ATS-Optimised Resume** — One-click PDF download formatted for applicant tracking systems
- **One-Click Email Copy** — Click-to-copy email address with toast notification confirmation
- **Visa & Availability Cards** — Stamp 1G status, sponsorship eligibility, and interview-ready status displayed immediately in the hero

### UX & Accessibility
- **Scroll Progress Bar** — 2px indicator fixed to viewport top showing reading progress
- **High Contrast Mode** — Full WCAG-compatible high contrast toggle
- **Zen Mode** — Distraction-free reading mode removing all non-essential UI
- **Keyboard Navigation** — Full keyboard accessibility with visible focus states
- **Reduced Motion** — Respects `prefers-reduced-motion` media query
- **Skip to Content Link** — Screen reader and keyboard-first accessibility

---

## Case Studies

| # | Project | Type | Key Technologies | Outcome |
|---|---|---|---|---|
| 01 | Enterprise Cloud Data Warehouse Migration | Professional | Databricks, PySpark, Teradata SQL, Python | Automated SQL translation pipeline with parity validation |
| 02 | Financial Reporting & Data Governance | Professional | Power BI, SQL, GDPR Frameworks | 15% improvement in reporting accuracy |
| 03 | Automated ETL Pipeline | Personal / OS | Python, Apache Airflow, AWS S3 | 40hrs/week manual work eliminated |
| 04 | Customer Churn Prediction Model | Personal / OS | Python, scikit-learn, Pandas | 85% ML model accuracy |
| 05 | Automatic Number Plate Recognition | Academic | TensorFlow, OpenCV, Python, R | 94.3% accuracy · 95.1% mAP · 8,800+ images |

---

## Certifications

| Certification | Issuer | Date | Credential ID |
|---|---|---|---|
| Databricks Certified Data Engineer Professional | Databricks | May 2026 | 181519764 |
| AWS Solutions Architecture Job Simulation | Forage | Nov 2025 | pQe2ehirbnR78fCE2 |
| Google Analytics Certification | Google | May 2023 | 152294947 |
| Data Visualization with Tableau | Duke University / Coursera | Nov 2022 | BJWJUERJS47H |

---

## Project Structure

```
harekrishnashah-portfolio/
├── public/
│   ├── favicon.ico
│   ├── og-image.png          # Open Graph preview image
│   └── resume.pdf            # ATS-optimised CV
├── src/
│   ├── components/
│   │   ├── Hero/             # Hero section with info cards
│   │   ├── Projects/         # Case study grid + carousel
│   │   ├── CaseStudyModal/   # Full case study detail modal
│   │   ├── Experience/       # Career timeline
│   │   ├── Certifications/   # Credential hub + verify modal
│   │   ├── Education/        # Academic background
│   │   ├── Articles/         # LinkedIn thought leadership
│   │   ├── Contact/          # Recruiter contact form
│   │   ├── GitHubFeed/       # Live GitHub activity widget
│   │   ├── ShaderBackground/ # WebGL particle system
│   │   ├── RadarChart/       # D3 skill radar
│   │   └── ui/               # Shared UI components
│   ├── data/
│   │   ├── projects.ts       # Case study data
│   │   ├── certifications.ts # Credential data
│   │   ├── experience.ts     # Career timeline data
│   │   └── skills.ts         # Skill scores for radar chart
│   ├── hooks/
│   │   ├── useCountUp.ts     # Scroll-triggered counter
│   │   ├── useGitHub.ts      # GitHub API fetch + cache
│   │   └── useScrollProgress.ts
│   ├── context/
│   │   └── LocaleContext.tsx # i18n + RTL support
│   ├── utils/
│   │   ├── pdfGenerator.ts   # Resume download handler
│   │   └── clipboard.ts      # Email copy utility
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Harekrishnashah13/harekrishnashah-portfolio.git

# Navigate into the project
cd harekrishnashah-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## Environment Variables

No environment variables are required. The GitHub activity feed uses the public GitHub REST API which does not require authentication for public profile data. Rate limiting is handled gracefully with a failsafe empty state.

```env
# Optional: Add a GitHub personal access token to increase
# API rate limits from 60 to 5000 requests/hour
VITE_GITHUB_TOKEN=your_token_here
```

---

## Performance

| Metric | Score |
|---|---|
| Lighthouse Performance | 94 |
| Lighthouse Accessibility | 91 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 98 |
| First Contentful Paint | < 1.2s |
| Time to Interactive | < 2.4s |

---

## Contact

I am actively open to **Data Analytics**, **Data Engineering**, and **Business Intelligence** roles in Dublin, Ireland and remotely across Europe.

| Channel | Details |
|---|---|
| 📧 Email | [harekrishnashah13@gmail.com](mailto:harekrishnashah13@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/hshah13](https://www.linkedin.com/in/hshah13) |
| 🌐 Portfolio | [harekrishnashah.vercel.app](https://harekrishnashah.vercel.app/) |
| 🐙 GitHub | [github.com/Harekrishnashah13](https://github.com/Harekrishnashah13) |
| 📍 Location | Dublin, Ireland · Stamp 1G · Sponsorship Eligible |

> **Recruiter Response SLA:** All genuine hiring enquiries receive a response within **4 business hours**.

---

## License

This project is open source and available under the [MIT License](LICENSE).

You are welcome to use this as inspiration or a starting point for your own portfolio. If you do, a credit or a star ⭐ on the repository is appreciated.

---

<div align="center">

**Built with React · TypeScript · D3 · WebGL · Framer Motion**

[Live Site](https://harekrishnashah.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/hshah13) · [GitHub](https://github.com/Harekrishnashah13)

</div>
