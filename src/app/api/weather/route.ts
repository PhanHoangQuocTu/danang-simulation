import { unstable_cache } from 'next/cache';
import { fetchWeatherObservation } from '@/integrations/weather/provider';
import type { WeatherUpstreamRateLimitedError } from '@/integrations/weather/errors';

// Cache validated observations only. Revalidation never changes the original observation/fetch timestamps.
const getObservation = unstable_cache(() => fetchWeatherObservation(), ['danang-weather-v1'], { revalidate: 900 });
export async function GET(request: Request) {
  if (new URL(request.url).search)
    return Response.json(
      { status: 400, code: 'INVALID_WEATHER_QUERY', message: 'Weather query parameters are not supported' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  try {
    return Response.json(await getObservation(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    // A rate-limited upstream is not a generic outage: surface 429 with
    // Retry-After so the browser client backs off instead of retrying
    // into the limit. No upstream details are leaked either way.
    // Duck-typed (name + retryAfterSeconds) rather than instanceof so the
    // check survives module-boundary copies of the error class.
    if (error instanceof Error && error.name === 'WeatherUpstreamRateLimitedError' && 'retryAfterSeconds' in error) {
      const retryAfterSeconds = (error as WeatherUpstreamRateLimitedError).retryAfterSeconds;
      const retryAfter =
        typeof retryAfterSeconds === 'number' && Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : 60;
      return Response.json(
        { status: 429, code: 'WEATHER_RATE_LIMITED', message: 'Weather service rate limited, try again later' },
        { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': String(retryAfter) } }
      );
    }
    return Response.json(
      { status: 502, code: 'WEATHER_UNAVAILABLE', message: 'Weather service unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
