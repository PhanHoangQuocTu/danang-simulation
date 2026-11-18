import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { messages } from '@/messages';
import { danangSourceRegistry } from '@/worlds/danang/data-sources';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { ImageryInspector } from '../components/ImageryInspector';
import { rasterFixture } from '@/engine/imagery/__tests__/fixtures';
const mocks = vi.hoisted(() => ({ load: vi.fn() }));
vi.mock('../imagery-preview', () => ({ loadImageryPreview: mocks.load }));
vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale='en' messages={messages.en}>
    {children}
  </NextIntlClientProvider>
);
afterEach(() => vi.restoreAllMocks());
describe('imagery canvas lifecycle', () => {
  it('IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates', async () => {
    const clear = vi.fn();
    const draw = vi.fn();
    const close = vi.fn();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: clear,
      drawImage: draw,
      save: vi.fn(),
      restore: vi.fn(),
      setTransform: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    mocks.load.mockResolvedValueOnce({
      bitmap: { close },
      geometry: { matrix: [1, 0, 0, 1, 0, 0] },
      asset: {
        provider: 'TEST provider',
        registration: rasterFixture,
        license: 'TEST license',
        attribution: 'TEST attribution',
        attributionUrl: 'https://example.org',
        quality: { status: 'unverified', independent: { n: 0, rmseMeters: null, maxMeters: null }, residuals: [] },
        thresholds: { rmseMeters: 2, maxMeters: 3 },
      },
    });
    const props = { registry: danangSourceRegistry, reference: DANANG_GEO_REFERENCE.reference };
    const view = render(<ImageryInspector {...props} asset={{ version: 1 }} />, { wrapper });
    (screen.getByTestId('imagery-inspector') as HTMLDetailsElement).open = true;
    fireEvent.click(screen.getByRole('button', { name: 'Show alignment preview' }));
    await screen.findByRole('link', { name: 'TEST attribution' });
    expect(draw).toHaveBeenCalledOnce();
    mocks.load.mockRejectedValue(new Error('rights revoked'));
    view.rerender(<ImageryInspector {...props} asset={{ version: 2 }} />);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Preview unavailable'));
    expect(screen.queryByRole('link')).toBeNull();
    expect(close).toHaveBeenCalledOnce();
    expect(clear.mock.invocationCallOrder.at(-1)).toBeGreaterThan(draw.mock.invocationCallOrder.at(-1)!);
    const calls = mocks.load.mock.calls.length;
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(mocks.load.mock.calls.length).toBe(calls + 1));
    view.unmount();
  });
});
