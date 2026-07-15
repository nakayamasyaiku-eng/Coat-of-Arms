import {getTranslations,setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {ContactForm} from '@/components/ContactForm';

export default async function ContactPage({params}:{params:Promise<{locale:Locale}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('Contact');return <section className="section-shell page-section"><header className="page-hero"><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1><p>{t('intro')}</p></header><div className="contact-layout"><aside><div className="footer-seal">CA</div><h2>Coat of Arms</h2><p>{t('reply')}</p><dl><dt>Email</dt><dd>studio@coatofarms.art <small>TODO</small></dd><dt>Studio</dt><dd>Central Europe <small>TODO</small></dd></dl></aside><ContactForm/></div></section>}
