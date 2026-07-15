'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import type {Locale} from '@/i18n/routing';
import type {Product} from '@/lib/products';
import {ProductCard} from './ProductCard';

export function ProductGrid({products, locale}: {products: Product[]; locale: Locale}) {
  const t = useTranslations('Collection');
  const [filter, setFilter] = useState<'all' | 'bohemia' | 'national'>('all');
  const filtered = filter === 'all' ? products : products.filter((p) => p.region === filter);
  return <div><div className="filter-bar" role="group" aria-label="Collection filters">{(['all','bohemia','national'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'active' : ''}>{t(item)}</button>)}<span>{t('showing', {count: filtered.length})}</span></div><div className="product-grid">{filtered.map((p, i) => <ProductCard key={p.slug} product={p} locale={locale} index={i} />)}</div></div>;
}
