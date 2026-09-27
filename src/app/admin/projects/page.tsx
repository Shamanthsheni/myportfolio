import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getProjects } from "@/lib/cms-store";
import { ProjectsManager } from "./ProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return <ProjectsManager initialProjects={projects} />;
}
