import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { NextPage } from 'next';
import RootLayout from './RootLayout';
import { Content } from '@workshop/ui';
import PostComposer from '../post/PostComposer';
import FeedList from './FeedList';
import React from 'react';
import { FeedViewQuery } from '../../__generated__/FeedViewQuery.graphql';

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
