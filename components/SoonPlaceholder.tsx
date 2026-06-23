import type { CSSProperties } from "react";

interface SoonPlaceholderProps {
  seed: string;
  className?: string;
  label?: string;
}

const palette = [
  ["#facc15", "#ef4444", "#111827"],
  ["#22d3ee", "#2563eb", "#020617"],
  ["#a78bfa", "#ec4899", "#18181b"],
  ["#34d399", "#84cc16", "#052e16"],
  ["#fb923c", "#f97316", "#1c1917"],
  ["#f472b6", "#8b5cf6", "#111827"],
  ["#38bdf8", "#14b8a6", "#0f172a"],
  ["#fde047", "#f59e0b", "#1c1917"]
];

function colorIndex(seed: string) {
  return Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length;
}

export function SoonPlaceholder({ seed, className = "", label = "Soon" }: SoonPlaceholderProps) {
  const [from, to, ink] = palette[colorIndex(seed)];
  const style = {
    "--soon-from": from,
    "--soon-to": to,
    "--soon-ink": ink
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,var(--soon-from),var(--soon-to))] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_80%_85%,rgba(0,0,0,0.26),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="rotate-[-8deg] rounded-md bg-white/80 px-4 py-2 font-display text-3xl font-black uppercase tracking-[0.08em] text-[var(--soon-ink)] shadow-[0_12px_40px_rgba(0,0,0,0.24)] sm:text-5xl">
          {label}
        </span>
      </div>
    </div>
  );
}
