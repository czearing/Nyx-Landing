import * as React from 'react';
import Client from 'shopify-buy';
import Link from 'next/link';
import { Link as LinkComponent } from '@fluentui/react-components';

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
});

const Shop = () => {
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.product.fetchAll();
        setProducts(products);
      } catch (err) {
        setError('An error occurred! ' + err.message);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      {/* Render your products here */}
      {products.map((product, index) => (
        <div key={product.id || index}>
          <h2>{product.title}</h2>
          {/* Product description, handling HTML if necessary */}
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />

          {/* Product images */}
          <div>
            {product.images.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image.src}
                alt={product.title}
                width="180" // or your preferred size
              />
            ))}
          </div>

          {/* Price, SKU, and other relevant information */}
          {product.variants.map((variant, variantIndex) => (
            <div key={variantIndex}>
              <p>
                Price: {variant.priceV2.amount} {variant.priceV2.currencyCode}
              </p>
              <p>SKU: {variant.sku || 'N/A'}</p>
              {/* Other variant-specific data can be rendered here */}
            </div>
          ))}

          {/* Availability */}
          <p>{product.availableForSale ? 'Available' : 'Out of Stock'}</p>

          {/* Extra product details */}
          <p>Vendor: {product.vendor}</p>
          <p>Type: {product.productType || 'General'}</p>

          {/* Link to detailed product page in your app */}
          {/* Replace 'productHandle' with the actual handle attribute from your product object */}
          <Link href={`/product/${product.handle}`} passHref>
            <LinkComponent>View More</LinkComponent>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Shop;
