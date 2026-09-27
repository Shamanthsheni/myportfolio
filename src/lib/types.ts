export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProjectPipelineStep {
  step: string;
  title: string;
  description: string;
  tech?: string;
}

export interface ProjectResult {
  metric: string;
  baseline?: string;
  ours: string;
  delta?: string;
}

export interface ProjectCaseStudy {
  problem: string;
  approach: string[];
  technologies: string[];
  process: ProjectPipelineStep[];
  results: ProjectResult[];
  learned: string;
  visualNote?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  year: string;
  technologies: string[];
  thumbnail: string;
  gallery?: string[];
  githubUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  metrics: ProjectMetric[];
  caseStudy: ProjectCaseStudy;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  featured: boolean;
  readingTime: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  category: "Research & Publications" | "Competitions & Hackathons" | "Certifications" | "Milestones";
  date: string;
  description: string;
  image?: string;
  certificateUrl?: string;
  link?: string;
  published: boolean;
}

export interface SkillItem {
  name: string;
  context: string;
}

export interface SkillCategory {
  category: string;
  focus: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id?: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  focusTitle: string;
  description: string;
  keyContributions: string[];
  tags: string[];
}

export interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  coursework: string[];
  highlight: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  role: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  statusBadge: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
}

export interface SiteSettings {
  heroTagline: string;
  heroStatement: string;
  featuredProjectIds: string[];
  featuredBlogSlug: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export interface CMSData {
  profile: ProfileData;
  projects: Project[];
  blogs: BlogPost[];
  achievements: Achievement[];
  settings: SiteSettings;
}
