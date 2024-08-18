import type { NextPage } from 'next';
import { graphql, usePreloadedQuery } from 'react-relay';

import { Text } from 'rebass';
import { BackButtonNext, Card, Content } from '@workshop/ui';

import React from 'react';

import Post from '../../components/post/Post';
import { getPreloadedQuery } from '../../relay/getPreloadedQuery';
import RootLayout from '../../components/feed/RootLayout';

const idPostQuery = graphql`
  query IdPostQuery($id: ID!) @preloadable {
    post: node(id: $id) {
      ...Post_post
    }
    me {
      ...Post_me
    }
  }
`;

const PostDetail: NextPage = (props) => {
  const query = usePreloadedQuery(
    idPostQuery,
    props.queryRefs.idPostQuery,
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

export default PostDetail;

export async function getServerSideProps(ctx) {
  return {
    props: {
      preloadedQueries: {
        idPostQuery: await getPreloadedQuery(idPostQuery, {
          id: ctx.params.id,
        }, ctx),
      },
    },
  };
}
