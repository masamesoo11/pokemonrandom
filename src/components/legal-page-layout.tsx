"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeaderBannerAd, FooterAd } from "@/components/ad-slot";

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  children,
}: {
  title: string;
  description?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <HeaderBannerAd />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
          <header className="mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}
            {lastUpdated && (
              <p className="mt-3 text-xs text-muted-foreground uppercase tracking-widest">
                Last updated: {lastUpdated}
              </p>
            )}
          </header>
          <div className="prose-legal">{children}</div>
        </article>
      </main>
      <FooterAd />
      <SiteFooter />
    </div>
  );
}

// Reusable styled elements for legal content
export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold mt-8 mb-3 tracking-tight">{children}</h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-4">
      {children}
    </p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 space-y-2 text-sm sm:text-base text-foreground/90">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

export function Email({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="text-primary font-semibold hover:underline"
    >
      {email}
    </a>
  );
}
