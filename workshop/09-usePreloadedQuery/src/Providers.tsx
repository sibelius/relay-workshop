import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from 'styled-components';
import StylesProvider from '@mui/styles/StylesProvider';
import { getTheme } from '@workshop/ui';

import Environment from './relay/Environment.tsx';

const theme = getTheme();

type Props = {
  children: React.ReactNode;
};
const Providers = ({ children }: Props) => {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <SnackbarProvider>{children}</SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
