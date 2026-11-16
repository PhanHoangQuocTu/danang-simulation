import { useTranslationsServer } from '@/hooks/useTranslationsServer';

import { PageHeader } from '@/components/common';
import { HealthStatusCard } from './components/HealthStatusCard';

const Health = async () => {
  const { t } = await useTranslationsServer('health');

  return (
    <div className='space-y-6'>
      <PageHeader title={t('title')} description={t('description')} />
      <HealthStatusCard />
    </div>
  );
};

export default Health;
