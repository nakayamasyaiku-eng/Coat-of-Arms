import type { Metadata } from "next";
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
          <div className="detail-strip">
            <div><div className="artwork-placeholder" role="img" aria-label={`${copy.alt} — detail`} /></div>
            <div><div className="artwork-placeholder" role="img" aria-label={`${copy.alt} — surface detail`} /></div>
          </div>
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
      <div className="section-shell product-story">
        <article>
          <p className="kicker">I · {t("storyTitle")}</p>
          <h2>{copy.city}</h2>
          <p>{copy.story}</p>
        </article>
        <article>
          <p className="kicker">II · {t("heraldryTitle")}</p>
          <h2>{copy.short}</h2>
          <p>{copy.heraldry}</p>
        </article>
        <article>
          <p className="kicker">III · {t("traceTitle")}</p>
          <h2>
            {locale === "zh" ? "铜面不是空白的" : "The surface is not neutral"}
          </h2>
          <p>{t("traceText")}</p>
        </article>
        <article>
          <p className="kicker">IV · {t("deliveryTitle")}</p>
          <h2>
            {locale === "zh"
              ? "为一次长途保存而包装"
              : "Packed for a long journey"}
          </h2>
          <p>{t("deliveryText")}</p>
        </article>
      </div>
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
