import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/noto-serif-sc';
import '../globals.css';
import type {Metadata} from 'next';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {BrandHeader} from '@/components/BrandHeader';
import {SiteFooter} from '@/components/SiteFooter';

type Props = {children: React.ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() { return routing.locales.map((locale) => ({locale})); }

export async function generateMetadata({params}: Pick<Props, 'params'>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    metadataBase: new URL(base), title: {default: t('title'), template: `%s · Coat of Arms`}, description: t('description'),
    alternates: {canonical: `/${locale}`, languages: {en: '/en', zh: '/zh'}},
    openGraph: {title: t('title'), description: t('description'), type: 'website', siteName: 'Coat of Arms'}
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a className="skip-link" href="#main-content">{locale === 'zh' ? '跳至正文' : 'Skip to content'}</a>
          <BrandHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
