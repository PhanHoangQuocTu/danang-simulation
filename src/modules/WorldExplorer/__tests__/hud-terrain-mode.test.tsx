import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { messages } from '@/messages';
import { computeMiniMapVisibleSpanMeters } from '@/engine/spatial/minimap';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import type { TerrainProvider } from '@/engine/terrain/type';
import { InformationPanels, MiniMap } from '../components/WorldHud';
import type { WorldExplorerModel } from '../hooks/useWorldExplorer';

vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));

// The active provider is module state in runtime/world, set when the
// runtime is created. The mock lets the test switch it between renders,
// exactly what happens in the browser when the DEM runtime replaces the
// synthetic default after mount.
const mockActiveProvider: { current: TerrainProvider } = { current: syntheticTerrainProvider };
vi.mock('../runtime/world', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../runtime/world')>();
  return { ...actual, getActiveTerrainProvider: () => mockActiveProvider.current };
});

const demProvider = new GridDemProvider(danangDemPilotGridInput());

function panelsModel(overrides: Record<string, unknown> = {}): WorldExplorerModel {
  return {
    t: ((key: string, params?: { value: number }) => (params ? `${key}:${params.value}` : key)) as never,
    panels: { environmentPanel: 'hidden', secondaryInfo: 'expanded', miniMap: 'expanded' },
    snapshot: null,
    setPanels: vi.fn(),
    profile: { formFactor: 'desktop', activeInput: 'keyboard' },
    map: { follow: false, zoom: 1 },
    mapCanvas: { current: null },
    marker: { current: null },
    cone: { current: null },
    edge: { current: null },
    toggle: vi.fn(),
    onCommand: vi.fn(),
    zoom: vi.fn(),
    setMap: vi.fn(),
    ...overrides,
  } as unknown as WorldExplorerModel;
}

function terrainCheck(container: HTMLElement, id: string): string {
  const items = container.querySelectorAll('li[title]');
  for (const item of items) {
    if (item.textContent?.startsWith(`${id}:`)) return item.getAttribute('title') ?? '';
  }
  throw new Error(`diagnostic ${id} not rendered`);
}

describe('HUD terrain mode (Phase 16 browser QA follow-up)', () => {
  it('recomputes F3 terrain diagnostics when the active provider switches to DEM', () => {
    mockActiveProvider.current = syntheticTerrainProvider;
    const model = panelsModel();
    const { container, rerender } = render(
      <NextIntlClientProvider locale='en' messages={messages.en}>
        <InformationPanels model={model} />
      </NextIntlClientProvider>
    );
    expect(terrainCheck(container, 'TER-09')).toContain('SYNTHETIC TERRAIN');
    expect(terrainCheck(container, 'TER-10')).toContain('Spawn Y 0 m equals sampled elevation 0');

    // The DEM runtime replaces the active provider after mount; the F3
    // panel must follow it instead of keeping the mount-time synthetic run.
    mockActiveProvider.current = demProvider;
    rerender(
      <NextIntlClientProvider locale='en' messages={messages.en}>
        <InformationPanels model={model} />
      </NextIntlClientProvider>
    );
    expect(terrainCheck(container, 'TER-09')).toContain('REAL DEM');
    expect(terrainCheck(container, 'TER-09')).toContain('copernicus-dem-glo30-danang-pilot-v1');
    const spawn = terrainCheck(container, 'TER-10');
    expect(spawn).toMatch(/Spawn Y 6\.045524001121521 m equals sampled elevation 6\.045524001121521/);
  });

  it('keeps the checks chip at 43/43 after the provider switches to DEM', () => {
    mockActiveProvider.current = demProvider;
    const model = panelsModel({ panels: { environmentPanel: 'hidden', secondaryInfo: 'compact' } });
    render(<InformationPanels model={model} />);
    expect(screen.getByRole('button', { name: 'checks: 43/43' })).toBeInTheDocument();
  });

  it('labels the Mini Map span from the active mode half-extent, not the synthetic 72 m', () => {
    mockActiveProvider.current = syntheticTerrainProvider;
    const model = panelsModel();
    const { rerender } = render(<MiniMap model={model} />);
    expect(screen.getByText('span:144')).toBeInTheDocument();

    mockActiveProvider.current = demProvider;
    rerender(<MiniMap model={model} />);
    expect(screen.getByText('span:3000')).toBeInTheDocument();
    expect(screen.queryByText('span:144')).not.toBeInTheDocument();
  });
});

describe('Mini Map visible span', () => {
  it('uses the supplied half-extent: 144 m synthetic, 3000 m DEM pilot at zoom 1', () => {
    expect(computeMiniMapVisibleSpanMeters(1)).toBe(144);
    expect(computeMiniMapVisibleSpanMeters(1, 72)).toBe(144);
    expect(computeMiniMapVisibleSpanMeters(1, 1500)).toBe(3000);
    expect(computeMiniMapVisibleSpanMeters(2, 1500)).toBe(1500);
  });
});
