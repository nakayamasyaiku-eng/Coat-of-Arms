"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/store/cart";
import { useCartHydrated } from "@/store/hydration";

export function CartButton() {
  const t = useTranslations("Nav");
  const count = useCart((state) => state.items.length);
  const mounted = useCartHydrated();

  return (
    <Link className="cart-link" href="/cart">
      {t("cart")} <span>{mounted ? count : 0}</span>
    </Link>
  );
}
