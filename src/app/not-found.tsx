import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search, RotateCcw, Gamepad2, Dices, Disc } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Server component with explicit metadata:
// - Proper 404 title (was inheriting the homepage title before)
// - Explicit noindex that OVERRIDES the root layout's "index, follow",
//   removing the previous conflicting duplicate robots metas on /404 and /_not-found.
export const metadata: Metadata = {
  title: "Page Not Found (404) | Pokemon Random",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Animated pokeball + 404 */}
          <div className="relative inline-block mb-8">
            {/* Big 404 number with pokeball overlay */}
            <h1 className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent select-none">
              404
            </h1>
            {/* Floating pokeball */}
            <div className="absolute -top-4 -right-4 sm:top-4 sm:right-4 animate-float">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-4 border-foreground shadow-2xl">
                <div className="absolute inset-0 bg-red-500 top-0 h-1/2" />
                <div className="absolute inset-0 bg-white top-1/2 h-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 h-5 w-5 sm:h-6 sm:w-6 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-foreground rounded-full" />
              </div>
            </div>
          </div>

          {/* Emoji */}
          <div className="text-6xl mb-4 animate-bounce-in">🎲</div>

          {/* Title and description */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            A wild 404 appeared!
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 max-w-md mx-auto">
            The Pokemon you&apos;re looking for has fled to another route. The page
            may have been moved, deleted, or never existed.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Try one of the tools below, or use the navigation to get back on
            track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/#generator"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-secondary/70 transition-all"
            >
              <Dices className="h-4 w-4" />
              Generate Pokemon
            </Link>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-border bg-card p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">
              Try one of these instead
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <QuickLink href="/#generator" icon={Dices} label="Generator" />
              <QuickLink href="/#team" icon={Gamepad2} label="Team Builder" />
              <QuickLink href="/#wheel" icon={Disc} label="Type Wheel" />
              <QuickLink href="/#guess" icon={Search} label="Guess Game" />
              <QuickLink href="/#randomizer" icon={RotateCcw} label="Randomizer" />
              <QuickLink href="/#type-chart" icon={Disc} label="Type Chart" />
            </div>
          </div>

          {/* Fun tip */}
          <p className="mt-8 text-xs text-muted-foreground">
            <strong>Tip:</strong> Use the navigation bar at the top to explore all
            our tools, or visit our{" "}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              contact page
            </Link>{" "}
            if you think this is a bug.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/40 transition-all text-sm font-medium"
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
