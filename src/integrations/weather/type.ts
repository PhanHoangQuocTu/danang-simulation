export type WeatherCondition =
  | 'clear'
  | 'mainly-clear'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'showers'
  | 'snow'
  | 'thunderstorm';
export interface WeatherEffectConfig {
  cloudCoverFloor: number;
  cloudDarkness: number;
  sunAttenuation: number;
  fogMultiplier: number;
  rainParticleCount: number;
  rainFallSpeed: number;
  groundWetness: number;
  hasLightning: boolean;
}

export interface MappedWeatherInfo {
  code: number;
  category: WeatherCondition;
  viDescription: string;
  enDescription: string;
  effects: WeatherEffectConfig;
}

export type DataFreshnessStatus = 'live' | 'stale';

export interface NormalizedWeatherState {
  source: 'Open-Meteo Forecast API';
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  precipitation: number;
  rain: number;
  showers: number;
  weatherCode: number;
  cloudCover: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  sunriseIso: string;
  sunsetIso: string;
  sunriseFormatted: string;
  sunsetFormatted: string;
  apiObservationTime: string;
  fetchedAtFormatted: string;
  fetchedAtTimestampMs: number;
  freshness: DataFreshnessStatus;
  validationStatus: 'valid' | 'sanitized';
  mapped: MappedWeatherInfo;
}
