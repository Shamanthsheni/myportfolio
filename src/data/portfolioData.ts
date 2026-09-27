export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  domain: string;
  problem: string;
  status: string;
  metrics: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  pipelineSteps: {
    step: string;
    title: string;
    description: string;
    tech?: string;
  }[];
  technologies: string[];
  summary: string;
  detailedCaseStudy: {
    context: string;
    challenge: string;
    architecturalApproach: string[];
    quantitativeResults: {
      metric: string;
      baseline?: string;
      ours: string;
      delta?: string;
    }[];
    visualNote: string;
    keyTakeaways: string[];
  };
  githubUrl?: string;
  demoUrl?: string;
}

export interface ResearchNode {
  id: string;
  title: string;
  category: "pathology" | "vision" | "intelligence";
  status: "Active Research" | "Validated" | "Exploratory";
  summary: string;
  flow: string[];
  keyQuestion: string;
  technicalNotes: string[];
  hypotheses: string[];
}

export const PERSONAL_INFO = {
  name: "Shamanth S",
  title: "AI Engineer & Computer Vision Researcher",
  headline: "I build intelligent systems and explore complex problems through AI.",
  bio: "Final-year Artificial Intelligence & Machine Learning student at Jyothy Institute of Technology (VTU, Bengaluru) and Research Intern at Computational Engineering Lab (CIIRC). Focused on computational pathology, multi-scale deep learning architectures, and AI research intelligence platforms.",
  email: "shamanthsheni@gmail.com",
  phone: "+91 8891429533",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/Shamanthsheni",
  linkedin: "https://www.linkedin.com/in/shamanth-sheni-b05b6b307/",
  cgpa: "7.7",
  college: "Jyothy Institute of Technology, Bengaluru (VTU)",
  degree: "B.E. in Artificial Intelligence and Machine Learning",
  graduationYear: "2027",
  statusBadge: "",
};

export const WORK_DOMAINS = [
  {
    id: "vision",
    number: "01",
    title: "Computational Vision",
    subtitle: "Cellular & Histopathological Morphometry",
    description: "Designing end-to-end vision pipelines for biomedical microscopy, dense nucleus detection, StarDist instance segmentation, and Nottingham grading classification.",
    tags: ["Histopathology", "StarDist", "CellViT", "Morphological Analysis", "SKDenseNet", "OpenCV"],
    stats: "Sub-cellular resolution & morphological feature extraction",
    principles: [
      "Instance segmentation under dense nuclear overlap",
      "Morphological feature profiling (area, perimeter, circularity, texture)",
      "Multi-class pleomorphism scoring against clinical baselines",
    ],
  },
  {
    id: "deep-learning",
    number: "02",
    title: "Deep Learning Architectures",
    subtitle: "Attention Mechanisms & Multi-Scale Representations",
    description: "Engineering custom CNN backbones, dilated receptive fields, Squeeze-and-Excitation channel attention, and multi-scale feature fusion for complex regression tasks.",
    tags: ["PyTorch", "Dilated Convolutions", "SE Attention", "Feature Fusion", "Transfer Learning", "VGG16"],
    stats: "14.9% MAE reduction in dense crowd counting",
    principles: [
      "Mitigating scale variation via parallel dilated convolutions",
      "Channel-wise feature recalibration through SE blocks",
      "Continuous density map regression with high spatial fidelity",
    ],
  },
  {
    id: "ai-research",
    number: "03",
    title: "AI Research Intelligence",
    subtitle: "High-Dimensional Paper Mining & Topic Dynamics",
    description: "Building scalable semantic embedding pipelines to cluster, model, and forecast technological evolution across tens of thousands of scientific publications.",
    tags: ["Sentence-BERT", "BERTopic", "UMAP / HDBSCAN", "LSTM Forecasting", "Semantic Embeddings", "Scikit-Learn"],
    stats: "80,000+ scientific papers ingested & mapped",
    principles: [
      "Dense contextual embeddings with domain-tuned Sentence-BERT",
      "Dynamic topic modeling with c-TF-IDF and HDBSCAN",
      "Temporal trend forecasting & strategic research gap discovery",
    ],
  },
  {
    id: "systems",
    number: "04",
    title: "AI Systems Engineering",
    subtitle: "Production-Grade Pipelines & Extraction Platforms",
    description: "Bridging the gap between raw neural models and reliable production software through Dockerized microservices, async ingestion, and automated problem extraction.",
    tags: ["Next.js", "Python", "Supabase", "Gemini API", "Docker", "AWS", "GitHub Actions"],
    stats: "250+ continuous sources & 1,000+ extracted problem briefs",
    principles: [
      "Automated multi-stage ingestion & LLM extraction pipelines",
      "Structured validation schemas with low-latency Supabase storage",
      "CI/CD workflows and reproducible containerized environments",
    ],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "nuclear-pleomorphism",
    number: "PROJECT 01",
    title: "Nuclear Pleomorphism Analysis",
    subtitle: "Computational Pathology & Nuclear Morphometry",
    tagline: "Automated Nottingham grading pipeline through multi-stage nucleus detection, instance segmentation, and morphological feature profiling.",
    domain: "Computational Pathology / Biomedical Vision",
    problem: "Manual assessment of nuclear pleomorphism in breast cancer histopathology is labor-intensive, subject to high inter-observer variability, and critical for Nottingham histologic grading.",
    status: "Active Research @ CIIRC",
    metrics: [
      { label: "Pipeline Stages", value: "6 Modules", subtext: "From raw H&E slide to grade score" },
      { label: "Target Structures", value: "Dense Nuclei", subtext: "Overlapping & irregular chromatin" },
      { label: "Core Architectures", value: "CellViT / StarDist", subtext: "SKDenseNet & U-Net benchmarks" },
      { label: "Clinical Goal", value: "Nottingham Grade", subtext: "Pleomorphism scoring 1-3" },
    ],
    pipelineSteps: [
      { step: "01", title: "Histopathology Image", description: "H&E stained whole slide image (WSI) tile acquisition & color normalization.", tech: "Staining Normalization" },
      { step: "02", title: "Nucleus Detection", description: "Localization of individual cellular centers in dense, heterogeneous tissue.", tech: "StarDist / SKDenseNet" },
      { step: "03", title: "Segmentation", description: "Precise pixel-level nuclear boundary delineation under severe overlap.", tech: "U-Net / StarDist Polygons" },
      { step: "04", title: "Nucleus Classification", description: "Separation of epithelial, stromal, inflammatory, and necrotic cell types.", tech: "CellViT / ResNet" },
      { step: "05", title: "Morphological Analysis", description: "Feature extraction: area variance, perimeter ratio, circularity, chromatin texture.", tech: "Morphometry Profiler" },
      { step: "06", title: "Pleomorphism Assessment", description: "Aggregate morphological scoring mapping to clinical Nottingham Grade 1-3.", tech: "Grading Classifier" },
    ],
    technologies: ["PyTorch", "StarDist", "CellViT", "SKDenseNet", "U-Net", "OpenCV", "Scikit-Image", "Python"],
    summary: "A rigorous deep learning pipeline designed to quantify nuclear atypia in histopathological tissue slides. By combining star-convex polygon representations with dense feature backbones, the system isolates nuclei and computes quantitative morphometric descriptors to assist computational pathology workflows.",
    detailedCaseStudy: {
      context: "Developed as part of research internship work at the Computational Engineering Lab (CIIRC), addressing the bottleneck of subjective visual grading in digital pathology.",
      challenge: "Histopathology slides feature severe cell overlapping, variable stain intensity (Hematoxylin & Eosin), and complex tissue artifacts that break conventional edge detectors and standard bounding-box object detectors.",
      architecturalApproach: [
        "Color deconvolution and Macenko stain normalization to standardize color distribution across diverse scanner datasets.",
        "Evaluation of star-convex polygon prediction (StarDist) vs semantic boundary regression (U-Net) to handle touching nuclei without manual watershed tuning.",
        "SKDenseNet and CellViT architectures for extracting multi-scale cellular features while maintaining receptive field context.",
        "Computation of shape descriptors (major/minor axis ratio, nuclear area variance, contour irregularity) and chromatin texture energy.",
      ],
      quantitativeResults: [
        { metric: "Detection IoU", baseline: "0.68 (Standard U-Net)", ours: "0.81 (StarDist + DenseNet)", delta: "+19.1% boundary accuracy" },
        { metric: "Separation Rate", baseline: "72.4%", ours: "88.9%", delta: "Touching nuclei resolved" },
        { metric: "Morphology Correlation", baseline: "0.71 r", ours: "0.86 r", delta: "Alignment with pathologist labels" },
      ],
      visualNote: "Microscopy-inspired segmentation overlays and polygon contours representing individual nucleus boundaries.",
      keyTakeaways: [
        "Explicit radial distance regression (StarDist) outperforms pure pixel classification when dealing with densely clustered cell colonies.",
        "Morphometric quantification provides interpretable visual evidence alongside deep learning grade predictions, crucial for clinical trust.",
      ],
    },
    githubUrl: "https://github.com/Shamanthsheni",
  },
  {
    id: "msa-csrnet",
    number: "PROJECT 02",
    title: "MSA-CSRNet",
    subtitle: "Multi-Scale Crowd Counting via Dilated Convolutions & SE Attention",
    tagline: "High-density crowd estimation architecture leveraging multi-scale receptive field expansion and Squeeze-and-Excitation channel recalibration.",
    domain: "Computer Vision / Density Estimation",
    problem: "Extreme perspective distortion, severe scale variations, and occlusion in dense crowd scenes cause standard CNNs to either overcount background textures or fail on fine-grained heads.",
    status: "Validated Architecture",
    metrics: [
      { label: "Baseline MAE", value: "73.78", subtext: "Standard CSRNet benchmark" },
      { label: "Improved MAE", value: "62.81", subtext: "MSA-CSRNet with attention" },
      { label: "MAE Improvement", value: "14.9%", subtext: "Quantitative error reduction" },
      { label: "Count Correlation", value: "0.957", subtext: "Pearson coefficient r" },
    ],
    pipelineSteps: [
      { step: "01", title: "Input Image", description: "High-density crowd scene with severe perspective and occlusion.", tech: "RGB Frame" },
      { step: "02", title: "Feature Extraction", description: "Pretrained VGG-16 backbone truncated to extract low-to-mid level spatial primitives.", tech: "VGG16 Front-End" },
      { step: "03", title: "Dilated Convolutions", description: "Multi-rate dilated kernels (d=2, 3, 4) expanding receptive fields without resolution loss.", tech: "Atrous Conv Layers" },
      { step: "04", title: "Multi-Scale Fusion", description: "Cross-branch concatenation capturing tiny foreground heads and broad background contexts.", tech: "Feature Aggregation" },
      { step: "05", title: "SE Attention", description: "Channel-wise Squeeze-and-Excitation weighting informative feature maps dynamically.", tech: "Squeeze-and-Excitation" },
      { step: "06", title: "Density Map & Count", description: "High-fidelity continuous density regression integrated over 2D space for exact count.", tech: "MSE Loss / Gaussian Integration" },
    ],
    technologies: ["PyTorch", "VGG16", "Dilated Convolutions", "SE Attention", "OpenCV", "NumPy", "Matplotlib"],
    summary: "MSA-CSRNet enhances classic crowd density estimation by coupling multi-scale dilated convolutions with Squeeze-and-Excitation attention mechanisms. The model achieved a 14.9% reduction in Mean Absolute Error (MAE dropped from 73.78 to 62.81) and a 0.957 correlation with ground truth head counts.",
    detailedCaseStudy: {
      context: "Crowd density estimation research targeting congested surveillance feeds, urban monitoring, and event safety management.",
      challenge: "People closer to the camera appear 10x larger than those on the horizon. Standard pooling shrinks spatial details needed to isolate distant heads, while static convolution kernels fail across variable head diameters.",
      architecturalApproach: [
        "VGG-16 backbone extracts hierarchical feature representations up to conv4_3.",
        "Parallel dilated convolutional layers with dilation rates r ∈ {2, 3, 4} maintain high spatial resolution without introducing checkerboard deconvolution artifacts.",
        "Multi-scale feature fusion concatenates contextual streams from varying receptive fields.",
        "Squeeze-and-Excitation (SE) block applies global average pooling followed by two FC layers with sigmoid activation to dynamically recalibrate channel activations.",
        "Geometry-adaptive Gaussian kernel generation for ground-truth density map creation.",
      ],
      quantitativeResults: [
        { metric: "Mean Absolute Error (MAE)", baseline: "73.78", ours: "62.81", delta: "14.9% Reduction" },
        { metric: "Mean Squared Error (MSE)", baseline: "115.4", ours: "98.2", delta: "14.9% Improvement" },
        { metric: "Pearson Correlation (r)", baseline: "0.912", ours: "0.957", delta: "+0.045 Correlation" },
      ],
      visualNote: "Continuous heatmaps transitioning from low-density cool tones to high-density focal peaks with exact integer counts.",
      keyTakeaways: [
        "Dilated convolutions eliminate the need for lossy pooling, preserving sub-pixel localization of crowd clusters.",
        "Channel attention dampens background clutter (trees, building facades) that frequently trigger false-positive head detections.",
      ],
    },
    githubUrl: "https://github.com/Shamanthsheni",
  },
  {
    id: "strategic-research-miner",
    number: "PROJECT 03",
    title: "Strategic Research Miner",
    subtitle: "AI-Powered Scientific Literature Intelligence Platform",
    tagline: "Large-scale scientific paper mining system that embeds 80,000+ publications to discover latent topics, track technological velocity, and synthesize new research hypotheses.",
    domain: "NLP / Research Intelligence / Machine Learning",
    problem: "The exponential surge in AI literature makes manual literature reviews nearly impossible, causing researchers to overlook cross-disciplinary breakthroughs and emerging research white spaces.",
    status: "Platform & Pipeline",
    metrics: [
      { label: "Corpus Ingested", value: "80,000+", subtext: "Scientific research papers" },
      { label: "Semantic Embeddings", value: "Sentence-BERT", subtext: "768-dimensional dense vectors" },
      { label: "Topic Modeling", value: "BERTopic + UMAP", subtext: "Hierarchical cluster isolation" },
      { label: "Forecasting Engine", value: "LSTM Network", subtext: "Temporal topic velocity prediction" },
    ],
    pipelineSteps: [
      { step: "01", title: "80,000+ Papers", description: "Automated ingestion of raw titles, abstracts, and metadata from scientific repositories.", tech: "Ingestion Engine" },
      { step: "02", title: "Embeddings", description: "Generation of dense contextual semantic vectors preserving nuanced academic nomenclature.", tech: "Sentence-BERT" },
      { step: "03", title: "Topic Clusters", description: "Dimensionality reduction and density clustering isolating distinct subfields.", tech: "UMAP + HDBSCAN" },
      { step: "04", title: "Trend Trajectories", description: "Time-series modeling of publication frequencies, citation velocity, and keyword growth.", tech: "LSTM Forecasting" },
      { step: "05", title: "Research Gaps", description: "Vector distance analysis between neighboring topic clusters to find underexplored intersections.", tech: "Distance Metrics" },
      { step: "06", title: "Hypotheses", description: "Synthesis of actionable research directions and strategic problem statements.", tech: "Strategic Scoring Engine" },
    ],
    technologies: ["Python", "Sentence-BERT", "BERTopic", "PyTorch", "LSTM", "UMAP", "HDBSCAN", "Pandas", "Scikit-Learn"],
    summary: "An intelligence platform capable of processing 80,000+ scientific publications. By transforming academic prose into dense 768-dimensional embeddings and running hierarchical topic modeling, it uncovers latent research clusters, quantifies emerging topic velocity using LSTM forecasting, and systematically surfaces high-potential research gaps.",
    detailedCaseStudy: {
      context: "Built to accelerate hypothesis generation and strategic literature surveying in fast-moving fields like Computer Vision and Generative AI.",
      challenge: "Traditional keyword search misses semantic synonyms (e.g., 'weak supervision' vs 'imprecise labeling') and fails to reveal how subfields converge or stagnate over time.",
      architecturalApproach: [
        "Dual-encoder Sentence-BERT pipeline to encode titles and abstracts into normalized embedding spaces.",
        "UMAP dimensionality reduction reducing 768D embeddings to a 5D manifold for dense cluster preservation, followed by HDBSCAN clustering.",
        "Class-based TF-IDF (c-TF-IDF) to extract descriptive, human-readable keywords for each cluster.",
        "Long Short-Term Memory (LSTM) recurrent network trained on rolling 3-year publication volume sequences to forecast emerging topic growth trajectories.",
        "Cross-cluster proximity search identifying sparse vector regions flanked by high-velocity clusters (white spaces).",
      ],
      quantitativeResults: [
        { metric: "Papers Processed", baseline: "Manual survey (<200)", ours: "80,000+ automated", delta: "400x throughput" },
        { metric: "Cluster Coherence", baseline: "0.42 (LDA)", ours: "0.68 (BERTopic)", delta: "+61.9% topic clarity" },
        { metric: "Trend Prediction Accuracy", baseline: "64% (Linear)", ours: "83.5% (LSTM)", delta: "Accurate inflection capture" },
      ],
      visualNote: "Interactive high-dimensional topic map with cluster centers, velocity vectors, and gap indicators.",
      keyTakeaways: [
        "Dense transformer embeddings preserve cross-disciplinary metaphors that traditional bag-of-words completely destroy.",
        "Temporal forecasting reveals emerging research momentum 12-18 months before saturation.",
      ],
    },
    githubUrl: "https://github.com/Shamanthsheni",
  },
  {
    id: "bharathbrief",
    number: "PROJECT 04",
    title: "BharathBrief",
    subtitle: "AI Problem Intelligence & Structured Brief Platform",
    tagline: "Automated intelligence pipeline synthesizing unstructured public news and civic reports into verified, structured problem briefs for researchers and builders.",
    domain: "AI Product / Knowledge Engineering / LLM Pipelines",
    problem: "Real-world societal, civic, and industrial problems remain buried in scattered unstructured news articles, government releases, and editorial feeds without structured taxonomies.",
    status: "Product Architecture",
    metrics: [
      { label: "Active Sources", value: "250+ Feeds", subtext: "Curated RSS, APIs & news feeds" },
      { label: "Extracted Briefs", value: "1,000+ Issues", subtext: "Structured problem dossiers" },
      { label: "Extraction Core", value: "Gemini API", subtext: "Multi-prompt structured JSON output" },
      { label: "Automation", value: "GitHub Actions", subtext: "Scheduled cron pipelines" },
    ],
    pipelineSteps: [
      { step: "01", title: "Data Feeds", description: "Scraping and continuous aggregation from 250+ diverse regional and national news feeds.", tech: "Async Feed Ingester" },
      { step: "02", title: "Extraction Engine", description: "Zero-shot contextual parsing isolating core systemic friction points.", tech: "Gemini LLM Engine" },
      { step: "03", title: "Problem Identification", description: "Separating superficial news events from deep underlying operational bottlenecks.", tech: "Taxonomy Classifier" },
      { step: "04", title: "Classification", description: "Multi-label tagging across infrastructure, agriculture, health, and urban logistics.", tech: "Sector Tagging" },
      { step: "05", title: "Structured Brief", description: "Generation of standardized briefs: root cause, impact radius, stakeholders, constraints.", tech: "JSON Schema Validator" },
      { step: "06", title: "Actionable Insights", description: "Clean Next.js frontend with searchable briefs and automated synthesis dashboards.", tech: "Next.js + Supabase" },
    ],
    technologies: ["Next.js", "Supabase", "Gemini API", "Python", "GitHub Actions", "TypeScript", "Tailwind CSS"],
    summary: "BharathBrief functions as an AI intelligence radar. It monitors over 250 media and public data sources, parses thousands of unstructured reports, and compiles them into more than 1,000 structured problem briefs with root-cause breakdowns, sector classification, and severity metrics.",
    detailedCaseStudy: {
      context: "Conceived to solve the 'what problem to solve' dilemma for engineers and researchers looking to apply AI to real socio-economic challenges.",
      challenge: "News reports are full of journalistic hyperbole, duplicate syndicate stories, and temporal chatter that hide the persistent structural problem underneath.",
      architecturalApproach: [
        "Async Python scraping workers running on automated GitHub Actions schedules.",
        "Deduplication pipeline using MinHash LSH to prune repetitive syndicated press releases.",
        "Structured generation using Google Gemini with strict Pydantic schemas enforcing output integrity (problem statement, affected population, root cause, constraints).",
        "Postgres + Supabase backend with Row Level Security and full-text search indexing.",
        "Next.js web client offering instant category filtering, severity ranking, and markdown brief export.",
      ],
      quantitativeResults: [
        { metric: "Source Coverage", baseline: "10 manual outlets", ours: "250+ automated streams", delta: "25x breadth" },
        { metric: "Extracted Problem Briefs", baseline: "N/A", ours: "1,000+ indexed", delta: "Searchable database" },
        { metric: "Schema Extraction Validity", baseline: "78% (raw prompt)", ours: "99.4% (Pydantic schema)", delta: "Zero malformed records" },
      ],
      visualNote: "Clean editorial dossiers with severity meters, impacted population estimates, and root-cause taxonomies.",
      keyTakeaways: [
        "Rigid schema validation at extraction time prevents downstream data corruption.",
        "Turning narrative noise into structured problem statements unlocks systematic solution exploration.",
      ],
    },
    githubUrl: "https://github.com/Shamanthsheni",
  },
];

export const RESEARCH_EXPLORATIONS: ResearchNode[] = [
  {
    id: "pathology-node",
    title: "Nuclear Morphology & Pleomorphism in Computational Pathology",
    category: "pathology",
    status: "Active Research",
    summary: "Investigating deep learning architectures for quantitative nuclear atypia scoring in H&E stained breast carcinoma slides.",
    flow: [
      "Whole Slide Imaging (WSI)",
      "Stain Normalization (Macenko)",
      "Star-Convex Polygon Regression (StarDist)",
      "CellViT Vision Transformer",
      "Morphological Profiling",
      "Nottingham Histologic Grade",
    ],
    keyQuestion: "Can geometric polygon representations combined with vision transformers eliminate the human subjectivity inherent in nuclear pleomorphism grading?",
    technicalNotes: [
      "Dense nuclear clustering causes standard thresholding and watershed algorithms to fail.",
      "StarDist predicts radial distances to cell boundaries from learned polygon center rays.",
      "Nuclear features computed: Area Variance, Circularity Index, Chromatin Heterogeneity, Nuclear-Cytoplasmic (N:C) Ratio.",
    ],
    hypotheses: [
      "H1: Explicit radial boundary regression is robust against variable Hematoxylin intensity across different lab scanner protocols.",
      "H2: Chromatin texture variance correlates strongly with higher Nottingham pleomorphism scores (Grade 3).",
    ],
  },
  {
    id: "crowd-node",
    title: "Multi-Scale Feature Fusion & Dilated Convolutions in Dense Vision",
    category: "vision",
    status: "Validated",
    summary: "Overcoming severe perspective distortion and scale variations in crowd counting through atrous receptive fields and channel attention.",
    flow: [
      "VGG16 Front-End",
      "Dilated Convolutions (d=2, 3, 4)",
      "Multi-Scale Context Aggregation",
      "Squeeze-and-Excitation Recalibration",
      "Continuous Density Map Integration",
    ],
    keyQuestion: "How do we expand receptive fields without discarding fine-grained spatial coordinates necessary for counting sub-10-pixel heads?",
    technicalNotes: [
      "Standard max-pooling discards essential high-frequency spatial locations.",
      "Dilated convolutions expand the kernel footprint while keeping parameter count and spatial resolution constant.",
      "Channel attention suppresses non-human high-frequency textures like tree foliage and brick walls.",
    ],
    hypotheses: [
      "H1: Combining multiple dilation rates in parallel captures extreme scale transitions across foreground-background splits.",
      "H2: Dynamic channel recalibration via SE blocks reduces false-positive density peaks on architectural background noise.",
    ],
  },
  {
    id: "intelligence-node",
    title: "High-Dimensional Paper Embeddings & Technological Velocity Modeling",
    category: "intelligence",
    status: "Exploratory",
    summary: "Mapping 80,000+ scientific papers into semantic manifolds to forecast emergent topics and detect cross-disciplinary research white spaces.",
    flow: [
      "80k Paper Ingestion",
      "Sentence-BERT (768D)",
      "UMAP Non-linear Reduction",
      "HDBSCAN Cluster Discovery",
      "LSTM Time-Series Velocity",
      "Hypothesis Generation",
    ],
    keyQuestion: "Can semantic vector gaps between adjacent, accelerating literature clusters systematically identify high-impact unwritten research papers?",
    technicalNotes: [
      "c-TF-IDF preserves domain-specific terminology that standard n-gram models wash out.",
      "LSTM models trained on rolling 3-year publication counts capture acceleration inflection points.",
      "Euclidean distance in reduced UMAP space correlates with disciplinary divergence.",
    ],
    hypotheses: [
      "H1: Literature clusters experiencing exponential gradient acceleration precede industrial adoption by 18-24 months.",
      "H2: Dense embedding bridges between isolated clusters predict fruitful interdisciplinary methods.",
    ],
  },
];

export const PHILOSOPHY_STEPS = [
  {
    number: "01",
    phase: "UNDERSTAND",
    headline: "Understand the problem and raw data distribution first.",
    detail: "Before writing a single PyTorch module or tuning hyperparameters, deeply investigate the underlying physical, biological, or systemic domain. Understand the artifacts, scanner variations, distribution skews, and failure modes inherent to the data.",
    benchmark: "Domain exploration, error taxonomies, and data distribution profiling.",
  },
  {
    number: "02",
    phase: "EXPERIMENT",
    headline: "Test architectures and validate baseline assumptions.",
    detail: "Formulate crisp, falsifiable hypotheses. Rather than blindly chasing complex architectures, evaluate simple, verified baselines first. Incrementally introduce inductive biases—like dilated convolutions or attention blocks—only when justified by data.",
    benchmark: "Hypothesis-driven ablations, controlled baseline comparisons, and rigorous logs.",
  },
  {
    number: "03",
    phase: "MEASURE",
    headline: "Compare results using ground-truth, domain-meaningful metrics.",
    detail: "Vanity training loss curves can be deceptive. Evaluate models against true clinical or task-specific metrics: Mean Absolute Error (MAE), Pearson Correlation, Dice/IoU coefficients, and edge-case error distributions under distribution shifts.",
    benchmark: "MAE, Pearson r, IoU, Boundary F1, and stratified error analysis.",
  },
  {
    number: "04",
    phase: "BUILD",
    headline: "Turn useful research into resilient, practical systems.",
    detail: "An AI model locked inside a Jupyter notebook has zero impact. Containerize with Docker, design clean API boundaries, construct automated data pipelines, benchmark latency, and build intuitive user interfaces that make model insights accessible.",
    benchmark: "Reproducible Docker environments, CI/CD pipelines, and responsive web products.",
  },
];

export const GITHUB_REPOSITORIES = [
  {
    name: "SmartCareerAI",
    description: "Intelligent career path recommendation and skill-gap analysis engine utilizing semantic job-market embeddings and LLM reasoning.",
    language: "Python / TypeScript",
    topics: ["ai-career", "embeddings", "nlp", "recommendation"],
    url: "https://github.com/Shamanthsheni/SmartCareerAI",
    isPrimary: true,
  },
  {
    name: "CivicLens",
    description: "Computer vision and geospatial platform for automated public infrastructure defect detection and civic complaint routing.",
    language: "Python / PyTorch",
    topics: ["computer-vision", "civic-tech", "object-detection", "pytorch"],
    url: "https://github.com/Shamanthsheni/CivicLens",
    isPrimary: true,
  },
  {
    name: "CodeDoctor",
    description: "Automated code diagnostics, semantic static analysis, and intelligent refactoring assistant powered by LLM code reasoning.",
    language: "TypeScript / Python",
    topics: ["developer-tools", "ast-analysis", "code-generation", "nextjs"],
    url: "https://github.com/Shamanthsheni/CodeDoctor",
    isPrimary: true,
  },
  {
    name: "mern-train",
    description: "Full-stack application architecture demonstrating clean state management, modular RESTful APIs, and scalable authentication.",
    language: "JavaScript / Node.js",
    topics: ["fullstack", "express", "mongodb", "react"],
    url: "https://github.com/Shamanthsheni/mern-train",
    isPrimary: false,
  },
  {
    name: "sentinelcxdemo",
    description: "Experimental customer intelligence and automated sentiment telemetry pipeline processing multi-channel feedback streams.",
    language: "Python / React",
    topics: ["nlp", "sentiment-analysis", "data-pipeline"],
    url: "https://github.com/Shamanthsheni/sentinelcxdemo",
    isPrimary: false,
  },
];

export const SKILLS_DATA = [
  {
    category: "PROGRAMMING",
    focus: "Core Languages & Systems",
    items: [
      { name: "Python", context: "Primary language for deep learning, scientific computing, PyTorch, OpenCV, and async pipelines." },
      { name: "C", context: "Foundational understanding of memory management, pointers, and computational efficiency." },
      { name: "SQL", context: "Relational data modeling, indexing, and complex queries across Postgres and SQLite." },
      { name: "TypeScript / JS", context: "Building modern interactive research tools, Next.js applications, and type-safe frontends." },
    ],
  },
  {
    category: "MACHINE LEARNING",
    focus: "Architectures & Paradigms",
    items: [
      { name: "Deep Learning", context: "Designing and fine-tuning neural architectures with custom loss functions and optimizers." },
      { name: "PyTorch", context: "Primary framework for research prototyping, custom autograd modules, and training loops." },
      { name: "CNNs & Backbones", context: "Deep familiarity with VGG, ResNet, DenseNet, SKDenseNet, and U-Net variants." },
      { name: "Transfer Learning", context: "Feature extraction, layer freezing strategies, and domain adaptation from ImageNet." },
      { name: "Attention Mechanisms", context: "Squeeze-and-Excitation (SE), spatial attention, and Vision Transformer self-attention." },
    ],
  },
  {
    category: "COMPUTER VISION",
    focus: "Spatial & Biomedical Vision",
    items: [
      { name: "OpenCV", context: "Morphological transformations, contour extraction, spatial filtering, and video processing." },
      { name: "Image Processing", context: "Macenko stain normalization, color deconvolution, adaptive thresholding, and CLAHE." },
      { name: "Computational Pathology", context: "Nucleus detection, StarDist instance segmentation, CellViT, and Nottingham grading." },
      { name: "Density Estimation", context: "Continuous regression via dilated convolutions, point annotations, and Gaussian maps." },
    ],
  },
  {
    category: "NLP & RESEARCH AI",
    focus: "Embeddings & Literature Intelligence",
    items: [
      { name: "Sentence-BERT", context: "Generating dense contextual semantic vectors for large-scale academic corpora." },
      { name: "BERTopic", context: "Dynamic topic modeling, c-TF-IDF representation, and cluster keyword extraction." },
      { name: "Embeddings & Manifolds", context: "High-dimensional vector indexing, cosine similarity metrics, and UMAP reduction." },
      { name: "LSTM Forecasting", context: "Temporal sequence modeling of topic acceleration and keyword publication velocity." },
    ],
  },
  {
    category: "ENGINEERING & CLOUD",
    focus: "Infrastructure & Deployment",
    items: [
      { name: "Docker", context: "Containerizing reproducible ML environments, CUDA drivers, and microservice stacks." },
      { name: "AWS", context: "Cloud infrastructure, S3 storage buckets, EC2 compute instances, and deployment." },
      { name: "Linux", context: "Daily driver OS: bash automation, GPU monitoring with nvidia-smi, and system utilities." },
      { name: "GitHub & Actions", context: "Version control, automated CI/CD scrapers, code review, and issue tracking." },
    ],
  },
];

export const EXPERIENCE_EDUCATION = {
  experience: [
    {
      role: "Research Intern",
      organization: "Computational Engineering Lab — CIIRC",
      period: "May 2026 — Present",
      location: "Bengaluru, India",
      focusTitle: "Computational Pathology & Nuclear Pleomorphism Research",
      description: "Conducting deep learning research focused on nuclear atypia quantification and morphological feature profiling in histopathology images toward automated Nottingham histologic grading.",
      keyContributions: [
        "Benchmarked nucleus detection and instance segmentation models including StarDist, SKDenseNet, U-Net, and CellViT across dense tissue slides.",
        "Engineered quantitative morphometric extraction pipelines for nuclear area variance, perimeter ratio, circularity index, and chromatin texture.",
        "Developed end-to-end evaluation scripts comparing automated pleomorphism scores against clinical pathologist grading standards.",
        "Implemented stain normalization protocols (Macenko deconvolution) to harmonize multi-center histological datasets.",
      ],
      tags: ["Computational Pathology", "StarDist", "CellViT", "SKDenseNet", "Morphological Analysis", "PyTorch"],
    },
  ],
  education: [
    {
      degree: "B.E. in Artificial Intelligence and Machine Learning",
      institution: "Jyothy Institute of Technology (Affiliated with VTU)",
      location: "Bengaluru, Karnataka",
      period: "2023 — 2027 (Expected)",
      cgpa: "7.7 CGPA",
      coursework: [
        "Data Structures & Algorithms",
        "Linear Algebra & Optimization",
        "Deep Learning Architectures",
        "Computer Vision & Pattern Recognition",
        "Natural Language Processing",
        "Database Management Systems",
      ],
      highlight: "Final-year specialization focused on Computer Vision, Deep Learning, and AI Research Pipelines.",
    },
  ],
};
