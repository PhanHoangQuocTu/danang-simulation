import { GAME_CONFIG } from '@/engine/core/const';
import type { NormalizedWeatherState } from './type';

export function isWeatherStale(observation: NormalizedWeatherState, now = Date.now()): boolean {
  const timestamp = Math.min(
    observation.fetchedAtTimestampMs,
    observation.observationTimestampMs ?? observation.fetchedAtTimestampMs
  );
  return now - timestamp > GAME_CONFIG.weatherStaleThresholdMs;
}
