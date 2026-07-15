import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const nav = await getTranslations('Nav');
  return (
    <footer id="site-footer" className="site-footer">
      <div className="footer-brand">
        <div className="footer-brand-lockup">
          <span className="footer-brand-emblem">
            <Image
              className="footer-brand-logo"
              src="/brand/coat-of-arms-emblem.svg"
              alt=""
              aria-hidden="true"
              width={985}
              height={1011}
              unoptimized
            />
          </span>
          <span className="footer-brand-copy">
            <strong>Coat of Arms</strong>
            <small>{t('tagline')}</small>
          </span>
        </div>
      </div>
      <div><h3>{t('archive')}</h3><Link href="/collection">{nav('collection')}</Link><Link href="/cities">{nav('cities')}</Link><Link href="/craft">{nav('craft')}</Link></div>
      <div><h3>{t('studio')}</h3><Link href="/about">{nav('about')}</Link><Link href="/contact">{nav('contact')}</Link><span>{t('social')}</span></div>
      <div><h3>{t('care')}</h3><span>{t('privacy')}</span><span>{t('terms')}</span><span>{t('shipping')}</span></div>
      <p className="footer-copy">{t('copyright', {year: new Date().getFullYear()})}</p>
    </footer>
  );
}
