"use client";

import { Sparkles, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#generator", label: "Generator" },
  { href: "#team", label: "Team" },
  { href: "#wheel", label: "Wheel" },
  { href: "#guess", label: "Guess" },
  { href: "#compare", label: "Compare" },
  { href: "#type-chart", label: "Type Chart" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          {/* Pokeball logo */}
          <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-foreground shadow-md group-hover:rotate-180 transition-transform duration-700">
            <div className="absolute inset-0 bg-red-500 top-0 h-1/2" />
            <div className="absolute inset-0 bg-white top-1/2 h-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-foreground -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-foreground rounded-full" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight">Pokemon Random</span>
            <span className="text-[10px] text-muted-foreground">Free Pokemon Tools</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="px-2.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/admin"
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border hover:bg-secondary transition-colors"
            title="Admin Dashboard"
          >
            <Shield className="h-4 w-4" />
          </a>
          <a
            href="#generator"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#generator");
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Start
          </a>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden lg:hidden border-t border-border/40 bg-background overflow-hidden transition-all",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-md"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/admin"
            className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-md flex items-center gap-2"
          >
            <Shield className="h-4 w-4" /> Admin Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}
