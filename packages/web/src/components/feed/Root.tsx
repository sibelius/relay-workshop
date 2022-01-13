import React, { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material';
import Toolbar from '@mui/material';
import { Text } from 'rebass';
import ExitToAppIcon from '@mui/icons-material';
import IconButton from '@mui/material';

import { usePreloadedQuery } from 'react-relay';

import { graphql } from 'react-relay';

import { useLogout } from '../auth/security';
import { useAuth } from '../../core/useAuth';

import { FeedQuery } from './__generated__/FeedQuery.graphql';

type Props = {
  children: React.ReactNode;
  prepared: {
    rootQuery: unknown;
  };
};
const Root = ({ children, prepared }: Props) => {
  const [logout] = useLogout();

  const data = usePreloadedQuery<FeedQuery>(
    graphql`
      query RootQuery {
        me {
          ...useAuth_user
        }
      }
    `,
    prepared.rootQuery,
  );

  const isAuthenticated = useAuth(data.me);

  if (!isAuthenticated) {
    return null;
  }

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
      <Suspense fallback={'Loading children...'}>{children}</Suspense>
    </>
  );
};

export default Root;
