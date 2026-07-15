'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/navigation';
import {useCart} from '@/store/cart';

export function ProductActions({slug}: {slug: string}) {
  const t = useTranslations('Product');
  const addItem = useCart((s) => s.addItem);
  const beginBuyNow = useCart((s) => s.beginBuyNow);
  const router = useRouter();
  const [added, setAdded] = useState(false);
  return <div className="product-actions"><button className="button primary" onClick={() => {addItem(slug); setAdded(true);}}>{added ? t('added') : t('add')}</button><button className="button secondary" onClick={() => {beginBuyNow(slug); router.push('/checkout/contact');}}>{t('buy')}</button></div>;
}
