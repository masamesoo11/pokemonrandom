/**
 * Shared build-time fetch helper with retry + backoff.
 *
 * All PokéAPI data used by static generation goes through this helper so a
 * transient network blip during `next build` is retried instead of silently
 * degrading a page (or dropping it from generateStaticParams).
 *
 * Behaviour:
 *  - Retries up to 3 attempts (500 ms, then 1500 ms backoff).
 *  - Non-2xx responses are retried only for 5xx and 429 (rate limit).
 *    Other 4xx responses fail immediately — retrying a 404 never helps.
 *  - On final failure the error is THROWN. Callers in static generation
 *    intentionally let it propagate: a failed build keeps the previous
 *    deployment online instead of publishing hollow pages.
 */

type FetchInit = Parameters<typeof fetch>[1];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(
  url: string,
  init: FetchInit,
  label: string,
  attempts = 3
): Promise<Response> {
  let lastError: unknown = new Error(`${label}: fetch failed`);

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;

      lastError = new Error(`${label}: HTTP ${res.status}`);
      // 4xx (except 429) will not improve by retrying — fail fast.
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        throw lastError;
      }
    } catch (e) {
      lastError = e;
    }

    if (attempt < attempts) {
      await sleep(500 * Math.pow(3, attempt - 1));
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
