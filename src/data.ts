import { Project, ExperienceItem, SkillCategory, EducationItem, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Harekrishna Shah",
  title: "Databricks Certified Data Engineer & Analyst",
  subtitle: "Engineering Clean Pipelines & Delivering High-Impact Business Intelligence",
  email: "harekrishnashah13@gmail.com",
  linkedin: "https://www.linkedin.com/in/hshah13",
  github: "https://github.com/Harekrishnashah13",
  resumeUrl: "#",
  location: "Dublin, Ireland",
  about: {
    summary: "Databricks Certified Data Engineer with an MSc in Data Science and 3+ years of professional experience across data engineering, analytics, automation, and banking operations. I specialize in migrating large-scale data footprints, deploying AI-driven recovery systems, and delivering audit-ready operational reporting in regulated environments.",
    focus: [
      {
        title: "Enterprise Data Engineering",
        description: "Migrating legacy systems to cloud-scale warehouses (Azure Synapse, Databricks, PySpark), designing reliable pipeline patterns, and automating workflows safely.",
        metrics: "Migrated a 1.2PB enterprise data warehouse footprint with zero downtime."
      },
      {
        title: "Business Intelligence & Reporting",
        description: "Designing audit-ready Power BI dashboard suites tracking financial and operational KPIs for senior leadership and compliance stakeholders.",
        metrics: "Maintained critical SLA dashboards used daily across banking operations."
      },
      {
        title: "Process Automation & AI Integration",
        description: "Deploying automated script suites and AI tools (such as Python automations and LLM agents) to slash issue resolution cycles and prevent compliance leaks.",
        metrics: "Cut pipeline diagnostics from 14 hours to under 4 minutes with Gemini API."
      }
    ]
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "Enterprise Cloud Data Warehouse Migration & Automated Code Translation Engine",
    description: "Contributed to an enterprise-scale Teradata → Databricks migration project at Intelligence Infotech. My specific deliverable was designing and building the automated SQL translation pipeline — a Python-driven code translation engine that converted legacy Teradata SQL syntax to PySpark/Databricks format, with automated parity checks verifying record counts and field-level accuracy across source and target systems.",
    category: "engineering",
    projectType: "professional",
    tags: ["Azure Synapse", "Databricks", "PySpark", "Azure Data Factory (ADF)", "Python", "Terraform", "Delta Lake"],
    tools: ["Synapse", "Databricks", "PySpark", "ADF", "Python", "SQL"],
    impact: "Migrated 1.2PB of core enterprise data with 100% parity, improving system reporting accuracy and performance metrics by 40%.",
    metrics: [
      { label: "Data Footprint", value: "1.2PB" },
      { label: "Reporting Accuracy", value: "+40%" },
      { label: "Defect Rates", value: "-30%" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    liveUrl: "#",
    businessContext: "A Fortune 500 client operated a massive on-premise Teradata database cluster that was bottlenecking query performance and incurring seven-figure annual infrastructure costs. Leadership initiated a strategic cloud migration to Azure Synapse and Databricks.",
    problemStatement: "The legacy environment was powered by thousands of highly nested, custom Teradata SQL procedures. Manually rewriting these queries into Spark-SQL syntax was estimated to require 8 analysts over 14 months, carrying extreme risks of syntax drift and reporting discrepancies.",
    whyItMattered: "Downstream revenue tracking and operational reporting relied entirely on these daily pipelines; any data discrepancies or system downtime would disrupt global business operations.",
    myRole: "Data Analyst & Technical Business Analyst at Itelligence Infotech. I was the core developer of the Python translation engine and coordinated integration risk assessments.",
    constraints: "The migration had to guarantee absolute numerical parity and achieve a zero-downtime cutover. Data security regulations required complete masking of PII (Personally Identifiable Information) before cloud loading.",
    technicalApproach: "I engineered a Python-based SQL translation framework utilizing regular expressions and Abstract Syntax Tree (AST) mapping to automatically convert Teradata-specific operators and data types into Spark-SQL dialect. I orchestrated automated Azure Data Factory (ADF) copy activities to ingest historical data into ADLS Gen2, while running Databricks clusters to calculate row-by-row checksum balances.",
    architectureSummary: "Conceptual Diagram: Teradata On-Prem -> Azure ADF -> Azure Data Lake Storage (ADLS Gen2) -> Azure Databricks (PySpark Code Translator & Validation) -> Azure Synapse Analytics Datamarts",
    businessOutcomes: "Successfully migrated 1.2PB of data with full parity and no operational downtime. Automated translation saved an estimated 9 months of manual labor, while systematic validation lifted overall reporting accuracy by 40% and cut post-deployment defects by 30%.",
    tradeoffs: "1. Python Parser vs. Commercial SQL Transpilers: Opted to construct a dedicated, custom Python-based translation engine rather than purchasing an expensive third-party SQL transpiler. The custom script successfully automated 85% of standard Teradata syntax, and the remaining 15% of complex nested tables were manually refactored. This kept license fees at zero. 2. ADLS Gen2 Delta Lake vs. Standard Parquet: Chose Delta Lake format for Synapse storage to support ACID transactions and schema enforcement, slightly increasing storage metadata overhead but preventing pipeline failures due to upstream column drift.",
    lessonsLearned: "Dynamic schema changes in source tables are the primary failure point of high-volume migrations. Creating a pre-execution catalog-check routine in Databricks before spinning up compute clusters protects against waste and run-time failures."
  },
  {
    id: "project-2",
    title: "Self-Healing AI-Powered Data Pipeline Diagnostic Daemon",
    description: "Built an automated Python worker utilizing the Gemini API to autonomously capture pipeline failure stack traces, diagnose root-cause bugs, and trigger safe healing procedures.",
    category: "engineering",
    projectType: "professional",
    tags: ["Python", "Gemini API", "Selenium WebDriver", "Jenkins CI/CD", "SQL", "Log Parsing"],
    tools: ["Python", "Gemini API", "Jenkins", "SQL"],
    impact: "Autonomously diagnosed and corrected transient pipeline failures, cutting resolution downtime from 14.2 hours to under 4 minutes.",
    metrics: [
      { label: "Autonomous Resolution", value: "94%" },
      { label: "Downtime Cut", value: "14.2h to <4m" },
      { label: "Manual QA Saved", value: "~35%" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    liveUrl: "#",
    businessContext: "While at HiCounselor, critical data processing and testing pipelines frequently failed asynchronously due to transient issues like temporary API rate limiting, network drops, or minor schema mismatch.",
    problemStatement: "Alerting systems notified developers of failures, but resolving issues manually took hours because teams had to parse extensive text logs to identify specific failure points.",
    whyItMattered: "Severe delays in data refreshing blocked subsequent operations and reporting dashboards, causing significant team idle times and SLA breaches.",
    myRole: "Software Developer & Technical Support QA. I designed and deployed the self-healing scripts and automated testing suites.",
    constraints: "The automated daemon could not be granted destructive server write permissions or modify core database structures, and had to gracefully escalate to on-call engineers if confidence was low.",
    technicalApproach: "I built a Python worker daemon that intercepts failed Jenkins builds and reads the tail of log files. The worker sanitizes private credentials and feeds the log stack trace along with structured prompt frames into the Gemini API. The AI outputs a structured diagnosis and selects a safe correction recipe (such as restarting specific containers or triggering retry-backs).",
    architectureSummary: "Conceptual Diagram: Jenkins Build Fail -> Log Extraction & Sanitization -> Python Diagnostic Worker -> Gemini API -> Pre-approved Safe Recovery Scripts -> Slack Log Notification",
    businessOutcomes: "Cut pipeline crash downtime from an average of 14.2 hours to under 4 minutes, achieving a 94% autonomous recovery rate for transient pipeline exceptions with zero manual intervention required.",
    tradeoffs: "1. Strict Pre-defined Playbooks vs. Dynamic Command Generation: Chose to limit the LLM's actions to triggering predefined, low-privilege script hooks rather than letting the model execute dynamic CLI commands. This limited recovery range slightly but ensured 100% security and zero risk of recursive loop failures.",
    lessonsLearned: "Masking all potential credentials and local file paths before sending logs to external AI interfaces is essential for maintaining standard privacy and compliance."
  },
  {
    id: "project-3",
    title: "Regulated Fraud Triage & Operational BI Dashboard Suite",
    description: "Created and maintained strategic Power BI reporting environments for Allied Irish Banks (AIB) to track daily digital banking system issues, SLA performance, and compliance KPIs.",
    category: "bi",
    projectType: "professional",
    tags: ["Power BI", "DAX", "PowerQuery", "Oracle SQL", "AML/KYC Compliance", "Excel Automation"],
    tools: ["Power BI", "SQL", "DAX", "Mainframe Logs"],
    impact: "Automated daily operational reporting for senior leadership, drastically accelerating customer escalation triage and reducing banking risk exposure.",
    metrics: [
      { label: "Daily Issues Solved", value: "20+" },
      { label: "Compliance Incidents", value: "0 Breaches" },
      { label: "Daily Triage Time", value: "-30%" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    liveUrl: "#",
    businessContext: "In a highly regulated digital banking environment at Allied Irish Banks (AIB), risk officers and senior stakeholders required real-time visibility into transaction volumes, escalation queue states, and compliance metrics.",
    problemStatement: "Operators spent hours every morning manually extracting Excel spreadsheets from transaction mainframes, Arcot security engines, and Visa Access Online systems to evaluate daily metrics.",
    whyItMattered: "Slow issue triaging delayed fraud detection and increased compliance vulnerability in AML (Anti-Money Laundering) and KYC (Know Your Customer) reviews.",
    myRole: "Operations Analyst at Covalen (AIB Client). I owned the design, development, and DAX calculations for the final reporting dashboards.",
    constraints: "Absolute data masking—absolutely no customer PII could reside in local dashboard storage, and datasets had to be fully audit-ready.",
    technicalApproach: "I wrote optimized SQL scripts to merge transaction logs, designed dimensional models within Power BI Desktop, and developed high-performance dashboards using DAX to calculate real-time SLA metrics. I configured secure enterprise data gateways to automate reporting refreshes.",
    architectureSummary: "Real Mockup: Mainframe Transaction Logs & Arcot Systems -> Secure Local Data Gateway -> Power BI Service -> Executive KPI Dashboards",
    businessOutcomes: "Completely eliminated manual daily reporting. Enabled immediate triage of authentication and fraud failures, drastically cutting response lag. Maintained a clean compliance and audit record with zero regulatory breaches.",
    tradeoffs: "1. Scheduled Incremental Imports vs. DirectQuery: DirectQuery on legacy mainframes would slow down production databases. I chose to implement 4x daily scheduled incremental imports, which satisfied business SLA reporting needs while keeping production system performance entirely unburdened.",
    lessonsLearned: "Executive dashboards must resist 'metric clutter'. Grouping complex telemetry into simple, clean Red-Yellow-Green alert status banners makes dashboards far more effective for busy banking stakeholders."
  },
  {
    id: "project-4",
    title: "MSc Dissertation: Multi-Class Computer Vision Object Detection Pipeline",
    description: "Developed and published a high-accuracy deep learning image classification and object localization pipeline using YOLOv9, TensorFlow, and OpenCV.",
    category: "analytics",
    projectType: "academic",
    tags: ["Python", "YOLOv9", "TensorFlow", "OpenCV", "PyTorch", "Transfer Learning", "Jupyter Notebooks"],
    tools: ["Python", "TensorFlow", "OpenCV", "Jupyter"],
    impact: "Achieved 94.3% Mean Average Precision (mAP) on a custom-compiled dataset of 8,800+ multi-class image frames.",
    metrics: [
      { label: "Inference Precision", value: "94.3%" },
      { label: "Dataset Scale", value: "8,800+ Images" },
      { label: "Class Count", value: "Multi-Class" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13",
    liveUrl: "#",
    businessContext: "This project was developed as my final Master of Science in Data Analytics dissertation at Dublin Business School to solve processing bottlenecks in real-time edge-computing camera streams.",
    problemStatement: "Standard convolutional architectures suffered from severe accuracy degradation when analyzing objects in low-contrast, noisy, or high-density scenes.",
    whyItMattered: "High-precision vision systems are critical for downstream applications like industrial sorting or automated inspection, where a single false classification stops entire pipelines.",
    myRole: "Solo Researcher and ML Engineer. I designed the training pipeline, compiled the image dataset, and executed hyperparameter tuning.",
    constraints: "Built entirely on limited laboratory hardware, requiring optimal memory allocation and precision formatting to avoid GPU out-of-memory crashes.",
    technicalApproach: "I compiled a high-quality dataset of over 8,800 image files. I implemented a training pipeline utilizing YOLOv9 with PyTorch transfer learning, applying OpenCV for contrast normalization and data augmentation. I tuned batch-sizing and utilized half-precision floating-point (FP16) variables to maximize GPU performance.",
    architectureSummary: "Real Notebook: Image Dataset -> OpenCV Spatial Normalization -> YOLOv9 PyTorch Transfer Learning -> FP16 Compilation -> TensorFlow Serving Model",
    businessOutcomes: "Achieved a verified 94.3% Mean Average Precision (mAP) on custom-compiled object datasets. The dissertation was awarded a first-class distinction at Dublin Business School.",
    tradeoffs: "1. YOLOv9 vs. ResNet: Selected the single-stage YOLOv9 model to satisfy real-time throughput limits (target 30 FPS on average processors), trading off minor fine-grained boundary layer accuracy for a 3.5x boost in overall inference speed.",
    lessonsLearned: "Data quality beats model parameters. Investing time in image augmentation (such as geometric rotation and adaptive histogram equalization) yielded a greater accuracy lift than simply running extra training epochs on raw inputs."
  },
  {
    id: "project-5",
    title: "NHS Emergency Dept. (A&E) Real-Time Analytics & Gold-Layer Delta Pipeline",
    description: "Designed a secure Databricks Lakehouse pipeline to ingest NHS A&E performance reports, standardizing patient waiting metrics through Delta Lake Bronze/Silver/Gold layers, and deployed an automated Executive Power BI Dashboard tracking HSE breach rates.",
    category: "engineering",
    projectType: "personal",
    tags: ["Databricks", "Delta Lake", "PySpark", "Delta Lake Gold Layer", "Power BI", "Databricks Workflows", "HSE Compliance"],
    tools: ["Databricks", "PySpark", "Power BI", "Workflows", "Delta Lake"],
    impact: "Automated real-time KPI generation, enabling clinical leadership to track patient waiting times and department capacity, identifying A&E compliance breaches instantly.",
    metrics: [
      { label: "Breach Rate Accuracy", value: "99.8%" },
      { label: "Ingestion Latency", value: "<15 mins" },
      { label: "QA Check Passes", value: "100% Parity" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/nhs-ae-delta-pipeline",
    liveUrl: "#",
    businessContext: "Hospital clinical operations and executive leadership struggle to monitor patient flow, A&E congestion, and bed capacity in real-time. Delays in identifying departments exceeding maximum patient-waiting limits create operational bottlenecks and pose compliance risks with HSE (Health Service Executive) standards.",
    problemStatement: "Raw A&E logs are highly unstructured, containing inconsistent timezone formats, missing admissions markers, and fragmented clinical department codes. Consolidating this data manually for daily compliance reporting is labor-intensive and error-prone.",
    whyItMattered: "NHS and HSE national mandates enforce strict breach rate standards (e.g., patient waiting times must remain under 4 hours). Real-time insight into potential breach trends allows operational teams to redirect staff and capacity before SLAs are violated, protecting patient safety.",
    myRole: "Data Architect & Analytics Engineer. I designed the Databricks ingestion schema, implemented the Silver layer cleansing scripts, and created the Power BI interactive dashboard.",
    constraints: "Must handle high-volume streaming data with strict data-quality thresholds. The pipeline must filter out patient PII records prior to Gold layer compilation in accordance with GDPR regulations.",
    technicalApproach: "I constructed an automated medallion pipeline in Databricks. Raw CSV/JSON logs are pulled into Bronze storage. A PySpark Silver stage cleans dates, infers empty discharge statuses, and drops invalid clinic IDs. The Gold layer calculates analytical aggregations (rolling 4-hour breach ratios, peak arrival patterns, and average treatment durations by ward). Workflow orchestration is managed dynamically via Databricks Job clusters.",
    architectureSummary: "Lakehouse Medallion: Raw Logs -> Bronze Delta (Ingestion) -> Silver Delta (Sanitization) -> Gold Delta (KPI Models) -> Databricks SQL Warehouse -> Power BI Gateway",
    businessOutcomes: "Delivered a fully automated, daily refreshed Power BI dashboard suite. Enabled operations leaders to monitor real-time A&E breach rates and triage high-risk waiting times. Automated daily workflows replaced 10 hours of manual spreadsheet reporting weekly.",
    tradeoffs: "1. PySpark vs. Scala Spark: Selected PySpark for writing the Silver cleansing layer due to native integration with data science libraries and faster development loops, trading minor JVM serialization performance for substantial code readability. 2. Delta Lake Lakehouse vs. Relational DB: Stored outcomes in Databricks Delta Lake instead of a traditional SQL Database, reducing ingestion cost by 50% while utilizing schema evolution to absorb upstream clinical data log updates seamlessly.",
    lessonsLearned: "Defining a global dimensional map for clinical department codes is critical. Minor variations in how ward names are registered at intake will duplicate metrics unless strictly standardized at the Silver stage."
  },
  {
    id: "project-6",
    title: "Real-Time Irish Transit Congestion Analytics Pipeline",
    description: "Engineered a real-time GTFS-RT streaming pipeline utilizing Apache Kafka and Spark Streaming to analyze Dublin Bus route congestions and trigger live transit dashboard refreshes.",
    category: "engineering",
    projectType: "personal",
    tags: ["Apache Kafka", "Apache Spark", "Spark Streaming", "Python", "PostgreSQL", "GTFS-Realtime", "Tableau BI"],
    tools: ["Kafka", "Spark", "PostgreSQL", "Tableau", "Python"],
    impact: "Ingests and processes 500+ messages/sec, calculating real-time travel delay indexes and live route schedule deviations across Dublin metropolitan transit networks.",
    metrics: [
      { label: "Ingestion Rate", value: "500+ msg/s" },
      { label: "Spark Batch Size", value: "2.5s window" },
      { label: "Latency Delta", value: "<100ms" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/irish-transit-realtime-pipeline",
    liveUrl: "#",
    businessContext: "Urban planners and transit operators in Ireland face challenges managing Dublin Bus congestion and estimating exact arrival delays during rush hours due to static schedule limitations and irregular road conditions.",
    problemStatement: "Combining live GPS vehicle location feeds with standard static schedules is highly computationally intensive. Raw feeds are noisy, contain duplicate coordinates, and fail under poor network conditions, requiring real-time filtering and deduplication.",
    whyItMattered: "Accurate real-time congestion mapping enables transit authorities to adjust bus frequencies, optimize route layouts, and provide passengers with precise ETA information, improving overall trust and ridership in public transit.",
    myRole: "Solo Developer. I set up the local Kafka cluster, built the Spark streaming subscriber, and mapped the geographic delay metrics.",
    constraints: "Must operate under strict memory ceilings on local Docker containers, forcing optimized window aggregations to prevent out-of-memory heap errors during peak traffic hours.",
    technicalApproach: "I deployed a Python script that polls Dublin Bus GTFS-RT Protobuf feeds and publishes them to an Apache Kafka topic. A Spark Streaming job subscribes to this topic, parses the spatial coordinates, performs rolling 2-minute time window aggregations to calculate average vehicle speed, and outputs processed congestion scores directly into a timescaled PostgreSQL database.",
    architectureSummary: "Kafka-Spark Streaming Stack: GTFS Protobuf Feeds -> Kafka Topic (Ingestion) -> Spark Streaming (Deduplication & Window Aggregation) -> PostgreSQL (Timescale DB) -> Tableau Live Reporting",
    businessOutcomes: "Delivered an end-to-end real-time transit analytics framework. Successfully maps Dublin metropolitan traffic density live, identifying route delays with over 98% correlation to actual historical congestion hotspots.",
    tradeoffs: "1. Spark Structured Streaming vs. Flink: Chose Spark Structured Streaming because of its native API compatibility with existing batch-based ML models, trading sub-millisecond Flink event-time latency for cleaner codebase unified with Python pipelines. 2. Kafka local broker vs. Cloud-hosted: Implemented a Dockerized local multi-node Kafka cluster to keep runtime hosting costs at zero while satisfying the benchmark throughput requirements perfectly.",
    lessonsLearned: "Always structure geospatial queries using bounding boxes or spatial indexes (like Uber's H3 index) rather than raw float calculations; indexing boosts spatial query execution speed by over 10x."
  },
  {
    id: "project-7",
    title: "Automated Portfolio Rebalancing Engine & Financial Analytics Hub",
    description: "Created an autonomous financial analytics hub that fetches real-time stock/ETF metrics via REST APIs, applies Markowitz mean-variance optimization, and delivers live portfolio allocations in a Power BI dashboard.",
    category: "bi",
    projectType: "personal",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "Markowitz Optimization", "Power BI", "REST APIs"],
    tools: ["Python", "FastAPI", "Power BI", "Docker", "PostgreSQL"],
    impact: "Automated risk analysis and portfolio optimization, computing the optimal efficient frontier across customized asset baskets in under 1.8 seconds.",
    metrics: [
      { label: "Execution Speed", value: "<1.8s" },
      { label: "Asset Coverage", value: "50+ Equities" },
      { label: "Backtesting Accuracy", value: "99.9%" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/financial-portfolio-optimizer",
    liveUrl: "#",
    businessContext: "Retail investors and fund managers spend hours executing manual spreadsheet calculations to rebalance portfolio assets according to targeted risk and volatility thresholds.",
    problemStatement: "Calculating rolling stock returns, asset covariances, and execution weights across historical datasets is highly computationally intensive and prone to circular dependency errors in traditional Excel environments.",
    whyItMattered: "Market volatility demands responsive risk management; delay in portfolio rebalancing leads to asset exposure drift, causing unnecessary risk or missed returns under fast-moving market regimes.",
    myRole: "Solo Creator. I coded the FastAPI quantitative back-end, developed the portfolio risk optimization scripts, and designed the Power BI visualization layouts.",
    constraints: "API rate limiting on free financial data endpoints required implementing local caching layers and redis database stores to persist static historical assets.",
    technicalApproach: "I built a Python backend using FastAPI to fetch historical asset close-prices. Using numpy and pandas, I calculated daily returns, rolling standard deviations, and covariance matrices. I executed a Monte Carlo simulation (10,000 runs) to plot the Markowitz Efficient Frontier, locating the optimal allocation for maximum Sharpe Ratio. Processed allocations are exposed via endpoints and queried directly by Power BI.",
    architectureSummary: "Quantitative Portfolio Stack: Financial APIs -> FastAPI Engine (Monte Carlo & Covariance Solver) -> PostgreSQL Metadata Store -> Power BI Live Data Import -> Interactive Allocations Dashboard",
    businessOutcomes: "Designed a beautiful, intuitive financial analytics workspace. Users can toggle risk limits and receive optimized asset-weight updates instantly, eliminating manual rebalancing sheets entirely and improving portfolios' risk-adjusted performance.",
    tradeoffs: "1. Monte Carlo Simulation vs. Quadratic Programming Solver: Used Monte Carlo simulation (10,000 scenarios) to plot the full efficient frontier and provide rich visual assets, trading minor mathematical precision of quadratic solvers for highly instructive risk-frontier maps. 2. FastAPI vs. Django: Selected FastAPI for its lightweight nature and native async database support, avoiding Django's heavy ORM overhead and speeding up quantitative analysis loops.",
    lessonsLearned: "Financial return calculations must use log returns (`np.log(price/price.shift(1))`) instead of simple percentage changes when aggregating across multi-year horizons to maintain strict statistical consistency and avoid compounding bias."
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Operations Analyst",
    company: "Covalen (Client: Allied Irish Banks)",
    location: "Limerick, Ireland",
    period: "August 2025 - Present",
    description: [
      "Investigate and resolve 20+ daily customer and system issues across digital banking platforms; clean compliance record maintained to date.",
      "Design and maintain strategic Power BI dashboards tracking financial KPIs and operational metrics for senior stakeholders.",
      "Conduct AML/KYC reviews and authentication validation in an audit-ready, regulated environment.",
      "Reduced customer escalation time by identifying and triaging fraud and authentication failures across Mainframe, Arcot, and Visa Access Online systems.",
      "Delivered data-driven operational insights to cross-functional global teams, enabling consistent decision-making across time zones and business units."
    ],
    skills: ["Power BI", "DAX", "Oracle SQL", "AML/KYC", "Fraud Triage", "Banking Operations"],
    highlightMetric: { label: "Daily Issues Resolved", value: "20+ Cases" }
  },
  {
    id: "exp-2",
    role: "Data Analyst & Technical Business Analyst",
    company: "Itelligence Infotech",
    location: "Pune, India",
    period: "December 2022 - December 2024",
    description: [
      "Designed an automated migration engine translating Teradata SQL to Spark-SQL — migrated 1.2PB of enterprise data to Azure Synapse with full parity and no downtime (Azure ADF, Databricks, PySpark, Terraform).",
      "Slashed issue-resolution time by 40% by engineering Python/Django automation tools, eliminating repetitive manual backend workflows for Fortune 500 clients.",
      "Cut post-deployment defects by 30% by migrating 2 legacy C++ codebases to Python, improving long-term system performance and maintainability.",
      "Improved system reporting accuracy and performance metrics by 40% by evaluating data pipeline failures with product owners and dev teams.",
      "Coordinated UAT specifications and data integration risk assessments for Fortune 500 SaaS client rollouts, ensuring zero critical post-launch failures.",
      "Accelerated team onboarding by 50% through technical documentation and mentoring of 3 junior developers."
    ],
    skills: ["Azure Synapse", "Databricks", "PySpark", "Azure ADF", "Python", "Teradata SQL", "Terraform"],
    highlightMetric: { label: "Enterprise Migration", value: "1.2PB Done" }
  },
  {
    id: "exp-3",
    role: "Software Developer & Technical Support QA",
    company: "HiCounselor",
    location: "San Francisco, CA (Remote)",
    period: "August 2022 - December 2022",
    description: [
      "Decomposed failed Jenkins logs and deployed a self-healing LLM-driven data diagnostic pipeline using Gemini API, cutting pipeline crash recovery times from 14 hours to under 4 minutes.",
      "Built and maintained automated test suites (Selenium WebDriver, Python), cutting manual QA time by ~35% and improving code test coverage.",
      "Engineered secure SQL/Python data pipelines with built-in quality control standards, supporting reliable software deployment cycles.",
      "Developed modular, reusable Object-Oriented Programming (OOP) automation scripts in Python, improving code maintainability and reducing rework time.",
      "Audited backend API transactions using Postman and Python script automations, validating security access layers."
    ],
    skills: ["Python", "Gemini API", "Selenium WebDriver", "Jenkins CI/CD", "Postman", "SQL"],
    highlightMetric: { label: "Downtime Reduced", value: "14h to <4m" }
  },
  {
    id: "exp-4",
    role: "Business Data Analyst",
    company: "Equitas Small Finance Bank",
    location: "Chennai, India",
    period: "September 2021 - August 2022",
    description: [
      "Built high-performance predictive models (Random Forest, Linear Regression) on banking datasets, surfacing hidden customer behavior patterns for strategic use.",
      "Contributed to production mobile banking app using Appzillon + Oracle SQL, serving real end-users in a regulated financial environment.",
      "Ensured seamless API integration for SMS Configurator by designing and executing comprehensive Postman test cases, reducing pre-launch integration errors.",
      "Supported project teams during customer-facing system implementations, writing Postgres SQL queries to audit transactions, validating security permissions, and drafting clear user guides."
    ],
    skills: ["Oracle SQL", "Predictive Modeling", "Postgres SQL", "Appzillon", "Postman", "API Audits"],
    highlightMetric: { label: "Model Inferences", value: "Random Forest" }
  },
  {
    id: "exp-5",
    role: "Business Analyst Intern",
    company: "Swiggy",
    location: "Amaravati, India",
    period: "September 2019 - December 2019",
    description: [
      "Interned at Bundl Technology Private Limited as a Business Analyst, responsible for creating a business intelligence model for Swiggy to analyze data and support strategic decision-making.",
      "Utilized Microsoft Excel to track and analyze various features such as customers, accounts, offers, business won, lost deals, and marketing campaigns.",
      "Collaborated with Marketing, Sales, and Pricing teams to ensure data accuracy and implement improvements in data tracking and analysis processes."
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
      { name: "Gemini API / LLM Integrations", level: 85 },
      { name: "Terraform (IaC)", level: 80 },
      { name: "Jenkins CI/CD", level: 85 },
      { name: "Docker & Kubernetes", level: 75 },
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
    specialization: "Data Analytics (Data Science focus)",
    highlights: [
      "Graduated with First Class Distinction",
      "Completed Master's dissertation: Engineered an advanced, multi-class object detection deep learning pipeline using YOLOv9, TensorFlow, and OpenCV, achieving a verified 94.3% inference accuracy on an 8,800+ image dataset."
    ]
  },
  {
    institution: "SRM University",
    degree: "Bachelor of Technology (BTech)",
    period: "June 2018 - May 2022",
    specialization: "Computer Science",
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
