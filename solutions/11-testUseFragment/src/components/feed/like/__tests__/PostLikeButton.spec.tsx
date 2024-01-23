import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import { usePreloadedQuery, graphql, loadQuery } from 'react-relay';

import { environment } from '../../../../relay';
import PostLikeButton from '../PostLikeButton';

import { withProviders } from '../../../../../test/withProviders';

import { PostLikeButtonSpecQuery } from './__generated__/PostLikeButtonSpecQuery.graphql';

export const getRoot = ({ preloadedQuery }) => {
  const UseQueryWrapper = () => {
    const data = usePreloadedQuery<PostLikeButtonSpecQuery>(
      graphql`
        query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
          post: node(id: $id) {
            ...PostLikeButton_post
          }
        }
      `,
      preloadedQuery,
    );

    return <PostLikeButton post={data.post} />;
  };

  return withProviders({
    Component: UseQueryWrapper,
  });
};

it('should render post like button and likes count', async () => {
  const environment = createMockEnvironment();

  const PostLikeButtonSpecQuery = require('./__generated__/PostLikeButtonSpecQuery.graphql');

  const postId = 'postId';
  const query = PostLikeButtonSpecQuery;
  const variables = {
    id: postId,
  };

  const customMockResolvers = {
    Post: () => ({
      id: postId,
      likesCount: 10,
      meHasLiked: false,
    }),
  };

  // queue pending operation
  environment.mock.queuePendingOperation(query, variables);

  // PostDetailQuery
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers));

  const preloadedQuery = loadQuery(
    environment,
    PostLikeButtonSpecQuery,
    {
      id: postId,
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  const Root = getRoot({
    Component: PostLikeButton,
    preloadedQuery,
  });

  // eslint-disable-next-line
  const { debug, getByText, getByTestId } = render(<Root />);

  // debug();

  // it should render likes count
  expect(getByText('10')).toBeTruthy();
});
