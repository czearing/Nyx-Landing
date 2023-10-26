import { shopifyClient } from '../../clients/shopify';

export async function fetchProducts() {
  const products = await shopifyClient.product.fetchAll();
  return products;
}
