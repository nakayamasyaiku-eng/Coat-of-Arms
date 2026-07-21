import {describe,expect,it} from 'vitest';
import {products,getProduct} from './products';

describe('product catalogue', () => {
  it('contains nine uniquely addressable city records', () => {
    expect(products).toHaveLength(9);
    expect(new Set(products.map((product) => product.slug)).size).toBe(9);
    expect(products.every((product) => product.image.startsWith('/images/framed/'))).toBe(true);
    expect(products.every((product) => product.exhibitionImage?.startsWith('/images/exhibitions/'))).toBe(true);
  });
  it('publishes the available city making films', () => {
    expect(products.filter((product) => product.processVideo).map((product) => product.slug)).toEqual(['ceske-budejovice', 'hradec-kralove']);
  });
  it('keeps the edition metadata attached to every archival record', () => {
    expect(products.every((product) => product.editionTotal === 10 && product.editionNumber === 1)).toBe(true);
  });
  it('resolves a product by slug', () => {
    expect(getProduct('prague')?.localized.zh.city).toBe('布拉格');
    expect(getProduct('missing')).toBeUndefined();
  });
});
