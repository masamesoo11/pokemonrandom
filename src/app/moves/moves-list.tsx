import Link from "next/link";

interface MoveItem {
  name: string;
  url: string;
}

interface MovesListProps {
  grouped: Record<string, MoveItem[]>;
  letters: string[];
  // Pre-formatted display names keyed by move name
  formattedNames: Record<string, string>;
}

/**
 * Server-rendered moves list.
 *
 * IMPORTANT (SEO): every move link is rendered in the static HTML inside
 * native <details> elements. Links inside closed <details> are still
 * discoverable by crawlers (they are in the DOM), while human users get
 * the same collapsible UX without client-side React state. Previously
 * this was a client component that only rendered the first 3 letters —
 * leaving ~830 of 938 move pages with zero internal links.
 */
export function MovesList({ grouped, letters, formattedNames }: MovesListProps) {
  return (
    <>
      {/* Expand/Collapse all — progressive enhancement via vanilla JS */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          type="button"
          data-moves-expand-all
          className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
        >
          Expand All ({letters.length} letters)
        </button>
        <button
          type="button"
          data-moves-collapse-all
          className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
        >
          Collapse All
        </button>
      </div>

      {/* Moves grouped by letter — native <details> keeps ALL links crawlable */}
      <div className="space-y-4">
        {letters.map((letter, idx) => {
          const moveCount = grouped[letter].length;
          return (
            <details key={letter} id={`letter-${letter}`} className="scroll-mt-20 group" open={idx < 3}>
              <summary className="w-full text-left flex items-center justify-between mb-2 pb-2 border-b border-border cursor-pointer select-none list-none">
                <h2 className="text-2xl font-bold">
                  {letter}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    ({moveCount} moves)
                  </span>
                </h2>
                <span className="text-2xl text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 pb-4 pt-2">
                {grouped[letter].map((m) => (
                  <Link
                    key={m.name}
                    href={`/moves/${m.name}/`}
                    className="block px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:shadow-sm transition-all text-sm"
                  >
                    <span className="font-medium">{formattedNames[m.name] || m.name}</span>
                  </Link>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {/* Tiny vanilla-JS enhancement for Expand/Collapse All buttons.
          Works without React hydration; harmless if JS is disabled. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  var expandBtn = document.querySelector('[data-moves-expand-all]');
  var collapseBtn = document.querySelector('[data-moves-collapse-all]');
  var sections = document.querySelectorAll('details[id^="letter-"]');
  if (expandBtn) expandBtn.addEventListener('click', function () {
    sections.forEach(function (d) { d.open = true; });
  });
  if (collapseBtn) collapseBtn.addEventListener('click', function () {
    sections.forEach(function (d) { d.open = false; });
  });
})();
`,
        }}
      />
    </>
  );
}
