import { NextRequest, NextResponse } from "next/server";
import { getAchievements, saveAchievement, deleteAchievement } from "@/lib/cms-store";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const achievements = await getAchievements();
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
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
      body.id = "ach-" + Date.now();
    }
    if (!body.date) {
      body.date = new Date().getFullYear().toString();
    }

    const saved = await saveAchievement(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save achievement" }, { status: 500 });
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
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 });
    }

    const deleted = await deleteAchievement(id);
    if (!deleted) {
      return NextResponse.json({ error: "Achievement not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
