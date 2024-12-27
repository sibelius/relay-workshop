/* eslint-disable relay/generated-flow-types */
import React, { useCallback } from 'react';

// eslint-disable-next-line import/namespace
import { Flex } from 'rebass';
import { Button } from '@workshop/ui';
import { graphql, usePaginationFragment } from 'react-relay';

import Post from './Post.tsx';

import { Feed_query, Feed_query$key } from './__generated__/Feed_query.graphql';
import { FeedPaginationQuery } from './__generated__/FeedPaginationQuery.graphql';


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
   * Consume your createMutation here 
   */

  function CreateRandom() {
    /**
     * TODO
     * create a function to generate a random Post and use connections.
     */
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
        Create New
      </Button>
    </Flex>
  );
};

export default Feed;
