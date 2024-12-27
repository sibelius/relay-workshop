import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { ThemeProvider } from 'styled-components';
import StylesProvider from '@mui/styles/StylesProvider';
import { getTheme } from '@workshop/ui';

import { SnackbarProvider } from 'notistack';

import Environment from './relay/Environment.tsx';

const theme = getTheme();

type Props = {
  children: React.ReactNode;
  environment: typeof Environment;
};
const Providers = ({ children, environment = Environment }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <SnackbarProvider>{children}</SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
