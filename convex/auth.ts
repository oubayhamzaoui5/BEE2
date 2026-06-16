import bcrypt from "bcryptjs";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ensureContentSeeded } from "./lib/seedContent";
import { getAdminBySession } from "./lib/requireAdmin";

const DEFAULT_ADMIN_EMAIL = "admin@admin.com";
const DEFAULT_ADMIN_HASH = "$2b$12$Bcho/yIeFs1EdQm47d6WauUpbmNGSsdZs7/fVUpqs6kcgkvBzhzWC";
const SESSION_MS = 1000 * 60 * 60 * 12;

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    tokenHash: v.string()
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    let admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (!admin && email === DEFAULT_ADMIN_EMAIL && bcrypt.compareSync(args.password, DEFAULT_ADMIN_HASH)) {
      const adminId = await ctx.db.insert("admins", {
        email,
        passwordHash: DEFAULT_ADMIN_HASH,
        role: "admin",
        createdAt: Date.now()
      });
      admin = await ctx.db.get(adminId);
    }

    if (!admin || !bcrypt.compareSync(args.password, admin.passwordHash)) {
      throw new Error("Invalid credentials");
    }

    await ensureContentSeeded(ctx);

    const expiresAt = Date.now() + SESSION_MS;
    await ctx.db.insert("adminSessions", {
      adminId: admin._id,
      tokenHash: args.tokenHash,
      createdAt: Date.now(),
      expiresAt
    });

    return { email: admin.email, expiresAt };
  }
});

export const validateSession = query({
  args: { tokenHash: v.string() },
  handler: async (ctx, args) => {
    const admin = await getAdminBySession(ctx, args.tokenHash);
    return admin ? { email: admin.email, role: admin.role } : null;
  }
});

export const logout = mutation({
  args: { tokenHash: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token_hash", (q) => q.eq("tokenHash", args.tokenHash))
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
    }
  }
});
