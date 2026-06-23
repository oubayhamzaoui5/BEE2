import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { ensureContentSeeded } from "./lib/seedContent";
import { ads, articles, heroSlides, podcasts, shorts } from "./seedData";

const DEFAULT_ADMIN_EMAIL = "admin@admin.com";
const DEFAULT_ADMIN_HASH = "$2b$12$Bcho/yIeFs1EdQm47d6WauUpbmNGSsdZs7/fVUpqs6kcgkvBzhzWC";

export const seedInitialData = mutation({
  args: {},
  handler: async (ctx) => {
    await ensureContentSeeded(ctx);
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", DEFAULT_ADMIN_EMAIL))
      .unique();

    if (!admin) {
      await ctx.db.insert("admins", {
        email: DEFAULT_ADMIN_EMAIL,
        passwordHash: DEFAULT_ADMIN_HASH,
        role: "admin",
        createdAt: Date.now()
      });
    }

    return { ok: true };
  }
});

async function replaceHeroSlides(ctx: MutationCtx) {
  const existing = await ctx.db.query("heroSlides").withIndex("by_order").order("asc").collect();

  await Promise.all(
    heroSlides.map((item, order) => {
      const current = existing[order];
      const row = { ...item, order };
      return current ? ctx.db.patch(current._id, row) : ctx.db.insert("heroSlides", row);
    })
  );

  await Promise.all(existing.slice(heroSlides.length).map((item) => ctx.db.delete(item._id)));
}

async function replacePodcasts(ctx: MutationCtx) {
  const existing = await ctx.db.query("podcasts").withIndex("by_order").order("asc").collect();

  await Promise.all(
    podcasts.map((item, order) => {
      const current = existing[order];
      const row = { ...item, order };
      return current ? ctx.db.patch(current._id, row) : ctx.db.insert("podcasts", row);
    })
  );

  await Promise.all(existing.slice(podcasts.length).map((item) => ctx.db.delete(item._id)));
}

async function replaceArticles(ctx: MutationCtx) {
  const existing = await ctx.db.query("articles").withIndex("by_order").order("asc").collect();

  await Promise.all(
    articles.map((item, order) => {
      const current = existing[order];
      const row = { ...item, order };
      return current ? ctx.db.patch(current._id, row) : ctx.db.insert("articles", row);
    })
  );

  await Promise.all(existing.slice(articles.length).map((item) => ctx.db.delete(item._id)));
}

async function replaceAds(ctx: MutationCtx) {
  const existing = await ctx.db.query("ads").withIndex("by_order").order("asc").collect();

  await Promise.all(
    ads.map((item, order) => {
      const current = existing[order];
      const row = { ...item, order };
      return current ? ctx.db.patch(current._id, row) : ctx.db.insert("ads", row);
    })
  );

  await Promise.all(existing.slice(ads.length).map((item) => ctx.db.delete(item._id)));
}

async function replaceShorts(ctx: MutationCtx) {
  const existing = await ctx.db.query("shorts").withIndex("by_order").order("asc").collect();

  await Promise.all(
    shorts.map((item, order) => {
      const current = existing[order];
      const row = { ...item, order };
      return current ? ctx.db.patch(current._id, row) : ctx.db.insert("shorts", row);
    })
  );

  await Promise.all(existing.slice(shorts.length).map((item) => ctx.db.delete(item._id)));
}

export const replaceEditorialContent = mutation({
  args: {},
  handler: async (ctx) => {
    await replaceHeroSlides(ctx);
    await replacePodcasts(ctx);
    await replaceArticles(ctx);
    await replaceAds(ctx);
    await replaceShorts(ctx);

    return { ok: true };
  }
});
