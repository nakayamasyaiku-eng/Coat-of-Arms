import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { products, getProduct, formatPrice } from "@/lib/products";
import { Link } from "@/i18n/navigation";
import { MuseumFrame } from "@/components/MuseumFrame";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const copy = p.localized[locale];
  return {
    title: copy.title,
    description: copy.short,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: { en: `/en/products/${slug}`, zh: `/zh/products/${slug}` },
    },
    openGraph: { title: copy.title, description: copy.short },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProduct(slug);
  if (!p) notFound();
  const copy = p.localized[locale];
  const t = await getTranslations("Product");
  const c = await getTranslations("Common");
  const related = products.filter((item) => item.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: copy.title,
    description: copy.short,
    sku: p.sku,
    material: t("materialValue"),
    offers: {
      "@type": "Offer",
      price: (p.priceCents / 100).toFixed(2),
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale}/products/${slug}`,
    },
  };
  return (
    <section className="page-section product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-shell product-top">
        <div className="product-gallery">
          <MuseumFrame
            src={p.image}
            alt={copy.alt}
            orientation={p.orientation}
            priority
          />
        </div>
        <div className="product-info">
          <Link className="back-link" href="/collection">
            ← {c("backCollection")}
          </Link>
          <p className="kicker">
            {copy.city} · {p.sku}
          </p>
          <h1>{copy.title}</h1>
          <p className="product-short">{copy.short}</p>
          <div className="price-line">
            <strong>{formatPrice(p, locale)}</strong>
            <span>
              {t("edition", { number: p.editionNumber, total: p.editionTotal })}
              <small>{t("stock", { count: p.stock })}</small>
            </span>
          </div>
          <ProductActions slug={p.slug} />
          <div className="object-data">
            <h2>{c("details")}</h2>
            <dl>
              <dt>{t("material")}</dt>
              <dd>{t("materialValue")}</dd>
              <dt>{t("dimensions")}</dt>
              <dd>{t("dimensionsValue")}</dd>
              <dt>{t("year")}</dt>
              <dd>{t("yearValue")}</dd>
              <dt>{t("artist")}</dt>
              <dd>{t("artistValue")}</dd>
              <dt>{t("framing")}</dt>
              <dd>{t("framingValue")}</dd>
            </dl>
          </div>
          <aside className="certificate-note">
            <div>1/{p.editionTotal}</div>
            <h2>{t("authTitle")}</h2>
            <p>{t("authText")}</p>
          </aside>
        </div>
      </div>
      <section className="section-shell product-story">
        <div className="product-story-media">
          <article className="story-media-card exhibition-media-card">
            <div className="story-media-visual exhibition-visual">
              {p.exhibitionImage ? (
                <Image
                  src={p.exhibitionImage}
                  alt={t("exhibitionAlt", { city: copy.city })}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 82px), 50vw"
                />
              ) : (
                <div className="media-placeholder exhibition-placeholder">
                  <div className="gallery-preview" aria-hidden="true">
                    <Image src={p.image} alt="" fill sizes="220px" />
                  </div>
                  <small>{t("mediaPending")}</small>
                </div>
              )}
            </div>
            <p className="kicker">I · {t("exhibitionTitle")}</p>
            <h3>{t("exhibitionHeading")}</h3>
            <p>{t("exhibitionText")}</p>
          </article>

          <article className="story-media-card video-media-card">
            <div className="story-media-visual story-video-visual">
              {p.processVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  poster={p.image}
                >
                  <source src={p.processVideo} type="video/mp4" />
                </video>
              ) : (
                <div className="media-placeholder video-placeholder">
                  <span aria-hidden="true">▶</span>
                  <small>{t("mediaPending")}</small>
                </div>
              )}
            </div>
            <p className="kicker">II · {t("processVideoTitle")}</p>
            <h3>{t("processVideoHeading")}</h3>
            <p>{t("processVideoText")}</p>
          </article>
        </div>

        <header className="product-story-intro">
          <div>
            <p className="kicker">III · {t("storyTitle")}</p>
            <h2>{copy.city}</h2>
            <p className="story-deck">{copy.short}</p>
          </div>
          <div className="story-copy">
            <p>{copy.story}</p>
            <p>
              <strong>{t("heraldryTitle")}</strong>
              {copy.heraldry}
            </p>
          </div>
        </header>
      </section>
      <div className="section-shell related">
        <h2>{t("related")}</h2>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
