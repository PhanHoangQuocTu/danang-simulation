import * as THREE from 'three';
import { DA_NANG_CONFIG } from '../const';
import type { DaNangClockData, SolarAstronomicalData, TimeOfDayPhase } from './type';
const daNangPartsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: DA_NANG_CONFIG.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const daNangDateEnFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: DA_NANG_CONFIG.timezone,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const daNangDateViFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: DA_NANG_CONFIG.timezone,
  weekday: 'long',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function getDaNangClockData(now: Date = new Date()): DaNangClockData {
  const parts = daNangPartsFormatter.formatToParts(now);
  let year = 2026;
  let month = 1;
  let day = 1;
  let hour = 0;
  let minute = 0;
  let second = 0;

  for (const p of parts) {
    switch (p.type) {
      case 'year':
        year = Number.parseInt(p.value, 10);
        break;
      case 'month':
        month = Number.parseInt(p.value, 10);
        break;
      case 'day':
        day = Number.parseInt(p.value, 10);
        break;
      case 'hour':
        hour = Number.parseInt(p.value, 10) % 24;
        break;
      case 'minute':
        minute = Number.parseInt(p.value, 10);
        break;
      case 'second':
        second = Number.parseInt(p.value, 10);
        break;
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  const timeShortString = `${pad(hour)}:${pad(minute)}`;
  const fractionalHours = hour + minute / 60 + second / 3600;

  return {
    timeString,
    timeShortString,
    dateStringEn: daNangDateEnFormatter.format(now),
    dateStringVi: daNangDateViFormatter.format(now),
    year,
    month,
    day,
    hour,
    minute,
    second,
    fractionalHours,
    timestampMs: now.getTime(),
  };
}

export function formatDecimalHoursToHHMM(decimalHours: number): string {
  const normalized = ((decimalHours % 24) + 24) % 24;
  const totalMinutes = Math.round(normalized * 60);
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatIsoTimeString(isoStr?: string): string {
  if (!isoStr || typeof isoStr !== 'string') return '--:--';
  const tIndex = isoStr.indexOf('T');
  if (tIndex !== -1 && isoStr.length >= tIndex + 6) {
    return isoStr.slice(tIndex + 1, tIndex + 6);
  }
  return isoStr;
}

export function calculateDaNangSolarData(clock: DaNangClockData): SolarAstronomicalData {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const startOfYearUtc = Date.UTC(clock.year, 0, 0);
  const currentDayUtc = Date.UTC(clock.year, clock.month - 1, clock.day);
  const dayOfYear = Math.floor((currentDayUtc - startOfYearUtc) / 86400000);

  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + (clock.fractionalHours - 12) / 24);

  const eqTimeMinutes =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const declRad =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = DA_NANG_CONFIG.latitude * rad;
  const lon = DA_NANG_CONFIG.longitude;
  const tzOffset = DA_NANG_CONFIG.utcOffsetHours;

  const solarNoonHours = 12 + tzOffset - lon / 15 - eqTimeMinutes / 60;

  const calcHourAngleForZenith = (zenithDeg: number): number => {
    const cosH =
      (Math.cos(zenithDeg * rad) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad));
    return Math.acos(THREE.MathUtils.clamp(cosH, -1, 1)) * deg;
  };

  const sunriseHaDeg = calcHourAngleForZenith(90.833);
  const dawnHaDeg = calcHourAngleForZenith(96.0);

  const sunriseHours = solarNoonHours - sunriseHaDeg / 15;
  const sunsetHours = solarNoonHours + sunriseHaDeg / 15;
  const dawnHours = solarNoonHours - dawnHaDeg / 15;
  const duskHours = solarNoonHours + dawnHaDeg / 15;

  const timeOffsetMinutes = eqTimeMinutes + 4 * lon - 60 * tzOffset;
  const trueSolarTimeMinutes = (((clock.fractionalHours * 60 + timeOffsetMinutes) % 1440) + 1440) % 1440;
  const hourAngleDeg = trueSolarTimeMinutes / 4 - 180;
  const hourAngleRad = hourAngleDeg * rad;

  const sinAlt = Math.sin(latRad) * Math.sin(declRad) + Math.cos(latRad) * Math.cos(declRad) * Math.cos(hourAngleRad);
  const altitudeRad = Math.asin(THREE.MathUtils.clamp(sinAlt, -1, 1));
  const altitudeDeg = altitudeRad * deg;

  const yAz = -Math.cos(declRad) * Math.sin(hourAngleRad);
  const xAz = Math.sin(declRad) * Math.cos(latRad) - Math.cos(declRad) * Math.sin(latRad) * Math.cos(hourAngleRad);
  let azimuthRad = Math.atan2(yAz, xAz);
  if (azimuthRad < 0) azimuthRad += 2 * Math.PI;
  const azimuthDeg = azimuthRad * deg;

  const cosAlt = Math.cos(altitudeRad);
  const sunDirection = new THREE.Vector3(
    cosAlt * Math.sin(azimuthRad),
    Math.sin(altitudeRad),
    -cosAlt * Math.cos(azimuthRad)
  ).normalize();

  const h = clock.fractionalHours;
  let phase: TimeOfDayPhase = 'NIGHT';
  let phaseVi = 'Ban đêm';
  let phaseEn = 'Night';

  if (h >= dawnHours && h < sunriseHours + 0.55) {
    phase = 'DAWN';
    phaseVi = 'Bình minh';
    phaseEn = 'Dawn';
  } else if (h >= sunriseHours + 0.55 && h < solarNoonHours - 1.15) {
    phase = 'MORNING';
    phaseVi = 'Buổi sáng';
    phaseEn = 'Morning';
  } else if (h >= solarNoonHours - 1.15 && h <= solarNoonHours + 1.35) {
    phase = 'NOON';
    phaseVi = 'Buổi trưa';
    phaseEn = 'Noon';
  } else if (h > solarNoonHours + 1.35 && h < sunsetHours - 0.65) {
    phase = 'AFTERNOON';
    phaseVi = 'Buổi chiều';
    phaseEn = 'Afternoon';
  } else if (h >= sunsetHours - 0.65 && h <= duskHours) {
    phase = 'SUNSET';
    phaseVi = 'Hoàng hôn';
    phaseEn = 'Sunset';
  } else {
    phase = 'NIGHT';
    phaseVi = 'Ban đêm';
    phaseEn = 'Night';
  }

  const daylightFactor = THREE.MathUtils.smoothstep(altitudeDeg, -6.0, 18.0);
  const twilightFactor = Math.max(0, 1.0 - Math.abs(altitudeDeg - 1.5) / 10.5);

  return {
    azimuthRad,
    altitudeRad,
    altitudeDeg,
    azimuthDeg,
    sunriseHours,
    sunsetHours,
    dawnHours,
    duskHours,
    solarNoonHours,
    sunriseFormatted: formatDecimalHoursToHHMM(sunriseHours),
    sunsetFormatted: formatDecimalHoursToHHMM(sunsetHours),
    solarNoonFormatted: formatDecimalHoursToHHMM(solarNoonHours),
    phase,
    phaseVi,
    phaseEn,
    sunDirection,
    daylightFactor,
    twilightFactor,
  };
}
