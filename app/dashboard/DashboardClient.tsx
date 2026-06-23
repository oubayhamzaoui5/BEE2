"use client";

import {
  BarChart3,
  Bell,
  ChevronDown,
  Edit3,
  Eye,
  FileText,
  Filter,
  ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Megaphone,
  MoreHorizontal,
  Play,
  PlayCircle,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  UsersRound
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

type Collection = "heroSlides" | "podcasts" | "articles" | "ads" | "shorts";
type Item = Record<string, string | number> & { _id: string };
type Content = Record<Collection, Item[]>;
type StatusTone = "idle" | "loading" | "success" | "error";

const collections: {
  id: Collection;
  label: string;
  singular: string;
  icon: typeof Sparkles;
  status: string;
}[] = [
  { id: "heroSlides", label: "À la une", singular: "Slide", icon: Sparkles, status: "Publié" },
  { id: "podcasts", label: "Épisodes", singular: "Épisode", icon: PlayCircle, status: "Programmé" },
  { id: "articles", label: "Articles", singular: "Article", icon: FileText, status: "Brouillon" },
  { id: "ads", label: "Annonces", singular: "Annonce", icon: Megaphone, status: "Sponsor" },
  { id: "shorts", label: "Shorts", singular: "Short", icon: Play, status: "Publié" }
];

const fields: Record<Collection, string[]> = {
  heroSlides: ["type", "quote", "speaker", "profession", "episode", "image", "order"],
  podcasts: ["title", "guest", "guestProfession", "episode", "duration", "image", "order"],
  articles: ["title", "excerpt", "author", "authorProfession", "category", "readTime", "image", "order"],
  ads: ["label", "headline", "brand", "location", "date", "image", "order"],
  shorts: ["title", "speaker", "profession", "views", "image", "order"]
};

const fieldLabels: Record<string, string> = {
  author: "Auteur",
  authorProfession: "Métier auteur",
  brand: "Marque",
  category: "Catégorie",
  date: "Date",
  duration: "Durée",
  episode: "Épisode",
  excerpt: "Extrait",
  guest: "Invité",
  guestProfession: "Métier invité",
  headline: "Titre promo",
  image: "Image",
  label: "Libellé",
  location: "Lieu",
  order: "Ordre",
  profession: "Métier",
  quote: "Citation",
  readTime: "Temps de lecture",
  speaker: "Intervenant",
  title: "Titre",
  type: "Type",
  views: "Vues"
};

const largeFields = new Set(["quote", "excerpt", "headline"]);

export function DashboardClient() {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [activeCollection, setActiveCollection] = useState<Collection>("heroSlides");
  const [activeId, setActiveId] = useState("");
  const [draft, setDraft] = useState<Record<string, string | number>>({});
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Chargement...");
  const [statusTone, setStatusTone] = useState<StatusTone>("loading");
  const [pending, setPending] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editDraft, setEditDraft] = useState<Record<string, string | number>>({});

  const collectionMeta = collections.find((collection) => collection.id === activeCollection) ?? collections[0];
  const items = useMemo(() => content?.[activeCollection] ?? [], [activeCollection, content]);
  const allItems = useMemo(
    () => collections.flatMap((collection) => (content?.[collection.id] ?? []).map((item) => ({ ...item, collection: collection.id }))),
    [content]
  );
  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;

    return items.filter((item) => getItemTitle(item).toLowerCase().includes(needle) || getItemMeta(item).toLowerCase().includes(needle));
  }, [items, query]);
  const activeItem = useMemo(
    () => items.find((item) => item._id === activeId) ?? filteredItems[0] ?? items[0],
    [activeId, filteredItems, items]
  );
  const editHasChanges = editingItem ? fields[activeCollection].some((field) => editDraft[field] !== editingItem[field]) : false;
  const totalItems = allItems.length;
  const heroImage = String(draft.image ?? activeItem?.image ?? "");

  const setStatusState = useCallback((message: string, tone: StatusTone) => {
    setStatus(message);
    setStatusTone(tone);
  }, []);

  const loadContent = useCallback(async () => {
    setStatusState("Chargement...", "loading");
    const response = await fetch("/api/admin/content", { cache: "no-store" });

    if (response.status === 401) {
      router.replace("/login");
      return;
    }

    const payload = await response.json();

    if (!response.ok) {
      setStatusState(payload.error ?? "Erreur de chargement.", "error");
      return;
    }

    setContent(payload.content);
    setStatusState("Synchronisé", "success");
  }, [router, setStatusState]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  useEffect(() => {
    if (activeItem) {
      setActiveId(activeItem._id);
      setDraft(activeItem);
    }
  }, [activeItem]);

  async function save() {
    if (!editingItem) return;

    setPending(true);
    setStatusState("Enregistrement...", "loading");

    const patch = Object.fromEntries(fields[activeCollection].map((field) => [field, editDraft[field] ?? ""]));
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: activeCollection, id: editingItem._id, patch })
    });
    const payload = await response.json();
    setPending(false);

    if (!response.ok) {
      setStatusState(payload.error ?? "Sauvegarde impossible.", "error");
      return;
    }

    setContent(payload.content);
    setActiveId(editingItem._id);
    setEditingItem(null);
    setStatusState("Sauvegardé", "success");
  }

  async function deleteItem(item: Item) {
    const ok = window.confirm(`Supprimer "${getItemTitle(item)}" ?`);
    if (!ok) return;

    setPending(true);
    setStatusState("Suppression...", "loading");

    const response = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection: activeCollection, id: item._id })
    });
    const payload = await response.json();
    setPending(false);
    setMenuOpenId(null);

    if (!response.ok) {
      setStatusState(payload.error ?? "Suppression impossible.", "error");
      return;
    }

    setContent(payload.content);
    if (item._id === activeId) {
      setActiveId("");
    }
    setStatusState("Supprimé", "success");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/login");
  }

  function updateDraft(field: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const value = field === "order" ? Number(event.target.value) : event.target.value;
    setEditDraft((current) => ({ ...current, [field]: value }));
    setStatusState("Modifications locales", "idle");
  }

  function openEditor(item: Item) {
    setActiveId(item._id);
    setEditingItem(item);
    setEditDraft(item);
    setMenuOpenId(null);
  }

  return (
    <main className="min-h-screen bg-[#0B0B0C] text-[#F5F5F4] antialiased lg:flex" style={{ fontFamily: "var(--font-admin-sans), sans-serif" }}>
      <Sidebar
        activeCollection={activeCollection}
        content={content}
        onLogout={logout}
        onCollectionChange={(collection) => {
          setActiveCollection(collection);
          setActiveId("");
          setQuery("");
        }}
      />

      <section className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex min-h-[68px] flex-wrap items-center gap-4 border-b border-white/[0.07] bg-[#0B0B0C]/85 px-4 py-3 backdrop-blur-md sm:px-7">
          <div className="min-w-[220px] flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#F2C744]">Contenu dynamique</p>
            <h1 className="mt-0.5 text-[23px] font-semibold leading-tight tracking-[-0.2px]" style={{ fontFamily: "var(--font-admin-serif), serif" }}>
              Console Admin
            </h1>
          </div>

          <label className="flex h-10 w-full items-center gap-2 rounded-[10px] border border-white/[0.08] bg-[#161618] px-3 sm:w-[280px]">
            <Search className="h-4 w-4 text-[#6F6F6D]" aria-hidden="true" />
            <input
              className="w-full bg-transparent text-[13px] font-medium text-[#F5F5F4] outline-none placeholder:text-[#6F6F6D]"
              placeholder="Rechercher contenu, praticiens..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.08] bg-[#161618] text-[#C9C9C7]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 h-[7px] w-[7px] rounded-full border-2 border-[#161618] bg-[#F2C744]" />
          </button>

          <button
            className="flex h-10 items-center gap-2 rounded-[10px] border-0 bg-[#F2C744] px-4 text-[13px] font-semibold text-[#1A1505]"
            onClick={loadContent}
            disabled={pending}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Rafraîchir
          </button>
        </header>

        <div className="px-4 py-6 sm:px-7">
          <div className="relative mb-6 min-h-[230px] overflow-hidden rounded-[18px]">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src={heroImage} />
            ) : (
              <div className="absolute inset-0 bg-[#141416]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,12,0.96)_0%,rgba(11,11,12,0.82)_38%,rgba(11,11,12,0.35)_70%,rgba(11,11,12,0.15)_100%)]" />
            <div className="relative flex min-h-[230px] max-w-[610px] flex-col justify-center px-6 py-8 sm:px-9">
              <div className="mb-3 inline-flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[1.6px] text-[#F2C744]">À la une</span>
                <span className="text-[11px] text-[#9A9A98]">· {String(draft.episode ?? collectionMeta.singular)}</span>
              </div>
              <h2 className="text-[30px] font-semibold leading-[1.18] tracking-[-0.4px]" style={{ fontFamily: "var(--font-admin-serif), serif" }}>
                {getItemTitle(draft)}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <AvatarLabel item={draft} />
                <span className="text-[13px] font-medium text-[#D6D6D4]">{String(draft.speaker ?? draft.guest ?? draft.author ?? draft.brand ?? "Beto.")}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.6px] text-[#F2C744]">{getItemMeta(draft)}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex h-10 items-center gap-2 rounded-[10px] bg-[#F2C744] px-4 text-[13px] font-semibold text-[#1A1505]">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Aperçu
                </button>
                <button
                  className="flex h-10 items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.08] px-4 text-[13px] font-semibold text-white"
                  onClick={() => activeItem && openEditor(activeItem)}
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                  Modifier
                </button>
              </div>
            </div>
          </div>

          <div className="mb-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total contenus" value={String(totalItems)} delta="+12%" icon={BarChart3} />
            <StatCard label="Collection active" value={String(items.length)} delta={collectionMeta.label} icon={collectionMeta.icon} />
            <StatCard label="Vues simulées" value={formatCompactViews(totalItems)} delta="+3,2%" icon={Eye} />
            <StatCard label="État" value={status} delta={editHasChanges ? "Non sauvegardé" : "À jour"} icon={RefreshCw} tone={statusTone} />
          </div>

          <div>
            <ContentTable
              activeCollection={activeCollection}
              activeId={activeItem?._id ?? ""}
              collectionMeta={collectionMeta}
              filteredItems={filteredItems}
              items={items}
              menuOpenId={menuOpenId}
              onDelete={deleteItem}
              onEdit={openEditor}
              onMenuToggle={(id) => setMenuOpenId((current) => (current === id ? null : id))}
              onSelect={setActiveId}
            />
          </div>
        </div>
      </section>

      {editingItem && (
        <EditModal
          activeCollection={activeCollection}
          draft={editDraft}
          hasChanges={editHasChanges}
          onChange={updateDraft}
          onClose={() => {
            setEditingItem(null);
            setEditDraft({});
            setStatusState("Synchronisé", "success");
          }}
          onSave={save}
          pending={pending}
          status={status}
          statusTone={statusTone}
          title={getItemTitle(editingItem)}
        />
      )}
    </main>
  );
}

function Sidebar({
  activeCollection,
  content,
  onLogout,
  onCollectionChange
}: {
  activeCollection: Collection;
  content: Content | null;
  onLogout: () => void;
  onCollectionChange: (collection: Collection) => void;
}) {
  const navStyle =
    "flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[13px] font-semibold transition";

  return (
    <aside className="border-b border-white/[0.07] bg-[#0E0E10] lg:sticky lg:top-0 lg:h-screen lg:w-[264px] lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 px-[22px] pb-[18px] pt-[22px]">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[#F2C744] text-[15px] font-bold tracking-[-0.5px] text-[#1A1505]">
            B.
          </div>
          <div>
            <div className="text-base font-bold tracking-[0.5px]">Beto.</div>
            <div className="mt-px text-[10px] font-semibold uppercase tracking-[1.5px] text-[#6F6F6D]">Console Admin</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <NavSection label="Pilotage">
            <button className={`${navStyle} bg-[#F2C744] text-[#1A1505]`}>
              <LayoutDashboard className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="flex-1">Dashboard</span>
            </button>
            <button className={`${navStyle} text-[#9A9A98] hover:bg-white/[0.05] hover:text-[#F5F5F4]`}>
              <BarChart3 className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="flex-1">Performance</span>
            </button>
          </NavSection>

          <NavSection label="Contenu">
            {collections.map((collection) => {
              const Icon = collection.icon;
              const active = collection.id === activeCollection;
              const count = content?.[collection.id]?.length ?? 0;

              return (
                <button
                  key={collection.id}
                  className={`${navStyle} ${active ? "bg-[#F2C744] text-[#1A1505]" : "text-[#9A9A98] hover:bg-white/[0.05] hover:text-[#F5F5F4]"}`}
                  onClick={() => onCollectionChange(collection.id)}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  <span className="flex-1">{collection.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      active ? "bg-[#1A1505]/12 text-[#1A1505]" : "bg-white/[0.08] text-[#C9C9C7]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </NavSection>

          <NavSection label="Communauté">
            <button className={`${navStyle} text-[#9A9A98] hover:bg-white/[0.05] hover:text-[#F5F5F4]`}>
              <UsersRound className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="flex-1">Praticiens</span>
            </button>
            <button className={`${navStyle} text-[#9A9A98] hover:bg-white/[0.05] hover:text-[#F5F5F4]`}>
              <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="flex-1">Messages</span>
              <span className="rounded-full bg-[#F2C744] px-2 py-0.5 text-[11px] font-semibold text-[#1A1505]">3</span>
            </button>
          </NavSection>
        </div>

        <div className="border-t border-white/[0.07] p-3.5">
          <div className="flex items-center gap-3 rounded-[10px] px-2.5 py-2">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3a3a3f,#1d1d20)] text-[13px] font-semibold text-[#E6E6E4]">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">Admin</div>
              <div className="text-[11px] text-[#6F6F6D]">Editeur Beto.</div>
            </div>
            <button className="text-[#6F6F6D] transition hover:text-[#F2C744]" onClick={onLogout} aria-label="Déconnexion">
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavSection({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="space-y-1">
      <div className="px-2.5 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[1.6px] text-[#5E5E5C]">{label}</div>
      {children}
    </div>
  );
}

function StatCard({
  delta,
  icon: Icon,
  label,
  tone = "success",
  value
}: {
  delta: string;
  icon: typeof Sparkles;
  label: string;
  tone?: StatusTone;
  value: string;
}) {
  const color = tone === "error" ? "#D96A6A" : tone === "loading" ? "#7BA7D9" : tone === "idle" ? "#F2C744" : "#6FBF8F";

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#141416] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#6F6F6D]">{label}</p>
          <div className="mt-2 text-[26px] font-semibold tracking-[-0.5px] text-white" style={{ fontFamily: "var(--font-admin-serif), serif" }}>
            {value}
          </div>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-white/[0.05] text-[#F2C744]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-3 text-[12px] font-semibold" style={{ color }}>
        {delta}
      </div>
    </div>
  );
}

function ContentTable({
  activeCollection,
  activeId,
  collectionMeta,
  filteredItems,
  items,
  menuOpenId,
  onDelete,
  onEdit,
  onMenuToggle,
  onSelect
}: {
  activeCollection: Collection;
  activeId: string;
  collectionMeta: (typeof collections)[number];
  filteredItems: Item[];
  items: Item[];
  menuOpenId: string | null;
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
  onMenuToggle: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#6F6F6D]">Production</p>
          <h2 className="mt-1 text-xl font-semibold" style={{ fontFamily: "var(--font-admin-serif), serif" }}>
            {collectionMeta.label}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 items-center gap-2 rounded-[9px] border border-white/[0.08] bg-[#161618] px-3 text-[13px] font-semibold text-[#9A9A98]">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtrer
          </button>
          <button className="flex h-9 items-center gap-2 rounded-[9px] border border-white/[0.08] bg-[#161618] px-3 text-[13px] font-semibold text-[#9A9A98]">
            Trier : Récent
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-[#141416]">
        <div className="hidden grid-cols-[34px_2.6fr_1fr_1.4fr_1fr_0.8fr_40px] items-center gap-3 border-b border-white/[0.07] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#6F6F6D] lg:grid">
          <div>
            <span className="block h-4 w-4 rounded border border-white/20" />
          </div>
          <div>Titre</div>
          <div>Type</div>
          <div>Praticien</div>
          <div>Statut</div>
          <div>Ordre</div>
          <div />
        </div>

        <div>
          {filteredItems.map((item) => {
            const active = item._id === activeId;
            const status = getStatus(activeCollection, item);

            return (
              <div
                key={item._id}
                role="button"
                tabIndex={0}
                className={`grid w-full gap-3 border-b border-white/[0.05] px-4 py-3 text-left transition lg:grid-cols-[34px_2.6fr_1fr_1.4fr_1fr_0.8fr_40px] lg:items-center lg:px-5 ${
                  active ? "bg-[#F2C744]/[0.08]" : "hover:bg-white/[0.035]"
                }`}
                onClick={() => onSelect(item._id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(item._id);
                  }
                }}
              >
                <div className="hidden lg:block">
                  <span className={`block h-4 w-4 rounded border ${active ? "border-[#F2C744] bg-[#F2C744]" : "border-white/20"}`} />
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-11 w-[62px] shrink-0 overflow-hidden rounded-lg bg-[#222225]">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" className="absolute inset-0 h-full w-full object-cover" src={String(item.image)} />
                    ) : (
                      <ImageIcon className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[#6F6F6D]" aria-hidden="true" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                      <collectionMeta.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-semibold text-[#F5F5F4]">{getItemTitle(item)}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#8A8A88]">
                      <span className="h-[7px] w-[7px] rounded-full bg-[#F2C744]" />
                      {String(item.category ?? item.episode ?? item.duration ?? collectionMeta.singular)}
                    </div>
                  </div>
                </div>

                <div className="hidden text-[13px] text-[#C9C9C7] lg:block">{collectionMeta.singular}</div>
                <div className="hidden truncate text-[13px] text-[#C9C9C7] lg:block">{String(item.speaker ?? item.guest ?? item.author ?? item.brand ?? "Beto.")}</div>
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.color }} />
                    {status.label}
                  </span>
                </div>
                <div className="hidden text-[13px] text-[#C9C9C7] lg:block">{String(item.order ?? 0)}</div>
                <div className="relative text-right text-[#6F6F6D]">
                  <button
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/[0.08] hover:text-[#F2C744]"
                    onClick={(event) => {
                      event.stopPropagation();
                      onMenuToggle(item._id);
                    }}
                    aria-label="Actions"
                    aria-expanded={menuOpenId === item._id}
                  >
                    <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {menuOpenId === item._id && (
                    <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-white/[0.08] bg-[#19191c] p-1 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
                      <button
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-[#F5F5F4] hover:bg-white/[0.06]"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEdit(item);
                        }}
                      >
                        <Edit3 className="h-4 w-4 text-[#F2C744]" aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-red-200 hover:bg-red-400/10"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDelete(item);
                        }}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-5 py-3 text-[13px] text-[#8A8A88]">
          <span>
            Affichage {filteredItems.length ? 1 : 0}-{filteredItems.length} sur {items.length}
          </span>
          <span className="rounded-lg bg-[#F2C744] px-3 py-1.5 text-sm font-semibold text-[#1A1505]">1</span>
        </div>
      </div>
    </section>
  );
}

function EditModal({
  activeCollection,
  draft,
  hasChanges,
  onChange,
  onClose,
  onSave,
  pending,
  status,
  statusTone,
  title
}: {
  activeCollection: Collection;
  draft: Record<string, string | number>;
  hasChanges: boolean;
  onChange: (field: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onClose: () => void;
  onSave: () => void;
  pending: boolean;
  status: string;
  statusTone: StatusTone;
  title: string;
}) {
  const primaryFields = fields[activeCollection].filter((field) => !["image", "order"].includes(field));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92svh] w-full max-w-3xl overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#141416] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
        <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#F2C744]">Modifier</p>
              <h3 className="mt-1 text-xl font-semibold" style={{ fontFamily: "var(--font-admin-serif), serif" }}>
                {title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill tone={statusTone} label={status} />
              <button
                className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.08] bg-[#161618] text-xl leading-none text-[#9A9A98] transition hover:text-white"
                onClick={onClose}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(92svh-150px)] space-y-5 overflow-y-auto p-5 sm:p-6">
          <FieldGroup fields={primaryFields} draft={draft} onChange={onChange} title="Contenu" />
          <FieldGroup fields={["image", "order"]} draft={draft} onChange={onChange} title="Publication" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-[#111113] px-5 py-4 sm:px-6">
          <p className={`text-[13px] font-semibold ${hasChanges ? "text-[#F2C744]" : "text-[#8A8A88]"}`}>
            {hasChanges ? "Modifications non sauvegardées" : "Aucune modification"}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="h-10 rounded-[10px] border border-white/[0.08] bg-[#161618] px-4 text-[13px] font-semibold text-[#C9C9C7] transition hover:text-white"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-[10px] bg-[#F2C744] px-4 text-[13px] font-semibold text-[#1A1505] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onSave}
              disabled={pending || !hasChanges}
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldGroup({
  draft,
  fields: groupFields,
  onChange,
  title
}: {
  draft: Record<string, string | number>;
  fields: string[];
  onChange: (field: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  title: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[11px] font-semibold uppercase tracking-[1.6px] text-[#F2C744]">{title}</h4>
      </div>
      <div className="space-y-3">
        {groupFields.map((field) => (
          <FieldControl key={field} field={field} value={draft[field] ?? ""} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}

function FieldControl({
  field,
  onChange,
  value
}: {
  field: string;
  onChange: (field: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  value: string | number;
}) {
  const inputClass =
    "w-full rounded-[10px] border border-white/[0.08] bg-[#161618] px-3 text-[13px] font-medium text-[#F5F5F4] outline-none transition focus:border-[#F2C744]";

  if (field === "type") {
    return (
      <label className="block">
        <FieldLabel field={field} />
        <select className={`${inputClass} h-10`} value={String(value)} onChange={(event) => onChange(field, event)}>
          {["Épisode", "Série", "Court", "Article"].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <FieldLabel field={field} />
      {largeFields.has(field) ? (
        <textarea
          className={`${inputClass} min-h-28 resize-y py-3 leading-relaxed`}
          dir="auto"
          value={String(value)}
          onChange={(event) => onChange(field, event)}
        />
      ) : (
        <input
          className={`${inputClass} h-10`}
          dir="auto"
          type={field === "order" ? "number" : "text"}
          value={String(value)}
          onChange={(event) => onChange(field, event)}
        />
      )}
    </label>
  );
}

function FieldLabel({ field }: { field: string }) {
  return <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[1.2px] text-[#6F6F6D]">{fieldLabels[field] ?? field}</span>;
}

function StatusPill({ tone, label }: { tone: StatusTone; label: string }) {
  const toneClass = {
    error: "bg-red-400/10 text-red-200",
    idle: "bg-[#F2C744]/10 text-[#F2C744]",
    loading: "bg-blue-300/10 text-blue-100",
    success: "bg-emerald-300/10 text-emerald-100"
  }[tone];

  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClass}`}>{label}</span>;
}

function AvatarLabel({ item }: { item: Record<string, string | number> }) {
  const name = String(item.speaker ?? item.guest ?? item.author ?? item.brand ?? "Beto.");
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#B89B72] text-[11px] font-semibold text-[#15110A]">{initials}</span>;
}

function getStatus(collection: Collection, item: Record<string, string | number>) {
  if (collection === "ads") return { bg: "rgba(242,199,68,0.12)", color: "#F2C744", label: "Sponsor" };
  if (collection === "articles") return { bg: "rgba(111,191,143,0.12)", color: "#6FBF8F", label: "Publié" };
  if (Number(item.order ?? 0) > 2) return { bg: "rgba(123,167,217,0.12)", color: "#7BA7D9", label: "Prévu" };
  return { bg: "rgba(111,191,143,0.12)", color: "#6FBF8F", label: "Publié" };
}

function formatCompactViews(totalItems: number) {
  return `${Math.max(1, totalItems * 84).toLocaleString("fr-FR")}K`;
}

function getItemTitle(item: Record<string, string | number>) {
  return String(item.title ?? item.headline ?? item.quote ?? item.speaker ?? item.label ?? "Sans titre");
}

function getItemMeta(item: Record<string, string | number>) {
  return String(
    item.profession ??
      item.guestProfession ??
      item.authorProfession ??
      item.category ??
      item.brand ??
      item.episode ??
      item.location ??
      ""
  );
}
