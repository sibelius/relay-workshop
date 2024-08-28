// eslint-disable-next-line import/namespace
import { render, waitFor } from '@testing-library/react';
import {vi} from 'vitest'
import React from 'react';
// eslint-disable-next-line
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

// eslint-disable-next-line
import { loadQuery } from 'react-relay'

// eslint-disable-next-line
import { RouteObject } from 'react-router-dom';
import PostDetail from '../PostDetail';

import PostDetailQuery from '../__generated__/PostDetailQuery.graphql'
import { withProviders } from '../../../../../test/withProviders'

it('should render post like button', async () => {
  const environment = createMockEnvironment()
  const postId = 'postId';

  const variables = {
    id: postId,
  };
  
  const routes: RouteObject[] = [
    {
      element: <PostDetail />,
      path: `/post/${postId}`,
      id: 'postDetail',
      loader: () => {
        return {
          postDetailQuery: loadQuery(
            environment,
            PostDetailQuery,
            variables,
            { fetchPolicy: 'store-and-network' },
          ),
        }
      },
    },
  ];
  const loaderSpy = vi.spyOn(routes[0], 'loader')

  const initialEntries = [`/post/${postId}`];

  // eslint-disable-next-line
  const query = PostDetailQuery;
  // eslint-disable-next-line

  /**
   * TODO
   * mock content of Post
   */  
  const expectedPostContent = 'Welcome to Relay Workshop'
  const customMockResolvers = {}

  /**
   * TODO
   * queue a pending operation, this would be a preloadQuery call
   */
  
  /**
   * TODO
   * queue a resolver
   */
  
  /**
   * TODO
   * mock a queued operation
   */
  const Root = withProviders({
    routes,
    initialEntries,
    environment: environment,
  });

  const {getByText, debug, findByText} = render(
    <Root />,
  );

  await waitFor(() => {
    expect(loaderSpy).toHaveBeenCalledTimes(1)
    expect(getByText(expectedPostContent)).toBeTruthy();
  })
  // or
  // expect(await findByText('PostDetail')).toBeTruthy();

  debug();
});

it('should render post not found', async () => {
  // build the test to render mock result post not found
})