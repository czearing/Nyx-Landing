import * as React from 'react';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SSRProvider } from '@fluentui/react-utilities';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { AppProvider } from '../context';
import { AppContainer } from '../components';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../clients/react-query';
import { SessionProvider } from 'next-auth/react';

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
            <title>Voice Assistant</title>
            <meta name="title" content="Voice Assistant" />
            <meta name="description" content="A helpful voice assistant site." />
            <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
          </Head>
          <style jsx global>{`
            body {
              background-color: ${webDarkTheme.colorNeutralBackground2};
              padding: 0px;
              margin: 0px;
              height: 100%;
              overflow: hidden;
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
