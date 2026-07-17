import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export function ProductActions({slug}: {slug: string}) {
  const t = useTranslations('Product');
  return <div className="product-actions"><Link className="button primary" href={`/contact?work=${encodeURIComponent(slug)}`}>{t('inquire')}</Link><span>{t('inquireNote')}</span></div>;
}
