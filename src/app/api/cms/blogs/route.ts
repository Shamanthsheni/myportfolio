import { NextRequest, NextResponse } from "next/server";
import { getBlogs, saveBlog, deleteBlog } from "@/lib/cms-store";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!body.id) {
      body.id = "blog-" + Date.now();
    }
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    if (!body.publishedAt) {
      body.publishedAt = new Date().toISOString().split("T")[0];
    }
    if (!body.readingTime) {
      const words = (body.content || "").split(/\s+/).length;
      body.readingTime = Math.max(1, Math.ceil(words / 200)) + " min read";
    }

    const saved = await saveBlog(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const deleted = await deleteBlog(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
