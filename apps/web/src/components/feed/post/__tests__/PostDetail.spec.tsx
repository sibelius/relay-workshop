import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import { loadQuery } from 'react-relay';

import { JSResource } from '@workshop/route';

import { environment } from '../../../../relay';
import PostDetail from '../PostDetail.tsx';

import { withProviders } from '../../../../../test/withProviders.tsx';

it.skip('should render post like button', async () => {
  const environment = createMockEnvironment();

  const postId = 'postId';

  const routes = [
    {
      component: JSResource('Component', () => new Promise(resolve => resolve(PostDetail))),
      path: '/post/:id',
      // TODO - make RouterRenderer work
      // prepare: (params: { id: string }) => {
      //   const PostDetailQuery = require('../__generated__/PostDetailQuery.graphql');
      //
      //   return {
      //     postDetailQuery: loadQuery(
      //       environment,
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

  const initialEntries = [`/post/${postId}`];

  const PostDetailQuery = require('../__generated__/PostDetailQuery.graphql');

  const query = PostDetailQuery;
  const variables = {
    id: postId,
  };

  const customMockResolvers = {
    Post: () => ({
      content: 'Welcome to Relay Workshop',
    }),
  };

  // queue pending operation
  environment.mock.queuePendingOperation(query, variables);

  // PostDetailQuery
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));

  const Root = withProviders({
    routes,
    initialEntries,
    Component: PostDetail,
  });

  const prepared = {
    postDetailQuery: loadQuery(environment, PostDetailQuery, variables, {
      fetchPolicy: 'store-or-network',
    }),
  };

  // eslint-disable-next-line
  const { debug, getByText } = render(<Root prepared={prepared} />);

  // uncomment to check DOM
  // debug();

  expect(getByText('Welcome to Relay Workshop')).toBeTruthy();
});
