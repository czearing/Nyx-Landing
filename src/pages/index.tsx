import * as React from 'react';
import { Stars } from '../components/LandingArt/Stars';
import Script from 'next/script';
import { Body } from '../components';

const IndexPage = () => {
  return (
    <>
      <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-00XYLP9LZR" />
      <Script id="ga-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-00XYLP9LZR');
          `}
      </Script>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <h1>Section Above Stars</h1>
          <Body>This is some content above the stars.</Body>
        </div>
        {/* The Stars section with a specific height */}
        <div style={{ marginLeft: '-30px' }}>
          <Stars />
        </div>
        {/* Content that should go below the stars section */}
        <div>
          <h1>Section Below Stars</h1>
          <Body>This is some content below the stars.</Body>
        </div>
      </div>
    </>
  );
};
export default IndexPage;
