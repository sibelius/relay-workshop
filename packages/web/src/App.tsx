import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { getTheme } from '@workshop/ui';

import Environment from './relay/Environment';
import RouterRenderer from './routing/RouteRenderer';

const App = () => {
  const theme = getTheme();

  return (
    <RelayEnvironmentProvider environment={Environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <SnackbarProvider>
            <RouterRenderer />
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default App;
