import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {CheckoutProgress} from '@/components/CheckoutProgress';
import {SuccessClient} from '@/components/SuccessClient';
export default async function CheckoutSuccess({params,searchParams}:{params:Promise<{locale:Locale}>;searchParams:Promise<{order?:string}>}){const {locale}=await params;setRequestLocale(locale);const {order}=await searchParams;const t=await getTranslations('Checkout');return <section className="section-shell page-section checkout-page"><SuccessClient/><CheckoutProgress step={3}/><div className="success-panel"><div className="wax-seal"><span>CA</span></div><p className="kicker">{t('successKicker')}</p><h1>{t('successTitle')}</h1><p>{t('successText')}</p><dl><dt>{t('orderNumber')}</dt><dd>{order||'COA-MOCK'}</dd></dl><Link className="button primary" href="/collection">{t('return')}</Link></div></section>}
