import WorldExplorer from '@/modules/WorldExplorer';
import type { Metadata } from 'next';

import { ROUTES } from '@/constants/routes';
import { useTranslationsServer } from '@/hooks/useTranslationsServer';
import { toLocale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types/type';

type HomePageProps = Pick<PageProps<{ locale: string }>, 'params'>;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await useTranslationsServer('common.seo', locale);

  return buildMetadata({
    locale: toLocale(locale),
    path: ROUTES.HOME,
    title: { absolute: t('defaultTitle') },
    description: t('description'),
  });
}

export default function HomePage() {
  return <WorldExplorer />;
}
