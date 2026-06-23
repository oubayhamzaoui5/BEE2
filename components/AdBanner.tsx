import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { Ad } from "@/lib/mock-data";
import { SoonPlaceholder } from "@/components/SoonPlaceholder";

interface AdBannerProps {
  ad: Ad;
}

export function AdBanner({ ad }: AdBannerProps) {
  return (
    <aside className="group relative overflow-hidden rounded-2xl border border-bee-line shadow-card transition-all duration-300 hover:border-bee-gold/35 hover:shadow-card-hover">
      {/* full-bleed billboard, text laid over the image like a platform promo */}
      <div className="relative min-h-[320px] sm:min-h-[300px]">
        <SoonPlaceholder seed={ad.id ?? ad.headline} className="transition-transform duration-[1.2s] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-bee-ink/95 via-bee-ink/75 to-bee-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bee-ink/80 to-transparent" />

        <div className="relative flex h-full min-h-[320px] flex-col justify-center p-6 sm:min-h-[300px] sm:p-10 lg:max-w-[62%]">
          <span className="mb-4 w-fit rounded-full border border-bee-gold/50 bg-bee-gold/15 px-3.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.22em] text-bee-gold backdrop-blur-sm">
            {ad.label}
          </span>
          <h3 className="text-balance font-display text-xl font-semibold leading-snug text-bee-cream sm:text-2xl lg:text-[1.7rem]">
            {ad.headline}
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2 text-[0.82rem] font-bold text-white/75">
              <MapPin className="h-4 w-4 text-bee-gold" aria-hidden="true" />
              {ad.location}
            </span>
            <span className="inline-flex items-center gap-2 text-[0.82rem] font-bold text-white/75">
              <Calendar className="h-4 w-4 text-bee-gold" aria-hidden="true" />
              {ad.date}
            </span>
          </div>
          <div className="mt-6 flex items-center gap-5">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-bee-gold px-6 py-2.5 text-[0.78rem] font-black uppercase tracking-[0.14em] text-bee-ink transition-all duration-300 hover:bg-bee-gold-bright hover:shadow-glow"
            >
              S'inscrire
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <p className="text-[0.78rem] font-black uppercase tracking-[0.2em] text-white/60">{ad.brand}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
