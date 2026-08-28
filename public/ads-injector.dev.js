// Ads Injector v4 — robust ad injection with multiple strategies
// Handles: .ad-placeholder, "Advertisement" text, ad-slot classes, data-ad-slot attributes
// Runs on DOMContentLoaded AND on subsequent dynamic content changes

(function() {
  const API_BASE = "https://poke-admin-api.sodanefs.workers.dev";
  const CACHE_KEY = "poke_ads_config_v4";
  const CACHE_TTL = 30 * 1000; // 30 seconds

  function getCachedConfig() {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp > CACHE_TTL) return null;
      return data.config;
    } catch { return null; }
  }

  function setCachedConfig(config) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ config, timestamp: Date.now() }));
    } catch {}
  }

  async function fetchConfig() {
    const cached = getCachedConfig();
    if (cached) return cached;
    try {
      const resp = await fetch(`${API_BASE}/ads_config`);
      if (!resp.ok) return null;
      const config = await resp.json();
      setCachedConfig(config);
      return config;
    } catch (err) {
      console.error("[AdsInjector] Fetch error:", err);
      return null;
    }
  }

  function injectCustomCode(container, customCode) {
    // Clear container completely
    container.innerHTML = "";
    container.style.minHeight = "90px";
    container.style.display = "block";
    container.style.textAlign = "center";
    container.style.padding = "10px";
    // Remove ad-placeholder class to avoid reprocessing
    container.className = container.className.replace(/ad-placeholder/g, "").trim();
    // Mark as processed
    container.setAttribute("data-ad-processed", "true");

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "custom-ad-wrapper";
    wrapper.style.cssText = "display:block;min-height:90px;width:100%;";
    container.appendChild(wrapper);

    // Parse custom code
    const temp = document.createElement("div");
    temp.innerHTML = customCode;

    // Insert each node, handling scripts specially
    Array.from(temp.childNodes).forEach(node => {
      if (node.nodeName === "SCRIPT") {
        const script = document.createElement("script");
        // Copy all attributes
        if (node.attributes) {
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            script.setAttribute(attr.name, attr.value);
          }
        }
        // Copy inline content
        if (node.textContent) {
          script.textContent = node.textContent;
        }
        wrapper.appendChild(script);
      } else if (node.nodeName === "#text") {
        // Skip empty text nodes
        if (node.textContent.trim()) {
          wrapper.appendChild(document.createTextNode(node.textContent));
        }
      } else {
        // Clone regular HTML elements
        wrapper.appendChild(node.cloneNode(true));
      }
    });
  }

  function injectAdSense(container, slotId, adsenseClient, format) {
    container.innerHTML = "";
    container.style.minHeight = "90px";
    container.style.display = "block";
    container.className = container.className.replace(/ad-placeholder/g, "").trim();
    container.setAttribute("data-ad-processed", "true");

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", adsenseClient);
    ins.setAttribute("data-ad-slot", slotId);
    ins.setAttribute("data-ad-format", format || "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    container.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("[AdsInjector] AdSense error:", e);
    }
  }

  function loadAdSenseScript(adsenseClient) {
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }

  function processAdContainer(container, adConfig, adsenseClient) {
    // Skip if already processed
    if (container.getAttribute("data-ad-processed") === "true") return false;

    if (!adConfig || !adConfig.enabled) {
      container.style.display = "none";
      container.setAttribute("data-ad-processed", "true");
      return false;
    }

    // Priority: customCode > AdSense
    if (adConfig.customCode && adConfig.customCode.trim()) {
      console.log("[AdsInjector] Injecting custom code");
      injectCustomCode(container, adConfig.customCode);
      return true;
    } else if (adConfig.slotId && adsenseClient) {
      console.log("[AdsInjector] Injecting AdSense:", adConfig.slotId);
      injectAdSense(container, adConfig.slotId, adsenseClient, adConfig.format);
      return "adsense";
    }
    return false;
  }

  function findAllAdContainers() {
    // Strategy 1: Find by class "ad-placeholder"
    const containers = new Set();
    document.querySelectorAll(".ad-placeholder").forEach(el => containers.add(el));

    // Strategy 2: Find by data-ad-slot attribute
    document.querySelectorAll("[data-ad-slot]").forEach(el => containers.add(el));

    // Strategy 3: Find by specific ad slot classes (from original Next.js code)
    const adClasses = [
      ".ad-slot-top", ".ad-slot-incontent", ".ad-slot-sidebar",
      ".ad-slot-bottom", ".ad-slot-mobile",
      ".header-banner", ".in-content-ad", ".sidebar-ad",
      ".footer-ad", ".mobile-anchor-ad"
    ];
    adClasses.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => containers.add(el));
    });

    // Strategy 4: Find by "Advertisement" text content
    document.querySelectorAll("div, span, p").forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() === "Advertisement") {
        // Use parent element as container
        const parent = el.parentElement || el;
        containers.add(parent);
      }
    });

    // Convert to array and filter out already processed
    return Array.from(containers).filter(el => el.getAttribute("data-ad-processed") !== "true");
  }

  function processAllAds(config) {
    if (!config) {
      console.log("[AdsInjector] No config available");
      return;
    }

    const adsenseClient = config.adsenseClient;
    const ads = config.ads || {};
    let adsenseNeeded = false;

    const containers = findAllAdContainers();
    console.log("[AdsInjector] Found", containers.length, "unprocessed ad containers");

    const slotOrder = ["headerBanner", "inContent", "sidebar", "footer", "mobileAnchor"];

    containers.forEach((container, index) => {
      const slotName = slotOrder[index % slotOrder.length];
      const adConfig = ads[slotName] || {};
      console.log("[AdsInjector] Container", index, "->", slotName, "(enabled=" + adConfig.enabled + ")");
      const result = processAdContainer(container, adConfig, adsenseClient);
      if (result === "adsense") adsenseNeeded = true;
    });

    if (adsenseNeeded && adsenseClient) {
      loadAdSenseScript(adsenseClient);
    }
  }

  async function init() {
    console.log("[AdsInjector v4] Initializing...");
    const config = await fetchConfig();
    if (!config) {
      console.log("[AdsInjector] No config available");
      return;
    }
    console.log("[AdsInjector] Config loaded:", {
      adsenseClient: config.adsenseClient || "(empty)",
      enabledAds: Object.entries(config.ads || {}).filter(([k,v]) => v.enabled).map(([k]) => k)
    });
    processAllAds(config);
  }

  // Run on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Also run after a short delay to catch dynamically loaded content
  setTimeout(init, 1000);
  setTimeout(init, 3000);
})();
