import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { messages } from '@/messages';
import { HudButton, InformationPanels } from '../components/WorldHud';
import type { WorldExplorerModel } from '../hooks/useWorldExplorer';

vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));

describe('HUD button semantics', () => {
  it('shows read-only geographic confidence and height assumption in expanded F3', () => {
    const model = {
      t: (key: string) => key,
      panels: { environmentPanel: 'hidden', secondaryInfo: 'expanded' },
      snapshot: null,
      setPanels: vi.fn(),
    } as unknown as WorldExplorerModel;
    render(
      <NextIntlClientProvider locale='en' messages={messages.en}>
        <InformationPanels model={model} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('geoWarning')).toBeInTheDocument();
    expect(screen.getByText('geoHeightAssumption')).toBeInTheDocument();
    expect(screen.getByText('geoReference')).toBeInTheDocument();
    expect(screen.getByText('sourceNotLoaded')).toBeInTheDocument();
    expect(screen.getByText('sourceSummary')).toBeInTheDocument();
  });
  it('preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics', () => {
    const setPanels = vi.fn();
    const model = {
      t: (key: string) => key,
      panels: { environmentPanel: 'hidden', secondaryInfo: 'compact' },
      snapshot: { perf: { fps: 60, avgFrameTimeMs: 16.7 } },
      setPanels,
    } as unknown as WorldExplorerModel;
    render(<InformationPanels model={model} />);
    expect(screen.getByRole('button', { name: 'fps: 60' })).toBeInTheDocument();
    const frame = screen.getByRole('button', { name: 'frameShort: 16.7 ms' });
    expect(screen.getByRole('button', { name: 'checks: 25/25' })).toBeInTheDocument();
    fireEvent.click(frame);
    expect(setPanels).toHaveBeenCalledOnce();
  });
  it('exposes a regular action without a toggle state', () => {
    const onClick = vi.fn();
    render(<HudButton onClick={onClick}>Reset</HudButton>);
    const button = screen.getByRole('button', { name: 'Reset' });
    expect(button).not.toHaveAttribute('aria-pressed');
    expect(button).not.toHaveAttribute('aria-expanded');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('exposes a toggle state only when supplied', () => {
    const { rerender } = render(
      <HudButton onClick={() => undefined} active={false}>
        Follow
      </HudButton>
    );
    expect(screen.getByRole('button', { name: 'Follow', pressed: false })).toBeInTheDocument();
    rerender(
      <HudButton onClick={() => undefined} active>
        Follow
      </HudButton>
    );
    expect(screen.getByRole('button', { name: 'Follow', pressed: true })).toBeInTheDocument();
  });
  it('exposes disclosure state separately from toggle state', () => {
    render(
      <HudButton onClick={() => undefined} expanded={false}>
        Weather
      </HudButton>
    );
    const button = screen.getByRole('button', { name: 'Weather', expanded: false });
    expect(button).not.toHaveAttribute('aria-pressed');
  });
});
