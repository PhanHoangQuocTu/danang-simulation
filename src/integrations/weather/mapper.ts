import type { MappedWeatherInfo } from './type';
export function mapWmoWeatherCode(rawCode: number): MappedWeatherInfo {
  const code = Number.isFinite(rawCode) ? Math.round(rawCode) : -1;

  switch (code) {
    case 0:
      return {
        code,
        category: 'clear',
        viDescription: 'Trời quang đãng',
        enDescription: 'Clear Sky',
        effects: {
          cloudCoverFloor: 5,
          cloudDarkness: 0.0,
          sunAttenuation: 1.0,
          fogMultiplier: 0.85,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 1:
      return {
        code,
        category: 'mainly-clear',
        viDescription: 'Nắng nhẹ, ít mây',
        enDescription: 'Mainly Clear',
        effects: {
          cloudCoverFloor: 18,
          cloudDarkness: 0.04,
          sunAttenuation: 0.96,
          fogMultiplier: 0.92,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 2:
      return {
        code,
        category: 'partly-cloudy',
        viDescription: 'Có mây rải rác',
        enDescription: 'Partly Cloudy',
        effects: {
          cloudCoverFloor: 48,
          cloudDarkness: 0.14,
          sunAttenuation: 0.84,
          fogMultiplier: 1.05,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 3:
      return {
        code,
        category: 'overcast',
        viDescription: 'Nhiều mây âm u',
        enDescription: 'Overcast',
        effects: {
          cloudCoverFloor: 88,
          cloudDarkness: 0.38,
          sunAttenuation: 0.56,
          fogMultiplier: 1.35,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.1,
          hasLightning: false,
        },
      };
    case 45:
    case 48:
      return {
        code,
        category: 'fog',
        viDescription: 'Sương mù dày',
        enDescription: 'Fog',
        effects: {
          cloudCoverFloor: 75,
          cloudDarkness: 0.25,
          sunAttenuation: 0.52,
          fogMultiplier: 2.85,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.25,
          hasLightning: false,
        },
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        code,
        category: 'drizzle',
        viDescription: code >= 56 ? 'Mưa phùn lạnh' : drizzleDescription(code),
        enDescription: code >= 56 ? 'Freezing Drizzle' : 'Drizzle',
        effects: {
          cloudCoverFloor: 78,
          cloudDarkness: 0.35,
          sunAttenuation: 0.58,
          fogMultiplier: 1.65,
          rainParticleCount: 950,
          rainFallSpeed: 13.5,
          groundWetness: 0.55,
          hasLightning: false,
        },
      };
    case 61:
    case 63:
    case 66:
      return {
        code,
        category: 'rain',
        viDescription: code === 61 ? 'Mưa nhỏ' : 'Mưa vừa',
        enDescription: code === 66 ? 'Freezing Rain' : 'Rain',
        effects: {
          cloudCoverFloor: 88,
          cloudDarkness: 0.48,
          sunAttenuation: 0.45,
          fogMultiplier: 1.85,
          rainParticleCount: 1900,
          rainFallSpeed: 19.5,
          groundWetness: 0.8,
          hasLightning: false,
        },
      };
    case 65:
    case 67:
      return {
        code,
        category: 'heavy-rain',
        viDescription: 'Mưa lớn nặng hạt',
        enDescription: 'Heavy Rain',
        effects: {
          cloudCoverFloor: 96,
          cloudDarkness: 0.65,
          sunAttenuation: 0.32,
          fogMultiplier: 2.35,
          rainParticleCount: 3000,
          rainFallSpeed: 25.0,
          groundWetness: 0.95,
          hasLightning: false,
        },
      };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        code,
        category: 'snow',
        viDescription: 'Tuyết rơi',
        enDescription: code >= 85 ? 'Snow Showers' : 'Snow',
        effects: {
          cloudCoverFloor: 85,
          cloudDarkness: 0.3,
          sunAttenuation: 0.5,
          fogMultiplier: 1.9,
          rainParticleCount: 1200,
          rainFallSpeed: 6.5,
          groundWetness: 0.4,
          hasLightning: false,
        },
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        category: code === 82 ? 'heavy-rain' : 'showers',
        viDescription: code === 82 ? 'Mưa rào rất to' : showerDescription(code),
        enDescription: code === 82 ? 'Violent Rain Showers' : 'Rain Showers',
        effects: {
          cloudCoverFloor: 85,
          cloudDarkness: code === 82 ? 0.65 : 0.48,
          sunAttenuation: code === 82 ? 0.34 : 0.48,
          fogMultiplier: code === 82 ? 2.25 : 1.75,
          rainParticleCount: code === 82 ? 2900 : 1850,
          rainFallSpeed: code === 82 ? 24.5 : 19.0,
          groundWetness: 0.88,
          hasLightning: false,
        },
      };
    case 95:
    case 96:
    case 97:
    case 99:
      return {
        code,
        category: 'thunderstorm',
        viDescription: 'Mưa giông kèm sấm sét',
        enDescription: 'Thunderstorm',
        effects: {
          cloudCoverFloor: 98,
          cloudDarkness: 0.78,
          sunAttenuation: 0.24,
          fogMultiplier: 2.45,
          rainParticleCount: 3200,
          rainFallSpeed: 26.5,
          groundWetness: 1.0,
          hasLightning: true,
        },
      };
    default:
      return {
        code,
        category: 'partly-cloudy',
        viDescription: 'Mây thay đổi',
        enDescription: 'Variable Clouds',
        effects: {
          cloudCoverFloor: 40,
          cloudDarkness: 0.15,
          sunAttenuation: 0.85,
          fogMultiplier: 1.05,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
  }
}

function drizzleDescription(code: number) {
  return code === 55 ? 'Mưa phùn dày' : 'Mưa phùn nhẹ';
}
function showerDescription(code: number) {
  return code === 81 ? 'Mưa rào vừa' : 'Mưa rào nhẹ';
}
