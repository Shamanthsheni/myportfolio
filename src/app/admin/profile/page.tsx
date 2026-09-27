import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getProfile } from "@/lib/cms-store";
import { ProfileManager } from "./ProfileManager";

export const revalidate = 0;

export default async function AdminProfilePage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const profile = await getProfile();

  return <ProfileManager initialProfile={profile} />;
}
