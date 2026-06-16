import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createSessionToken, getConvexHttpClient, hashSessionToken } from "@/lib/admin-session";
import { api } from "@/convex/_generated/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const token = createSessionToken();
    const tokenHash = hashSessionToken(token);
    const client = getConvexHttpClient();
    const session = await client.mutation(api.auth.login, { email, password, tokenHash });
    const response = NextResponse.json({ ok: true, email: session.email });

    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(session.expiresAt)
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    const status = message.includes("Missing NEXT_PUBLIC_CONVEX_URL") ? 500 : 401;
    return NextResponse.json({ error: message }, { status });
  }
}
