import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {ContactForm} from '@/components/ContactForm';
import {products} from '@/lib/products';

export default async function ContactPage({params,searchParams}:{params:Promise<{locale:Locale}>;searchParams:Promise<{work?:string}>}){const {locale}=await params;const {work}=await searchParams;setRequestLocale(locale);const t=await getTranslations('Contact');const works=products.map((product)=>({slug:product.slug,label:product.localized[locale].city,sku:product.sku}));const selectedWork=products.some((product)=>product.slug===work)?work:undefined;return <section className="section-shell page-section"><header className="page-hero compact"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1><p>{t('intro')}</p></header><div className="contact-layout"><aside><div className="footer-seal">CA</div><h2>{t('title')}</h2><p>{t('reply')}</p><dl><dt>Email</dt><dd>Sakura956904363@outlook.com</dd><dt>Studio</dt><dd>Central Europe</dd></dl></aside><ContactForm works={works} selectedWork={selectedWork}/></div></section>}
