/* eslint-disable relay/generated-flow-types */
import React, { useCallback } from 'react';

import { Flex } from 'rebass';
import { Button } from '@workshop/ui';
import { graphql, useMutation, usePaginationFragment } from 'react-relay';

import Post from './Post';

import { Feed_query, Feed_query$key } from './__generated__/Feed_query.graphql';
import { FeedPaginationQuery } from './__generated__/FeedPaginationQuery.graphql';

import {PostCreateMutation, postCreateOptimisticResponse} from './PostCreateMutation'

type Props = {
  query: Feed_query;
};
const Feed = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<FeedPaginationQuery, Feed_query$key>(
    graphql`
      fragment Feed_query on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 2 }, after: { type: String })
      @refetchable(queryName: "FeedPaginationQuery") {
        posts(first: $first, after: $after) @connection(key: "Feed_posts", filters: []) {
          __id
          endCursorOffset
          startCursorOffset
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              ...Post_post
            }
          }
        }
      }
    `,
    props.query,
  );

  const { posts } = data;

  const [commitPostCreate, isCreatingPost] = useMutation(PostCreateMutation)
  /*
  To have access of connections.
  const connectionIDs = posts.__id
  OR
  const connectionIDs = ConnectionHandler.getConnectionID(
    ROOT_ID,
    'Feed_posts'
  )
  */

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(1);
  }, [isLoadingNext, loadNext]);

  /**
   * TODO
   * Consume your createMutation here  */

  function CreateRandom() {
    /**
     * TODO
     * create a function to generate a random Post and use connections.
     */
    const  variables = {
      input: {
        content: 'Teste',
      },
      connections: [posts.__id],
    }
      
    commitPostCreate({
      variables,
      onError: (completed) => console.log(completed),
      onCompleted: (completed) => console.log(completed),
    })
  }

  return (
    <Flex flexDirection='column'>
      {posts.edges.map(({ node }) => (
        <Post key={node.id} post={node} />
      ))}
      <Button mt='10px' onClick={loadMore}>
        Load More
      </Button>
      <Button mt='10px' onClick={CreateRandom}>
        {isCreatingPost ? 'Creating...' : 'Create New'}
      </Button>
    </Flex>
  );
};

export default Feed;
