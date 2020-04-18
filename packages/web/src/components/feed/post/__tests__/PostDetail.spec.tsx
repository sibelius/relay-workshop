import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { Suspense } from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';

import { RelayEnvironmentProvider, preloadQuery } from 'react-relay/hooks';
import { createMemoryHistory } from 'history';

import { getTheme } from '@workshop/ui';

import { Environment } from '../../../../relay';
import PostDetail from '../PostDetail';

import ErrorBoundary from '../../../../ErrorBoundary';

// eslint-disable-next-line
import { RoutingContext, createRouter, RouterRenderer, JSResource } from '@workshop/route';

export const withProviders = ({ environment = Environment, Component }) => {
  const routes = [
    {
      component: JSResource('Component', () => new Promise(resolve => resolve(Component))),
      path: '/post/:id',
      // TODO - make RouterRenderer work
      // prepare: (params: { id: string }) => {
      //   const PostDetailQuery = require('../__generated__/PostDetailQuery.graphql');
      //
      //   return {
      //     postDetailQuery: preloadQuery(
      //       Environment,
      //       PostDetailQuery,
      //       {
      //         id: params.id,
      //       },
      //       {
      //         fetchPolicy: 'store-or-network',
      //       },
      //     ),
      //   };
      // },
    },
  ];

  const postId = 'postId';
  const router = createRouter(
    routes,
    createMemoryHistory({
      initialEntries: [`/post/${postId}`],
      initialIndex: 0,
    }),
  );

  const theme = getTheme();

  return props => {
    // TODO - make RouterRenderer work
    return (
      <RoutingContext.Provider value={router.context}>
        <RelayEnvironmentProvider environment={environment}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <SnackbarProvider>
                <ErrorBoundary>
                  <Suspense fallback={'Loading fallback...'}>
                    <Component {...props} />
                    {/*<RouterRenderer />*/}
                  </Suspense>
                </ErrorBoundary>
              </SnackbarProvider>
            </StylesProvider>
          </ThemeProvider>
        </RelayEnvironmentProvider>
      </RoutingContext.Provider>
    );
  };
};

it('should render post like button', async () => {
  const postId = 'postId';

  const PostDetailQuery = require('../__generated__/PostDetailQuery.graphql');

  const query = PostDetailQuery;
  const variables = {
    id: postId,
  };

  const customMockResolvers = {
    Post: () => ({
      content: 'Welcome to React Europe',
    }),
  };

  // queue pending operation
  Environment.mock.queuePendingOperation(query, variables);

  // PostDetailQuery
  Environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));

  const Root = withProviders({
    Component: PostDetail,
  });

  const prepared = {
    postDetailQuery: preloadQuery(Environment, PostDetailQuery, variables, {
      fetchPolicy: 'store-or-network',
    }),
  };

  // eslint-disable-next-line
  const { debug, getByText } = render(<Root prepared={prepared} />);

  // uncomment to check DOM
  debug();

  expect(getByText('Welcome to React Europe')).toBeTruthy();
});
