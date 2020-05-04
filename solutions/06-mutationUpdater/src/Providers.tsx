import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import { getTheme } from '@workshop/ui';

import Environment from './relay/Environment';

const theme = getTheme();

type Props = {
  children: React.ReactNode;
};
const Providers = ({ children }: Props) => {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>{children}</StylesProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
