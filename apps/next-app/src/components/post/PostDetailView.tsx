import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { NextPage } from 'next';

import { BackButtonNext, Card, Content } from '@workshop/ui';
import { Text } from 'rebass';

import React from 'react';

import RootLayout from '../feed/RootLayout.tsx';
import { FeedViewQuery } from '../../__generated__/FeedViewQuery.graphql';

import Post from './Post.tsx';

const PostDetailView: NextPage = (props: { queryRef: PreloadedQuery<FeedViewQuery> }) => {
  const query = usePreloadedQuery(
    graphql`
      query PostDetailViewQuery($id: ID!) {
        post: node(id: $id) {
          ...Post_post
        }
        me {
          ...Post_me
        }
      }
    `,
    props.queryRef,
  );

  const { post, me } = query;

  if (!post) {
    return (
      <RootLayout>
        <Content>
          <Card p='20px' flex={1} alignItems='center' justifyContent='center'>
            <Text>Post not found</Text>
          </Card>
        </Content>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <Content>
        <BackButtonNext />
        <Post post={post} me={me} isDetail={true} />
      </Content>
    </RootLayout>
  );
};

export default PostDetailView;
