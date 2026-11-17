import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { messages } from '@/messages';
import { useWorldExplorer } from '../hooks/useWorldExplorer';
import type { WorldBindings } from '../runtime/world';

const mocks = vi.hoisted(() => ({ create: vi.fn(), fetch: vi.fn() }));
vi.mock('@/hooks', async () => await import('@/hooks/useTranslations'));
vi.mock('../runtime/world', () => ({ createWorldRuntime: mocks.create }));
vi.mock('@/integrations/weather/client', () => ({ fetchWeather: mocks.fetch }));

function Harness() {
  const model = useWorldExplorer();
  return (
    <>
      <canvas ref={model.canvas} key={model.generation} />
      <canvas ref={model.mapCanvas} />
      <div ref={model.marker} />
      <div ref={model.cone} />
      <span ref={model.edge} />
      <output>{model.status}</output>
      <button type='button' onClick={model.retry}>
        Retry
      </button>
      <button type='button' onClick={() => model.setMap({ zoom: 2, follow: true })}>
        Map
      </button>
      <button type='button' onClick={() => model.setDialog('specs')}>
        Dialog
      </button>
    </>
  );
}
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale='en' messages={messages.en}>
    {children}
  </NextIntlClientProvider>
);
function instance() {
  return {
    dispose: vi.fn(),
    setMap: vi.fn(),
    setWeather: vi.fn(),
    setBlocked: vi.fn(),
    joystick: vi.fn(),
    action: vi.fn(),
    interact: vi.fn(),
    reset: vi.fn(),
  };
}
beforeEach(() => {
  mocks.create.mockReset();
  mocks.fetch.mockReset();
  mocks.fetch.mockRejectedValue(new Error('offline'));
});
describe('runtime retry lifecycle', () => {
  it('ignores callbacks from the disposed Strict Mode mount within the same generation', async () => {
    const lifetimes: ReturnType<typeof instance>[] = [];
    mocks.create.mockImplementation((bindings: WorldBindings) => {
      const runtime = instance();
      lifetimes.push(runtime);
      bindings.status('ready');
      return runtime;
    });
    await act(async () => {
      render(<Harness />, { wrapper, reactStrictMode: true });
    });
    expect(mocks.create).toHaveBeenCalledTimes(2);
    expect(lifetimes[0].dispose).toHaveBeenCalledTimes(1);
    act(() => (mocks.create.mock.calls[0][0] as WorldBindings).status('error'));
    expect(screen.getByRole('status')).toHaveTextContent('ready');
  });
  it('retries failed initialization and disposes the replacement on unmount', async () => {
    const replacement = instance();
    mocks.create.mockImplementationOnce(() => {
      throw new Error('WebGL unavailable');
    });
    mocks.create.mockImplementationOnce((bindings: WorldBindings) => {
      bindings.status('ready');
      return replacement;
    });
    const view = render(<Harness />, { wrapper });
    await screen.findByText('unsupported');
    fireEvent.click(screen.getByText('Retry'));
    await screen.findByText('ready');
    expect(mocks.create).toHaveBeenCalledTimes(2);
    expect(mocks.create.mock.calls[0][0].canvas).not.toBe(mocks.create.mock.calls[1][0].canvas);
    view.unmount();
    expect(replacement.dispose).toHaveBeenCalledTimes(1);
  });

  it('disposes a lost runtime before rebuilding and reapplies map, weather and dialog state', async () => {
    const first = instance();
    const second = instance();
    const observation = { temperature: 28, fetchedAtTimestampMs: Date.now(), apiObservationTimestampMs: Date.now() };
    mocks.fetch.mockResolvedValue(observation);
    mocks.create.mockImplementationOnce((bindings: WorldBindings) => {
      bindings.status('ready');
      return first;
    });
    mocks.create.mockImplementationOnce((bindings: WorldBindings) => {
      expect(first.dispose).toHaveBeenCalledTimes(1);
      bindings.status('ready');
      return second;
    });
    render(<Harness />, { wrapper });
    await waitFor(() =>
      expect(first.setWeather).toHaveBeenLastCalledWith(expect.objectContaining({ temperature: 28 }))
    );
    fireEvent.click(screen.getByText('Map'));
    fireEvent.click(screen.getByText('Dialog'));
    act(() => (mocks.create.mock.calls[0][0] as WorldBindings).status('context-lost'));
    fireEvent.click(screen.getByText('Retry'));
    expect(mocks.create).toHaveBeenCalledTimes(2);
    expect(second.setMap).toHaveBeenLastCalledWith(2, true);
    expect(second.setBlocked).toHaveBeenLastCalledWith(true);
    expect(second.setWeather).toHaveBeenLastCalledWith(expect.objectContaining({ temperature: 28 }));
    act(() => (mocks.create.mock.calls[0][0] as WorldBindings).status('error'));
    expect(screen.getByRole('status')).toHaveTextContent('ready');
  });
});
