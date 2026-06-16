import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export const ADMIN_COOKIE = "bee2_admin_session";

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getConvexHttpClient() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL;

  if (!convexUrl) {
    throw new Error("Missing Convex URL");
  }

  return new ConvexHttpClient(convexUrl);
}

export async function getAdminTokenHash() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return token ? hashSessionToken(token) : null;
}

export async function requireAdminSession() {
  const tokenHash = await getAdminTokenHash();

  if (!tokenHash) {
    return null;
  }

  const client = getConvexHttpClient();
  const admin = await client.query(api.auth.validateSession, { tokenHash });
  return admin ? { admin, tokenHash, client } : null;
}
