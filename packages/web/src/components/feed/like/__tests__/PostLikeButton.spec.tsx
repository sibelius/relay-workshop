import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { Suspense } from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';

import { RelayEnvironmentProvider, usePreloadedQuery, graphql, preloadQuery } from 'react-relay/hooks';

import { Environment } from '../../../../relay';
import PostLikeButton from '../PostLikeButton';

import ErrorBoundary from '../../../../ErrorBoundary';

import { PostLikeButtonSpecQuery } from './__generated__/PostLikeButtonSpecQuery.graphql';

export const withProviders = ({ environment = Environment, Component, preload }) => {
  const UseQueryWrapper = () => {
    const data = usePreloadedQuery<PostLikeButtonSpecQuery>(
      graphql`
        query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
          post: node(id: $id) {
            ...PostLikeButton_post
          }
        }
      `,
      preload,
    );

    return <Component post={data.post} />;
  };

  return props => {
    return (
      <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary>
          <Suspense fallback={'Loading fallback...'}>
            <UseQueryWrapper {...props} />
          </Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    );
  };
};

it('should render post like button', async () => {
  const PostLikeButtonSpecQuery = require('./__generated__/PostLikeButtonSpecQuery.graphql');

  const preload = preloadQuery(
    Environment,
    PostLikeButtonSpecQuery,
    {
      id: 'postId',
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  const Root = withProviders({
    Component: PostLikeButton,
    preload,
  });

  // eslint-disable-next-line
  const { debug, getByText, queryByText } = render(<Root />);

  const customMockResolvers = {
    Post: () => ({
      likesCount: 10,
    }),
  };

  debug();

  // PostLikeTestQuery
  Environment.mock.resolveMostRecentOperation(operation =>
    MockPayloadGenerator.generate(operation, customMockResolvers),
  );

  debug();

  expect(getByText('10')).toBeTruthy();
});
