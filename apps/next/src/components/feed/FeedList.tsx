import React from 'react';
import { usePaginationFragment, graphql } from 'react-relay';

import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@mui/material/CircularProgress';
import { Flex } from 'rebass';

import Post from '../post/Post.tsx';

import { FeedList_query$key } from './__generated__/FeedList_query.graphql';
import { FeedListPaginationQuery } from './__generated__/FeedListPaginationQuery.graphql';

type Props = {
  query: FeedList_query$key;
};
const FeedList = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<FeedListPaginationQuery, _>(
    graphql`
      fragment FeedList_query on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 3 }, after: { type: String })
      @refetchable(queryName: "FeedListPaginationQuery") {
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

  const loadMore = () => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(3);
  };

  const infiniteScrollerLoader = (
    <Flex flex={1} alignItems='center' justiyContent='center'>
      <CircularProgress />
    </Flex>
  );

  const { posts, me } = data;
  const { pageInfo } = posts;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={pageInfo.hasNextPage}
      loader={infiniteScrollerLoader}
      useWindow
    >
      {data.posts.edges.map(({ node }) => (
        <Post key={node.id} post={node} me={me} />
      ))}
    </InfiniteScroll>
  );
};

export default FeedList;
