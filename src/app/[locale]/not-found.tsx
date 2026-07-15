import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
export default async function NotFound(){const t=await getTranslations('NotFound');return <section className="section-shell page-section"><div className="empty-state"><div className="footer-seal">?</div><p className="kicker">{t('kicker')}</p><h1>{t('title')}</h1><p>{t('text')}</p><Link className="button primary" href="/collection">{t('button')}</Link></div></section>}
