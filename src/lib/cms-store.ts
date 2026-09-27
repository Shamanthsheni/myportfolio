import fs from "fs";
import path from "path";
import { CMSData, Project, BlogPost, Achievement, ProfileData, SiteSettings } from "./types";
import { INITIAL_CMS_DATA } from "@/data/initialCmsData";
import { supabase, isSupabaseConfigured } from "./supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "cms_data.json");

// In-memory cache for fast reads during server rendering
let memoryCache: CMSData | null = null;

function readLocalData(): CMSData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading local cms_data.json:", error);
  }
  // If file doesn't exist, write initial data
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(INITIAL_CMS_DATA, null, 2), "utf-8");
  } catch (err) {
    console.error("Error creating initial cms_data.json:", err);
  }
  return INITIAL_CMS_DATA;
}

function writeLocalData(data: CMSData): void {
  memoryCache = data;
  try {
    fs.mkdirSync(path.dirname(DATA_FILE_PATH), { recursive: true });
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to cms_data.json:", error);
  }
}

export async function getFullCMSData(): Promise<CMSData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("cms_store")
        .select("content")
        .eq("id", "main")
        .single();

      if (!error && data?.content) {
        memoryCache = data.content as CMSData;
        return memoryCache;
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local storage:", e);
    }
  }

  if (!memoryCache) {
    memoryCache = readLocalData();
  }
  return memoryCache;
}

export async function saveFullCMSData(data: CMSData): Promise<void> {
  writeLocalData(data);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("cms_store").upsert({
        id: "main",
        content: data,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Failed to sync to Supabase:", e);
    }
  }
}

// Project helpers
export async function getProjects(): Promise<Project[]> {
  const data = await getFullCMSData();
  return data.projects || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const data = await getFullCMSData();
  const existingIndex = data.projects.findIndex(
    (p) => p.id === project.id || (project.slug && p.slug === project.slug)
  );

  if (existingIndex >= 0) {
    data.projects[existingIndex] = project;
  } else {
    data.projects.push(project);
  }

  await saveFullCMSData(data);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = await getFullCMSData();
  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p) => p.id !== id);
  if (data.projects.length !== initialLength) {
    await saveFullCMSData(data);
    return true;
  }
  return false;
}

// Blog helpers
export async function getBlogs(): Promise<BlogPost[]> {
  const data = await getFullCMSData();
  return data.blogs || [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug) || null;
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost> {
  const data = await getFullCMSData();
  const existingIndex = data.blogs.findIndex(
    (b) => b.id === blog.id || (blog.slug && b.slug === blog.slug)
  );

  if (existingIndex >= 0) {
    data.blogs[existingIndex] = blog;
  } else {
    data.blogs.push(blog);
  }

  await saveFullCMSData(data);
  return blog;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const data = await getFullCMSData();
  const initialLength = data.blogs.length;
  data.blogs = data.blogs.filter((b) => b.id !== id);
  if (data.blogs.length !== initialLength) {
    await saveFullCMSData(data);
    return true;
  }
  return false;
}

// Achievements helpers
export async function getAchievements(): Promise<Achievement[]> {
  const data = await getFullCMSData();
  return data.achievements || [];
}

export async function saveAchievement(achievement: Achievement): Promise<Achievement> {
  const data = await getFullCMSData();
  const existingIndex = data.achievements.findIndex((a) => a.id === achievement.id);

  if (existingIndex >= 0) {
    data.achievements[existingIndex] = achievement;
  } else {
    data.achievements.push(achievement);
  }

  await saveFullCMSData(data);
  return achievement;
}

export async function deleteAchievement(id: string): Promise<boolean> {
  const data = await getFullCMSData();
  const initialLength = data.achievements.length;
  data.achievements = data.achievements.filter((a) => a.id !== id);
  if (data.achievements.length !== initialLength) {
    await saveFullCMSData(data);
    return true;
  }
  return false;
}

// Profile helpers
export async function getProfile(): Promise<ProfileData> {
  const data = await getFullCMSData();
  return data.profile;
}

export async function saveProfile(profile: ProfileData): Promise<ProfileData> {
  const data = await getFullCMSData();
  data.profile = profile;
  await saveFullCMSData(data);
  return profile;
}

// Settings helpers
export async function getSettings(): Promise<SiteSettings> {
  const data = await getFullCMSData();
  return data.settings;
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  const data = await getFullCMSData();
  data.settings = settings;
  await saveFullCMSData(data);
  return settings;
}
