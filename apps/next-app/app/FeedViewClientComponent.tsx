'use client';

import { Suspense } from 'react';

import { RelayEnvironmentProvider } from 'react-relay';

import { getTheme } from '@workshop/ui';

import { ThemeProvider } from 'styled-components';

import StylesProvider from '@mui/styles/StylesProvider';

import { SnackbarProvider } from 'notistack';

import { SerializablePreloadedQuery } from '../src/relay/loadSerializableQuery';
import FeedViewQueryNode, { FeedViewQuery } from '../src/__generated__/FeedViewQuery.graphql';
import { getCurrentEnvironment } from '../src/relay/environment';
import useSerializablePreloadedQuery from '../src/relay/useSerializablePreloadedQuery';
import FeedView from '../src/components/feed/FeedView';



const theme = getTheme();

const FeedViewClientComponent = (props: {
  preloadedQuery: SerializablePreloadedQuery<typeof FeedViewQueryNode, FeedViewQuery>;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef = useSerializablePreloadedQuery(environment, props.preloadedQuery);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <SnackbarProvider>
          <RelayEnvironmentProvider environment={environment}>
            <Suspense fallback='Loading...'>
              <FeedView queryRef={queryRef} />
            </Suspense>
          </RelayEnvironmentProvider>
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default FeedViewClientComponent;
