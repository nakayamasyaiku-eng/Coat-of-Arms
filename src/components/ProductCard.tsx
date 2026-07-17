import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";
import { Link } from "@/i18n/navigation";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
  index?: number;
}) {
  const copy = product.localized[locale];
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card ${product.orientation}`}
    >
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={copy.alt}
          fill
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1020px) 50vw, 33vw"
        />
      </div>
      <div className="product-card-copy">
        <p>{product.sku}</p>
        <h3>{copy.city}</h3>
        <div>
          <span>{locale === "zh" ? "铜拓 · 手工 · 限量" : "Copper · Hand-worked · Limited"}</span>
          <strong aria-hidden="true">↗</strong>
        </div>
      </div>
    </Link>
  );
}
