import type {MetadataRoute} from 'next';
import {products} from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = ['', '/collection', '/cities', '/craft', '/about', '/contact'];
  return ['en', 'zh'].flatMap((locale) => [
    ...pages.map((page) => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
      priority: page === '' ? 1 : .8,
      alternates: {languages: {en: `${base}/en${page}`, zh: `${base}/zh${page}`}}
    })),
    ...products.map((product) => ({
      url: `${base}/${locale}/products/${product.slug}`,
      lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .9,
      alternates: {languages: {en: `${base}/en/products/${product.slug}`, zh: `${base}/zh/products/${product.slug}`}}
    }))
  ]);
}
