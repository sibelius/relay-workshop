import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// eslint-disable-next-line
import { MockPayloadGenerator } from 'relay-test-utils';
// eslint-disable-next-line
import { usePreloadedQuery, graphql } from 'react-relay';
// eslint-disable-next-line
import { loadQuery } from '@workshop/relay';

// eslint-disable-next-line
import { Environment } from '../../../../relay';
import PostLikeButton from '../PostLikeButton';

import { withProviders } from '../../../../../test/withProviders';

// eslint-disable-next-line
export const getRoot = ({ preloadedQuery }) => {
  const UseQueryWrapper = () => {
    /**
     * TODO
     * add usePreloadQuery of a test operation
     */
    const data = {
      post: {},
    };

    return <PostLikeButton post={data.post} />;
  };

  return withProviders({
    Component: UseQueryWrapper,
  });
};

it.skip('should render post like button and likes count', async () => {
  // eslint-disable-next-line
  const PostLikeButtonSpecQuery = require('./__generated__/PostLikeButtonSpecQuery.graphql');

  const postId = 'postId';
  // eslint-disable-next-line
  const query = PostLikeButtonSpecQuery;
  // eslint-disable-next-line
  const variables = {
    id: postId,
  };

  /**
   * TODO
   * properly mock resolvers
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

  /**
   * TODO
   * preloadQuery test GraphQL operation
   */
  const preloadedQuery = {};

  const Root = getRoot({
    Component: PostLikeButton,
    preloadedQuery,
  });

  // eslint-disable-next-line
  const { debug, getByText, getByTestId } = render(<Root />);

  debug();

  // it should render likes count
  expect(getByText('10')).toBeTruthy();
});
