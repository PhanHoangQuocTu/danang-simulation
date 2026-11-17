'use client';

import { useEffect, useRef, useState } from 'react';
import { worldToGeo, worldYawToHeading } from '@/engine/geospatial/core';
import type { GeodeticCoordinate, WorldCoordinate } from '@/engine/geospatial/type';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';

interface GeoTelemetry {
  readonly coordinate: GeodeticCoordinate;
  readonly headingDeg: number;
}

/** Reads existing local snapshots only; never writes to simulation state or runs per frame. */
export function useGeoTelemetry(position: (WorldCoordinate & { rotationY: number }) | null, enabled: boolean) {
  const latest = useRef(position);
  latest.current = position;
  const [telemetry, setTelemetry] = useState<GeoTelemetry | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const sample = () => {
      const current = latest.current;
      if (!current) return;
      setTelemetry({
        coordinate: worldToGeo(current, DANANG_GEO_REFERENCE.reference),
        headingDeg: worldYawToHeading(current.rotationY),
      });
    };
    sample();
    const timer = setInterval(sample, 500);
    return () => clearInterval(timer);
  }, [enabled]);
  return telemetry;
}
