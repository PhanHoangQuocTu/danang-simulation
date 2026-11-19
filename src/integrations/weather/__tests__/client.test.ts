import axios, { type AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock('@/api/axios', () => ({ requestInternal: { get: mocks.get } }));

import { fetchWeather } from '../client';

const observation = { temperature: 28, fetchedAtTimestampMs: 123, validationStatus: 'valid' };

describe('weather client retries', () => {
  it('does not retry a rate-limited BFF response', async () => {
    const error = new axios.AxiosError('Request failed with status code 429', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 429,
    } as unknown as AxiosResponse);
    mocks.get.mockRejectedValue(error);
    await expect(fetchWeather(new AbortController().signal)).rejects.toBe(error);
    expect(mocks.get).toHaveBeenCalledTimes(1);
  });

  it('retries a transient failure and then succeeds', async () => {
    mocks.get.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ data: observation });
    const result = await fetchWeather(new AbortController().signal);
    expect(result).toEqual(observation);
    expect(mocks.get).toHaveBeenCalledTimes(2);
  });
});
