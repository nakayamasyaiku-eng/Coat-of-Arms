import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {products} from '@/lib/products';
import {Link} from '@/i18n/navigation';

export default async function CitiesPage({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Cities');return <section className="section-shell page-section"><header className="page-hero"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1><p>{t('intro')}</p></header><div className="cities-ledger">{products.map((p,i)=><Link href={`/products/${p.slug}`} key={p.slug}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{p.localized[locale].city}</h2><p>{p.localized[locale].short}</p></div><small>{p.sku}</small><b>↗</b></Link>)}</div></section>}
