"use client";

import { Bell, Menu, Search, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = ["Accueil", "Épisodes", "Articles", "Shorts", "Événements", "Abonnement"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-bee-line bg-bee-ink/92 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/72 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-5 px-4 py-3.5 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5" aria-label="Accueil BEE2">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-bee-gold font-display text-base font-black text-bee-ink shadow-glow">
              B2
            </span>
            <span className="font-display text-xl font-black tracking-wide text-bee-cream">BEE2</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`rounded-full px-3.5 py-1.5 text-[0.82rem] font-bold transition-all duration-300 ${
                  index === 0
                    ? "bg-white/10 text-white"
                    : "text-bee-muted hover:bg-white/5 hover:text-bee-cream"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-full text-bee-muted transition hover:bg-white/8 hover:text-bee-cream sm:flex"
            aria-label="Rechercher"
          >
            <Search className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
          </button>
          <button
            className="relative hidden h-9 w-9 items-center justify-center rounded-full text-bee-muted transition hover:bg-white/8 hover:text-bee-cream sm:flex"
            aria-label="Notifications"
          >
            <Bell className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-bee-gold" />
          </button>
          <a
            href="/login"
            className="ml-1.5 inline-flex items-center gap-2 rounded-full bg-bee-gold px-4 py-2 text-[0.82rem] font-black text-bee-ink transition-all duration-300 hover:bg-bee-gold-bright hover:shadow-glow"
          >
            <UserRound className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            Login
          </a>
          <button
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-bee-cream transition hover:bg-white/8 lg:hidden"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-bee-line bg-bee-ink/97 px-4 py-4 backdrop-blur-xl lg:hidden"
          aria-label="Navigation mobile"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                  index === 0 ? "bg-white/10 text-white" : "text-bee-muted hover:bg-white/5 hover:text-bee-cream"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
