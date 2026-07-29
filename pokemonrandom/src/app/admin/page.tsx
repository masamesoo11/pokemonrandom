"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  TrendingUp,
  Users,
  Star,
  Dices,
  Eye,
  Trash2,
  ExternalLink,
  Settings,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import {
  useFavorites,
  useHistory,
  useSiteStats,
  type FavoritePokemon,
  type HistoryEntry,
  type SiteStats,
} from "@/lib/use-local-stats";
import { siteConfig, adSlots } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ADMIN_AUTH_KEY = "pokegen-admin-auth";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if admin was authenticated this session
    const isAuthed = sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
    setAuthed(isAuthed);
    setChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === siteConfig.adminPassword) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Hint: default is 'admin123', set ADMIN_PASSWORD env var to change.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setAuthed(false);
    setPassword("");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="pokeball-loader" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-950 dark:to-stone-900 p-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-xl">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-foreground mb-3">
                <div className="absolute inset-0 bg-red-500 top-0 h-1/2" />
                <div className="absolute inset-0 bg-white top-1/2 h-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-foreground rounded-full" />
              </div>
              <h1 className="text-2xl font-extrabold">Pokemon Random Admin</h1>
              <p className="text-xs text-muted-foreground mt-1">
                Restricted area — staff only
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              {error && (
                <div className="text-xs text-destructive flex items-start gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Login
              </button>
            </form>
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-4">
            <a href="/" className="hover:text-foreground">
              ← Back to site
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { favorites } = useFavorites();
  const { history } = useHistory();
  const { stats, reset: resetStats } = useSiteStats();

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-foreground">
              <div className="absolute inset-0 bg-red-500 top-0 h-1/2" />
              <div className="absolute inset-0 bg-white top-1/2 h-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-foreground -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-foreground rounded-full" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Pokemon Random Admin</p>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                Internal dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              View site <ExternalLink className="h-3 w-3" />
            </a>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/70 text-xs font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
        {/* Stats cards */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              icon={Dices}
              label="Pokemon Generated"
              value={stats.totalGenerated}
              color="bg-red-500"
            />
            <StatCard
              icon={Users}
              label="Teams Built"
              value={stats.totalTeams}
              color="bg-purple-500"
            />
            <StatCard
              icon={Eye}
              label="Total Guesses"
              value={stats.totalGuesses}
              sub={`${stats.correctGuesses} correct (${stats.totalGuesses > 0 ? Math.round((stats.correctGuesses / stats.totalGuesses) * 100) : 0}%)`}
              color="bg-amber-500"
            />
            <StatCard
              icon={TrendingUp}
              label="Wheel Spins"
              value={stats.totalSpins}
              color="bg-emerald-500"
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visit info */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Visitor Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visit count (this browser):</span>
                <span className="font-bold">{stats.visitCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last visit:</span>
                <span className="font-bold">
                  {new Date(stats.lastVisit).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saved favorites:</span>
                <span className="font-bold">{favorites.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">History entries:</span>
                <span className="font-bold">{history.length}</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Reset all stats? This cannot be undone.")) resetStats();
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-destructive hover:underline"
            >
              <Trash2 className="h-3.5 w-3.5" /> Reset stats
            </button>
          </section>

          {/* Tool usage */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Tool Usage
            </h3>
            <div className="space-y-2">
              {Object.entries(stats.toolUsage).length === 0 ? (
                <p className="text-sm text-muted-foreground">No usage yet.</p>
              ) : (
                Object.entries(stats.toolUsage)
                  .sort(([, a], [, b]) => b - a)
                  .map(([tool, count]) => {
                    const max = Math.max(...Object.values(stats.toolUsage));
                    const percent = (count / max) * 100;
                    return (
                      <div key={tool}>
                        <div className="flex justify-between text-sm mb-0.5">
                          <span className="font-medium capitalize">{tool}</span>
                          <span className="font-bold">{count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </section>

          {/* Top Pokemon */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Top Pokemon (Most Generated)
            </h3>
            <div className="space-y-2">
              {Object.entries(stats.topPokemon).length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No Pokemon generated yet.
                </p>
              ) : (
                Object.entries(stats.topPokemon)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([id, count]) => (
                    <div
                      key={id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={`#${id}`}
                        className="h-8 w-8"
                        loading="lazy"
                      />
                      <span className="font-mono text-xs text-muted-foreground">
                        #{String(id).padStart(4, "0")}
                      </span>
                      <span className="flex-1 font-bold">{count}×</span>
                      <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${
                              (count /
                                Math.max(...Object.values(stats.topPokemon))) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>

          {/* Ad config */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Ad Configuration Status
            </h3>
            <div className="space-y-3 text-sm">
              <ConfigRow
                label="AdSense Client"
                value={siteConfig.adsenseClient || "Not configured"}
                configured={!!siteConfig.adsenseClient}
              />
              <ConfigRow
                label="Header Banner Slot"
                value={adSlots.headerBanner || "Not set"}
                configured={!!adSlots.headerBanner}
              />
              <ConfigRow
                label="In-Content Slot"
                value={adSlots.inContent || "Not set"}
                configured={!!adSlots.inContent}
              />
              <ConfigRow
                label="Sidebar Slot"
                value={adSlots.sidebar || "Not set"}
                configured={!!adSlots.sidebar}
              />
              <ConfigRow
                label="Footer Slot"
                value={adSlots.footer || "Not set"}
                configured={!!adSlots.footer}
              />
              <ConfigRow
                label="Mobile Anchor Slot"
                value={adSlots.mobileAnchor || "Not set"}
                configured={!!adSlots.mobileAnchor}
              />
              <ConfigRow
                label="Google Analytics ID"
                value={siteConfig.gaId || "Not configured"}
                configured={!!siteConfig.gaId}
              />
              <ConfigRow
                label="Search Console Token"
                value={siteConfig.searchConsoleToken ? "✓ Set" : "Not set"}
                configured={!!siteConfig.searchConsoleToken}
              />
            </div>
            <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-xs text-blue-800 dark:text-blue-200">
              <strong>Setup instructions:</strong> Set these environment variables
              in your hosting provider:
              <pre className="mt-2 p-2 rounded bg-white dark:bg-black/30 overflow-x-auto text-[10px]">
{`NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXX
NEXT_PUBLIC_AD_SLOT_HEADER=1234567890
NEXT_PUBLIC_AD_SLOT_INCONTENT=2345678901
NEXT_PUBLIC_AD_SLOT_SIDEBAR=3456789012
NEXT_PUBLIC_AD_SLOT_FOOTER=4567890123
NEXT_PUBLIC_AD_SLOT_MOBILE=5678901234
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SEARCH_CONSOLE=token123
ADMIN_PASSWORD=your-strong-password`}
              </pre>
            </div>
          </section>
        </div>

        {/* Recent activity */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Recent Activity (from this browser)
          </h3>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {history.slice(0, 12).map((h, i) => (
                <HistoryCard key={i} entry={h} />
              ))}
            </div>
          )}
        </section>

        {/* Saved favorites */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" />
            User Favorites (from this browser)
          </h3>
          {favorites.length === 0 ? (
            <p className="text-sm text-muted-foreground">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2">
              {favorites.slice(0, 30).map((f) => (
                <FavoriteCard key={f.id} fav={f} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div
          className={cn(
            "h-9 w-9 rounded-lg flex items-center justify-center text-white",
            color
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-2xl font-extrabold">{value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function ConfigRow({
  label,
  value,
  configured,
}: {
  label: string;
  value: string;
  configured: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-mono text-xs px-2 py-0.5 rounded",
          configured
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
        )}
      >
        {configured ? "✓ " : "⚠ "}
        {value.length > 30 ? value.slice(0, 30) + "…" : value}
      </span>
    </div>
  );
}

function HistoryCard({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40">
      <img
        src={entry.sprite}
        alt={entry.name}
        className="h-8 w-8"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold truncate">{entry.name}</p>
        <p className="text-[10px] text-muted-foreground">
          {entry.tool} · {new Date(entry.viewedAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function FavoriteCard({ fav }: { fav: FavoritePokemon }) {
  return (
    <div className="rounded-lg bg-secondary/40 p-1.5 hover:bg-secondary transition-colors">
      <img
        src={fav.sprite}
        alt={fav.name}
        className="w-full h-auto"
        loading="lazy"
      />
      <p className="text-[10px] font-semibold text-center mt-1 truncate">
        {fav.name}
      </p>
    </div>
  );
}
