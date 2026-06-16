"use client";

import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { AdBanner } from "@/components/AdBanner";
import { ArticleCard } from "@/components/ArticleCard";
import { ContentRow } from "@/components/ContentRow";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PodcastCard } from "@/components/PodcastCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ShortCard } from "@/components/ShortCard";
import { SiteHeader } from "@/components/SiteHeader";
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

const navItems = ["Accueil", "Épisodes", "Articles", "Shorts", "Événements", "Abonnement"];

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
  return (
    <main className="min-h-screen bg-bee-ink">
      <SiteHeader />

      <HeroCarousel slides={data.heroSlides} />

      <div className="mx-auto max-w-[1400px] pt-6">
        <ContentRow title="Épisodes" eyebrow="À regarder">
          {data.podcasts.map((podcast, index) => (
            <PodcastCard key={podcast.id ?? podcast.title} podcast={podcast} priority={index === 0} />
          ))}
          {data.podcasts.map((podcast) => (
            <PodcastCard key={`${podcast.id ?? podcast.title}-bis`} podcast={podcast} />
          ))}
        </ContentRow>
      </div>

      {data.ads[0] && (
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-10">
          <AdBanner ad={data.ads[0]} />
        </div>
      )}

      <div className="mx-auto max-w-[1400px]">
        <ContentRow title="Shorts" eyebrow="Coups rapides">
          {data.shorts.map((short) => (
            <ShortCard key={short.id ?? short.title} short={short} />
          ))}
          {data.shorts.map((short) => (
            <ShortCard key={`${short.id ?? short.title}-bis`} short={short} />
          ))}
        </ContentRow>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <SectionHeader title="Conseils de praticiens" eyebrow="Lire le brief" />
        <div className="grid gap-5 lg:grid-cols-2">
          {data.articles.map((article) => (
            <ArticleCard key={article.id ?? article.title} article={article} />
          ))}
        </div>
      </section>

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
                B2
              </span>
              <span className="font-display text-xl font-black tracking-wide text-bee-cream">BEE2</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bee-muted">
              Une plateforme où médecins, avocats, architectes et formateurs partagent leur savoir — dans leurs
              propres mots.
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
                { Icon: Twitter, label: "BEE2 sur Twitter" },
                { Icon: Linkedin, label: "BEE2 sur LinkedIn" },
                { Icon: Instagram, label: "BEE2 sur Instagram" },
                { Icon: Facebook, label: "BEE2 sur Facebook" }
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
          Copyright 2026 BEE2. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
