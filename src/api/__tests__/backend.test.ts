import { describe, expect, it, vi } from 'vitest';
vi.mock('@/constants/env', () => ({ env: { API_URL: '', APP_URL: 'http://localhost:3000' }, isServer: true }));
import { request, requestInternal } from '../axios';
describe('optional backend configuration', () => {
  it('fails before network when backend is absent and preserves internal BFF client', async () => {
    const adapter = vi.fn();
    await expect(request.get('/future-domain', { adapter })).rejects.toMatchObject({ code: 'BACKEND_NOT_CONFIGURED' });
    expect(adapter).not.toHaveBeenCalled();
    expect(requestInternal.defaults.baseURL).toBe('http://localhost:3000/api');
  });
});
