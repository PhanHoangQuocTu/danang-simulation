import { unstable_cache } from 'next/cache';
import { fetchWeatherObservation } from '@/integrations/weather/provider';

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
  } catch {
    return Response.json(
      { status: 502, code: 'WEATHER_UNAVAILABLE', message: 'Weather service unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
