import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";

export async function GET() {
  const convexUrl = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return NextResponse.json({ error: "Missing CONVEX_URL" }, { status: 500 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const content = await client.query(api.content.getHome);

  return NextResponse.json(content);
}
