import React from 'react';
import { graphql , usePreloadedQuery, PreloadedQuery } from 'react-relay';


import { Content } from '@workshop/ui';

import PostComposer from './PostComposer.tsx';
import { FeedQuery } from './__generated__/FeedQuery.graphql';

import FeedList from './FeedList.tsx';
import { useNewPostSubscription } from './useNewPostSubscription.tsx';

type Props = {
  prepared: {
    feedQuery: PreloadedQuery<FeedQuery>;
  };
};
const Feed = ({ prepared }: Props) => {
  const data = usePreloadedQuery<FeedQuery>(
    graphql`
      query FeedQuery {
        ...FeedList_query
        me {
          id
          name
        }
      }
    `,
    prepared.feedQuery,
  );

  const { me } = data;

  useNewPostSubscription(me);

  return (
    <Content>
      <PostComposer />
      <FeedList query={data} />
    </Content>
  );
};

export default Feed;
