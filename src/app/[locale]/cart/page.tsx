import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {CartPageClient} from '@/components/CartPageClient';
export default async function CartPage({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Cart');return <section className="section-shell page-section"><header className="page-hero compact"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1></header><CartPageClient/></section>}
