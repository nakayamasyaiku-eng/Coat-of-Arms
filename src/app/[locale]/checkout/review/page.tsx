import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {CheckoutProgress} from '@/components/CheckoutProgress';
import {OrderReview} from '@/components/OrderReview';
export default async function CheckoutReview({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Checkout');return <section className="section-shell page-section checkout-page"><CheckoutProgress step={2}/><header className="page-hero compact"><p className="kicker">{t('reviewKicker')}</p><h1>{t('reviewTitle')}</h1></header><OrderReview/></section>}
