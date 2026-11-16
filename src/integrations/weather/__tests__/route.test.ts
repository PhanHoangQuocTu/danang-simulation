import { beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ value: {} as unknown, error: false, calls: 0, cache: [] as unknown[] }));
vi.mock('../provider', () => ({
  fetchWeatherObservation: async () => {
    mocks.calls++;
    if (mocks.error) throw new Error('private network details');
    return mocks.value;
  },
}));
vi.mock('next/cache', () => ({
  unstable_cache: (callback: () => unknown, keys: string[], options: unknown) => {
    mocks.cache.push([keys, options]);
    return callback;
  },
}));
import { GET } from '@/app/api/weather/route';
beforeEach(() => {
  mocks.value = {};
  mocks.error = false;
  mocks.calls = 0;
});
describe('weather BFF', () => {
  it('caches successful validated results for 15 minutes without stamping a new fetch time', async () => {
    mocks.value = { temperature: 28, fetchedAtTimestampMs: 123 };
    const response = await GET(new Request('http://localhost/api/weather'));
    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect((await response.json()).fetchedAtTimestampMs).toBe(123);
    expect(mocks.cache).toContainEqual([['danang-weather-v1'], { revalidate: 900 }]);
  });
  it('rejects arbitrary URLs and other request parameters before fetching', async () => {
    const response = await GET(new Request('http://localhost/api/weather?url=https://example.com'));
    expect(response.status).toBe(400);
    expect(mocks.calls).toBe(0);
  });
  it('returns normalized unavailable response without leaking upstream details', async () => {
    mocks.error = true;
    const response = await GET(new Request('http://localhost/api/weather'));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      status: 502,
      code: 'WEATHER_UNAVAILABLE',
      message: 'Weather service unavailable',
    });
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });
});
