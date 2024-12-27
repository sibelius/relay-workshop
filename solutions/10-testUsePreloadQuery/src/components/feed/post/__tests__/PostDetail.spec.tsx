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
import PostDetail from '../PostDetail.tsx';

import PostDetailQuery from '../__generated__/PostDetailQuery.graphql'
import { withProviders } from '../../../../../test/withProviders.tsx'

it('should render post like button', async () => {
  const environment = createMockEnvironment()
  const postId = 'postId';

  const variables = {
    id: postId,
  };
  
  const routes: RouteObject[] = [
    {
      element: <PostDetail />,
      path: '/',
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

  const initialEntries = [`/`];

  // eslint-disable-next-line
  const query = PostDetailQuery;
  // eslint-disable-next-line

  /**
   * TODO
   * mock content of Post
   */  
  const expectedPostContent = 'Welcome to Relay Workshop'
  const customMockResolvers = {
    Post: () => ({
      // id: 'postId',
      content: expectedPostContent,
    }),
    // unneed
    // User: () => ({
    //   id: '2',
    //   name: 'Test User',
    // }),
  }

  /**
   * TODO
   * queue a pending operation, this would be a preloadQuery call
   */

  // queue pending operation
  environment.mock.queuePendingOperation(query, variables);
  // PostDetailQuery
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));
  
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

  // debug();
});

it('should render post not found', async () => {
  const environment = createMockEnvironment()
  const variables = {
    id: 'postId',
  }

  const routes = [
    {
      element: <PostDetail />,
      path: '/post/:id',
      loader: () => ({
        postDetailQuery: loadQuery(
          environment,
          PostDetailQuery,
          variables,
          { fetchPolicy: 'store-or-network' },
        ),
      }),
    },
  ]
  const loaderSpy = vi.spyOn(routes[0], 'loader')

  const mockResolverGetPostDetail = {
    Post: () => null,
  }

  environment.mock.queuePendingOperation(PostDetailQuery, variables)
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, mockResolverGetPostDetail))

  const Root = withProviders({
    environment,
    routes,
    initialEntries: [`/post/${variables.id}`],
  })
  
  const { debug, getByText } = render(
    <Root />,
  )

  await waitFor(() => {
    expect(loaderSpy).toHaveBeenCalledTimes(1)
    getByText('Post not found')
  })

  debug()
})