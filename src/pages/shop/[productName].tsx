import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../../server';
import { Spinner } from '@fluentui/react-components';
import Image from 'next/image';
import { shopifyClient } from 'src/clients/shopify';

const ProductPage = () => {
  const router = useRouter();
  const { productName } = router.query;

  const { data: product, isLoading } = useQuery(['product', productName], () => fetchProduct(productName as string), {
    enabled: !!productName,
  });

  const handleBuyNow = async (variantId: string) => {
    try {
      const checkout = await shopifyClient.checkout.create();
      const lineItemsToAdd = [{ variantId, quantity: 1 }];
      await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);

      window.location.href = checkout.webUrl;
    } catch (err) {
      console.error('Could not create checkout', err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const imageContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <div style={imageContainerStyle}>
        {product.images.map((image, index) => (
          <div key={index} style={{ position: 'relative', width: '150px', height: '150px' }}>
            <Image src={image.src} alt={`${product.title} image-${index + 1}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      <div>
        {product.variants.map((variant, index) => (
          <div key={index}>
            <h2>{variant.title}</h2>
            <p>
              Price: {variant.price.amount} {variant.price.currencyCode}
            </p>
            <button onClick={() => handleBuyNow(variant.id)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
