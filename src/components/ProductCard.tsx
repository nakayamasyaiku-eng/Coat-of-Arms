import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
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
        <span className="edition-tab">
          {product.editionNumber}/{product.editionTotal}
        </span>
      </div>
      <div className="product-card-copy">
        <p>{copy.city}</p>
        <h3>{copy.title}</h3>
        <div>
          <span>
            {product.available
              ? locale === "zh"
                ? "可收藏"
                : "Available"
              : locale === "zh"
                ? "已预订"
                : "Reserved"}
          </span>
          <strong>{formatPrice(product, locale)}</strong>
        </div>
      </div>
    </Link>
  );
}
