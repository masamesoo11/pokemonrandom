"use client";

import { useEffect, useRef, useState } from "react";
import { adSlots, siteConfig, trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdSlotProps {
  slotId: string;
  format?: AdFormat;
  /** Optional label shown above the ad (required by AdSense policy) */
  label?: string;
  /** Responsive full-width by default */
  fullWidth?: boolean;
  /** Min height for the placeholder when no ads are configured */
  minHeight?: number;
  className?: string;
}

/**
 * Renders an AdSense ad unit. If no slot ID or publisher ID is configured,
 * renders a labeled placeholder so the layout still looks correct during
 * development. Tracks an `ad_impression` event when the ad actually loads.
 */
export function AdSlot({
  slotId,
  format = "auto",
  label = "Advertisement",
  fullWidth = true,
  minHeight = 90,
  className,
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    // Only push to adsbygoogle if AdSense is configured AND the slot exists
    if (!siteConfig.adsenseClient || !slotId) return;
    setConfigured(true);
    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      const ads = window.adsbygoogle ?? [];
      ads.push({});
      setLoaded(true);
      trackEvent("ad_impression", { slot_id: slotId, format });
    } catch (e) {
      // AdSense not yet loaded - silently ignore
      console.debug("AdSense push failed:", e);
    }
  }, [slotId, format]);

  // If AdSense isn't configured, render a clean placeholder
  if (!configured) {
    return (
      <AdPlaceholder
        label={label}
        minHeight={minHeight}
        fullWidth={fullWidth}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "ad-container w-full",
        fullWidth && "w-full",
        className
      )}
      style={{ minHeight }}
    >
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1 text-center">
        {label}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  );
}

function AdPlaceholder({
  label,
  minHeight,
  fullWidth,
  className,
}: {
  label: string;
  minHeight: number;
  fullWidth: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "ad-placeholder relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 overflow-hidden",
        fullWidth && "w-full",
        className
      )}
      style={{ minHeight }}
    >
      {/* Animated shimmer background to make it noticeable */}
      <div className="absolute inset-0 shimmer-bg opacity-30 pointer-events-none" />
      <div className="relative text-center px-4">
        <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-0.5 font-bold">
          📢 {label}
        </p>
        <p className="text-[11px] text-muted-foreground font-medium">
          Ad space — configure AdSense to enable
        </p>
      </div>
    </div>
  );
}

/**
 * Pre-defined ad placements used across the site.
 * Each one is a wrapper that picks the right slot ID from config.
 */
export function HeaderBannerAd() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-4">
      <AdSlot
        slotId={adSlots.headerBanner}
        format="horizontal"
        label="Advertisement"
        minHeight={90}
      />
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="my-8">
      <AdSlot
        slotId={adSlots.inContent}
        format="auto"
        label="Advertisement"
        minHeight={120}
      />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="sticky top-20">
      <AdSlot
        slotId={adSlots.sidebar}
        format="rectangle"
        label="Advertisement"
        minHeight={250}
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-6">
      <AdSlot
        slotId={adSlots.footer}
        format="horizontal"
        label="Advertisement"
        minHeight={90}
      />
    </div>
  );
}

/**
 * Mobile sticky anchor ad at the bottom of the screen.
 * Only visible on mobile (sm:hidden), dismissible by the user.
 */
export function MobileAnchorAd() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  if (!adSlots.mobileAnchor) return null;
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg">
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-3 right-2 h-6 w-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center shadow-md"
        aria-label="Close ad"
      >
        ×
      </button>
      <AdSlot
        slotId={adSlots.mobileAnchor}
        format="horizontal"
        label="Sponsored"
        minHeight={50}
      />
    </div>
  );
}
