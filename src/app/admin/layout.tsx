import React from "react";
import { isAuthenticated } from "@/lib/auth";
import { AdminNav } from "./AdminNav";

export const revalidate = 0;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = isAuthenticated();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111418] flex flex-col">
      {authed && <AdminNav />}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
