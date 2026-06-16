import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const contentType = v.union(
  v.literal("Épisode"),
  v.literal("Série"),
  v.literal("Court"),
  v.literal("Article")
);

export default defineSchema({
  heroSlides: defineTable({
    type: contentType,
    quote: v.string(),
    speaker: v.string(),
    profession: v.string(),
    episode: v.string(),
    image: v.string(),
    order: v.number()
  }).index("by_order", ["order"]),
  podcasts: defineTable({
    title: v.string(),
    guest: v.string(),
    guestProfession: v.string(),
    episode: v.string(),
    duration: v.string(),
    image: v.string(),
    order: v.number()
  }).index("by_order", ["order"]),
  articles: defineTable({
    title: v.string(),
    excerpt: v.string(),
    author: v.string(),
    authorProfession: v.string(),
    category: v.string(),
    readTime: v.string(),
    image: v.string(),
    order: v.number()
  }).index("by_order", ["order"]),
  ads: defineTable({
    label: v.string(),
    headline: v.string(),
    brand: v.string(),
    location: v.string(),
    date: v.string(),
    image: v.string(),
    order: v.number()
  }).index("by_order", ["order"]),
  shorts: defineTable({
    title: v.string(),
    speaker: v.string(),
    profession: v.string(),
    views: v.string(),
    image: v.string(),
    order: v.number()
  }).index("by_order", ["order"]),
  admins: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    role: v.literal("admin"),
    createdAt: v.number()
  }).index("by_email", ["email"]),
  adminSessions: defineTable({
    adminId: v.id("admins"),
    tokenHash: v.string(),
    createdAt: v.number(),
    expiresAt: v.number()
  }).index("by_token_hash", ["tokenHash"])
});
