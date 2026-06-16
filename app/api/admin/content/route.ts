import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session";
import { api } from "@/convex/_generated/api";

const collections = new Set(["heroSlides", "podcasts", "articles", "ads", "shorts"]);

export async function GET() {
  const session = await requireAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await session.client.query(api.content.getHome);
  return NextResponse.json({ admin: session.admin, content });
}

export async function PUT(request: Request) {
  const session = await requireAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!collections.has(body.collection) || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid item." }, { status: 400 });
  }

  await session.client.mutation(api.content.updateItem, {
    tokenHash: session.tokenHash,
    collection: body.collection,
    id: body.id,
    patch: body.patch ?? {}
  });

  const content = await session.client.query(api.content.getHome);
  return NextResponse.json({ ok: true, content });
}

export async function DELETE(request: Request) {
  const session = await requireAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!collections.has(body.collection) || typeof body.id !== "string") {
    return NextResponse.json({ error: "Invalid item." }, { status: 400 });
  }

  await session.client.mutation(api.content.deleteItem, {
    tokenHash: session.tokenHash,
    collection: body.collection,
    id: body.id
  });

  const content = await session.client.query(api.content.getHome);
  return NextResponse.json({ ok: true, content });
}
