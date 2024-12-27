import React, { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Text } from 'rebass';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';

import { useLogout } from '../auth/useLogout.tsx';

type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  const [logout] = useLogout();

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Text flexGrow={1}>Welcome to Relay Workshop</Text>
          <IconButton color='inherit' onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
          Logout
        </Toolbar>
      </AppBar>
      <Suspense fallback={'Loading...'}>{children}</Suspense>
    </>
  );
};

export default RootLayout;
