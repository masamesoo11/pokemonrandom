import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Type Chart Widget — PokémonRandom",
  description: "Embeddable complete Pokémon type effectiveness chart (18×18).",
  robots: { index: false, follow: true },
};

/* attack type -> { defending type : multiplier } (1x omitted) */
const TYPE_CHART: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

const TYPES: { name: string; color: string }[] = [
  { name: "Normal", color: "#9099A1" },
  { name: "Fire", color: "#FF9D55" },
  { name: "Water", color: "#5090D6" },
  { name: "Electric", color: "#F4D23C" },
  { name: "Grass", color: "#63BC5A" },
  { name: "Ice", color: "#73CEC0" },
  { name: "Fighting", color: "#CE4069" },
  { name: "Poison", color: "#AB6AC8" },
  { name: "Ground", color: "#D97845" },
  { name: "Flying", color: "#8FA9DE" },
  { name: "Psychic", color: "#FA7179" },
  { name: "Bug", color: "#90C12C" },
  { name: "Rock", color: "#C7B78B" },
  { name: "Ghost", color: "#5269AC" },
  { name: "Dragon", color: "#0B6DC3" },
  { name: "Dark", color: "#5A5465" },
  { name: "Steel", color: "#5A8EA1" },
  { name: "Fairy", color: "#EC8FE6" },
];

function cellClass(mult: number | undefined): string {
  if (mult === 2) return "bg-green-500/80 text-white";
  if (mult === 0.5) return "bg-amber-500/70 text-white";
  if (mult === 0) return "bg-slate-500/70 text-white";
  return "bg-transparent text-transparent";
}

function cellText(mult: number | undefined): string {
  if (mult === 2) return "2";
  if (mult === 0.5) return "½";
  if (mult === 0) return "0";
  return "1";
}

export default function EmbedTypeChartPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hide the site-wide cookie banner inside embeds (iframes have no use for it) */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "body > div[role='dialog'][aria-labelledby='cookie-banner-title']{display:none!important}",
        }}
      />
      <main className="p-4 sm:p-5">
        <h1 className="text-lg font-extrabold tracking-tight mb-1">
          Pokémon Type Chart
        </h1>
        <p className="text-xs text-muted-foreground mb-4">
          Rows = attacking type · Columns = defending type
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-[10px] sm:text-xs min-w-[560px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-background border border-border p-1.5 font-bold text-[9px] sm:text-[10px] text-left">
                  Atk ↓ / Def →
                </th>
                {TYPES.map((d) => (
                  <th
                    key={d.name}
                    className="border border-border p-1 font-bold text-white"
                    style={{ background: d.color }}
                    title={d.name}
                  >
                    <span className="block sm:hidden">{d.name.slice(0, 2)}</span>
                    <span className="hidden sm:block">{d.name.slice(0, 3)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TYPES.map((atk) => (
                <tr key={atk.name}>
                  <th
                    className="sticky left-0 z-10 bg-background border border-border px-2 py-1 font-bold text-left text-[10px] sm:text-xs whitespace-nowrap"
                    style={{ color: atk.color }}
                  >
                    {atk.name}
                  </th>
                  {TYPES.map((def) => {
                    const mult = TYPE_CHART[atk.name.toLowerCase()]?.[def.name.toLowerCase()];
                    return (
                      <td
                        key={def.name}
                        title={`${atk.name} vs ${def.name}: ${mult === undefined ? "1×" : mult + "×"}`}
                        className={`border border-border text-center font-bold p-1 ${cellClass(mult)}`}
                      >
                        {cellText(mult)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-4 items-center mt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-green-500/80" /> 2× Super effective
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-amber-500/70" /> ½× Not very effective
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded bg-slate-500/70" /> 0× No effect
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded border border-border" /> 1× Normal
          </span>
        </div>

        <p className="text-right text-[11px] text-muted-foreground mt-4">
          <a
            href="https://pokemonrandom.com/widgets/"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2"
          >
            Get this widget
          </a>
        </p>
      </main>
    </div>
  );
}
