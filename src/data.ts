import { Project, ExperienceItem, SkillCategory, EducationItem, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Harekrishna Shah",
  title: "Data Analyst | SQL, Power BI, Python & Databricks",
  subtitle: "Engineering Clean Pipelines & Delivering High-Impact Business Intelligence",
  email: "harekrishnashah13@gmail.com",
  linkedin: "https://www.linkedin.com/in/hshah13",
  github: "https://github.com/Harekrishnashah13",
  location: "Limerick, Ireland",
  about: {
    summary: "I'm a data analyst with 4+ years in banking and enterprise data, an MSc in Data Analytics from Dublin Business School, and the Databricks Certified Data Engineer Professional certification. I build reporting people can trust: validated data, clear Power BI dashboards and automation that removes manual work. Based in Limerick on Stamp 1G and open to permanent data analytics and data engineering roles across Ireland.",

    focus: [
      {
        title: "Enterprise Data Engineering",
        description: "Migrating legacy systems to cloud-scale warehouses (Azure Synapse, Databricks, PySpark), designing reliable pipeline patterns, and automating workflows safely.",
        metrics: "Migrated a 1.2PB enterprise data warehouse footprint with zero downtime."
      },
      {
        title: "Business Intelligence & Reporting",
        description: "Designing audit-ready Power BI dashboard suites tracking financial and operational KPIs for senior leadership and compliance stakeholders.",
        metrics: "Automated a twice-weekly stakeholder report from about 4 hours to 15 minutes."
      },
      {
        title: "Process Automation & AI Integration",
        description: "Using Python automation and LLMs to remove manual steps, from report preparation to analysing sentiment in social-media text.",
        metrics: "Compared lexicon, machine-learning and LLM sentiment labels on 1,666 real X posts."
      }
    ]
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "Enterprise Cloud Migration",
    description: "Contributed to an enterprise-scale Teradata → Databricks migration project at Itelligence Infotech. My specific deliverable was designing and building the automated SQL translation pipeline — a Python-driven code translation engine that converted legacy Teradata SQL syntax to PySpark/Databricks format, with automated parity checks verifying record counts and field-level accuracy across source and target systems.",
    category: "engineering",
    projectType: "professional",
    tags: ["Azure Synapse", "Databricks", "PySpark", "Azure Data Factory (ADF)", "Python", "Terraform", "Delta Lake"],
    tools: ["Synapse", "Databricks", "PySpark", "ADF", "Python", "SQL"],
    impact: "Migrated 1.2PB of enterprise data with field-level parity checks and a zero-downtime cutover.",
    metrics: [
      { label: "Data Footprint", value: "1.2PB" },
      { label: "Parity Checks", value: "Field-level" },
      { label: "Cutover Downtime", value: "Zero" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    businessContext: "A Fortune 500 client operated a massive on-premise Teradata database cluster that was limiting query performance and costly to run. Leadership initiated a strategic cloud migration to Azure Synapse and Databricks.",
    problemStatement: "The legacy environment was powered by thousands of highly nested, custom Teradata SQL procedures. Rewriting these queries into Spark-SQL by hand would have been slow and risked syntax drift and reporting discrepancies.",
    whyItMattered: "Downstream revenue tracking and operational reporting relied entirely on these daily pipelines; any data discrepancies or system downtime would disrupt global business operations.",
    myRole: "Data Analyst at Itelligence Infotech. I was the core developer of the Python translation engine and coordinated integration risk assessments.",
    constraints: "The migration had to guarantee absolute numerical parity and achieve a zero-downtime cutover. Data security regulations required complete masking of PII (Personally Identifiable Information) before cloud loading.",
    technicalApproach: "I engineered a Python-based SQL translation framework utilizing regular expressions and Abstract Syntax Tree (AST) mapping to automatically convert Teradata-specific operators and data types into Spark-SQL dialect. I orchestrated automated Azure Data Factory (ADF) copy activities to ingest historical data into ADLS Gen2, while running Databricks clusters to calculate row-by-row checksum balances.",
    architectureSummary: "Conceptual Diagram: Teradata On-Prem -> Azure ADF -> Azure Data Lake Storage (ADLS Gen2) -> Azure Databricks (PySpark Code Translator & Validation) -> Azure Synapse Analytics Datamarts",
    businessOutcomes: "Migrated 1.2PB of data with field-level parity and no operational downtime. Automated translation and validation replaced a large share of manual rewriting and checking.",
    tradeoffs: "1. Python Parser vs. Commercial SQL Transpilers: Opted to construct a dedicated, custom Python-based translation engine rather than purchasing an expensive third-party SQL transpiler. The custom script handled most standard Teradata syntax, and the more complex nested procedures were refactored by hand. This avoided licence fees. 2. ADLS Gen2 Delta Lake vs. Standard Parquet: Chose Delta Lake format for Synapse storage to support ACID transactions and schema enforcement, slightly increasing storage metadata overhead but preventing pipeline failures due to upstream column drift.",
    lessonsLearned: "Dynamic schema changes in source tables are the primary failure point of high-volume migrations. Creating a pre-execution catalog-check routine in Databricks before spinning up compute clusters protects against waste and run-time failures."
  },
  {
    id: "healthcare-pipeline",
    title: "Healthcare Analytics Pipeline",
    description: "Designed a secure Databricks Lakehouse pipeline to ingest NHS A&E performance reports, standardizing patient waiting metrics through Delta Lake Bronze/Silver/Gold layers, and deployed an automated Executive Power BI Dashboard tracking HSE breach rates.",
    category: "engineering",
    projectType: "personal",
    tags: ["Databricks", "Delta Lake", "PySpark", "Delta Lake Gold Layer", "Power BI", "Databricks Workflows", "HSE Compliance"],
    tools: ["Databricks", "PySpark", "Power BI", "Workflows", "Delta Lake"],
    impact: "Automated daily KPI generation from public A&E performance data, showing how operations leaders could track waiting times, capacity and breach rates.",
    metrics: [
      { label: "Architecture", value: "Medallion" },
      { label: "Refresh", value: "Daily" },
      { label: "Data Quality", value: "Automated checks" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/healthcare-analytics-pipeline",
    businessContext: "Hospital clinical operations and executive leadership struggle to monitor patient flow, A&E congestion, and bed capacity in real-time. Delays in identifying departments exceeding maximum patient-waiting limits create operational bottlenecks and pose compliance risks with HSE (Health Service Executive) standards.",
    problemStatement: "Raw A&E logs are highly unstructured, containing inconsistent timezone formats, missing admissions markers, and fragmented clinical department codes. Consolidating this data manually for daily compliance reporting is labor-intensive and error-prone.",
    whyItMattered: "NHS and HSE national mandates enforce strict breach rate standards (e.g., patient waiting times must remain under 4 hours). Real-time insight into potential breach trends allows operational teams to redirect staff and capacity before SLAs are violated, protecting patient safety.",
    myRole: "Solo developer (personal project). I designed the Databricks ingestion schema, implemented the Silver layer cleansing scripts, and created the Power BI interactive dashboard.",
    constraints: "Must handle high-volume streaming data with strict data-quality thresholds. The pipeline must filter out patient PII records prior to Gold layer compilation in accordance with GDPR regulations.",
    technicalApproach: "I constructed an automated medallion pipeline in Databricks. Raw CSV/JSON logs are pulled into Bronze storage. A PySpark Silver stage cleans dates, infers empty discharge statuses, and drops invalid clinic IDs. The Gold layer calculates analytical aggregations (rolling 4-hour breach ratios, peak arrival patterns, and average treatment durations by ward). Workflow orchestration is managed dynamically via Databricks Job clusters.",
    architectureSummary: "Lakehouse Medallion: Raw Logs -> Bronze Delta (Ingestion) -> Silver Delta (Sanitization) -> Gold Delta (KPI Models) -> Databricks SQL Warehouse -> Power BI Gateway",
    businessOutcomes: "Delivered an automated, daily refreshed Power BI dashboard that shows A&E breach rates and high-risk waiting times.",
    tradeoffs: "1. PySpark vs. Scala Spark: Selected PySpark for writing the Silver cleansing layer due to native integration with data science libraries and faster development loops, trading minor JVM serialization performance for substantial code readability. 2. Delta Lake Lakehouse vs. Relational DB: Stored outcomes in Databricks Delta Lake instead of a traditional SQL Database, using schema evolution to absorb upstream clinical data log updates seamlessly.",
    lessonsLearned: "Defining a global dimensional map for clinical department codes is critical. Minor variations in how ward names are registered at intake will duplicate metrics unless strictly standardized at the Silver stage."
  },
  {
    id: "project-3",
    title: "Banking Report Automation",
    description: "Automated a twice-weekly product report for senior stakeholders on the Allied Irish Banks account (via Covalen), replacing manual Salesforce-to-Excel preparation with a Python and Microsoft BI workflow.",
    category: "bi",
    projectType: "professional",
    tags: ["Python", "Microsoft BI", "Power BI", "Salesforce", "Excel", "SQL", "AML/KYC"],
    tools: ["Python", "Power BI", "Salesforce", "SQL"],
    impact: "Cut report preparation from about 4 hours to 15 minutes, twice a week (roughly 390 hours a year), with validation checks kept for the audit trail.",
    metrics: [
      { label: "Prep Time", value: "4h → 15m" },
      { label: "Hours Saved / Year", value: "~390" },
      { label: "AML/KYC Breaches", value: "0" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    businessContext: "In a regulated digital banking environment, senior stakeholders rely on a twice-weekly product report to make decisions, and the report forms part of the audit trail.",
    problemStatement: "The report was built by hand twice a week from Salesforce exports in Excel. Each run took about four hours, and manual steps made it easy for figures to disagree between teams.",
    whyItMattered: "Late or inconsistent figures slow down decisions and weaken the audit trail in a regulated environment.",
    myRole: "Customer Operations Specialist at Covalen (client: Allied Irish Banks). I built and run the automated workflow.",
    constraints: "No customer PII could be kept in local report storage, and every output had to stay audit-ready.",
    technicalApproach: "Python scripts take the Salesforce exports, clean and validate them, and feed a Microsoft BI report. Validation checks confirm the figures before the report goes out.",
    architectureSummary: "Salesforce exports -> Python cleaning & validation -> Microsoft BI report -> Senior stakeholders",
    businessOutcomes: "Preparation dropped from about 4 hours to 15 minutes per run, roughly 390 hours a year, with the validation needed for the audit trail kept in place.",
    tradeoffs: "Automate first, redesign later: the existing manual steps were automated before any change to the report itself, so stakeholders kept a familiar output while preparation time fell.",
    lessonsLearned: "Validation has to travel with the automation. Time saved only counts if the numbers still reconcile."
  },
  {
    id: "project-4",
    title: "MSc Dissertation — Number Plate Detection",
    description: "Developed a deep learning image classification and object localization pipeline using YOLOv9, TensorFlow, and OpenCV.",
    category: "analytics",
    projectType: "academic",
    tags: ["Python", "YOLOv9", "TensorFlow", "OpenCV", "PyTorch", "Transfer Learning", "Jupyter Notebooks"],
    tools: ["Python", "TensorFlow", "OpenCV", "Jupyter"],
    impact: "Compared YOLOv9, EfficientNet and NasNet on 8,800+ annotated images; the top model reached 94.3% accuracy and 95.1% mAP.",
    metrics: [
      { label: "Accuracy", value: "94.3%" },
      { label: "mAP", value: "95.1%" },
      { label: "Dataset Scale", value: "8,800+ Images" },
      { label: "Models Compared", value: "3" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/Number-Plate-Detection-Using-Computer-Vision-and-Deep-Learning-",
    businessContext: "This project was developed as my final Master of Science in Data Analytics dissertation at Dublin Business School to solve processing bottlenecks in real-time edge-computing camera streams.",
    problemStatement: "Standard convolutional architectures suffered from severe accuracy degradation when analyzing objects in low-contrast, noisy, or high-density scenes.",
    whyItMattered: "High-precision vision systems are critical for downstream applications like industrial sorting or automated inspection, where a single false classification stops entire pipelines.",
    myRole: "Solo Researcher and ML Engineer. I designed the training pipeline, compiled the image dataset, and executed hyperparameter tuning.",
    constraints: "Built entirely on limited laboratory hardware, requiring optimal memory allocation and precision formatting to avoid GPU out-of-memory crashes.",
    technicalApproach: "I compiled a high-quality dataset of over 8,800 image files. I implemented a training pipeline utilizing YOLOv9 with PyTorch transfer learning, applying OpenCV for contrast normalization and data augmentation. I tuned batch-sizing and utilized half-precision floating-point (FP16) variables to maximize GPU performance.",
    architectureSummary: "Real Notebook: Image Dataset -> OpenCV Spatial Normalization -> YOLOv9 PyTorch Transfer Learning -> FP16 Compilation -> TensorFlow Serving Model",
    businessOutcomes: "The top model reached 94.3% accuracy and 95.1% mAP.",
    tradeoffs: "1. YOLOv9 vs. ResNet: Selected the single-stage YOLOv9 model to satisfy real-time throughput limits (target 30 FPS on average processors), trading off minor fine-grained boundary layer accuracy for a 3.5x boost in overall inference speed.",
    lessonsLearned: "Data quality beats model parameters. Investing time in image augmentation (such as geometric rotation and adaptive histogram equalization) yielded a greater accuracy lift than simply running extra training epochs on raw inputs."
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Customer Operations Specialist",
    company: "Covalen (client: Allied Irish Banks)",
    location: "Limerick, Ireland",
    period: "August 2025 - Present",
    description: [
      "Automated the twice-weekly product report for senior stakeholders, cutting preparation from about 4 hours to 15 minutes (roughly 390 hours a year).",
      "Validate and reconcile high-volume transaction data across AIB's core platforms and investigate 20+ issues a day with SQL; zero AML/KYC breaches."
    ],
    skills: ["SQL", "Python", "Power BI", "Salesforce", "Data Validation", "AML/KYC"],
    highlightMetric: { label: "Report Prep Time", value: "4h → 15m" }
  },
  {
    id: "exp-2",
    role: "Data Analyst",
    company: "Itelligence Infotech",
    location: "India (remote from Sep 2023)",
    period: "December 2022 - December 2024",
    description: [
      "Built automated SQL translation and field-level parity checks for a 1.2PB Teradata-to-Azure Synapse migration, delivered with a zero-downtime cutover.",
      "Ran requirements workshops, owned UAT across three concurrent client projects, and mentored three junior analysts."
    ],
    skills: ["Azure Synapse", "Databricks", "PySpark", "Azure ADF", "Python", "Teradata SQL", "Power BI", "Tableau"],
    highlightMetric: { label: "Enterprise Migration", value: "1.2PB" }
  },
  {
    id: "exp-3",
    role: "Software Developer & Technical Support QA",
    company: "HiCounselor",
    location: "Remote (US-based start-up)",
    period: "August 2022 - December 2022",
    description: [
      "Built automated test suites in Python and Selenium within Jenkins CI/CD, and tested APIs with Postman.",
      "Worked in Agile sprints with engineers on backlog refinement and defect triage in Jira."
    ],
    skills: ["Python", "Selenium WebDriver", "Jenkins CI/CD", "Postman", "Jira", "SQL"],
    highlightMetric: { label: "Test Automation", value: "Selenium + Jenkins" }
  },
  {
    id: "exp-4",
    role: "Business Data Analyst",
    company: "Equitas Small Finance Bank",
    location: "Chennai, India",
    period: "September 2021 - August 2022",
    description: [
      "Wrote PostgreSQL queries to audit and reconcile transaction data after system integrations, and tested APIs with Postman.",
      "Tracked KPIs, account metrics and campaign performance in SQL and Excel, producing management reports for sales, marketing and operations."
    ],
    skills: ["PostgreSQL", "SQL", "Excel", "Postman", "API Testing", "Appzillon"],
    highlightMetric: { label: "Focus", value: "Data audits & MI" }
  },
  {
    id: "exp-5",
    role: "Business Analyst Intern",
    company: "Swiggy",
    location: "Amaravati, India",
    period: "September 2019 - December 2019",
    description: [
      "Owned the creation of a business intelligence model in Microsoft Excel to track and analyze customer cohorts, offers, and marketing campaigns.",
      "Collaborated across Marketing and Pricing teams to identify campaign inefficiencies, improving accurate data tracking and strategic decision-making."
    ],
    skills: ["Business Intelligence", "Excel Automation", "Sales Tracker", "Cohort Modeling"],
    highlightMetric: { label: "BI Modeling", value: "Excel Suite" }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Engineering & Pipelines",
    skills: [
      { name: "PySpark & Databricks", level: 92 },
      { name: "Azure Data Factory (ADF)", level: 90 },
      { name: "Azure Synapse & ADLS Gen2", level: 90 },
      { name: "Python (Automation, Pandas)", level: 95 },
      { name: "SQL (Teradata, Oracle, Postgres)", level: 95 },
      { name: "Delta Lake & Unity Catalog", level: 85 }
    ]
  },
  {
    title: "Business Intelligence & Analytics",
    skills: [
      { name: "Power BI (DAX, PowerQuery)", level: 95 },
      { name: "Tableau", level: 88 },
      { name: "Statistical Modeling", level: 85 },
      { name: "API Testing (Postman)", level: 90 },
      { name: "AML/KYC Risk Auditing", level: 85 }
    ]
  },
  {
    title: "Cloud, AI & DevOps",
    skills: [
      { name: "LLM APIs (Groq / Llama, Gemini)", level: 75 },
      { name: "Terraform (IaC)", level: 80 },
      { name: "Jenkins CI/CD", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Selenium WebDriver", level: 90 },
      { name: "Git & Agile", level: 95 }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Dublin Business School",
    degree: "Master of Science (MSc)",
    period: "September 2023 - September 2024",
    specialization: "Data Analytics",
    highlights: [
      "Modules: statistical modelling, hypothesis testing, experiment design, machine learning evaluation.",
      "Dissertation: compared YOLOv9, EfficientNet and NasNet for number plate detection on 8,800+ annotated images; the top model reached 94.3% accuracy and 95.1% mAP."
    ]
  },
  {
    institution: "SRM University",
    degree: "Bachelor of Technology (BTech)",
    period: "June 2018 - May 2022",
    specialization: "Computer Science & Engineering (Data Science specialisation)",
    highlights: [
      "Acquired core foundations in software engineering, distributed computing, database systems, and algorithms.",
      "Maintained first-class performance across database architectures and Python application labs."
    ]
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-1",
    name: "Databricks Certified Data Engineer Professional",
    issuer: "Databricks",
    date: "May 2026",
    credentialId: "181519764",
    verificationUrl: "#cert-databricks"
  },
  {
    id: "cert-2",
    name: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage",
    date: "Nov 2025",
    credentialId: "pQe2ehirbnR78fCE2",
    verificationUrl: "https://link.theforage.com/verify/pQe2ehirbnR78fCE2"
  },
  {
    id: "cert-6",
    name: "Google Analytics Certification",
    issuer: "Google",
    date: "May 2023",
    credentialId: "152294947",
    verificationUrl: "#cert-google-analytics"
  },
  {
    id: "cert-3",
    name: "Data Visualization and Communication with Tableau",
    issuer: "Duke University / Coursera",
    date: "Nov 2022",
    credentialId: "BJWJUERJS47H",
    verificationUrl: "https://coursera.org/verify/BJWJUERJS47H"
  },
  {
    id: "cert-4",
    name: "SQL for Data Science",
    issuer: "UC Davis / Coursera",
    date: "Oct 2022",
    credentialId: "D8N6CWZ8H922",
    verificationUrl: "https://coursera.org/verify/D8N6CWZ8H922"
  },
  {
    id: "cert-5",
    name: "Introduction to Data Science in Python",
    issuer: "University of Michigan / Coursera",
    date: "Jul 2020",
    credentialId: "7N62D3TYH4KM",
    verificationUrl: "https://coursera.org/verify/7N62D3TYH4KM"
  }
];
