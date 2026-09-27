import { CMSData } from "@/lib/types";

export const INITIAL_CMS_DATA: CMSData = {
  profile: {
    name: "Shamanth S",
    headline: "AI / ML · COMPUTER VISION · DEEP LEARNING",
    role: "AI / ML Engineer & Computer Vision Researcher",
    bio: "I build intelligent systems, experiment with machine learning, and explore ideas that sit between AI research and real-world applications. Currently a final-year Artificial Intelligence & Machine Learning undergraduate at Jyothy Institute of Technology (VTU, Bengaluru) and Research Intern at the Computational Engineering Lab (CIIRC).",
    avatarUrl: "/images/shamanth_portrait.jpg",
    email: "shamanthsheni@gmail.com",
    phone: "+91 8891429533",
    location: "Bengaluru, Karnataka, India",
    github: "https://github.com/Shamanthsheni",
    linkedin: "https://www.linkedin.com/in/shamanth-sheni-b05b6b307/",
    resumeUrl: "/resume.pdf",
    statusBadge: "",
    skills: [
      {
        category: "Programming",
        focus: "Core Languages & Systems",
        items: [
          { name: "Python", context: "Primary language for deep learning, scientific computing, PyTorch, OpenCV, and async pipelines." },
          { name: "C", context: "Foundational understanding of memory layout, pointers, and compute efficiency." },
          { name: "SQL", context: "Relational data modeling, indexing, and complex queries across Postgres and SQLite." },
          { name: "TypeScript / JS", context: "Building modern interactive research tools, Next.js web applications, and type-safe frontends." },
        ],
      },
      {
        category: "AI / Machine Learning",
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
        category: "Computer Vision",
        focus: "Spatial & Biomedical Vision",
        items: [
          { name: "OpenCV", context: "Morphological transformations, contour extraction, spatial filtering, and video processing." },
          { name: "Image Processing", context: "Macenko stain normalization, color deconvolution, adaptive thresholding, and CLAHE." },
          { name: "Computational Pathology", context: "Nucleus detection, StarDist instance segmentation, CellViT, and Nottingham grading." },
          { name: "Density Estimation", context: "Continuous regression via dilated convolutions, point annotations, and Gaussian density maps." },
        ],
      },
      {
        category: "NLP & Research AI",
        focus: "Embeddings & Literature Intelligence",
        items: [
          { name: "Sentence-BERT", context: "Generating dense contextual semantic vectors for large-scale academic corpora." },
          { name: "BERTopic", context: "Dynamic topic modeling, c-TF-IDF representation, and cluster keyword extraction." },
          { name: "Embeddings & Manifolds", context: "High-dimensional vector indexing, cosine similarity metrics, and UMAP reduction." },
          { name: "LSTM Forecasting", context: "Temporal sequence modeling of topic acceleration and keyword publication velocity." },
        ],
      },
      {
        category: "Engineering & Cloud",
        focus: "Infrastructure & Deployment",
        items: [
          { name: "Docker", context: "Containerizing reproducible ML environments, CUDA drivers, and microservice stacks." },
          { name: "AWS", context: "Cloud infrastructure, S3 storage buckets, EC2 compute instances, and deployment." },
          { name: "Linux", context: "Daily driver OS: bash automation, GPU monitoring with nvidia-smi, and system utilities." },
          { name: "GitHub & Actions", context: "Version control, automated CI/CD scrapers, code review, and scheduled pipelines." },
        ],
      },
    ],
    experience: [
      {
        role: "Research Intern",
        organization: "Computational Engineering Lab — CIIRC",
        period: "May 2026 — Present",
        location: "Bengaluru, India",
        focusTitle: "Computational Pathology & Nuclear Pleomorphism Analysis",
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
        institution: "Jyothy Institute of Technology (VTU — Bengaluru)",
        location: "Bengaluru, Karnataka",
        period: "2023 — 2027",
        cgpa: "7.7",
        coursework: [
          "Data Structures & Algorithms",
          "Linear Algebra & Optimization",
          "Deep Learning Architectures",
          "Computer Vision & Pattern Recognition",
          "Natural Language Processing",
          "Database Management Systems",
        ],
        highlight: "Specialization in Computer Vision, Deep Learning, and AI Research Pipelines.",
      },
    ],
  },
  projects: [
    {
      id: "nuclear-pleomorphism",
      slug: "nuclear-pleomorphism-analysis",
      title: "Nuclear Pleomorphism Analysis",
      shortDescription: "Automated Nottingham grading pipeline through multi-stage nucleus detection, instance segmentation, and morphological feature profiling.",
      category: "Computer Vision & Pathology",
      year: "2024",
      technologies: ["PyTorch", "StarDist", "CellViT", "SKDenseNet", "U-Net", "OpenCV", "Scikit-Image", "Python"],
      thumbnail: "/images/nuclear-pleomorphism.jpg",
      gallery: ["/images/nuclear-pleomorphism.jpg"],
      githubUrl: "https://github.com/Shamanthsheni",
      demoUrl: "",
      featured: true,
      published: true,
      order: 1,
      metrics: [
        { label: "Detection IoU", value: "0.81", subtext: "+19.1% boundary accuracy vs U-Net" },
        { label: "Separation Rate", value: "88.9%", subtext: "Touching nuclei resolved" },
        { label: "Morphology Correlation", value: "0.86 r", subtext: "Alignment with pathologist labels" },
        { label: "Pipeline Stages", value: "6 Modules", subtext: "Slide tile to Nottingham grade" },
      ],
      caseStudy: {
        problem: "Manual assessment of nuclear pleomorphism in breast cancer histopathology is labor-intensive, subject to high inter-observer variability (up to 30% disagreement among pathologists), and critical for Nottingham histologic grading. Dense nuclear overlapping and variable Hematoxylin & Eosin (H&E) staining confound standard automated segmentation.",
        approach: [
          "Stain Normalization: Applied Macenko optical density deconvolution to standardize RGB variations across different lab scanners.",
          "Star-Convex Polygon Regression: Implemented StarDist to regress radial distances to cell boundaries from learned nuclei centers, preventing touching cells from merging into single blobs.",
          "Feature Backbone Benchmarks: Evaluated SKDenseNet and CellViT architectures for extracting multi-scale cellular features while maintaining spatial context.",
          "Quantitative Morphometry: Extracted 14 shape and texture descriptors including major/minor axis ratios, nuclear perimeter irregularity, chromatin clumpiness, and nuclear-cytoplasmic (N:C) ratios.",
          "Pleomorphism Scoring: Mapped aggregated morphometric distributions directly to clinical Nottingham Grade 1-3 definitions.",
        ],
        technologies: ["PyTorch", "StarDist", "CellViT", "SKDenseNet", "U-Net", "OpenCV", "Scikit-Image", "Python"],
        process: [
          { step: "01", title: "WSI Tile Acquisition", description: "H&E stained slide tile extraction and Macenko stain normalization.", tech: "Staining Normalization" },
          { step: "02", title: "Nucleus Detection", description: "Localization of individual cellular centers in dense tissue clusters.", tech: "StarDist / SKDenseNet" },
          { step: "03", title: "Instance Boundary Segmentation", description: "Star-convex polygon regression resolving overlapping boundaries.", tech: "StarDist Polygons" },
          { step: "04", title: "Cell Classification", description: "Separation of epithelial, stromal, and lymphocytic cell types.", tech: "CellViT / ResNet" },
          { step: "05", title: "Morphometric Feature Profiling", description: "Quantification of area variance, circularity, and chromatin texture.", tech: "Morphometry Profiler" },
          { step: "06", title: "Pleomorphism Grade Inference", description: "Hierarchical grade scoring mapping to clinical Nottingham standards.", tech: "Grading Classifier" },
        ],
        results: [
          { metric: "Detection IoU", baseline: "0.68 (Standard U-Net)", ours: "0.81 (StarDist + DenseNet)", delta: "+19.1% boundary accuracy" },
          { metric: "Touching Separation Rate", baseline: "72.4%", ours: "88.9%", delta: "+16.5% resolved" },
          { metric: "Pathologist Correlation (r)", baseline: "0.71 r", ours: "0.86 r", delta: "+0.15 correlation" },
          { metric: "Inference Throughput", baseline: "1.2 sec / tile", ours: "0.34 sec / tile", delta: "3.5x faster" },
        ],
        learned: "Explicit radial distance regression fundamentally outperforms pixel-level binary classification when handling crowded cellular colonies. Furthermore, coupling black-box deep learning scores with interpretable morphometric statistics (variance of nuclear area, circularity deviation) is essential for clinical trust.",
        visualNote: "Microscopy-inspired segmentation overlays and polygon contours representing individual nucleus boundaries.",
      },
    },
    {
      id: "msa-csrnet",
      slug: "msa-csrnet-crowd-counting",
      title: "MSA-CSRNet",
      shortDescription: "High-density crowd estimation architecture leveraging multi-scale dilated convolutions and Squeeze-and-Excitation channel recalibration.",
      category: "Deep Learning & Vision",
      year: "2024",
      technologies: ["PyTorch", "VGG16", "Dilated Convolutions", "SE Attention", "OpenCV", "NumPy", "Matplotlib"],
      thumbnail: "/images/msa-csrnet.jpg",
      gallery: ["/images/msa-csrnet.jpg"],
      githubUrl: "https://github.com/Shamanthsheni",
      demoUrl: "",
      featured: true,
      published: true,
      order: 2,
      metrics: [
        { label: "Baseline MAE", value: "73.78", subtext: "Standard CSRNet benchmark" },
        { label: "Improved MAE", value: "62.81", subtext: "MSA-CSRNet with SE Attention" },
        { label: "MAE Improvement", value: "14.9%", subtext: "Quantitative error reduction" },
        { label: "Count Correlation", value: "0.957", subtext: "Pearson coefficient r" },
      ],
      caseStudy: {
        problem: "Extreme perspective distortion, severe scale variations, and background clutter in dense surveillance scenes cause standard CNNs to either overcount background textures (like trees and architectural facades) or fail on tiny, distant heads.",
        approach: [
          "Pretrained Backbone: Leveraged the first 10 layers of VGG-16 for low-level spatial and texture feature extraction.",
          "Multi-Scale Dilated Receptive Fields: Replaced downsampling pooling with parallel dilated convolutional branches (dilation rates d=2, 3, 4) to capture heads of widely varying diameters without spatial resolution loss.",
          "Squeeze-and-Excitation Attention: Added SE channel recalibration blocks that compute global channel statistics and dynamically amplify informative crowd features while suppressing static architectural clutter.",
          "Continuous Density Map Regression: Trained with Euclidean loss against geometry-adaptive Gaussian kernel density targets.",
        ],
        technologies: ["PyTorch", "VGG16", "Dilated Convolutions", "SE Attention", "OpenCV", "NumPy", "Matplotlib"],
        process: [
          { step: "01", title: "Input Surveillance Frame", description: "High-density crowd scene with severe perspective distortion.", tech: "RGB Image" },
          { step: "02", title: "Backbone Feature Extraction", description: "Truncated VGG-16 backbone preserving spatial primitives.", tech: "VGG16 Front-End" },
          { step: "03", title: "Parallel Dilated Convolutions", description: "Multi-rate atrous kernels (d=2, 3, 4) capturing multi-scale context.", tech: "Atrous Conv Layers" },
          { step: "04", title: "Multi-Scale Fusion", description: "Cross-branch concatenation preserving foreground and background context.", tech: "Feature Aggregation" },
          { step: "05", title: "Channel-wise SE Attention", description: "Dynamic channel weighting suppressing non-human high-frequency clutter.", tech: "SE Blocks" },
          { step: "06", title: "Density Map & Head Count", description: "Continuous 2D density integration yielding high-accuracy crowd count.", tech: "Gaussian Integration" },
        ],
        results: [
          { metric: "Mean Absolute Error (MAE)", baseline: "73.78", ours: "62.81", delta: "14.9% Reduction" },
          { metric: "Mean Squared Error (MSE)", baseline: "115.4", ours: "98.2", delta: "14.9% Improvement" },
          { metric: "Pearson Correlation (r)", baseline: "0.912", ours: "0.957", delta: "+0.045 Correlation" },
        ],
        learned: "Maintaining native spatial resolution via dilated convolutions prevents the loss of sub-10-pixel targets. Combining parallel dilation rates with SE channel attention creates an elegant balance between receptive field expansion and noise suppression.",
        visualNote: "Continuous heatmaps transitioning from low-density cool tones to high-density focal peaks with exact integer counts.",
      },
    },
    {
      id: "strategic-research-miner",
      slug: "strategic-research-miner",
      title: "Strategic Research Miner",
      shortDescription: "Large-scale scientific paper mining system embedding 80,000+ publications to discover latent topics and forecast technological velocity.",
      category: "Research Intelligence & NLP",
      year: "2024",
      technologies: ["Python", "Sentence-BERT", "BERTopic", "PyTorch", "LSTM", "UMAP", "HDBSCAN", "Pandas", "Scikit-Learn"],
      thumbnail: "/images/strategic-research-miner.jpg",
      gallery: ["/images/strategic-research-miner.jpg"],
      githubUrl: "https://github.com/Shamanthsheni",
      demoUrl: "",
      featured: true,
      published: true,
      order: 3,
      metrics: [
        { label: "Corpus Ingested", value: "80,000+", subtext: "Scientific research papers" },
        { label: "Semantic Embeddings", value: "Sentence-BERT", subtext: "768-dimensional dense vectors" },
        { label: "Topic Coherence", value: "0.68", subtext: "+61.9% clarity vs classic LDA" },
        { label: "Trend Forecasting", value: "83.5%", subtext: "LSTM trajectory accuracy" },
      ],
      caseStudy: {
        problem: "The exponential surge in AI publications makes manual literature reviews nearly impossible. Traditional keyword search queries miss semantic synonyms and fail to reveal how subfields converge or where high-potential research white spaces exist.",
        approach: [
          "Automated Ingestion Pipeline: Built asynchronous harvesters to ingest titles, abstracts, author networks, and publication timestamps across 80,000+ scientific papers.",
          "Dense Contextual Embeddings: Utilized Sentence-BERT to generate 768-dimensional semantic embeddings preserving subtle academic nomenclature.",
          "Hierarchical Manifold Clustering: Reduced dimensionality via UMAP to a 5D manifold and performed density clustering using HDBSCAN with c-TF-IDF keyword extraction.",
          "Temporal Trajectory Forecasting: Trained LSTM recurrent neural networks on 3-year rolling publication sequences to detect emerging topic inflection points.",
          "Research White Space Discovery: Implemented proximity search to highlight sparse vector regions between rapidly expanding literature clusters.",
        ],
        technologies: ["Python", "Sentence-BERT", "BERTopic", "PyTorch", "LSTM", "UMAP", "HDBSCAN", "Pandas", "Scikit-Learn"],
        process: [
          { step: "01", title: "Paper Ingestion", description: "Automated ingestion of 80,000+ scientific publications and abstracts.", tech: "Ingestion Engine" },
          { step: "02", title: "Dense Semantic Embeddings", description: "768-dimensional vector encoding capturing academic nuances.", tech: "Sentence-BERT" },
          { step: "03", title: "Manifold & Clustering", description: "Non-linear UMAP reduction and density clustering of subfields.", tech: "UMAP + HDBSCAN" },
          { step: "04", title: "Keyword Extraction", description: "Class-based TF-IDF extracting descriptive cluster signatures.", tech: "c-TF-IDF" },
          { step: "05", title: "Temporal Velocity Modeling", description: "LSTM time-series forecasting predicting emerging topic velocity.", tech: "LSTM Recurrent Model" },
          { step: "06", title: "Gap Discovery & Hypotheses", description: "Vector distance analysis surfacing underexplored research intersections.", tech: "Scoring Engine" },
        ],
        results: [
          { metric: "Papers Processed", baseline: "Manual survey (<200)", ours: "80,000+ automated", delta: "400x throughput" },
          { metric: "Cluster Coherence", baseline: "0.42 (LDA)", ours: "0.68 (BERTopic)", delta: "+61.9% topic clarity" },
          { metric: "Trend Prediction Accuracy", baseline: "64% (Linear)", ours: "83.5% (LSTM)", delta: "Accurate inflection capture" },
        ],
        learned: "Dense transformer embeddings capture cross-disciplinary analogies that traditional bag-of-words completely destroy. Modeling publication acceleration through recurrent networks reveals research momentum 12 to 18 months prior to industrial saturation.",
        visualNote: "Interactive high-dimensional topic map with cluster centers, velocity vectors, and gap indicators.",
      },
    },
    {
      id: "bharathbrief",
      slug: "bharathbrief-problem-intelligence",
      title: "BharathBrief",
      shortDescription: "AI-powered problem intelligence platform converting unstructured civic news and public reports into structured problem briefs for builders.",
      category: "AI Systems & Products",
      year: "2024",
      technologies: ["Next.js", "Supabase", "Gemini API", "Python", "GitHub Actions", "TypeScript", "Tailwind CSS"],
      thumbnail: "/images/bharathbrief.jpg",
      gallery: ["/images/bharathbrief.jpg"],
      githubUrl: "https://github.com/Shamanthsheni",
      demoUrl: "",
      featured: true,
      published: true,
      order: 4,
      metrics: [
        { label: "Active Sources", value: "250+ Feeds", subtext: "Continuous news & civic feeds" },
        { label: "Extracted Briefs", value: "1,000+ Dossiers", subtext: "Structured problem statements" },
        { label: "Extraction Validity", value: "99.4%", subtext: "Pydantic schema compliance" },
        { label: "Automation", value: "GitHub Actions", subtext: "Scheduled cron workers" },
      ],
      caseStudy: {
        problem: "Real-world societal, civic, and infrastructure problems remain buried in scattered unstructured news articles, government releases, and editorial commentary without structured taxonomies or root-cause breakdowns.",
        approach: [
          "Asynchronous Scraping Workers: Configured Python ingestion workers on GitHub Actions cron schedules to harvest news streams.",
          "Deduplication Engine: Implemented MinHash Locality-Sensitive Hashing (LSH) to filter duplicate syndicated news stories.",
          "Structured Extraction: Leveraged Google Gemini API with strict Pydantic schemas enforcing output contracts (problem statement, affected population, root cause, constraints, severity index).",
          "Relational Store: Stored validated records in PostgreSQL/Supabase with full-text search indexing.",
          "Modern Web Explorer: Built a Next.js client with instant sector filtering, severity scoring, and markdown export.",
        ],
        technologies: ["Next.js", "Supabase", "Gemini API", "Python", "GitHub Actions", "TypeScript", "Tailwind CSS"],
        process: [
          { step: "01", title: "Feed Aggregation", description: "Harvesting 250+ diverse regional and national news feeds.", tech: "Async Ingester" },
          { step: "02", title: "Deduplication", description: "MinHash LSH pruning repetitive syndicated press releases.", tech: "MinHash Engine" },
          { step: "03", title: "Structured Extraction", description: "LLM extraction isolating root causes and affected stakeholders.", tech: "Gemini API" },
          { step: "04", title: "Schema Validation", description: "Pydantic enforcement ensuring clean, uniform data fields.", tech: "Pydantic Schemas" },
          { step: "05", title: "Database Indexing", description: "Postgres indexing with full-text search and category tags.", tech: "Supabase Postgres" },
          { step: "06", title: "Searchable Portal", description: "Clean Next.js frontend with filtering and structured briefs.", tech: "Next.js 14" },
        ],
        results: [
          { metric: "Source Coverage", baseline: "10 manual outlets", ours: "250+ automated streams", delta: "25x breadth" },
          { metric: "Extracted Problem Briefs", baseline: "N/A", ours: "1,000+ indexed", delta: "Searchable database" },
          { metric: "Schema Extraction Validity", baseline: "78% (raw prompt)", ours: "99.4% (Pydantic schema)", delta: "Zero malformed records" },
        ],
        learned: "Strict JSON schema enforcement at extraction time eliminates downstream database corruption. Turning narrative noise into structured problem statements unlocks systematic solution exploration for engineers.",
        visualNote: "Clean editorial dossiers with severity meters, impacted population estimates, and root-cause taxonomies.",
      },
    },
  ],
  blogs: [
    {
      id: "blog-stardist-histopathology",
      slug: "stardist-vs-unet-dense-histopathology",
      title: "Star-Convex Polygons vs Semantic Segmentation for Dense Nuclear Histopathology",
      excerpt: "Why standard semantic segmentation collapses in dense tissue colonies, and how star-convex polygon regression preserves nuclear geometry for Nottingham histologic grading.",
      content: `## The Challenge of Touching Nuclei in Digital Pathology

In computational pathology, one of the primary prerequisites for automated cancer grading—specifically Nottingham histologic scoring in breast carcinoma—is the accurate quantification of **nuclear pleomorphism**.

Pathologists grade nuclear pleomorphism (Score 1 to 3) by observing variations in nuclear size, shape irregularity, chromatin texture, and the presence of prominent nucleoli. However, automating this step presents a notorious image processing bottleneck: **dense nuclear clustering**.

In high-grade tumor regions, nuclei do not sit comfortably isolated in stromal tissue. Instead, they form densely packed colonies with touching boundaries, uneven staining intensities, and overlapping cellular chromatin.

---

## Why Standard U-Net Fails on Dense Clusters

When using standard semantic segmentation architectures like **U-Net** trained with binary cross-entropy loss:

1. **Boundary Merging**: The network predicts pixel-wise probabilities for the class "nucleus". When two nuclei touch, the thin intercellular boundary between them contains ambiguous gradient cues. The network inevitably connects the two objects into a single large blob.
2. **Watershed Post-Processing Instability**: Standard approaches attempt to separate merged blobs using distance-transform watershed algorithms. However, irregular chromatin clumps inside a single enlarged nucleus produce multiple false local maxima, causing severe **over-segmentation**.
3. **Loss of Morphological Integrity**: Morphological features like circularity ($4\\pi \\times \\text{Area} / \\text{Perimeter}^2$) and major-to-minor axis ratios are extremely sensitive to boundary leakage. A merged nucleus completely skews the pleomorphism distribution toward higher false malignancy scores.

---

## The StarDist Paradigm: Star-Convex Polygon Regression

Instead of predicting whether each pixel belongs to a nucleus, **StarDist** formulates instance segmentation as a geometry regression problem:

\`\`\`python
# Conceptual representation of StarDist ray regression
# For each candidate object center (x, y):
# Network outputs:
# 1. Object probability: p(x, y) in [0, 1]
# 2. Radial distances: r_i(x, y) along N equiangular rays (e.g., N=32)

polygon_points = [
    (x + r_i * np.cos(theta_i), y + r_i * np.sin(theta_i))
    for i, theta_i in enumerate(angular_rays)
]
\`\`\`

By training the neural backbone to predict star-convex radial distances from candidate object center points, touching nuclei retain their independent geometric identities even when their outer boundaries make physical contact.

---

## Normalization: The Crucial Macenko Pre-Processing Step

Histopathology slides scanned across different laboratory centers exhibit severe color variations due to differences in Hematoxylin and Eosin (H&E) batch formulations, slide thickness, and scanner illumination optics.

Before running StarDist or feature extractors, we pass all Whole Slide Image (WSI) tiles through **Macenko Optical Density (OD) Stain Deconvolution**:

- Convert RGB pixel values to Optical Density space: $\\text{OD} = -\\log_{10}(\\text{RGB} / 255)$.
- Compute the singular value decomposition (SVD) on non-background OD pixels to extract the two principal stain vectors representing Hematoxylin (nuclear chromatin) and Eosin (cytoplasm/stroma).
- Project the stain concentrations onto a reference target palette to ensure consistent input distribution.

---

## Quantitative Takeaways

In our benchmark experiments on dense carcinoma tiles:
- **Detection IoU** jumped from **0.68** (Standard U-Net) to **0.81** (StarDist + DenseNet backbone).
- **Separation of touching nuclei** improved from **72.4%** to **88.9%**.
- Extracted morphometric features demonstrated a Pearson correlation of **0.86** with pathologist-annotated nuclear atypia scores.

**Conclusion**: When precision morphometry is the end goal, geometry-aware instance regression provides the mathematical guarantee of object independence that pixel-level classification cannot achieve.`,
      coverImage: "/images/nuclear-pleomorphism.jpg",
      category: "Computer Vision",
      tags: ["Computational Pathology", "StarDist", "Deep Learning", "PyTorch", "Biomedical Vision"],
      publishedAt: "2024-10-15",
      published: true,
      featured: true,
      readingTime: "5 min read",
      seo: {
        title: "Star-Convex Polygons vs Semantic Segmentation for Dense Histopathology",
        description: "Deep dive into StarDist vs U-Net instance segmentation for nuclear morphometry and Nottingham grading in computational pathology.",
      },
    },
    {
      id: "blog-msa-csrnet-crowd-counting",
      slug: "dilated-convolutions-se-attention-crowd-counting",
      title: "Dilated Convolutions & Squeeze-and-Excitation: How MSA-CSRNet Reduced Crowd Counting MAE by 14.9%",
      excerpt: "An architectural deep dive into handling perspective distortion and scale variations in dense crowd scenes without losing spatial localization.",
      content: `## The Scale Variation Dilemma in Crowd Counting

Crowd density estimation from surveillance feeds is plagued by severe perspective distortion. In a typical wide-angle shot of a public plaza, an individual standing near the camera may occupy a $120 \\times 120$ pixel region, while an individual near the horizon is compressed into fewer than $8 \\times 8$ pixels.

Standard convolutional neural networks suffer from two conflicting requirements:
1. **Large receptive fields** to understand high-level scene context and avoid counting repetitive architectural textures (e.g., windows or tree leaves) as crowds.
2. **High spatial resolution** to precisely localize tiny, distant heads without blurring them into homogeneous density maps.

---

## Why Pooling Destroys Sub-10-Pixel Targets

Standard architectures rely on successive max-pooling or strided convolutions to enlarge receptive fields. In crowd counting, downsampling an image $4\\times$ (e.g., passing through two pool layers) collapses a $6\\times 6$ pixel head into less than $2\\times 2$ pixels. At that resolution, individual point annotations cannot be resolved, leading to drastic undercounting in dense clusters.

---

## Multi-Scale Dilated Convolutions

To expand receptive fields while keeping spatial feature map dimensions intact, **MSA-CSRNet** employs parallel dilated (atrous) convolutional layers.

For a 2D convolution kernel $w$ of size $k \\times k$, a dilated convolution with dilation rate $r$ introduces $(r-1)$ holes between kernel parameters:

\`\`\`
Kernel size k=3:
r = 1 (Standard):  * * *
r = 2 (Dilated):   * . * . *   (Receptive field: 5x5, Params: 9)
r = 3 (Dilated):   * . . * . . * (Receptive field: 7x7, Params: 9)
\`\`\`

By branching the feature stream after the VGG-16 backbone into parallel dilated layers with rates $r \\in \\{2, 3, 4\\}$ and concatenating their outputs, the model captures multi-scale head diameters simultaneously without any downsampling loss.

---

## Channel Recalibration via Squeeze-and-Excitation

Multi-scale concatenation produces a rich but high-dimensional feature stack. Certain channels capture clear head contours, while others become activated by high-frequency background noise like building facades.

To address this, we integrate a **Squeeze-and-Excitation (SE) Block**:

1. **Squeeze (Global Information Embedding)**: Global average pooling squeezes spatial dimensions $H \\times W$ into a $1 \\times 1 \\times C$ channel descriptor:
   $$z_c = \\frac{1}{H \\times W} \\sum_{i=1}^H \\sum_{j=1}^W u_c(i, j)$$
2. **Excitation (Adaptive Recalibration)**: A two-layer bottleneck MLP with ReLU and Sigmoid non-linearities learns non-mutually exclusive channel weights:
   $$s = \\sigma(W_2 \\delta(W_1 z))$$
3. **Scale**: The original feature maps are multiplied element-wise by the channel weights:
   $$\\tilde{x}_c = s_c \\cdot u_c$$

---

## Results & Error Analysis

When evaluated on the **ShanghaiTech Part A** benchmark dataset:
- **CSRNet Baseline MAE**: 73.78
- **MSA-CSRNet MAE**: 62.81 (**14.9% error reduction**)
- **Pearson Count Correlation**: 0.957

The combination of multi-scale receptive field expansion and dynamic channel suppression proves that we don't always need massive transformers to solve dense regression—careful structural inductive bias often yields superior computational efficiency and accuracy.`,
      coverImage: "/images/msa-csrnet.jpg",
      category: "Deep Learning",
      tags: ["Computer Vision", "PyTorch", "Attention Mechanisms", "Crowd Counting", "Deep Learning"],
      publishedAt: "2024-09-20",
      published: true,
      featured: false,
      readingTime: "6 min read",
      seo: {
        title: "How MSA-CSRNet Reduced Crowd Counting MAE by 14.9%",
        description: "Technical breakdown of multi-scale dilated convolutions and Squeeze-and-Excitation attention for crowd density estimation.",
      },
    },
    {
      id: "blog-mining-80k-papers-bertopic",
      slug: "mining-80k-research-papers-bertopic",
      title: "Mining 80,000 Research Papers: Architecture of an AI Research Intelligence Radar",
      excerpt: "Building a scalable NLP pipeline using Sentence-BERT embeddings, UMAP manifold clustering, and LSTM temporal forecasting to detect emerging research white spaces.",
      content: `## The Information Flood in Modern AI Literature

Over 15,000 AI and Machine Learning papers are published every month across arXiv, OpenReview, and IEEE. For researchers and engineering teams, keeping track of emerging paradigms is an impossible manual task.

Traditional keyword search fails because terminology in emerging fields is volatile. For example, before the term "Direct Preference Optimization (DPO)" solidified, similar techniques were described as "offline contrastive alignment" or "implicit reward modeling".

To solve this, we designed **Strategic Research Miner**—an automated pipeline that has ingested over **80,000 scientific publications** to map technological velocity and highlight latent research gaps.

---

## End-to-End System Pipeline

The architecture is composed of four decoupled stages:

\`\`\`
[80,000+ Paper Ingestion]
        │
        ▼
[Sentence-BERT 768D Embeddings]
        │
        ▼
[UMAP 5D Manifold Projection + HDBSCAN]
        │
        ▼
[c-TF-IDF Topic Signatures]
        │
        ▼
[LSTM 3-Year Rolling Velocity Forecast]
\`\`\`

---

## 1. Generating Dense Semantic Embeddings

We ingest titles and abstracts and pass them through domain-adapted **Sentence-BERT (all-mpnet-base-v2)** to generate dense 768-dimensional vectors:

$$\\vec{e} = \\text{S-BERT}(\\text{Title} + \\text{Abstract})$$

Unlike standard BERT token embeddings which require expensive cross-encoder pairwise passes, Sentence-BERT produces independent sentence embeddings that can be compared via cosine distance in milliseconds.

---

## 2. Dimensionality Reduction & Density Clustering

High-dimensional vector spaces suffer from the curse of dimensionality where Euclidean distances become uniform. We apply **UMAP (Uniform Manifold Approximation and Projection)** to project 768D embeddings down to a 5-dimensional continuous manifold while preserving local neighborhood topology.

Next, **HDBSCAN** clusters the projected vectors into discrete topic clusters without requiring an arbitrary predefined cluster count $k$.

---

## 3. Extracting Topic Signatures with c-TF-IDF

Standard TF-IDF treats each document individually. In BERTopic, we concatenate all documents belonging to a cluster $c$ into a single master document and calculate **Class-based TF-IDF**:

$$W_{t, c} = \\text{tf}_{t, c} \\times \\log \\left( 1 + \\frac{A}{f_t} \\right)$$

Where $A$ is the average number of words per cluster and $f_t$ is the total frequency of term $t$ across all clusters. This isolates the precise technical keywords that define that specific research subfield.

---

## 4. Forecasting Technological Velocity with LSTM

To identify whether a topic is accelerating or stagnating, we construct rolling monthly publication counts and citation velocity sequences over a 36-month window:

$$X = [v_{t-35}, v_{t-34}, \\dots, v_t]$$

An LSTM recurrent network trained on historical literature trajectories predicts the 12-month forward velocity gradient:
- **Inflection Detection**: Accurately identified the explosive trajectory of Vision Transformers in pathology 14 months before widespread clinical adoption.
- **Research White Spaces**: Measures Euclidean gaps between high-velocity clusters to highlight high-value unwritten research intersections.

---

## Key Takeaway

By combining dense contextual embeddings with temporal sequence forecasting, we can transform passive scientific archives into an active strategic radar for exploratory research.`,
      coverImage: "/images/strategic-research-miner.jpg",
      category: "NLP & AI Systems",
      tags: ["NLP", "Sentence-BERT", "BERTopic", "LSTM", "Machine Learning", "Research AI"],
      publishedAt: "2024-08-28",
      published: true,
      featured: false,
      readingTime: "7 min read",
      seo: {
        title: "Mining 80,000 Research Papers with Sentence-BERT and BERTopic",
        description: "How we built a scalable AI research intelligence radar using dense vector embeddings, UMAP clustering, and LSTM temporal forecasting.",
      },
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Research Internship Appointment @ Computational Engineering Lab (CIIRC)",
      category: "Research & Publications",
      date: "May 2026 — Present",
      description: "Appointed as Research Intern at CIIRC to lead deep learning experiments in cellular morphometry, nucleus segmentation, and automated Nottingham histologic grading in computational pathology.",
      certificateUrl: "",
      link: "https://github.com/Shamanthsheni",
      published: true,
    },
    {
      id: "ach-2",
      title: "Multi-Scale Architecture Validation — 14.9% MAE Reduction on Crowd Benchmark",
      category: "Research & Publications",
      date: "2024",
      description: "Successfully engineered MSA-CSRNet coupling parallel dilated convolutions with Squeeze-and-Excitation channel attention, reducing crowd estimation MAE from 73.78 to 62.81 with 0.957 count correlation.",
      certificateUrl: "",
      link: "https://github.com/Shamanthsheni",
      published: true,
    },
    {
      id: "ach-3",
      title: "Large-Scale NLP Intelligence Pipeline — 80,000+ Scientific Papers Mapped",
      category: "Milestones",
      date: "2024",
      description: "Architected and deployed Strategic Research Miner, embedding 80,000+ research papers with Sentence-BERT, UMAP, and LSTM velocity forecasting to discover emerging research white spaces.",
      certificateUrl: "",
      link: "https://github.com/Shamanthsheni",
      published: true,
    },
    {
      id: "ach-4",
      title: "Civic Problem Intelligence Platform — 1,000+ Extracted Briefs via Gemini API",
      category: "Milestones",
      date: "2024",
      description: "Engineered BharathBrief, an automated pipeline scraping 250+ news sources and parsing over 1,000 structured problem briefs with 99.4% schema compliance using Google Gemini and Next.js.",
      certificateUrl: "",
      link: "https://github.com/Shamanthsheni",
      published: true,
    },
    {
      id: "ach-5",
      title: "B.E. Specialization in Artificial Intelligence and Machine Learning",
      category: "Certifications",
      date: "2023 — 2027",
      description: "Pursuing undergraduate degree in AI & ML at Jyothy Institute of Technology (VTU Bengaluru), focusing on Deep Learning, Computer Vision, and AI Systems.",
      certificateUrl: "",
      link: "",
      published: true,
    },
  ],
  settings: {
    heroTagline: "AI / ML · COMPUTER VISION · DEEP LEARNING",
    heroStatement: "I build intelligent systems, experiment with machine learning, and explore ideas that sit between AI research and real-world applications.",
    featuredProjectIds: ["nuclear-pleomorphism", "msa-csrnet", "strategic-research-miner", "bharathbrief"],
    featuredBlogSlug: "stardist-vs-unet-dense-histopathology",
    seoTitle: "Shamanth S — AI, Computer Vision & Deep Learning",
    seoDescription: "Personal portfolio, research case studies, technical articles and AI systems built by Shamanth S.",
    contactEmail: "shamanthsheni@gmail.com",
    contactPhone: "+91 8891429533",
  },
};
