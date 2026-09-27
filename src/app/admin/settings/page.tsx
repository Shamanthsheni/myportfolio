import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSettings, getProjects, getBlogs } from "@/lib/cms-store";
import { SettingsManager } from "./SettingsManager";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const [settings, projects, blogs] = await Promise.all([
    getSettings(),
    getProjects(),
    getBlogs(),
  ]);

  return (
    <SettingsManager
      initialSettings={settings}
      projects={projects}
      blogs={blogs}
    />
  );
}
