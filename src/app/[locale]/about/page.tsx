import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';

export default async function AboutPage({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('About');return <section className="section-shell page-section"><header className="page-hero"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1></header><div className="about-editorial"><div className="dropcap-copy"><p>{t('p1')}</p><p>{t('p2')}</p><p>{t('p3')}</p></div><aside className="studio-placeholder"><div aria-hidden="true">CA</div><p className="kicker">Studio record / 2026</p><h2>{t('studioTitle')}</h2><p>{t('studioText')}</p></aside></div></section>}
