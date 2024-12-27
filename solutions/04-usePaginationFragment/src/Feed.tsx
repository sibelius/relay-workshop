import React, { useCallback } from 'react';

import { Flex } from 'rebass';
import InfiniteScroll from 'react-infinite-scroller';
import { graphql } from 'react-relay';

import { usePaginationFragment } from 'react-relay/lib/hooks';

import Loading from './Loading.tsx';
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
      }
    `,
    props.query,
  );

  const { posts } = data;

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <Flex flexDirection='column'>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={posts.pageInfo.hasNextPage}
        loader={<Loading />}
        useWindow
      >
        {posts.edges.map(({ node }) => (
          <Post key={node.id} post={node} />
        ))}
      </InfiniteScroll>
    </Flex>
  );
};

export default Feed;
