import { buildDaNangOpenMeteoUrl } from './service';
import { normalizeLiveWeather } from './validation';
import { WeatherUpstreamRateLimitedError } from './errors';

export const WEATHER_BODY_LIMIT = 256 * 1024;
/** Fixed provider and query. No user-supplied URL, location, credentials, or redirect target. */
export async function fetchWeatherObservation(fetcher: typeof fetch = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetcher(buildDaNangOpenMeteoUrl(), {
      signal: controller.signal,
      redirect: 'error',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 429) {
        // Preserve the upstream Retry-After so callers can back off instead
        // of retrying into a rate-limited upstream. Clamp to 1s..1h.
        const raw = response.headers.get('retry-after');
        const parsed = raw === null ? Number.NaN : Number(raw);
        const retryAfterSeconds = Number.isFinite(parsed) ? Math.min(Math.max(Math.floor(parsed), 1), 3600) : null;
        throw new WeatherUpstreamRateLimitedError(retryAfterSeconds);
      }
      throw new Error('Weather upstream unavailable');
    }
    if (Number(response.headers.get('content-length')) > WEATHER_BODY_LIMIT)
      throw new Error('Weather payload exceeds limit');
    if (!response.body) throw new Error('Weather payload missing');
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        bytes += chunk.value.byteLength;
        if (bytes > WEATHER_BODY_LIMIT) {
          await reader.cancel();
          throw new Error('Weather payload exceeds limit');
        }
        chunks.push(chunk.value);
      }
    } finally {
      reader.releaseLock();
    }
    const payload = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.length;
    }
    return normalizeLiveWeather(JSON.parse(new TextDecoder().decode(payload)));
  } finally {
    clearTimeout(timer);
  }
}
