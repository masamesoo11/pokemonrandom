"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copy-to-clipboard code block used on the /widgets/ page.
 * The code prop is rendered as plain text (not dangerouslySetInnerHTML),
 * so embed snippets are always safely escaped.
 */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground">
          {label ?? "HTML"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border border-border hover:bg-secondary transition-colors"
          aria-label="Copy embed code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
