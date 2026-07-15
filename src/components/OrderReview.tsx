"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { products, formatPrice } from "@/lib/products";
import { useCart } from "@/store/cart";
import { useCartHydrated } from "@/store/hydration";

export function OrderReview() {
  const t = useTranslations("Checkout");
  const c = useTranslations("Common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const slugs = useCart((s) => s.checkoutItems);
  const contact = useCart((s) => s.contact);
  const ref = useCart((s) => s.orderReference);
  const mounted = useCartHydrated();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  if (!mounted) return <div className="empty-state">{c("loading")}</div>;
  if (!contact || !ref || !slugs.length)
    return (
      <div className="empty-state">
        <h2>{t("missing")}</h2>
        <Link className="button primary" href="/checkout/contact">
          {t("edit")}
        </Link>
      </div>
    );
  const selected = products.filter((p) => slugs.includes(p.slug));
  const total = selected.reduce((n, p) => n + p.priceCents, 0);
  const pay = async () => {
    setLoading(true);
    setError("");
    const r = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs, contact, orderReference: ref, locale }),
    });
    const data = await r.json();
    if (!r.ok) {
      setError(data.error || "Payment could not be prepared");
      setLoading(false);
      return;
    }
    if (data.url) window.location.href = data.url;
    else router.push(`/checkout/success?order=${encodeURIComponent(ref)}`);
  };
  return (
    <div className="review-grid">
      <div className="review-record">
        <h2>{t("contactRecord")}</h2>
        <dl>
          <dt>{t("name")}</dt>
          <dd>{contact.name}</dd>
          <dt>{t("email")}</dt>
          <dd>{contact.email}</dd>
          <dt>{t("phone")}</dt>
          <dd>{contact.phone}</dd>
          <dt>{t("address")}</dt>
          <dd>
            {contact.address}
            <br />
            {contact.postal} {contact.city}, {contact.country}
          </dd>
        </dl>
        <Link href="/checkout/contact" className="text-link">
          {t("edit")} →
        </Link>
      </div>
      <aside className="cart-summary">
        <h2>{t("objectRecord")}</h2>
        {selected.map((p) => (
          <div key={p.slug}>
            <span>
              {p.localized[locale].city}
              <small>1/{p.editionTotal}</small>
            </span>
            <strong>{formatPrice(p, locale)}</strong>
          </div>
        ))}
        <div className="review-total">
          <span>{c("total")}</span>
          <strong>
            {new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-GB", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(total / 100)}
          </strong>
        </div>
        <button className="button primary" disabled={loading} onClick={pay}>
          {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
            ? t("pay")
            : t("mockPay")}
        </button>
        {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
          <p>{t("mockNote")}</p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </aside>
    </div>
  );
}
