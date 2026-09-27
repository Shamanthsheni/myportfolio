import { NextRequest, NextResponse } from "next/server";
import { getProfile, saveProfile } from "@/lib/cms-store";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const saved = await saveProfile(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
