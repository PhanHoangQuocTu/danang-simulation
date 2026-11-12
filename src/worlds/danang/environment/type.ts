import type * as THREE from 'three';
export type TimeOfDayPhase = 'DAWN' | 'MORNING' | 'NOON' | 'AFTERNOON' | 'SUNSET' | 'NIGHT';

export interface DaNangClockData {
  timeString: string;
  timeShortString: string;
  dateStringEn: string;
  dateStringVi: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  fractionalHours: number;
  timestampMs: number;
}

export interface SolarAstronomicalData {
  azimuthRad: number;
  altitudeRad: number;
  altitudeDeg: number;
  azimuthDeg: number;
  sunriseHours: number;
  sunsetHours: number;
  dawnHours: number;
  duskHours: number;
  solarNoonHours: number;
  sunriseFormatted: string;
  sunsetFormatted: string;
  solarNoonFormatted: string;
  phase: TimeOfDayPhase;
  phaseVi: string;
  phaseEn: string;
  sunDirection: THREE.Vector3;
  daylightFactor: number;
  twilightFactor: number;
}

export interface SynchronizedTimeSolarSnapshot {
  clock: DaNangClockData;
  solar: SolarAstronomicalData;
}
