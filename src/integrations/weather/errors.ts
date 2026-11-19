/**
 * Typed error for upstream rate limiting (Open-Meteo HTTP 429).
 * Kept in its own module so the BFF route can distinguish it from generic
 * upstream failures without importing the provider (which the route tests mock).
 */
export class WeatherUpstreamRateLimitedError extends Error {
  readonly retryAfterSeconds: number | null;

  constructor(retryAfterSeconds: number | null = null) {
    super('Weather upstream rate limited');
    this.name = 'WeatherUpstreamRateLimitedError';
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
