import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Text } from 'rebass';

const AuthRoot = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Text flexGrow={1}>Welcome to Relay Workshop</Text>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default AuthRoot;
