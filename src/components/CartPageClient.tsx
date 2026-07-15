"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { products, formatPrice } from "@/lib/products";
import type { Locale } from "@/i18n/routing";
import { useCart } from "@/store/cart";
import { useCartHydrated } from "@/store/hydration";

export function CartPageClient() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Cart");
  const c = useTranslations("Common");
  const router = useRouter();
  const slugs = useCart((s) => s.items);
  const remove = useCart((s) => s.removeItem);
  const begin = useCart((s) => s.beginCartCheckout);
  const mounted = useCartHydrated();
  if (!mounted) return <div className="empty-state">{c("loading")}</div>;
  const selected = products.filter((p) => slugs.includes(p.slug));
  const total = selected.reduce((n, p) => n + p.priceCents, 0);
  if (!selected.length)
    return (
      <div className="empty-state">
        <div className="footer-seal">CA</div>
        <h2>{t("emptyTitle")}</h2>
        <p>{t("emptyText")}</p>
        <Link href="/collection" className="button primary">
          {c("explore")}
        </Link>
      </div>
    );
  return (
    <div className="cart-layout">
      <div className="cart-items">
        {selected.map((p) => (
          <article key={p.slug}>
            <div className="cart-thumb">
              <div
                className="artwork-placeholder"
                role="img"
                aria-label={p.localized[locale].alt}
                data-artwork-src={p.image}
              />
            </div>
            <div>
              <p>{p.localized[locale].city}</p>
              <h2>{p.localized[locale].title}</h2>
              <small>
                {p.sku} · 1/{p.editionTotal}
              </small>
              <button onClick={() => remove(p.slug)}>{c("remove")}</button>
            </div>
            <strong>{formatPrice(p, locale)}</strong>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <h2>{t("summary")}</h2>
        <div>
          <span>{t("subtotal")}</span>
          <strong>
            {new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-GB", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(total / 100)}
          </strong>
        </div>
        <div>
          <span>{t("shipping")}</span>
          <small>{t("shippingValue")}</small>
        </div>
        <button
          className="button primary"
          onClick={() => {
            begin();
            router.push("/checkout/contact");
          }}
        >
          {t("checkout")}
        </button>
        <p>{t("note")}</p>
      </aside>
    </div>
  );
}
