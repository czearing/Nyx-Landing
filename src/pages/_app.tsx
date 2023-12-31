import * as React from 'react';
import { FluentProvider } from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SSRProvider } from '@fluentui/react-utilities';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { AppContainer } from '../components';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../clients/react-query';
import { customTheme } from '../theme';

const fluentProviderStyles = { height: '100%' };

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
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
        </Head>
        <style jsx global>{`
          body {
            background-color: ${customTheme.colorNeutralBackground1};
            padding: 0px;
            margin: 0px;
            height: 100%;
            letter-spacing: 0.1em;
          }
          html {
            height: 100%;
          }
          #__next {
            height: 100%;
          }
        `}</style>
        <RendererProvider renderer={pageProps.renderer || createDOMRenderer()}>
          <SSRProvider>
            {isMounted && (
              <FluentProvider theme={customTheme} style={fluentProviderStyles}>
                <AppContainer>
                  <Component {...pageProps} />
                </AppContainer>
              </FluentProvider>
            )}
          </SSRProvider>
        </RendererProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
