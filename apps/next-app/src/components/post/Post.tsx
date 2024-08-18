import React from 'react';
import CardContent from '@mui/material/CardContent';
import { useFragment , graphql } from 'react-relay';
import styled from 'styled-components';
import { Text } from 'rebass';

import { Card, CardActions } from '@workshop/ui';

import _Link from 'next/link';

import PostLikeButton from '../like/PostLikeButton';
import PostCommentComposer from '../comment/PostCommentComposer';
import PostComments from '../comment/PostComments';

import PostHeader from './PostHeader';
import { Post_post$key } from './__generated__/Post_post.graphql';
import { Post_me$key } from './__generated__/Post_me.graphql';

const Link = styled(_Link)`
  text-decoration: none;
  color: black;
`;

type Props = {
  post: Post_post$key;
  me: Post_me$key;
  isDetail?: boolean;
};
const Post = (props: Props) => {
  const { isDetail = false } = props;

  const post = useFragment<Post_post$key>(
    graphql`
      fragment Post_post on Post {
        id
        content
        author {
          id
          name
          ...PostHeader_user
          ...UserAvatar_user
        }
        ...PostLikeButton_post
        ...PostCommentComposer_post
        ...PostComments_post
      }
    `,
    props.post,
  );

  const me = useFragment<Post_me$key>(
    graphql`
      fragment Post_me on User {
        ...PostCommentComposer_me
      }
    `,
    props.me,
  );

  const Wrapper = isDetail ? React.Fragment : Link;
  const wrapperProps = isDetail ? {} : { href: `/post/${post.id}` };

  const { author } = post;

  return (
    <Card mt='10px' mb='10px' flexDirection='column'>
      <Wrapper {...wrapperProps}>
        <CardContent>
          <PostHeader user={author} />
          <Text mt='10px'>{post.content}</Text>
        </CardContent>
      </Wrapper>
      <CardActions>
        <PostLikeButton post={post} />
      </CardActions>
      <PostCommentComposer post={post} me={me} />
      <PostComments post={post} />
    </Card>
  );
};

export default Post;
