import React from 'react';
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Text } from 'rebass';

const AuthRoot = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Text flexGrow={1}>Welcome to React Europe Relay Workshop</Text>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default AuthRoot;
