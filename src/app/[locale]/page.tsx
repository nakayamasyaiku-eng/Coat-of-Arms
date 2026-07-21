import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';
import {MuseumFrame} from '@/components/MuseumFrame';
import {ProductCard} from '@/components/ProductCard';
import {SectionHeading} from '@/components/SectionHeading';

const homepageOrder = [
  'prague',
  'hradec-kralove',
  'cesky-krumlov',
  'ceske-budejovice',
  'beroun',
  'tabor',
  'czech-republic',
  'pardubice',
  'kutna-hora'
];

export default async function HomePage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params; setRequestLocale(locale);
  const t = await getTranslations('Home'); const c = await getTranslations('Common'); const steps = await getTranslations('CraftSteps');
  const hero = products[0]; const heroCopy = hero.localized[locale];
  const orderedProducts = homepageOrder
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));
  return <div className="home-page">
    <section className="hero section-shell">
      <div className="hero-copy"><p className="kicker">{t('eyebrow')}</p><h1><span>{t('title')}</span><em>{t('titleAccent')}</em></h1><p className="hero-intro">{t('intro')}</p><div className="hero-actions"><Link className="button primary" href="/collection">{c('explore')}</Link><Link className="text-link" href="/craft">{c('discoverCraft')} <span>↗</span></Link></div><div className="hero-folio">Coat of Arms <span>·</span> MMXXVI</div></div>
      <div className="hero-art"><div className="archival-note"><span>No. 001</span><strong>{heroCopy.city}</strong><small>Copper · Hand-worked · Limited</small></div><MuseumFrame src={hero.image} alt={heroCopy.alt} priority/><div className="wax-seal" aria-hidden="true"><span>CA</span></div></div>
    </section>
    <section className="proofs section-shell">{[
      ['proofEditionTitle','proofEditionText','I'],
      ['proofHandTitle','proofHandText','II'],
      ['proofArchiveTitle','proofArchiveText','III']
    ].map(([title,text,no]) => <article key={title}><span>{no}</span><div><h2>{t(title)}</h2><p>{t(text)}</p></div></article>)}</section>
    <section className="section-shell content-section"><SectionHeading kicker={t('featuredKicker')} title={t('featuredTitle')} /><div className="product-grid featured-grid">{orderedProducts.map((p,i) => <ProductCard key={p.slug} product={p} locale={locale} index={i} />)}</div></section>
    <section className="archive-section"><div className="section-shell archive-layout"><SectionHeading kicker={t('archiveKicker')} title={t('archiveTitle')} /><div className="archive-index">{orderedProducts.map((p,i) => <Link key={p.slug} href={`/products/${p.slug}`}><span>{String(i+1).padStart(2,'0')}</span><strong>{p.localized[locale].city}</strong><i>{p.region === 'national' ? (locale === 'zh' ? '国家纹章' : 'National arms') : 'Bohemia'}</i><b>↗</b></Link>)}</div></div></section>
    <section className="section-shell content-section craft-preview"><SectionHeading kicker={t('craftKicker')} title={t('craftTitle')} /><div className="craft-grid">{['one','two','three','four'].map((key,i) => <article key={key}><span>0{i+1}</span><div className={`craft-mark mark-${i+1}`} aria-hidden="true"/><h3>{steps(`${key}Title`)}</h3></article>)}</div></section>
    <section id="story" className="story-band"><div className="section-shell story-grid"><div className="story-monogram" aria-hidden="true">C<span>&</span>A</div><div className="story-copy-block"><p className="kicker">{t('storyKicker')}</p><h2>{t('storyTitle')}</h2><Link className="text-link" href="/about">{c('learnMore')} <span>↗</span></Link></div></div></section>
    <section className="section-shell letter-cta"><div className="letter-fold"><p className="kicker">{t('ctaKicker')}</p><h2>{t('ctaTitle')}</h2><Link href="/contact" className="button primary">{c('privateInquiry')}</Link><div className="wax-seal small" aria-hidden="true"><span>CA</span></div></div></section>
  </div>;
}
