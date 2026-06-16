import Image from "next/image";
import { Eye, Play } from "lucide-react";
import type { Short } from "@/lib/mock-data";

interface ShortCardProps {
  short: Short;
}

export function ShortCard({ short }: ShortCardProps) {
  return (
    <article className="group relative aspect-[9/16] w-[210px] shrink-0 overflow-hidden rounded-xl border border-bee-line bg-bee-coal shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-bee-gold/40 hover:shadow-card-hover sm:w-[235px]">
      <Image
        src={short.image}
        alt=""
        fill
        sizes="235px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
      <div className="absolute left-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-bee-gold text-bee-ink shadow-glow transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p dir="auto" className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-bee-gold">
          {short.profession}
        </p>
        <h3 dir="auto" className="mt-1 line-clamp-3 text-[1.02rem] font-black leading-snug text-white">
          {short.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p dir="auto" className="text-[0.72rem] font-bold text-white/65">
            {short.speaker}
          </p>
          <p className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-white/55">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {short.views}
          </p>
        </div>
      </div>
    </article>
  );
}
