import Image from "next/image";
import { Clock3 } from "lucide-react";
import type { Article } from "@/lib/mock-data";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-bee-line bg-bee-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-bee-gold/40 hover:shadow-card-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-bee-coal">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bee-surface via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded bg-black/70 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-bee-gold backdrop-blur-md">
          {article.category}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5 text-[0.72rem]">
          <span dir="auto" className="font-black text-bee-gold">
            {article.author}
          </span>
          <span dir="auto" className="font-bold uppercase tracking-[0.12em] text-bee-muted">
            {article.authorProfession}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-bold text-bee-muted/80">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readTime}
          </span>
        </div>
        <h3
          dir="auto"
          className="mt-3 font-display text-xl font-semibold leading-tight text-bee-cream transition-colors group-hover:text-white sm:text-[1.45rem]"
        >
          {article.title}
        </h3>
        <p dir="auto" className="mt-2.5 line-clamp-2 text-[0.92rem] leading-relaxed text-bee-muted">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
