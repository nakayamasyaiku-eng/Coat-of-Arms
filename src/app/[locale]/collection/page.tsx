import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {products} from '@/lib/products';
import {ProductGrid} from '@/components/ProductGrid';

export async function generateMetadata({params}:{params:Promise<{locale:Locale}>}):Promise<Metadata>{const {locale}=await params;return {title:locale==='zh'?'全部作品':'The Collection',description:locale==='zh'?'浏览九件欧洲城市纹章限量铜板拓印作品。':'Explore nine limited copper impressions of European city arms.'};}
export default async function CollectionPage({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Collection');return <section className="section-shell page-section"><header className="page-hero compact"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1></header><ProductGrid products={products} locale={locale}/></section>}
