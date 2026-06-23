"use client";

import { ChevronLeft, ChevronRight, Play, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/mock-data";
import { SoonPlaceholder } from "@/components/SoonPlaceholder";

const SLIDE_MS = 6500;

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(timeout);
  }, [active, slides.length, paused]);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section
      className="group relative h-[100svh] min-h-[640px] overflow-hidden bg-bee-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <SoonPlaceholder seed={item.id} className={index === active ? "animate-ken-burns" : ""} />
          </div>
        ))}
        {/* cinematic vignette stack */}
        <div className="absolute inset-0 bg-gradient-to-r from-bee-ink via-bee-ink/65 to-bee-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bee-ink via-bee-ink/75 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-4 pb-6 pt-20 sm:px-6 sm:pb-8 lg:px-10">
        <div key={slide.id} className="stagger max-w-5xl pb-6 sm:pb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded bg-bee-gold px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-bee-ink sm:px-3 sm:text-xs">
              {slide.type}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.24em] text-white/55">
              {slide.episode}
            </span>
          </div>

          <div className="-mb-4 mt-2 font-display text-7xl leading-none text-bee-gold/55 sm:-mb-7 sm:text-9xl" aria-hidden="true">
            "
          </div>

          <blockquote
            dir="auto"
            className="hero-quote max-w-full text-balance font-display text-[clamp(1rem,4vw,1.6rem)] font-semibold leading-[1.12] text-bee-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:max-w-[38ch] sm:text-[clamp(2.15rem,4vw,2.7rem)] lg:max-w-[44ch] lg:leading-[1.08]"
          >
            {slide.quote}
          </blockquote>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
            <span dir="auto" className="font-black text-white">
              {slide.speaker}
            </span>
            <span className="h-1 w-1 rounded-full bg-bee-gold" />
            <span dir="auto" className="text-sm font-bold uppercase tracking-[0.12em] text-bee-gold">
              {slide.profession}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded bg-bee-cream px-6 py-3 text-sm font-black text-bee-ink transition-all duration-300 hover:bg-bee-gold hover:shadow-glow"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Voir l'épisode
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 rounded border border-white/20 bg-white/8 px-6 py-3 text-sm font-black text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/16"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Voir le profil
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-bee-gold hover:bg-bee-gold hover:text-bee-ink group-hover:opacity-100 md:flex"
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-bee-gold hover:bg-bee-gold hover:text-bee-ink group-hover:opacity-100 md:flex"
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">Invités à l'honneur</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-bee-cream sm:text-xl">
              Des praticiens qui partagent leur savoir
            </h2>
          </div>
          {/* progress indicators — the active one fills over the slide duration */}
          <div className="hidden items-center gap-2 sm:flex">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${
                  index === active ? "w-12 bg-white/25" : "w-6 bg-white/20 hover:bg-white/45"
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
                aria-current={index === active}
              >
                {index === active && (
                  <span
                    key={`${item.id}-progress`}
                    className={`absolute inset-y-0 left-0 rounded-full bg-bee-gold ${
                      paused ? "w-full opacity-60" : "animate-slide-progress"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="row-scroll flex gap-3 overflow-x-auto pb-2">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              className={`relative h-20 w-40 shrink-0 overflow-hidden rounded-lg border text-left transition-all duration-300 sm:h-[6.6rem] sm:w-52 ${
                index === active
                  ? "border-bee-gold shadow-[0_0_0_2px_rgba(212,175,55,0.3),0_8px_32px_rgba(0,0,0,0.5)]"
                  : "border-white/10 opacity-60 hover:-translate-y-1 hover:opacity-100"
              }`}
              aria-label={`Présenter ${item.speaker}`}
              aria-current={index === active}
            >
              <SoonPlaceholder seed={`${item.id}-thumb`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                <p dir="auto" className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-bee-gold">
                  {item.profession}
                </p>
                <p dir="auto" className="mt-0.5 line-clamp-1 text-[0.82rem] font-black leading-tight text-white">
                  {item.speaker}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
