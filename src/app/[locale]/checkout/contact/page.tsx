import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {CheckoutForm} from '@/components/CheckoutForm';
import {CheckoutProgress} from '@/components/CheckoutProgress';
export default async function CheckoutContact({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Checkout');return <section className="section-shell page-section checkout-page"><CheckoutProgress step={1}/><header className="page-hero compact"><p className="kicker">{t('contactKicker')}</p><h1>{t('contactTitle')}</h1><p>{t('contactIntro')}</p></header><CheckoutForm/></section>}
