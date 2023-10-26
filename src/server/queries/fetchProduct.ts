import { shopifyClient } from '../../clients/shopify';

export async function fetchProduct(handle: string) {
  const products = await shopifyClient.product.fetchByHandle(handle);
  return products;
}
