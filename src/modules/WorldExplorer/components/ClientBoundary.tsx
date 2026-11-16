'use client';
import dynamic from 'next/dynamic';
import { Component, type ReactNode } from 'react';
import { useTranslations } from '@/hooks';

const Client = dynamic(() => import('./WorldExplorerClient'), { ssr: false, loading: () => <Loading /> });
export function Loading() {
  const { t } = useTranslations('worldExplorer');
  return (
    <div role='status' className='fixed inset-0 grid place-items-center bg-slate-950 text-slate-100'>
      {t('loading')}
    </div>
  );
}
class RuntimeBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function ClientBoundary() {
  const { t } = useTranslations('worldExplorer');
  return (
    <RuntimeBoundary
      fallback={
        <div role='alert' className='fixed inset-0 grid place-content-center gap-4 bg-slate-950 p-8 text-slate-100'>
          <h2>{t('error')}</h2>
          <button type='button' onClick={() => window.location.reload()}>
            {t('retry')}
          </button>
        </div>
      }
    >
      <Client />
    </RuntimeBoundary>
  );
}
