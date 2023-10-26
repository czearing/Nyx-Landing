import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../server';
import Link from 'next/link';
import Image from 'next/image';
import { NewsLetterComponent } from 'src/components';

const Shop = () => {
  const { data: products, isLoading } = useQuery(['products'], fetchProducts);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Inline styles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styles: any = {
    productCard: {
      width: '350px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      overflow: 'hidden',
      textAlign: 'center', // to align the text items in the center
      textDecoration: 'none', // Ensures no underline etc.
      color: 'inherit', // Use parent's text color
    },
    productImageContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '100%', // This makes it a square
    },
    productDetails: {
      padding: '10px',
    },
    linkFocusStyle: {
      outline: '2px solid blue', // or any other style for focus indication
    },
  };

  // Render products with basic details
  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', flexWrap: 'wrap' }}>
        {products?.map(product => (
          <Link href={`/shop/${product.handle}`} passHref key={product.id}>
            <a style={styles.productCard} tabIndex={0}>
              <div style={styles.productImageContainer}>
                <Image
                  src={product.images[0].src}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
              <div style={styles.productDetails}>
                <h2>{product.title}</h2>
                <p>
                  {product.variants[0].price.amount} {product.variants[0].price.currencyCode}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <NewsLetterComponent />
    </div>
  );
};

export default Shop;
