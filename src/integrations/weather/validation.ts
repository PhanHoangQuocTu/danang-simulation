import { z } from 'zod';
import { validateAndNormalizeWeatherPayload } from './service';

const measured = (min: number, max: number) => z.number().finite().min(min).max(max);
export const supportedWmoCodes = [
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 97, 99,
];
const localTime = z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/);
const observationSchema = z.object({
  current: z.object({
    time: localTime,
    temperature_2m: measured(-50, 60),
    apparent_temperature: measured(-60, 70),
    relative_humidity_2m: measured(0, 100),
    is_day: z.union([z.literal(0), z.literal(1)]),
    precipitation: measured(0, 500),
    rain: measured(0, 500),
    showers: measured(0, 500),
    weather_code: z
      .number()
      .int()
      .refine((value) => supportedWmoCodes.includes(value)),
    cloud_cover: measured(0, 100),
    wind_speed_10m: measured(0, 300),
    wind_direction_10m: measured(0, 360),
    wind_gusts_10m: measured(0, 400),
  }),
  daily: z
    .object({ sunrise: z.array(localTime).max(1).optional(), sunset: z.array(localTime).max(1).optional() })
    .optional(),
});
/** Strict live boundary. The historical sanitizer remains available for preservation diagnostics only. */
export function normalizeLiveWeather(payload: unknown, now = new Date()) {
  const data = observationSchema.parse(payload);
  const observationMs = Date.parse(`${data.current.time}+07:00`);
  if (!Number.isFinite(observationMs) || observationMs > now.getTime() + 15 * 60 * 1000)
    throw new Error('Invalid observation time');
  const result = validateAndNormalizeWeatherPayload(data, now);
  return { ...result, observationTimestampMs: observationMs };
}
