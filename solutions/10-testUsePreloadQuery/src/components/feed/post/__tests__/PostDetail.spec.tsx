import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';

import { loadQuery } from 'react-relay/hooks';

import { JSResource } from '@workshop/route';

import { Environment } from '../../../../relay';
import PostDetail from '../PostDetail';

import { withProviders } from '../../../../../test/withProviders';

it('should render post like button', async () => {
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

  const initialEntries = [`/post/${postId}`];

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
    routes,
    initialEntries,
    Component: PostDetail,
  });

  const prepared = {
    postDetailQuery: loadQuery(Environment, PostDetailQuery, variables, {
      fetchPolicy: 'store-or-network',
    }),
  };

  // eslint-disable-next-line
  const { debug, getByText } = render(<Root prepared={prepared} />);

  // uncomment to check DOM
  // debug();

  expect(getByText('Welcome to React Europe')).toBeTruthy();
});
