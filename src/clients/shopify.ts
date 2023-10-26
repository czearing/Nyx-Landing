import Client from 'shopify-buy';

export const shopifyClient = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION!,
});
