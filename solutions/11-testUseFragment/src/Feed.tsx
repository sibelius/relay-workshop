import React, { useCallback } from 'react';

import { Flex } from 'rebass';
import { Button } from '@workshop/ui';
import { graphql } from 'react-relay';

import { usePaginationFragment } from 'react-relay/lib/hooks';

import Post from './components/feed/post/Post.tsx';

import { Feed_query, Feed_query$key } from './__generated__/Feed_query.graphql';
import { FeedPaginationQuery } from './__generated__/FeedPaginationQuery.graphql';

type Props = {
  query: Feed_query;
};
const Feed = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<FeedPaginationQuery, Feed_query$key>(
    graphql`
      fragment Feed_query on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 1 }, after: { type: String })
      @refetchable(queryName: "FeedPaginationQuery") {
        posts(first: $first, after: $after) @connection(key: "Feed_posts", filters: []) {
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
        me {
          ...Post_me
        }
      }
    `,
    props.query,
  );

  const { posts, me } = data;

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(1);
  }, [isLoadingNext, loadNext]);

  return (
    <Flex flexDirection='column'>
      {posts.edges.map(({ node }) => (
        <Post key={node.id} post={node} me={me} />
      ))}
      <Button mt='10px' onClick={loadMore}>
        Load More
      </Button>
    </Flex>
  );
};

export default Feed;
