import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/user-event'
import '@testing-library/jest-dom';
import React, { act, Suspense } from 'react';

// eslint-disable-next-line
import { createMockEnvironment, MockPayloadGenerator, MockResolvers } from 'relay-test-utils';
// eslint-disable-next-line
import { usePreloadedQuery, graphql, PreloadedQuery, loadQuery, RelayEnvironmentProvider } from 'react-relay';

// eslint-disable-next-line
import { OperationType } from 'relay-runtime';
import PostLikeButton from '../PostLikeButton';

import { WithProviders, withProviders } from '../../../../../test/withProviders';

// eslint-disable-next-line import/no-unresolved
import PostLikeButtonSpecQuery from './__generated__/PostLikeButtonSpecQuery.graphql';
import Providers from '../../../../Providers';
import ErrorBoundary from '../../../../ErrorBoundaryRetry';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import AppQuery from '../../../../__generated__/AppQuery.graphql'

import App from '../../../../App'

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
    const data = usePreloadedQuery(graphql`
      query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
        post: node(id: $id) {
          ...PostLikeButton_post
        }
      }
    `, preloadedQuery);

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
  // eslint-disable-next-line
  const customMockResolvers = {
    Post: () => ({
      id: variables.id,
      meHasLiked: true,
      likesCount: 10,
    }),
  };


  /**
   * TODO
   * queue a pending operation, this would be a preloadQuery call
   */
  environment.mock.queuePendingOperation(PostLikeButtonSpecQuery, variables)

  /**
   * TODO
   * mock a queued operation
   */
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers))

  /**
   * TODO
   * preloadQuery test GraphQL operation
   */
  const preloadedQuery = loadQuery(
    environment,
    PostLikeButtonSpecQuery,
    variables,
    { fetchPolicy: 'store-or-network' },
  )

  const Root = getRoot({
    preloadedQuery,
    environment,
  });

  // eslint-disable-next-line
  const { debug, getByText, getByTestId } = render(<Root />);

  await waitFor(() => {
    expect(getByText('10')).toBeTruthy();
  })

  debug();

  // it should render likes count
});

it('should non-render post likesCount if is equal zero', async () => {
  const environment = createMockEnvironment()

  const variables = {
    id: 'postId',
  }

  const customMockResolvers = {
    Post: () => ({
      id: variables.id,
      likesCount: 0,
      meHasLiked: true,
    }),
  }

  environment.mock.queuePendingOperation(PostLikeButtonSpecQuery, variables)
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers))

  const preloadedQuery = loadQuery(
    environment,
    PostLikeButtonSpecQuery,
    variables,
    { fetchPolicy: 'store-or-network' },
  )

  const Root = getRoot({
    environment,
    preloadedQuery,
  })

  const { debug, queryByText } = render(
    <Root />,
  )

  expect(queryByText(/[0-9]+/i)).not.toBeInTheDocument()
  
  debug()
})

it('click in the like button', async () => {
  const environment = createMockEnvironment()

  const variables = {
    id: 'postId',
  }

  const customMockResolvers = {
    Post: () => ({
      id: variables.id,
      likesCount: 289,
      meHasLiked: false,
    }),
  }

  environment.mock.queuePendingOperation(PostLikeButtonSpecQuery, variables)
  environment.mock.queueOperationResolver(operation => MockPayloadGenerator.generate(operation, customMockResolvers))

  const preloadedQuery = loadQuery(
    environment,
    PostLikeButtonSpecQuery,
    variables,
    { fetchPolicy: 'store-or-network' },
  )

  const Root = getRoot({
    environment,
    preloadedQuery,
  })

  const { debug, getByTestId, findByText } = render(
    <Root />,
  )
  
  const likeButton = getByTestId('likeButton')

  await act(async () => {
    const clicked = fireEvent.click(likeButton)
    expect(clicked).toBeTruthy()

    const mutationOperation = await waitFor(() => environment.mock.getMostRecentOperation())

    expect(mutationOperation.fragment.variables).toEqual({
      input: {
        post: variables.id,
      },
    })
  })

  act(() => {
    const mutationMockResponse = {
      Mutation() {
        return {
          PostLike: {
            success: '',
            error: null,
            post: {
              id: variables.id,
              meHasLiked: true,
              likesCount: 290,
            },
          },
        }
      },
    } as MockResolvers
    environment.mock.resolveMostRecentOperation(operation => 
      MockPayloadGenerator.generate(operation, mutationMockResponse),
    )
  })

  expect(await findByText('290')).toBeInTheDocument()
  debug()
})