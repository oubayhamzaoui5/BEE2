import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  eyebrow?: string;
}

export function SectionHeader({ title, href = "#", eyebrow = "Parcourir" }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-[0.68rem] font-black uppercase tracking-[0.26em] text-bee-gold">{eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-bee-cream sm:text-[1.7rem]">
          {title}
        </h2>
      </div>
      <a
        href={href}
        className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-bee-muted transition hover:text-bee-gold"
      >
        Voir tout
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </div>
  );
}
