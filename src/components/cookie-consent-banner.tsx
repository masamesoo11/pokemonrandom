"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Check, Settings } from "lucide-react";
import { trackEvent } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "pokegen-cookie-consent-v1";

type ConsentChoice = "all" | "essential" | null;

interface ConsentData {
  choice: ConsentChoice;
  timestamp: number;
  analytics: boolean;
  ads: boolean;
}

const defaultData: ConsentData = {
  choice: null,
  timestamp: 0,
  analytics: false,
  ads: false,
};

function readConsent(): ConsentData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentData) : defaultData;
  } catch {
    return defaultData;
  }
}

function writeConsent(data: ConsentData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  } catch (e) {
    console.debug("Failed to write consent:", e);
  }
}

export function getConsent(): ConsentData {
  return readConsent();
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = readConsent();
    if (!data.choice) {
      // Show banner after a small delay so it doesn't appear instantly
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (choice: "all" | "essential") => {
    const data: ConsentData = {
      choice,
      timestamp: Date.now(),
      analytics: choice === "all" ? true : analyticsEnabled,
      ads: choice === "all" ? true : adsEnabled,
    };
    writeConsent(data);
    setVisible(false);
    setShowSettings(false);
    trackEvent("cookie_consent", {
      choice,
      analytics: data.analytics,
      ads: data.ads,
    });
  };

  const handleSavePreferences = () => {
    const data: ConsentData = {
      choice: "essential",
      timestamp: Date.now(),
      analytics: analyticsEnabled,
      ads: adsEnabled,
    };
    writeConsent(data);
    setVisible(false);
    setShowSettings(false);
    trackEvent("cookie_consent", {
      choice: "custom",
      analytics: data.analytics,
      ads: data.ads,
    });
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4",
        "animate-slide-up"
      )}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-border bg-card shadow-2xl overflow-hidden">
        {/* Main banner */}
        {!showSettings ? (
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  id="cookie-banner-title"
                  className="text-sm sm:text-base font-bold mb-1"
                >
                  We use cookies 🍪
                </h3>
                <p
                  id="cookie-banner-desc"
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                  We use cookies and localStorage to enhance your experience, analyze
                  traffic, and serve relevant ads. Essential cookies are required for
                  the site to function. You can choose what to enable. Read our{" "}
                  <a
                    href="/cookies"
                    className="text-primary font-semibold hover:underline"
                  >
                    Cookie Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-primary font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAccept("all")}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <Check className="h-4 w-4" />
                    Accept all
                  </button>
                  <button
                    onClick={() => handleAccept("essential")}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold border border-border hover:bg-secondary/70 transition-all"
                  >
                    Essential only
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <Settings className="h-4 w-4" />
                    Customize
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleAccept("essential")}
                className="shrink-0 h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Close (essential only)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Settings panel */
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center"
                aria-label="Back"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Essential - always on */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-secondary/30">
                <div>
                  <p className="text-sm font-semibold">Essential Cookies</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Required for the site to function (theme, favorites, history).
                    Cannot be disabled.
                  </p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                  Always on
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="text-sm font-semibold">Analytics (Google Analytics)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Helps us understand which features are popular and improve the site.
                    Anonymous data only.
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={cn(
                    "shrink-0 relative h-6 w-11 rounded-full transition-colors",
                    analyticsEnabled ? "bg-primary" : "bg-muted"
                  )}
                  role="switch"
                  aria-checked={analyticsEnabled}
                  aria-label="Toggle analytics"
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      analyticsEnabled && "translate-x-5"
                    )}
                  />
                </button>
              </div>

              {/* Ads */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <p className="text-sm font-semibold">Advertising (Google AdSense)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Allows us to show ads and keep the site free. May be personalized
                    based on your activity. You can opt out in Google Ads Settings.
                  </p>
                </div>
                <button
                  onClick={() => setAdsEnabled(!adsEnabled)}
                  className={cn(
                    "shrink-0 relative h-6 w-11 rounded-full transition-colors",
                    adsEnabled ? "bg-primary" : "bg-muted"
                  )}
                  role="switch"
                  aria-checked={adsEnabled}
                  aria-label="Toggle ads"
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                      adsEnabled && "translate-x-5"
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Check className="h-4 w-4" />
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
