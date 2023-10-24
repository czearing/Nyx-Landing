import * as React from 'react';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SSRProvider } from '@fluentui/react-utilities';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { AppContainer } from '../components';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../clients/react-query';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';

const fluentProviderStyles = { height: '100%' };

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta name="title" content="Nyx - Music | Official Site" />
            <meta
              name="description"
              content="Explore the electrifying realm of Nyx, Seattle's premier electronic music artist. Discover the latest tracks, event updates, and exclusive content only on the official Nyx website."
            />
            <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
            <link rel="canonical" href="https://nyx.band/" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <html lang="en" />
          </Head>
          <style jsx global>{`
            body {
              background-color: ${webDarkTheme.colorNeutralBackground2};
              padding: 0px;
              margin: 0px;
              height: 100%;
            }
            html {
              height: 100%;
            }
            #__next {
              height: 100%;
            }
          `}</style>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          <Script id="partytown-gtag" type="text/partytown">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
      page_path: window.location.pathname,
    });
  `}
          </Script>

          <RendererProvider renderer={pageProps.renderer || createDOMRenderer()}>
            <SSRProvider>
              {isMounted && (
                <FluentProvider theme={webDarkTheme} style={fluentProviderStyles}>
                  <AppContainer>
                    <Component {...pageProps} />
                  </AppContainer>
                </FluentProvider>
              )}
            </SSRProvider>
          </RendererProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
