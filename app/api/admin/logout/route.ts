import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminTokenHash, getConvexHttpClient } from "@/lib/admin-session";
import { api } from "@/convex/_generated/api";

export async function POST() {
  const tokenHash = await getAdminTokenHash();

  if (tokenHash) {
    const client = getConvexHttpClient();
    await client.mutation(api.auth.logout, { tokenHash });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
