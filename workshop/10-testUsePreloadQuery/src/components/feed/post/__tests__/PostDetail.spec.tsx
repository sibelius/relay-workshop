import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
// eslint-disable-next-line
import { MockPayloadGenerator } from 'relay-test-utils';

// eslint-disable-next-line
import { preloadQuery } from 'react-relay/hooks';

import { JSResource } from '@workshop/route';

// eslint-disable-next-line
import { Environment } from '../../../../relay';
import PostDetail from '../PostDetail';

import { withProviders } from '../../../../../test/withProviders';

it('should render post like button', async () => {
  const postId = 'postId';

  const routes = [
    {
      component: JSResource('Component', () => new Promise(resolve => resolve(PostDetail))),
      path: '/post/:id',
    },
  ];

  const initialEntries = [`/post/${postId}`];

  const PostDetailQuery = require('../__generated__/PostDetailQuery.graphql');

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
    Post: () => ({}),
  };

  /**
   * TODO
   * queue a pending operation, this would be a preloadQuery call
   */

  /**
   * TODO
   * mock a queued operation
   */

  const Root = withProviders({
    routes,
    initialEntries,
    Component: PostDetail,
  });

  const prepared = {
    /**
     * TODO
     * preload query
     */
    postDetailQuery: {},
  };

  // eslint-disable-next-line
  const { debug, getByText } = render(<Root prepared={prepared} />);

  // uncomment to check DOM
  debug();

  expect(getByText('Welcome to React Europe')).toBeTruthy();
});
