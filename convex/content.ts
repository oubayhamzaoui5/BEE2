import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query, type QueryCtx } from "./_generated/server";
import { requireAdmin } from "./lib/requireAdmin";

const collection = v.union(
  v.literal("heroSlides"),
  v.literal("podcasts"),
  v.literal("articles"),
  v.literal("ads"),
  v.literal("shorts")
);

const editableFields = {
  heroSlides: ["type", "quote", "speaker", "profession", "episode", "image", "order"],
  podcasts: ["title", "guest", "guestProfession", "episode", "duration", "image", "order"],
  articles: ["title", "excerpt", "author", "authorProfession", "category", "readTime", "image", "order"],
  ads: ["label", "headline", "brand", "location", "date", "image", "order"],
  shorts: ["title", "speaker", "profession", "views", "image", "order"]
} as const;

async function ordered<T extends keyof typeof editableFields>(ctx: QueryCtx, table: T) {
  return await ctx.db.query(table).withIndex("by_order").order("asc").collect();
}

export const getHome = query({
  args: {},
  handler: async (ctx) => ({
    heroSlides: await ordered(ctx, "heroSlides"),
    podcasts: await ordered(ctx, "podcasts"),
    articles: await ordered(ctx, "articles"),
    ads: await ordered(ctx, "ads"),
    shorts: await ordered(ctx, "shorts")
  })
});

export const updateItem = mutation({
  args: {
    tokenHash: v.string(),
    collection,
    id: v.string(),
    patch: v.any()
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.tokenHash);

    if (!args.patch || typeof args.patch !== "object" || Array.isArray(args.patch)) {
      throw new Error("Invalid patch");
    }

    const allowed = new Set<string>(editableFields[args.collection]);
    const cleanPatch: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(args.patch)) {
      if (!allowed.has(key)) continue;
      if (key === "order") {
        const order = Number(value);
        if (!Number.isFinite(order)) continue;
        cleanPatch.order = order;
        continue;
      }
      if (typeof value === "string") {
        cleanPatch[key] = value.trim();
      }
    }

    if (Object.keys(cleanPatch).length === 0) {
      throw new Error("No valid fields");
    }

    await ctx.db.patch(args.id as Id<typeof args.collection>, cleanPatch);
    return { ok: true };
  }
});

export const deleteItem = mutation({
  args: {
    tokenHash: v.string(),
    collection,
    id: v.string()
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.tokenHash);
    await ctx.db.delete(args.id as Id<typeof args.collection>);
    return { ok: true };
  }
});
