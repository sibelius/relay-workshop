import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// eslint-disable-next-line
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
// eslint-disable-next-line
import { usePreloadedQuery, graphql, PreloadedQuery, loadQuery } from 'react-relay';

// eslint-disable-next-line
import { OperationType } from 'relay-runtime';
import PostLikeButton from '../PostLikeButton';

import { WithProviders, withProviders } from '../../../../../test/withProviders';

// eslint-disable-next-line import/no-unresolved
import PostLikeButtonSpecQuery from './__generated__/PostLikeButtonSpecQuery.graphql';

type RootProps = Pick<WithProviders, 'environment'> & {
  preloadedQuery: PreloadedQuery<OperationType>
}

// eslint-disable-next-line
export const getRoot = ({preloadedQuery, environment }: RootProps) => {
  const UseQueryWrapper = () => {
    /**
     * TODO
     * add usePreloadQuery of a test operation
     */
    const data = {
      post: {}
    }

    return <PostLikeButton post={data.post} />;
  };

  return withProviders({
    Component: UseQueryWrapper,
    environment,
  });
};

it('should render post like button and likes count', async () => {
  const environment = createMockEnvironment()
  // eslint-disable-next-line

  const postId = 'postId';
  // eslint-disable-next-line
  const variables = {
    id: postId,
  };

  /**
   * TODO
   * properly mock resolvers
   */
  const customMockResolvers = {}


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

  const Root = getRoot({
    preloadedQuery,
    environment,
  });

  const { debug, findByText } = render(<Root />);

  expect(await findByText('10')).toBeTruthy()

  debug();
});

it('should non-render post likesCount if is equal zero', async () => {
  // build a likesCount test -> extra exercise
})