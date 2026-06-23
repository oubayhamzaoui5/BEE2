import { Play, Radio } from "lucide-react";
import type { Podcast } from "@/lib/mock-data";
import { SoonPlaceholder } from "@/components/SoonPlaceholder";

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <article className="group w-[300px] shrink-0 overflow-hidden rounded-xl border border-bee-line bg-bee-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-bee-gold/40 hover:shadow-card-hover sm:w-[340px]">
      <div className="relative aspect-video overflow-hidden bg-bee-coal">
        <SoonPlaceholder seed={podcast.id ?? podcast.title} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded bg-black/70 px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
          <Radio className="h-3 w-3 text-bee-gold" aria-hidden="true" />
          Épisode
        </div>
        {/* play affordance appears on hover, platform-style */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-bee-gold text-bee-ink opacity-0 shadow-glow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          </span>
        </div>
        <span className="absolute bottom-3 right-3 rounded bg-black/75 px-2 py-0.5 text-[0.7rem] font-bold text-white backdrop-blur-sm">
          {podcast.duration}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-[0.7rem]">
          <p dir="auto" className="font-black text-bee-gold">
            {podcast.guest}
          </p>
          <span className="text-bee-muted">·</span>
          <p dir="auto" className="font-bold uppercase tracking-[0.14em] text-bee-muted">
            {podcast.guestProfession}
          </p>
        </div>
        <h3
          dir="auto"
          className="mt-2 line-clamp-2 text-[1.02rem] font-black leading-snug text-bee-cream transition-colors group-hover:text-white"
        >
          {podcast.title}
        </h3>
        <p className="mt-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-bee-muted/70">{podcast.episode}</p>
      </div>
    </article>
  );
}
