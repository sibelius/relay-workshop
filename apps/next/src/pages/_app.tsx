import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import StylesProvider from '@mui/styles/StylesProvider';
import { getTheme } from '@workshop/ui';
import { SnackbarProvider } from 'notistack';

import { ReactRelayContainer } from '../relay/ReactRelayContainer.tsx';

const theme = getTheme();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <SnackbarProvider>
          <ReactRelayContainer Component={Component} props={pageProps} />
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}
