import { describe, expect, it, vi } from 'vitest';
import { GET } from '@/app/api/health/route';

describe('Docker liveness contract', () => {
  it('returns uncached health without an external dependency', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    try {
      const response = await GET();
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(response.headers.get('Cache-Control')).toBe('no-store');
      expect(body.status).toBe('ok');
      expect(Number.isFinite(Date.parse(body.timestamp))).toBe(true);
      expect(body.uptime).toBeGreaterThanOrEqual(0);
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      fetchSpy.mockRestore();
    }
  });
});
