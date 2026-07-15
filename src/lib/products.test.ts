import {describe,expect,it} from 'vitest';
import {products,formatPrice,getProduct} from './products';

describe('product catalogue', () => {
  it('contains nine uniquely addressable city records', () => {
    expect(products).toHaveLength(9);
    expect(new Set(products.map((product) => product.slug)).size).toBe(9);
    expect(products.every((product) => product.image.startsWith('/images/products/'))).toBe(true);
  });
  it('keeps server prices in positive integer cents', () => {
    expect(products.every((product) => Number.isInteger(product.priceCents) && product.priceCents > 0)).toBe(true);
    expect(formatPrice(products[0], 'en')).toContain('480');
  });
  it('resolves a product by slug', () => {
    expect(getProduct('prague')?.localized.zh.city).toBe('布拉格');
    expect(getProduct('missing')).toBeUndefined();
  });
});
