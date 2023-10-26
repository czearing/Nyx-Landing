// pages/product/[productname].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
});
const ProductPage: React.FC = () => {
  const router = useRouter();
  const { productname } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productname) {
      // Fetch product details
      const fetchProduct = async () => {
        try {
          const productData = await client.product.fetchByHandle(productname as string);
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [productname]);

  // Simplify the add to cart function for now
  const addToCart = async variantId => {
    try {
      // For simplicity, let's create a new checkout each time (not ideal for a real app)
      const checkout = await client.checkout.create();
      const lineItemsToAdd = [{ variantId, quantity: 1 }];
      await client.checkout.addLineItems(checkout.id, lineItemsToAdd);

      // Here you might want to redirect the user to the checkout web page
      window.location.href = checkout.webUrl;
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div key={product.id}>
      {/* ... existing rendering of product details ... */}

      {/* Add to Cart button */}
      {product.variants.map((variant, index) => (
        <button key={index} onClick={() => addToCart(variant.id)}>
          Add to Cart
        </button>
      ))}
    </div>
  );
};

export default ProductPage;
