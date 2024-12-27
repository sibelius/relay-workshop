import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { NextPage } from 'next';

import { Content } from '@workshop/ui';

import React from 'react';

import PostComposer from '../post/PostComposer.tsx';

import { FeedViewQuery } from '../../__generated__/FeedViewQuery.graphql';

import FeedList from './FeedList.tsx';

import RootLayout from './RootLayout.tsx';

const FeedView: NextPage = (props: { queryRef: PreloadedQuery<FeedViewQuery> }) => {
  const query = usePreloadedQuery<any>(
    graphql`
      query FeedViewQuery @preloadable {
        ...FeedList_query
        me {
          id
          name
        }
      }
    `,
    props.queryRef,
  );

  return (
    <RootLayout>
      <Content>
        <span>{query.me?.name}</span>
        <PostComposer />
        <FeedList query={query} />
      </Content>
    </RootLayout>
  );
};

export default FeedView;
