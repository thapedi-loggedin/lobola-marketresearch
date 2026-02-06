import type { ResearchSubmission } from "@/lib/researchQuestions";
import { NextResponse } from "next/server";

// Support both names so .env.local works whether you use RESEARCH_SHEETS_* or GOOGLE_SHEETS_*
const WEB_APP_URL =
  process.env.RESEARCH_SHEETS_WEB_APP_URL?.trim() ||
  process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim() ||
  "";

export async function POST(request: Request) {
  if (!WEB_APP_URL) {
    return NextResponse.json(
      {
        success: false,
        error: "Google Sheets integration not configured",
        hint: "Add RESEARCH_SHEETS_WEB_APP_URL or GOOGLE_SHEETS_WEB_APP_URL to .env.local in the project root (no quotes, no spaces around =), then restart the dev server (Ctrl+C, npm run dev).",
      },
      { status: 503 }
    );
  }

  let data: ResearchSubmission;
  try {
    data = (await request.json()) as ResearchSubmission;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: text || res.statusText },
        { status: 502 }
      );
    }
    let json: { success?: boolean; error?: string };
    try {
      json = JSON.parse(text) as { success?: boolean; error?: string };
    } catch {
      return NextResponse.json({ success: true });
    }
    if (json.success === false && json.error) {
      return NextResponse.json(
        { success: false, error: json.error },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request to Google Sheets failed";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
