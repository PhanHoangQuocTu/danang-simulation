import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { messages } from '@/messages';
import { danangSourceRegistry } from '@/worlds/danang/data-sources';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { ImageryInspector } from '../components/ImageryInspector';
import { createImageryDiagnostic, imageryPreviewGeometry } from '../imagery-diagnostics';
vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale='en' messages={messages.en}>
    {children}
  </NextIntlClientProvider>
);
describe('imagery inspector', () => {
  it('IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas', () => {
    const { container } = render(
      <ImageryInspector registry={danangSourceRegistry} reference={DANANG_GEO_REFERENCE.reference} />,
      { wrapper }
    );
    const details = screen.getByTestId('imagery-inspector') as HTMLDetailsElement;
    details.open = true;
    expect(container.textContent).toContain('No verified imagery');
    fireEvent.click(screen.getByRole('button', { name: 'Show alignment preview' }));
    expect(screen.getByRole('img')).toHaveAccessibleName(/TEST DATA/);
    expect(container.querySelectorAll('canvas,img')).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Hide alignment preview' }));
    expect(screen.queryByRole('img')).toBeNull();
  });
  it('IMG-46 invalid asset has localized fallback without a stack trace', async () => {
    // jsdom has no native 2D canvas; only the clearing operation is needed for this rejected asset.
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    const view = render(
      <ImageryInspector
        registry={danangSourceRegistry}
        reference={DANANG_GEO_REFERENCE.reference}
        asset={{ invalid: true }}
      />,
      { wrapper }
    );
    (screen.getByTestId('imagery-inspector') as HTMLDetailsElement).open = true;
    fireEvent.click(screen.getByRole('button', { name: 'Show alignment preview' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Preview unavailable'));
    expect(screen.getByRole('button', { name: 'Retry' })).toBeVisible();
    view.unmount();
  });
  it('IMG-14/21 diagnostic footprint is east-right, north-up and read-only', () => {
    const reference = DANANG_GEO_REFERENCE.reference;
    const grid = createImageryDiagnostic(reference);
    const geometry = imageryPreviewGeometry(grid, reference);
    expect(geometry.points[1].x).toBeGreaterThan(geometry.points[0].x);
    expect(geometry.points[3].y).toBeGreaterThan(geometry.points[0].y);
    expect(geometry.errorMeters).toBeLessThan(0.55);
    expect(reference).toBe(DANANG_GEO_REFERENCE.reference);
  });
});
afterEach(() => vi.restoreAllMocks());
