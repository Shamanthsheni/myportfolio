import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getBlogs } from "@/lib/cms-store";
import { BlogsManager } from "./BlogsManager";

export const revalidate = 0;

export default async function AdminBlogsPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const blogs = await getBlogs();

  return <BlogsManager initialBlogs={blogs} />;
}
