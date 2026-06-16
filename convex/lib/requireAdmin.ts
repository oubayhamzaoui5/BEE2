import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

type AdminSession = {
  _id: Id<"adminSessions">;
  adminId: Id<"admins">;
  expiresAt: number;
};

export async function getAdminBySession(ctx: QueryCtx | MutationCtx, tokenHash: string) {
  const session = (await ctx.db
    .query("adminSessions")
    .withIndex("by_token_hash", (q) => q.eq("tokenHash", tokenHash))
    .unique()) as AdminSession | null;

  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  return await ctx.db.get(session.adminId);
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx, tokenHash: string) {
  const admin = await getAdminBySession(ctx, tokenHash);
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
