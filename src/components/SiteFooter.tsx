import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const nav = await getTranslations('Nav');
  return (
    <footer className="site-footer">
      <div className="footer-seal" aria-hidden="true">CA</div>
      <div className="footer-brand"><strong>Coat of Arms</strong><p>{t('tagline')}</p></div>
      <div><h3>{t('archive')}</h3><Link href="/collection">{nav('collection')}</Link><Link href="/cities">{nav('cities')}</Link><Link href="/craft">{nav('craft')}</Link></div>
      <div><h3>{t('studio')}</h3><Link href="/about">{nav('about')}</Link><Link href="/contact">{nav('contact')}</Link><span>{t('social')}</span></div>
      <div><h3>{t('care')}</h3><span>{t('privacy')}</span><span>{t('terms')}</span><span>{t('shipping')}</span></div>
      <p className="footer-copy">{t('copyright', {year: new Date().getFullYear()})}</p>
    </footer>
  );
}
