import { afterEach, describe, expect, it, vi } from 'vitest';
import { isWeatherStale } from '../freshness';
import { normalizeLiveWeather } from '../validation';
import { fetchWeatherObservation, WEATHER_BODY_LIMIT } from '../provider';
import { WeatherUpstreamRateLimitedError } from '../errors';

const sampleObservation = () => ({
  current: {
    time: '2026-11-16T12:00',
    temperature_2m: 28,
    apparent_temperature: 30,
    relative_humidity_2m: 75,
    is_day: 1,
    precipitation: 0,
    rain: 0,
    showers: 0,
    weather_code: 2,
    cloud_cover: 48,
    wind_speed_10m: 12,
    wind_direction_10m: 90,
    wind_gusts_10m: 18,
  },
  daily: { sunrise: ['2026-11-16T05:55'], sunset: ['2026-11-16T17:15'] },
});
const now = new Date('2026-11-16T05:05:00Z');
afterEach(() => vi.useRealTimers());
describe('live weather boundary', () => {
  it('marks old upstream observations stale even after a recent fetch', () => {
    const value = normalizeLiveWeather(sampleObservation(), now);
    expect(isWeatherStale(value, now.getTime())).toBe(false);
    expect(isWeatherStale({ ...value, observationTimestampMs: now.getTime() - 26 * 60 * 1000 }, now.getTime())).toBe(
      true
    );
  });
  it('normalizes real readings and preserves observation and fetch timestamps', () => {
    const result = normalizeLiveWeather(sampleObservation(), now);
    expect(result.temperature).toBe(28);
    expect(result.validationStatus).toBe('valid');
    expect(result.observationTimestampMs).toBe(Date.parse('2026-11-16T05:00:00Z'));
    expect(result.fetchedAtTimestampMs).toBe(now.getTime());
  });
  it.each([null, undefined, Number.NaN, Number.POSITIVE_INFINITY, '29', 100])(
    'rejects missing or invented temperature %s',
    (value) => {
      const sample = sampleObservation();
      Object.assign(sample.current, { temperature_2m: value });
      expect(() => normalizeLiveWeather(sample, now)).toThrow();
    }
  );
  it('rejects invalid observation time and unsupported WMO code', () => {
    const sample = sampleObservation();
    sample.current.weather_code = 4;
    expect(() => normalizeLiveWeather(sample, now)).toThrow();
    sample.current.weather_code = 2;
    sample.current.time = '2026-11-17T12:00';
    expect(() => normalizeLiveWeather(sample, now)).toThrow('observation time');
  });
  it('does not invent missing optional solar times', () => {
    const sample = { current: sampleObservation().current };
    const result = normalizeLiveWeather(sample, now);
    expect(result.sunriseFormatted).toBe('--:--');
    expect(result.sunsetFormatted).toBe('--:--');
  });
  it('uses fixed upstream, rejects redirects, and requests no raw-response caching', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const fetcher = vi.fn(async () => Response.json(sampleObservation()));
    const observation = await fetchWeatherObservation(fetcher);
    expect(observation.temperature).toBe(28);
    const [url, options] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url.startsWith('https://api.open-meteo.com/v1/forecast?')).toBe(true);
    expect(options.redirect).toBe('error');
    expect(options.cache).toBe('no-store');
  });
  it('turns an upstream 429 into a typed rate-limit error with Retry-After', async () => {
    const fetcher = vi.fn(
      async () => new Response('{"error":true}', { status: 429, headers: { 'Retry-After': '120' } })
    );
    const error = await fetchWeatherObservation(fetcher).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(WeatherUpstreamRateLimitedError);
    expect((error as WeatherUpstreamRateLimitedError).retryAfterSeconds).toBe(120);
  });
  it('turns an upstream 429 without Retry-After into a rate-limit error with null delay', async () => {
    const fetcher = vi.fn(async () => new Response('{"error":true}', { status: 429 }));
    const error = await fetchWeatherObservation(fetcher).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(WeatherUpstreamRateLimitedError);
    expect((error as WeatherUpstreamRateLimitedError).retryAfterSeconds).toBeNull();
  });
  it('enforces response size even without a content-length header', async () => {
    const oversized = new Response(new Uint8Array(WEATHER_BODY_LIMIT + 1));
    await expect(fetchWeatherObservation(vi.fn(async () => oversized))).rejects.toThrow('exceeds limit');
  });
  it('aborts upstream after ten seconds and clears timers', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn(
      (_url: RequestInfo | URL, options?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          options?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
        })
    );
    const pending = fetchWeatherObservation(fetcher);
    const assertion = expect(pending).rejects.toThrow('aborted');
    await vi.advanceTimersByTimeAsync(10_000);
    await assertion;
    expect(vi.getTimerCount()).toBe(0);
  });
});
