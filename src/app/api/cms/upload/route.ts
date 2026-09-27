import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeFilename = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    // If Supabase is configured with a storage bucket, upload to Supabase Storage
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from("portfolio-media")
          .upload(safeFilename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from("portfolio-media")
            .getPublicUrl(safeFilename);

          return NextResponse.json({
            url: publicUrlData.publicUrl,
            filename: safeFilename,
          });
        }
      } catch (err) {
        console.warn("Supabase storage upload failed, saving to local public folder:", err);
      }
    }

    // Local file storage fallback
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, safeFilename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return NextResponse.json({
      url: publicUrl,
      filename: safeFilename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
