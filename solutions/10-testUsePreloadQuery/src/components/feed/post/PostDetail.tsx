import React from 'react';

import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay';

import { Text } from 'rebass';

import { Card, Content, BackButton } from '@workshop/ui';

import Post from './Post.tsx';
import { PostDetailQuery } from './__generated__/PostDetailQuery.graphql';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

type LoaderData = {
  postDetailQuery: PreloadedQuery<PostDetailQuery>
}

const PostDetail = () => {
  // get data preloaded in router
  const loadedData = useLoaderData() as LoaderData
  
  const data = usePreloadedQuery<PostDetailQuery>(
    graphql`
      query PostDetailQuery($id: ID!) {
        post: node(id: $id) {
          ...Post_post
        }
        me {
          ...Post_me
        }
      }
    `,
    loadedData.postDetailQuery,
  );

  console.log({data})

  const { post, me } = data;

  if (!post) {
    return (
      <Content>
        <Card p='20px' flex={1} alignItems='center' justifyContent='center'>
          <Text>Post not found</Text>
        </Card>
      </Content>
    );
  }
  return (
    <Content>
      <h1>PostDetail</h1>
      <BackButton />
      <Post post={data.post} me={me} isDetail={true} />
    </Content>
  );
};

export default PostDetail;
