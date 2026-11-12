import * as THREE from 'three';
import { DA_NANG_CONFIG } from '@/worlds/danang/const';
import { GAME_CONFIG } from '@/engine/core/const';
import { getDaNangClockData, formatIsoTimeString } from '@/worlds/danang/environment/solar';
import type { NormalizedWeatherState } from './type';
import { mapWmoWeatherCode } from './mapper';
export function buildDaNangOpenMeteoUrl(): string {
  const params = new URLSearchParams({
    latitude: String(DA_NANG_CONFIG.latitude),
    longitude: String(DA_NANG_CONFIG.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'weather_code',
      'cloud_cover',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    daily: 'sunrise,sunset',
    timezone: DA_NANG_CONFIG.timezone,
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    forecast_days: '1',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function sanitizeFiniteNumber(
  raw: unknown,
  fallback: number,
  min: number,
  max: number
): { value: number; wasSanitized: boolean } {
  const num = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(num)) {
    return { value: fallback, wasSanitized: true };
  }
  if (num < min || num > max) {
    return {
      value: THREE.MathUtils.clamp(num, min, max),
      wasSanitized: true,
    };
  }
  return { value: num, wasSanitized: false };
}

export function validateAndNormalizeWeatherPayload(
  data: Record<string, unknown>,
  nowDate: Date = new Date()
): NormalizedWeatherState {
  if (!data || typeof data !== 'object' || !data.current || typeof data.current !== 'object') {
    throw new Error('Invalid Open-Meteo response schema: missing current weather block');
  }

  const cur = data.current as Record<string, unknown>;
  const daily = (data.daily as Record<string, unknown>) || {};

  let anySanitized = false;
  const check = (raw: unknown, fallback: number, min: number, max: number): number => {
    const res = sanitizeFiniteNumber(raw, fallback, min, max);
    if (res.wasSanitized) anySanitized = true;
    return res.value;
  };

  const temperature = check(cur.temperature_2m, 26, -50, 60);
  const apparentTemperature = check(cur.apparent_temperature, temperature, -60, 70);
  const humidity = Math.round(check(cur.relative_humidity_2m, 75, 0, 100));
  const precipitation = check(cur.precipitation, 0, 0, 500);
  const rain = check(cur.rain, 0, 0, 500);
  const showers = check(cur.showers, 0, 0, 500);
  const weatherCode = Math.round(check(cur.weather_code, 2, 0, 99));
  const cloudCover = Math.round(check(cur.cloud_cover, 40, 0, 100));
  const windSpeed = check(cur.wind_speed_10m, 8, 0, 300);
  const rawWindDir = check(cur.wind_direction_10m, 90, -360, 720);
  const windDirection = ((Math.round(rawWindDir) % 360) + 360) % 360;
  const windGusts = check(cur.wind_gusts_10m, windSpeed, 0, 400);

  const sunriseArr = Array.isArray(daily.sunrise) ? daily.sunrise : [];
  const sunsetArr = Array.isArray(daily.sunset) ? daily.sunset : [];
  const sunriseIso = typeof sunriseArr[0] === 'string' ? sunriseArr[0] : '';
  const sunsetIso = typeof sunsetArr[0] === 'string' ? sunsetArr[0] : '';

  const mapped = mapWmoWeatherCode(weatherCode);
  const fetchClock = getDaNangClockData(nowDate);

  return {
    source: 'Open-Meteo Forecast API',
    temperature,
    apparentTemperature,
    humidity,
    isDay: cur.is_day === 1,
    precipitation,
    rain,
    showers,
    weatherCode,
    cloudCover,
    windSpeed,
    windDirection,
    windGusts,
    sunriseIso,
    sunsetIso,
    sunriseFormatted: formatIsoTimeString(sunriseIso),
    sunsetFormatted: formatIsoTimeString(sunsetIso),
    apiObservationTime: formatIsoTimeString(typeof cur.time === 'string' ? cur.time : ''),
    fetchedAtFormatted: fetchClock.timeString.slice(0, 5),
    fetchedAtTimestampMs: nowDate.getTime(),
    freshness: 'live',
    validationStatus: anySanitized ? 'sanitized' : 'valid',
    mapped,
  };
}

export async function fetchDaNangWeatherWithRetry(
  externalSignal?: AbortSignal,
  maxRetries = 3
): Promise<NormalizedWeatherState> {
  const url = buildDaNangOpenMeteoUrl();
  let attempt = 0;

  while (attempt < maxRetries) {
    const timeoutController = new AbortController();
    const timeoutId = window.setTimeout(() => timeoutController.abort(), GAME_CONFIG.weatherRequestTimeoutMs);

    const onExternalAbort = () => timeoutController.abort();
    if (externalSignal) {
      if (externalSignal.aborted) {
        window.clearTimeout(timeoutId);
        throw new DOMException('Aborted', 'AbortError');
      }
      externalSignal.addEventListener('abort', onExternalAbort, { once: true });
    }

    try {
      const response = await fetch(url, {
        signal: timeoutController.signal,
        headers: { Accept: 'application/json' },
      });
      window.clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onExternalAbort);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawJson = (await response.json()) as Record<string, unknown>;
      return validateAndNormalizeWeatherPayload(rawJson, new Date());
    } catch (err: unknown) {
      window.clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onExternalAbort);
      }
      if (externalSignal?.aborted) {
        throw err;
      }
      attempt++;
      if (attempt >= maxRetries) {
        throw err;
      }
      const backoffMs = 1000 * 2 ** (attempt - 1);
      await new Promise((resolve) => window.setTimeout(resolve, backoffMs));
    }
  }

  throw new Error('Weather API maximum retries exceeded');
}

export function formatCompassDirection(deg: number): string {
  const directions = ['Bắc', 'ĐB', 'Đông', 'ĐN', 'Nam', 'TN', 'Tây', 'TB'];
  const idx = Math.round(((deg % 360) + 360) / 45) % 8;
  return directions[idx];
}
