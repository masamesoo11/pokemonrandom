import { Heart } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-foreground">
                <div className="absolute inset-0 bg-red-500 top-0 h-1/2" />
                <div className="absolute inset-0 bg-white top-1/2 h-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-foreground -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-foreground rounded-full" />
              </div>
              <span className="text-lg font-bold">Pokemon Random</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Free online random Pokemon generator and tools. Build your dream team, spin
              the type wheel, play Guess That Pokemon, and explore every generation — all
              without signup. Powered by the open-source PokeAPI.
            </p>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3">Database</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pokemon/" className="hover:text-foreground transition-colors">Pokédex (1,025)</Link></li>
              <li><Link href="/moves/" className="hover:text-foreground transition-colors">Moves (920+)</Link></li>
              <li><Link href="/abilities/" className="hover:text-foreground transition-colors">Abilities (298+)</Link></li>
              <li><Link href="/generation/1/" className="hover:text-foreground transition-colors">Generations</Link></li>
              <li><Link href="/type/fire/" className="hover:text-foreground transition-colors">Types</Link></li>
              <li><Link href="/pokemon-search/" className="hover:text-foreground transition-colors">Search</Link></li>
              <li><Link href="/tier-lists/" className="hover:text-foreground transition-colors">Tier Lists</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3">Tools</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/random-pokemon/" className="hover:text-foreground transition-colors">Generator</Link></li>
              <li><Link href="/random-team/" className="hover:text-foreground transition-colors">Team Builder</Link></li>
              <li><Link href="/pokemon-quiz/" className="hover:text-foreground transition-colors">Quiz</Link></li>
              <li><Link href="/pokemon-randomizer/" className="hover:text-foreground transition-colors">Randomizer</Link></li>
              <li><Link href="/pokemon-compare/" className="hover:text-foreground transition-colors">Compare</Link></li>
              <li><Link href="/saved-teams/" className="hover:text-foreground transition-colors">Saved Teams</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about/" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact/" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/blog/" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-sm mb-3">Legal</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy/" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies/" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer/" className="hover:text-foreground transition-colors">Disclaimer</Link></li>
              <li><Link href="/dmca/" className="hover:text-foreground transition-colors">DMCA / Copyright</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pokemon Random. Pokemon and all related names are
            trademarks of Nintendo, Game Freak, and The Pokemon Company. This is a
            fan-made tool, not affiliated with or endorsed by them. See our{" "}
            <Link href="/disclaimer/" className="underline hover:text-foreground">disclaimer</Link>.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> for Pokemon fans
          </p>
        </div>
      </div>
    </footer>
  );
}
