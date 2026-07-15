'use client';

import {useSyncExternalStore} from 'react';
import {useCart} from './cart';

export function useCartHydrated() {
  return useSyncExternalStore(
    (notify) => useCart.persist.onFinishHydration(() => notify()),
    () => useCart.persist.hasHydrated(),
    () => false
  );
}
