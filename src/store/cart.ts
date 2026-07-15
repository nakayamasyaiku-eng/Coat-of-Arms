'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  postal: string;
  language: 'en' | 'zh';
  time?: string;
  notes?: string;
  consent: boolean;
};

type CartState = {
  items: string[];
  checkoutItems: string[];
  contact: ContactDetails | null;
  orderReference: string | null;
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  beginCartCheckout: () => void;
  beginBuyNow: (slug: string) => void;
  setContact: (contact: ContactDetails) => void;
  setOrderReference: (reference: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutItems: [],
      contact: null,
      orderReference: null,
      addItem: (slug) => set((state) => ({items: state.items.includes(slug) ? state.items : [...state.items, slug]})),
      removeItem: (slug) => set((state) => ({items: state.items.filter((item) => item !== slug)})),
      clear: () => set({items: [], checkoutItems: [], contact: null}),
      beginCartCheckout: () => set({checkoutItems: get().items}),
      beginBuyNow: (slug) => set({checkoutItems: [slug]}),
      setContact: (contact) => set({contact}),
      setOrderReference: (orderReference) => set({orderReference})
    }),
    {name: 'coat-of-arms-cart'}
  )
);
