import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAchievements } from "@/lib/cms-store";
import { AchievementsManager } from "./AchievementsManager";

export const revalidate = 0;

export default async function AdminAchievementsPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const achievements = await getAchievements();

  return <AchievementsManager initialAchievements={achievements} />;
}
