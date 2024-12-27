import React, { useCallback } from 'react';

import { Flex } from 'rebass';
import { Button } from '@workshop/ui';

import Post from './Post.tsx';

import { Feed_query } from './__generated__/Feed_query.graphql';

type Props = {
  query: Feed_query;
};
// eslint-disable-next-line
const Feed = (props: Props) => {
  /**
   * TODO
   * usePaginationFragment to fetch posts and paginate
   */
  const data = {
    posts: {
      edges: [],
    },
  };
  const { posts } = data;

  /**
   * TODO
   * fix loadMore callback to loadMore posts
   */
  const loadMore = useCallback(() => {}, []);

  return (
    <Flex flexDirection='column'>
      {posts.edges.map(({ node }) => (
        <Post key={node.id} post={node} />
      ))}
      <Button mt='10px' onClick={loadMore}>
        Load More
      </Button>
    </Flex>
  );
};

export default Feed;
