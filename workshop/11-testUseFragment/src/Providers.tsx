import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from 'styled-components';
import StylesProvider from '@mui/styles/StylesProvider';
import { getTheme } from '@workshop/ui';

import Environment from './relay/Environment';

const theme = getTheme();

type Props = {
  children: React.ReactNode;
  environment?: typeof Environment
};
const Providers = ({ children, environment }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment ?? Environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <SnackbarProvider>{children}</SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
