import * as React from 'react';
import { Stars } from '../components/LandingArt/Stars';
import { NewsLetterComponent } from '../components';
import Script from 'next/script';

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
          <p>This is some content above the stars.</p>
        </div>

        {/* The Stars section with a specific height */}
        <div>
          <Stars />
        </div>

        {/* Content that should go below the stars section */}
        <div>
          <h1>Section Below Stars</h1>
          <p>This is some content below the stars.</p>
        </div>
        <NewsLetterComponent />
      </div>
    </>
  );
};
export default IndexPage;
