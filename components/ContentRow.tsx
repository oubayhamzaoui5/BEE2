"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ContentRowProps {
  title: string;
  eyebrow: string;
  href?: string;
  children: React.ReactNode;
}

export function ContentRow({ title, eyebrow, href = "#", children }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="group/row relative py-7 sm:py-9">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">{eyebrow}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-bee-cream sm:text-[1.7rem]">
            {title}
          </h2>
        </div>
        <a
          href={href}
          className="group/link inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-bee-muted transition hover:text-bee-gold"
        >
          Voir tout
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
        </a>
      </div>

      <div className="relative">
        {canLeft && (
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-bee-gold hover:bg-bee-gold hover:text-bee-ink group-hover/row:opacity-100 md:flex"
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {canRight && (
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:border-bee-gold hover:bg-bee-gold hover:text-bee-ink group-hover/row:opacity-100 md:flex"
            aria-label="Défiler vers la droite"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="row-scroll row-mask flex gap-4 overflow-x-auto px-4 pb-3 pt-1 sm:px-6 lg:px-10"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
