import type { MutationCtx } from "../_generated/server";
import { ads, articles, heroSlides, podcasts, shorts } from "../seedData";

async function tableHasRows(ctx: MutationCtx, table: Parameters<typeof ctx.db.query>[0]) {
  const row = await ctx.db.query(table).first();
  return Boolean(row);
}

export async function ensureContentSeeded(ctx: MutationCtx) {
  if (!(await tableHasRows(ctx, "heroSlides"))) {
    await Promise.all(heroSlides.map((item, order) => ctx.db.insert("heroSlides", { ...item, order })));
  }
  if (!(await tableHasRows(ctx, "podcasts"))) {
    await Promise.all(podcasts.map((item, order) => ctx.db.insert("podcasts", { ...item, order })));
  }
  if (!(await tableHasRows(ctx, "articles"))) {
    await Promise.all(articles.map((item, order) => ctx.db.insert("articles", { ...item, order })));
  }
  if (!(await tableHasRows(ctx, "ads"))) {
    await Promise.all(ads.map((item, order) => ctx.db.insert("ads", { ...item, order })));
  }
  if (!(await tableHasRows(ctx, "shorts"))) {
    await Promise.all(shorts.map((item, order) => ctx.db.insert("shorts", { ...item, order })));
  }
}
