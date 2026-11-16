import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { JsonLd } from '@/components/seo/JsonLd';
import ClientBoundary from './components/ClientBoundary';

export default async function WorldExplorer() {
  const { t, locale } = await useTranslationsServer('worldExplorer');
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t('title'),
          applicationCategory: 'SimulationApplication',
          operatingSystem: 'Web Browser',
          inLanguage: locale,
        }}
      />
      <article className='sr-only'>
        <h1>{t('title')}</h1>
        <p>{t('summary')}</p>
      </article>
      <ClientBoundary />
    </main>
  );
}
