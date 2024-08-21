import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
import {expect, it, describe} from 'vitest'
import React from 'react';
// eslint-disable-next-line
import { createMockEnvironment } from 'relay-test-utils';

// eslint-disable-next-line
import { loadQuery } from 'react-relay'

// eslint-disable-next-line
import PostDetail from '../PostDetail';

import { withProviders } from '../../../../../test/withProviders';
import { RouteObject } from 'react-router-dom';
import { Environment } from '../../../../relay';

import PostDetailQuery from '../__generated__/PostDetailQuery.graphql';

it.skip('should render post like button', async () => {
  const environment = createMockEnvironment()
  const postId = 'postId';

  const routes: RouteObject[] = [
    {
      element: <PostDetail />,
      path: '/post/:id',
    },
  ];

  const initialEntries = [`/post/${postId}`];

  // eslint-disable-next-line
  const query = PostDetailQuery;
  // eslint-disable-next-line
  const variables = {
    id: postId,
  };

  /**
   * TODO
   * mock content of Post
   */
  // eslint-disable-next-line
  const customMockResolvers = {
    Post: () => ({
      content: 'Hallex Teste'
    }),
  };

  /**
   * TODO
   * queue a pending operation, this would be a preloadQuery call
   */
  environment.mock.queuePendingOperation(query, variables)
  

  /**
   * TODO
   * mock a queued operation
   */

  const Root = withProviders({
    routes,
    initialEntries,
    Component: PostDetail,
    environment: Environment
  });

  const prepared = {
    /**
     * TODO
     * preload query
     */
    postDetailQuery: loadQuery(
      environment,
      PostDetailQuery,
      variables,
      {fetchPolicy: 'store-and-network'}
    ),
  };

  // eslint-disable-next-line
  const { debug, getByText } = render(<Root prepared={prepared} />);

  // uncomment to check DOM
  debug();

  expect(getByText('Welcome to Relay Workshop')).toBeTruthy();
});
