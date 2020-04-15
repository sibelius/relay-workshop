import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { Suspense } from 'react';
import { MockPayloadGenerator } from 'relay-test-utils';

import { RelayEnvironmentProvider, usePreloadedQuery, graphql, preloadQuery } from 'react-relay/hooks';

import { Environment } from '../../../../relay';
import PostLikeButton from '../PostLikeButton';

import ErrorBoundary from '../../../../ErrorBoundary';

import { PostLikeButtonTestQuery } from './__generated__/PostLikeButtonTestQuery.graphql';

export const withProviders = ({ environment = Environment, Component, preload }) => {
  const UseQueryWrapper = () => {
    const data = usePreloadedQuery<PostLikeButtonTestQuery>(
      graphql`
        query PostLikeButtonTestQuery($id: ID!) @relay_test_operation {
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
  const PostLikeButtonTestQuery = require('./__generated__/PostLikeButtonTestQuery.graphql');

  const preload = preloadQuery(
    Environment,
    PostLikeButtonTestQuery,
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
