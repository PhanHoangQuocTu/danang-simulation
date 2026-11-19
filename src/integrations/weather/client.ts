import axios from 'axios';

import { requestInternal } from '@/api/axios';
import type { NormalizedWeatherState } from './type';

/** Abort-aware retries call this application's BFF only. */
export async function fetchWeather(signal: AbortSignal): Promise<NormalizedWeatherState> {
  for (let attempt = 0; attempt < 3; attempt++) {
    signal.throwIfAborted();
    try {
      const { data } = await requestInternal.get<NormalizedWeatherState>('/weather', { signal, timeout: 10_000 });
      if (
        !Number.isFinite(data.temperature) ||
        !Number.isFinite(data.fetchedAtTimestampMs) ||
        data.validationStatus !== 'valid'
      )
        throw new Error('Invalid weather observation');
      return data;
    } catch (error) {
      signal.throwIfAborted();
      // A rate-limited BFF (429) must not be retried: retrying only burns
      // the shared upstream quota further. Surface it immediately so the
      // hook keeps the last observation marked stale instead.
      if (axios.isAxiosError(error) && error.response?.status === 429) throw error;
      if (attempt === 2) throw error;
      await new Promise<void>((resolve, reject) => {
        const abort = () => {
          clearTimeout(timer);
          reject(signal.reason);
        };
        const timer = setTimeout(
          () => {
            signal.removeEventListener('abort', abort);
            resolve();
          },
          1000 * 2 ** attempt
        );
        signal.addEventListener('abort', abort, { once: true });
      });
    }
  }
  throw new Error('Weather unavailable');
}
