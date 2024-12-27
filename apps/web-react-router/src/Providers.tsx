import React, { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { ThemeProvider } from 'styled-components';
import StylesProvider from '@mui/styles/StylesProvider';
import { getTheme } from '@workshop/ui';

import { SnackbarProvider } from 'notistack';

import { createEnvironment } from './relay/relayEnvironment.tsx';

const theme = getTheme();

type Props = {
  children: React.ReactNode;
  environment: typeof Environment;
};
const Providers = ({ children, environment = createEnvironment() }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <SnackbarProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
