import type React from 'react';
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const createSvgIcon = (paths: React.ReactNode): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({ className = 'h-4 w-4', ...rest }) => (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      {...rest}
    >
      {paths}
    </svg>
  );
  return IconComponent;
};

export const Compass = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' />
  </>
);
export const RotateCcw = createSvgIcon(
  <>
    <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
    <path d='M3 3v5h5' />
  </>
);
export const Maximize2 = createSvgIcon(
  <>
    <polyline points='15 3 21 3 21 9' />
    <polyline points='9 21 3 21 3 15' />
    <line x1='21' y1='3' x2='14' y2='10' />
    <line x1='3' y1='21' x2='10' y2='14' />
  </>
);
export const Minimize2 = createSvgIcon(
  <>
    <polyline points='4 14 10 14 10 20' />
    <polyline points='20 10 14 10 14 4' />
    <line x1='14' y1='10' x2='21' y2='3' />
    <line x1='3' y1='21' x2='10' y2='14' />
  </>
);
export const Keyboard = createSvgIcon(
  <>
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10' />
  </>
);
export const Activity = createSvgIcon(<polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />);
export const Footprints = createSvgIcon(
  <>
    <path d='M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z' />
    <path d='M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z' />
  </>
);
export const ArrowUpCircle = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <polyline points='16 12 12 8 8 12' />
    <line x1='12' y1='16' x2='12' y2='8' />
  </>
);
export const Wind = createSvgIcon(
  <>
    <path d='M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2' />
    <path d='M9.6 4.6A2 2 0 1 1 11 8H2' />
    <path d='M12.6 19.4A2 2 0 1 0 14 16H2' />
  </>
);
export const Droplets = createSvgIcon(
  <>
    <path d='M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z' />
    <path d='M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97' />
  </>
);
export const Cloud = createSvgIcon(<path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />);
export const Sun = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
  </>
);
export const Moon = createSvgIcon(<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />);
export const Sunrise = createSvgIcon(
  <>
    <path d='M12 2v8' />
    <path d='m4.93 10.93 1.41 1.41' />
    <path d='M2 18h2' />
    <path d='M20 18h2' />
    <path d='m19.07 10.93-1.41 1.41' />
    <path d='M22 22H2' />
    <path d='m8 6 4-4 4 4' />
    <path d='M16 18a4 4 0 0 0-8 0' />
  </>
);
export const Sunset = createSvgIcon(
  <>
    <path d='M12 10V2' />
    <path d='m4.93 10.93 1.41 1.41' />
    <path d='M2 18h2' />
    <path d='M20 18h2' />
    <path d='m19.07 10.93-1.41 1.41' />
    <path d='M22 22H2' />
    <path d='m16 6-4 4-4-4' />
    <path d='M16 18a4 4 0 0 0-8 0' />
  </>
);
export const Thermometer = createSvgIcon(<path d='M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z' />);
export const CloudRain = createSvgIcon(
  <>
    <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
    <path d='M16 14v6M8 14v6M12 16v6' />
  </>
);
export const CloudLightning = createSvgIcon(
  <>
    <path d='M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973' />
    <path d='m13 12-3 5h4l-3 5' />
  </>
);
export const CloudFog = createSvgIcon(
  <>
    <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
    <path d='M16 17H7M17 21H9' />
  </>
);
export const Sparkles = createSvgIcon(
  <path d='m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z' />
);
export const RefreshCw = createSvgIcon(
  <>
    <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
    <path d='M21 3v5h-5' />
    <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
    <path d='M8 16H3v5' />
  </>
);
export const AlertTriangle = createSvgIcon(
  <>
    <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
    <path d='M12 9v4M12 17h.01' />
  </>
);
export const MapPin = createSvgIcon(
  <>
    <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
    <circle cx='12' cy='10' r='3' />
  </>
);
export const Clock = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </>
);
export const Smartphone = createSvgIcon(
  <>
    <rect width='14' height='20' x='5' y='2' rx='2' ry='2' />
    <path d='M12 18h.01' />
  </>
);
export const Tablet = createSvgIcon(
  <>
    <rect width='16' height='20' x='4' y='2' rx='2' ry='2' />
    <line x1='12' x2='12.01' y1='18' y2='18' />
  </>
);
export const Monitor = createSvgIcon(
  <>
    <rect width='20' height='14' x='2' y='3' rx='2' />
    <line x1='8' x2='16' y1='21' y2='21' />
    <line x1='12' x2='12' y1='17' y2='21' />
  </>
);
export const CheckCircle2 = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <path d='m9 12 2 2 4-4' />
  </>
);
export const ShieldCheck = createSvgIcon(
  <>
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' />
    <path d='m9 12 2 2 4-4' />
  </>
);
export const Gauge = createSvgIcon(
  <>
    <path d='m12 14 4-4' />
    <path d='M3.34 19a10 10 0 1 1 17.32 0' />
  </>
);
export const Info = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <path d='M12 16v-4M12 8h.01' />
  </>
);
export const X = createSvgIcon(
  <>
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </>
);
export const ChevronDown = createSvgIcon(<path d='m6 9 6 6 6-6' />);
export const ChevronUp = createSvgIcon(<path d='m18 15-6-6-6 6' />);
export const MapIcon = createSvgIcon(
  <>
    <polygon points='3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21' />
    <line x1='9' x2='9' y1='3' y2='18' />
    <line x1='15' x2='15' y1='6' y2='21' />
  </>
);
export const Gamepad2 = createSvgIcon(
  <>
    <line x1='6' x2='10' y1='12' y2='12' />
    <line x1='8' x2='8' y1='10' y2='14' />
    <line x1='15' x2='15.01' y1='13' y2='13' />
    <line x1='18' x2='18.01' y1='11' y2='11' />
    <rect width='20' height='12' x='2' y='6' rx='2' />
  </>
);
export const MousePointer = createSvgIcon(
  <>
    <rect x='5' y='2' width='14' height='20' rx='7' />
    <line x1='12' y1='6' x2='12' y2='10' />
  </>
);
export const HandTouch = createSvgIcon(
  <>
    <path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0' />
    <path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2' />
    <path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8' />
    <path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15' />
  </>
);
export const ZoomInIcon = createSvgIcon(
  <>
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
    <line x1='11' y1='8' x2='11' y2='14' />
    <line x1='8' y1='11' x2='14' y2='11' />
  </>
);
export const ZoomOutIcon = createSvgIcon(
  <>
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
    <line x1='8' y1='11' x2='14' y2='11' />
  </>
);
export const CrosshairIcon = createSvgIcon(
  <>
    <circle cx='12' cy='12' r='10' />
    <line x1='22' y1='12' x2='18' y2='12' />
    <line x1='6' y1='12' x2='2' y2='12' />
    <line x1='12' y1='6' x2='12' y2='2' />
    <line x1='12' y1='22' x2='12' y2='18' />
  </>
);
export const NavigationArrowIcon = createSvgIcon(<polygon points='12 2 19 21 12 17 5 21 12 2' />);
export const EyeIcon = createSvgIcon(
  <>
    <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
    <circle cx='12' cy='12' r='3' />
  </>
);
export const ZapIcon = createSvgIcon(<polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />);
