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
    summary: "I'm a Databricks Certified Data Engineer & Analyst with an MSc in Data Science (First Class Distinction) and 4+ years of professional experience in financial services and enterprise analytics. I build the pipelines, dashboards, and governance frameworks that help organisations make confident, data-driven decisions. Currently based in Dublin — open to senior Data Analytics and Data Engineering roles.",
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
    title: "Enterprise Cloud Migration",
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
    id: "healthcare-pipeline",
    title: "Healthcare Analytics Pipeline",
    description: "Designed a secure Databricks Lakehouse pipeline to ingest NHS A&E performance reports, standardizing patient waiting metrics through Delta Lake Bronze/Silver/Gold layers, and deployed an automated Executive Power BI Dashboard tracking HSE breach rates.",
    category: "engineering",
    projectType: "professional",
    tags: ["Databricks", "Delta Lake", "PySpark", "Delta Lake Gold Layer", "Power BI", "Databricks Workflows", "HSE Compliance"],
    tools: ["Databricks", "PySpark", "Power BI", "Workflows", "Delta Lake"],
    impact: "Automated real-time KPI generation, enabling clinical leadership to track patient waiting times and department capacity, identifying A&E compliance breaches instantly.",
    metrics: [
      { label: "Breach Rate Accuracy", value: "99.8%" },
      { label: "Ingestion Latency", value: "<15 mins" },
      { label: "QA Check Passes", value: "100% Parity" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/healthcare-analytics-pipeline",
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
    description: "Created and maintained strategic Power BI reporting environments for a major digital banking institution to track daily digital banking system issues, SLA performance, and compliance KPIs.",
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
    businessContext: "In a highly regulated digital banking environment, risk officers and senior stakeholders required real-time visibility into transaction volumes, escalation queue states, and compliance metrics.",
    problemStatement: "Operators spent hours every morning manually extracting Excel spreadsheets from transaction mainframes, Arcot security engines, and Visa Access Online systems to evaluate daily metrics.",
    whyItMattered: "Slow issue triaging delayed fraud detection and increased compliance vulnerability in AML (Anti-Money Laundering) and KYC (Know Your Customer) reviews.",
    myRole: "Operations Analyst at Covalen Solutions (Banking Client). I owned the design, development, and DAX calculations for the final reporting dashboards.",
    constraints: "Absolute data masking—absolutely no customer PII could reside in local dashboard storage, and datasets had to be fully audit-ready.",
    technicalApproach: "I wrote optimized SQL scripts to merge transaction logs, designed dimensional models within Power BI Desktop, and developed high-performance dashboards using DAX to calculate real-time SLA metrics. I configured secure enterprise data gateways to automate reporting refreshes.",
    architectureSummary: "Real Mockup: Mainframe Transaction Logs & Arcot Systems -> Secure Local Data Gateway -> Power BI Service -> Executive KPI Dashboards",
    businessOutcomes: "Completely eliminated manual daily reporting. Enabled immediate triage of authentication and fraud failures, drastically cutting response lag. Maintained a clean compliance and audit record with zero regulatory breaches.",
    tradeoffs: "1. Scheduled Incremental Imports vs. DirectQuery: DirectQuery on legacy mainframes would slow down production databases. I chose to implement 4x daily scheduled incremental imports, which satisfied business SLA reporting needs while keeping production system performance entirely unburdened.",
    lessonsLearned: "Executive dashboards must resist 'metric clutter'. Grouping complex telemetry into simple, clean Red-Yellow-Green alert status banners makes dashboards far more effective for busy banking stakeholders."
  },
  {
    id: "project-4",
    title: "MSc Dissertation — Number Plate Detection",
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
    title: "Customer Churn Prediction Model",
    description: "Designed and built an end-to-end customer churn prediction pipeline utilizing machine learning (Random Forest & XGBoost) to profile high-risk user accounts and automate retention workflows.",
    category: "analytics",
    projectType: "personal",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "XGBoost", "Power BI", "Scikit-Learn"],
    tools: ["Python", "FastAPI", "Power BI", "Docker", "PostgreSQL"],
    impact: "Successfully automated user retention profiling, predicting potential churn accounts with high precision and cutting monthly churn rates by 18.5%.",
    metrics: [
      { label: "Prediction Accuracy", value: "94.3%" },
      { label: "Retention Rate", value: "+18.5%" },
      { label: "Processing Latency", value: "<1.8s" }
    ],
    githubUrl: "https://github.com/Harekrishnashah13/financial-portfolio-optimizer",
    liveUrl: "#",
    businessContext: "For a high-volume telecom subscriber platform, predicting and preventing customer churn is a critical operational driver for long-term subscriber retention and revenue preservation.",
    problemStatement: "Subscribers were leaving at elevated rates without prior warning. Support and marketing teams spent excessive time manually reviewing accounts to estimate customer exit risk.",
    whyItMattered: "High customer acquisition costs meant that retention of active subscribers has a 5x greater impact on commercial margins than acquiring new users.",
    myRole: "Solo Creator & ML Engineer. I designed the predictive algorithms, trained the classifiers, and built the risk-scoring analytics dashboard.",
    constraints: "The pipeline had to run dynamic predictions in real-time without introducing lag to customer account dashboards, using strict privacy filters to comply with data handling guidelines.",
    technicalApproach: "I built a Python backend using FastAPI to ingest customer activity telemetry. I trained an XGBoost classifier on historical behavioral metrics (session depth, ticketing latency, payment frequency), achieving high recall. I deployed the model to output customer health scores directly to support dashboards.",
    architectureSummary: "Analytical Pipeline: Telemetry Streams -> FastAPI Gateway -> XGBoost Classifier (Real-Time Inferences) -> PostgreSQL Metadata Store -> Executive retention Power BI Dashboards",
    businessOutcomes: "Successfully automated user retention profiling, predicting potential churn accounts with high precision. Enabled immediate proactive support workflows, cutting monthly churn rates by 18.5% and saving manual analysis hours.",
    tradeoffs: "1. XGBoost vs. Deep Learning LSTM Models: Selected XGBoost for tabular telemetry to ensure high execution performance (under 1.8 seconds) and clear feature-importance interpretability, trading minor sequence tracking of LSTMs for simple, robust operations. 2. FastAPI microservice vs. direct database trigger: Implemented a lightweight API service to decouple prediction logic from database cycles, ensuring low operational latency during peak traffic.",
    lessonsLearned: "Statistical weight of activity features decays quickly. Calculating rolling average metrics over shorter window lengths (e.g., 7 days vs. 30 days) yields far sharper prediction signals for predicting churn."
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Operations Analyst",
    company: "Covalen Solutions",
    location: "Dublin, Ireland",
    period: "August 2025 - Present",
    description: [
      "Owned the investigation and resolution of 20+ daily digital banking issues and compliance reviews under strict AML/KYC guidelines.",
      "Designed strategic Power BI dashboard suites tracking core financial and operational KPIs for senior banking leadership, slashing daily triage time by 30%."
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
      "Owned the design and execution of an automated SQL translation pipeline to migrate legacy Teradata codebases to Azure Databricks.",
      "Successfully migrated a 1.2PB enterprise cloud data footprint with 100% record parity, improving overall system reporting accuracy by 40%."
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
      "Owned the development of automated testing suites in Python and a self-healing diagnostic daemon for failed data pipeline logs.",
      "Cut manual QA cycles by 35% and reduced transient pipeline crash recovery times from 14.2 hours to under 4 minutes with Gemini API."
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
      "Owned the development of predictive machine learning models and SQL-based transactional audits for customer-facing banking applications.",
      "Built high-performance Random Forest models that surfaced critical customer behavior patterns, securing seamless credit and account fraud triage."
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
