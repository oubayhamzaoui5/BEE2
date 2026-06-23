"use client";

import { ArrowRight, Clock3, Facebook, Instagram, Linkedin, Play, Send, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { AdBanner } from "@/components/AdBanner";
import { ContentRow } from "@/components/ContentRow";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ShortCard } from "@/components/ShortCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SoonPlaceholder } from "@/components/SoonPlaceholder";
import {
  ads as fallbackAds,
  articles as fallbackArticles,
  heroSlides as fallbackHeroSlides,
  podcasts as fallbackPodcasts,
  shorts as fallbackShorts,
  type Ad,
  type Article,
  type HeroSlide,
  type Podcast,
  type Short
} from "@/lib/mock-data";

type HomeData = {
  heroSlides: HeroSlide[];
  podcasts: Podcast[];
  articles: Article[];
  ads: Ad[];
  shorts: Short[];
};

type HomeRecord = Record<string, unknown> & {
  id?: string;
  _id?: string;
};

const fallbackData: HomeData = {
  heroSlides: fallbackHeroSlides,
  podcasts: fallbackPodcasts,
  articles: fallbackArticles,
  ads: fallbackAds,
  shorts: fallbackShorts
};

const navItems = ["Accueil", "Episodes", "Articles", "Shorts", "Evenements", "Abonnement"];

export function HomeContent() {
  const [data, setData] = useState<HomeData>(fallbackData);

  useEffect(() => {
    let mounted = true;

    fetch("/api/content")
      .then((response) => (response.ok ? response.json() : fallbackData))
      .then((content) => {
        if (mounted) {
          setData(normalizeHomeData(content));
        }
      })
      .catch(() => {
        if (mounted) {
          setData(fallbackData);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return <HomeView data={data} />;
}

function normalizeHomeData(data: HomeData | Record<keyof HomeData, HomeRecord[]>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, items]) => [
      key,
      (items as HomeRecord[]).map((item) => ({
        ...item,
        id: String(item.id ?? item._id)
      }))
    ])
  ) as HomeData;
}

function HomeView({ data }: { data: HomeData }) {
  const leadArticle = data.articles[0];
  const latestArticles = [...data.articles, ...data.articles].slice(0, 8);
  const featuredVideo = data.podcasts[0];
  const secondaryVideos = data.podcasts.slice(1, 4);
  const topicRows = [
    { title: "Sante", eyebrow: "Nos essentiels", items: latestArticles.slice(0, 4) },
    { title: "Business & droit", eyebrow: "Guides pratiques", items: latestArticles.slice(2, 6) }
  ];

  return (
    <main className="min-h-screen bg-bee-ink">
      <SiteHeader />

      <HeroCarousel slides={data.heroSlides} />

      {leadArticle && (
        <section className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
          <LeadArticle article={leadArticle} />
          <div className="border-y border-bee-line">
            <div className="flex items-center justify-between border-b border-bee-line py-3">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">A la une</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-sm font-bold text-bee-muted hover:text-bee-gold">
                Tout voir
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="divide-y divide-bee-line">
              {latestArticles.slice(1, 5).map((article) => (
                <CompactArticle key={`${article.id}-headline`} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {data.ads[0] && (
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10">
          <AdBanner ad={data.ads[0]} />
        </div>
      )}

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <ArticleMosaic title="Les articles de la redaction" eyebrow="Lire le brief" articles={latestArticles.slice(0, 4)} />
      </section>

      {featuredVideo && (
        <section className="mx-auto grid max-w-[1400px] gap-5 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
          <FeaturedVideo podcast={featuredVideo} />
          <div className="space-y-3 border-y border-bee-line py-4">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">Derniere video</p>
            {secondaryVideos.map((podcast) => (
              <VideoTeaser key={`${podcast.id}-teaser`} podcast={podcast} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1400px]">
        <ContentRow title="Dernieres videos publiees" eyebrow="Format court">
          {data.shorts.map((short) => (
            <ShortCard key={short.id ?? short.title} short={short} />
          ))}
          {data.shorts.map((short) => (
            <ShortCard key={`${short.id ?? short.title}-bis`} short={short} />
          ))}
        </ContentRow>
      </div>

      {topicRows.map((topic) => (
        <section key={topic.title} className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          <ArticleMosaic title={topic.title} eyebrow={topic.eyebrow} articles={topic.items} />
        </section>
      ))}

      {data.ads[1] && (
        <div className="mx-auto max-w-[1400px] px-4 pb-14 pt-2 sm:px-6 sm:pb-20 lg:px-10">
          <AdBanner ad={data.ads[1]} />
        </div>
      )}

      <footer className="border-t border-bee-line bg-bee-coal">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.4fr_0.8fr] lg:px-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-bee-gold font-display text-base font-black text-bee-ink">
                B.
              </span>
              <span className="font-display text-xl font-black tracking-wide text-bee-cream">Beto.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bee-muted">
              Une plateforme ou medecins, avocats, architectes et formateurs partagent leur savoir dans leurs propres
              mots.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-bee-muted" aria-label="Navigation pied de page">
              {navItems.map((item) => (
                <a key={item} href="#" className="transition hover:text-bee-gold">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-start gap-2.5 sm:justify-end">
              {[
                { Icon: Twitter, label: "Beto. sur Twitter" },
                { Icon: Linkedin, label: "Beto. sur LinkedIn" },
                { Icon: Instagram, label: "Beto. sur Instagram" },
                { Icon: Facebook, label: "Beto. sur Facebook" }
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-bee-line text-bee-muted transition-all duration-300 hover:border-bee-gold hover:text-bee-gold"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-bee-gold px-5 py-3 text-sm font-black text-bee-ink transition-all duration-300 hover:bg-bee-gold-bright hover:shadow-glow"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Annoncez avec nous
            </a>
            <a href="#" className="text-sm font-bold text-bee-muted transition hover:text-bee-gold">
              Devenir partenaire
            </a>
          </div>
        </div>
        <div className="border-t border-bee-line px-4 py-5 text-center text-[0.68rem] font-bold uppercase tracking-[0.2em] text-bee-muted/60">
          Copyright 2026 Beto. Tous droits reserves.
        </div>
      </footer>
    </main>
  );
}

function LeadArticle({ article }: { article: Article }) {
  return (
    <article className="group grid gap-4 border-y border-bee-line py-4 md:grid-cols-[0.95fr_1.05fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-bee-coal md:aspect-auto">
        <SoonPlaceholder seed={`${article.id}-lead`} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3 rounded bg-bee-gold px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-bee-ink">
          Article
        </div>
      </div>
      <div className="flex flex-col justify-center py-2">
        <p dir="auto" className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-bee-gold">
          {article.category}
        </p>
        <h2 dir="auto" className="mt-3 font-display text-3xl font-semibold leading-[1.05] text-bee-cream transition group-hover:text-white sm:text-5xl">
          {article.title}
        </h2>
        <p dir="auto" className="mt-4 line-clamp-3 max-w-2xl text-base leading-relaxed text-bee-muted">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-bee-muted">
          <span dir="auto" className="text-bee-gold">
            {article.author}
          </span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

function CompactArticle({ article }: { article: Article }) {
  return (
    <article className="group grid grid-cols-[112px_1fr] gap-4 py-4">
      <div className="relative aspect-[4/3] overflow-hidden bg-bee-coal">
        <SoonPlaceholder seed={`${article.id}-compact`} className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div>
        <p dir="auto" className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-bee-gold">
          {article.category}
        </p>
        <h3 dir="auto" className="mt-1 line-clamp-3 text-base font-black leading-snug text-bee-cream transition group-hover:text-white">
          {article.title}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-bee-muted">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {article.readTime}
        </p>
      </div>
    </article>
  );
}

function FeaturedVideo({ podcast }: { podcast: Podcast }) {
  return (
    <article className="group relative min-h-[420px] overflow-hidden bg-bee-coal text-white sm:min-h-[520px]">
      <SoonPlaceholder seed={`${podcast.id}-featured`} className="transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded bg-bee-gold px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em] text-bee-ink">
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Le long format
        </span>
        <h2 dir="auto" className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.06] sm:text-5xl">
          {podcast.title}
        </h2>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-bee-gold">
          {podcast.guest} · {podcast.duration}
        </p>
      </div>
    </article>
  );
}

function VideoTeaser({ podcast }: { podcast: Podcast }) {
  return (
    <article className="group grid grid-cols-[120px_1fr] gap-4 border-b border-bee-line pb-3 last:border-b-0">
      <div className="relative aspect-video overflow-hidden bg-bee-coal">
        <SoonPlaceholder seed={`${podcast.id}-teaser`} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/15">
          <Play className="h-5 w-5 fill-white text-white" aria-hidden="true" />
        </div>
      </div>
      <div>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-bee-gold">Episode</p>
        <h3 dir="auto" className="mt-1 line-clamp-3 text-sm font-black leading-snug text-bee-cream group-hover:text-white">
          {podcast.title}
        </h3>
      </div>
    </article>
  );
}

function ArticleMosaic({ title, eyebrow, articles }: { title: string; eyebrow: string; articles: Article[] }) {
  const [lead, middleTop, middleBottom, side] = articles;

  if (!lead) return null;

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">{eyebrow}</p>
          <h2 className="mt-1 font-display text-3xl font-semibold leading-tight text-bee-cream sm:text-[2.15rem]">
            {title}
          </h2>
        </div>
        <a
          href="#"
          className="group/link inline-flex items-center gap-2 whitespace-nowrap text-sm font-black text-bee-muted transition hover:text-bee-gold"
        >
          Voir tout
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr]">
        <MosaicArticleCard article={lead} size="lead" badge={title === "Les articles de la redaction" ? "A la une" : undefined} />
        <div className="grid gap-4">
          {middleTop && <MosaicArticleCard article={middleTop} size="compact" />}
          {middleBottom && <MosaicArticleCard article={middleBottom} size="compact" />}
        </div>
        {side && <MosaicArticleCard article={side} size="tall" />}
      </div>
    </div>
  );
}

function MosaicArticleCard({ article, size, badge }: { article: Article; size: "lead" | "compact" | "tall"; badge?: string }) {
  const imageClass = size === "lead" ? "aspect-[16/10]" : size === "tall" ? "aspect-[16/9]" : "aspect-[16/7]";
  const titleClass =
    size === "lead"
      ? "text-[1.65rem] leading-[1.05] sm:text-3xl"
      : size === "tall"
        ? "text-xl leading-tight sm:text-2xl"
        : "text-lg leading-tight sm:text-xl";

  return (
    <article className="group relative overflow-hidden rounded-lg border border-bee-line bg-bee-surface text-bee-cream shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-bee-gold/40 hover:shadow-card-hover">
      {badge && (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded bg-bee-gold px-5 py-2 text-base font-black text-bee-ink shadow-glow">
          {badge}
        </span>
      )}
      <div className={`relative m-3 overflow-hidden rounded-md bg-bee-coal ${imageClass}`}>
        <SoonPlaceholder seed={`${article.id}-${size}`} className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className={size === "lead" ? "px-3 pb-5 sm:px-4" : "px-3 pb-4"}>
        <p dir="auto" className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-bee-gold">
          {article.category}
        </p>
        <h3 dir="auto" className={`mt-1.5 line-clamp-3 font-black text-bee-cream group-hover:text-white ${titleClass}`}>
          {article.title}
        </h3>
        {(size === "lead" || size === "tall") && (
          <p dir="auto" className="mt-2 line-clamp-5 text-base leading-snug text-bee-muted">
            {article.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
