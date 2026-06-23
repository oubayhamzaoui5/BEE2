"use client";

import { LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const payload = await response.json();
    setPending(false);

    if (!response.ok) {
      setError(payload.error ?? "Connexion impossible.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bee-ink px-4 py-12 text-bee-cream">
      <section className="w-full max-w-md rounded-xl border border-bee-line bg-bee-surface p-6 shadow-card sm:p-8">
        <div className="mb-7">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded bg-bee-gold font-display font-black text-bee-ink">
            B.
          </div>
          <h1 className="font-display text-3xl font-semibold">Admin login</h1>
          <p className="mt-2 text-sm text-bee-muted">Gestion du contenu Beto.</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-[0.16em] text-bee-muted">Email</span>
            <span className="flex items-center gap-2 rounded-lg border border-bee-line bg-bee-coal px-3 py-2.5 focus-within:border-bee-gold">
              <Mail className="h-4 w-4 text-bee-gold" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm font-bold text-white outline-none"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-[0.16em] text-bee-muted">Mot de passe</span>
            <span className="flex items-center gap-2 rounded-lg border border-bee-line bg-bee-coal px-3 py-2.5 focus-within:border-bee-gold">
              <LockKeyhole className="h-4 w-4 text-bee-gold" aria-hidden="true" />
              <input
                className="w-full bg-transparent text-sm font-bold text-white outline-none"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </span>
          </label>

          {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

          <button
            className="w-full rounded-lg bg-bee-gold px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-bee-ink transition hover:bg-bee-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
          >
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}
