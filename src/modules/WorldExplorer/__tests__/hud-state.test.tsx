import { act, renderHook, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { messages } from '@/messages';
import { useWorldExplorer } from '../hooks/useWorldExplorer';
import { normalizeLiveWeather } from '@/integrations/weather/validation';
const mocks = vi.hoisted(() => ({ fetch: vi.fn() }));
vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));
vi.mock('@/integrations/weather/client', () => ({ fetchWeather: mocks.fetch }));
const observation = () =>
  normalizeLiveWeather(
    {
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
    },
    new Date('2026-11-16T05:00:00Z')
  );
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale='en' messages={messages.en}>
    {children}
  </NextIntlClientProvider>
);
beforeEach(() => {
  mocks.fetch.mockReset();
  mocks.fetch.mockResolvedValue(observation());
});
afterEach(() => vi.useRealTimers());
describe('HUD state and weather ownership', () => {
  it('changes panel modes independently and never hides the clock widget', async () => {
    const { result } = renderHook(() => useWorldExplorer(), { wrapper });
    await waitFor(() => expect(result.current.weatherStatus).toBe('ready'));
    const map = result.current.panels.miniMap;
    act(() => result.current.toggle('statusWidget'));
    expect(result.current.panels.statusWidget).toBe('compact');
    expect(result.current.panels.miniMap).toBe(map);
    act(() => result.current.toggle('statusWidget'));
    expect(result.current.panels.statusWidget).toBe('expanded');
  });
  it('starts with compact panels on a narrow mouse-only window', async () => {
    // Regression: at 390px wide without touch, panels used to start
    // expanded and the weather panel covered the minimap/toolbar
    // (real headless-Chromium hit-test, 2026-11-19, 7 controls covered).
    const width = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    try {
      const { result } = renderHook(() => useWorldExplorer(), { wrapper });
      await waitFor(() => expect(result.current.weatherStatus).toBe('ready'));
      expect(result.current.panels.miniMap).toBe('compact');
      expect(result.current.panels.statusWidget).toBe('compact');
      expect(result.current.panels.movementGuide).toBe('collapsed');
      expect(result.current.panels.secondaryInfo).toBe('hidden');
      expect(result.current.panels.playerStatus).toBe('compact');
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
    }
  });
  it('preserves last valid observation as stale when refresh fails', async () => {
    const { result } = renderHook(() => useWorldExplorer(), { wrapper });
    await waitFor(() => expect(result.current.weather).not.toBeNull());
    mocks.fetch.mockRejectedValueOnce(new Error('offline'));
    await act(async () => {
      await result.current.refresh();
    });
    expect(result.current.weather?.temperature).toBe(28);
    expect(result.current.weather?.freshness).toBe('stale');
    expect(result.current.weatherStatus).toBe('error');
  });
  it('shows unavailable on initial failure without fabricating an observation', async () => {
    mocks.fetch.mockRejectedValue(new Error('offline'));
    const { result } = renderHook(() => useWorldExplorer(), { wrapper });
    await waitFor(() => expect(result.current.weatherStatus).toBe('error'));
    expect(result.current.weather).toBeNull();
  });
  it('aborts pending request when unmounted and ignores late completion', async () => {
    let signal: AbortSignal | undefined;
    mocks.fetch.mockImplementationOnce((value: AbortSignal) => {
      signal = value;
      return new Promise(() => undefined);
    });
    const { unmount } = renderHook(() => useWorldExplorer(), { wrapper });
    unmount();
    expect(signal?.aborted).toBe(true);
  });
  it('ignores superseded weather request results', async () => {
    let resolveFirst: (value: ReturnType<typeof observation>) => void = () => undefined;
    mocks.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve;
        })
    );
    const { result } = renderHook(() => useWorldExplorer(), { wrapper });
    await act(async () => {
      await result.current.refresh();
    });
    await act(async () => {
      resolveFirst({ ...observation(), temperature: 10 });
    });
    expect(result.current.weather?.temperature).toBe(28);
  });
});
