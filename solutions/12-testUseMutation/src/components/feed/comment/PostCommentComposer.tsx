import React, { useState } from 'react';
import { useFragment , graphql , useMutation } from 'react-relay';

import { Flex } from 'rebass';

import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import Divider from '@mui/material/Divider';


import { TextFieldMaterial } from '@workshop/ui';

import UserAvatar from '../UserAvatar.tsx';

import { PostCommentComposer_post$key } from './__generated__/PostCommentComposer_post.graphql';

import { PostCommentCreateMutation } from './__generated__/PostCommentCreateMutation.graphql';
import { PostCommentCreate, updater, optimisticUpdater } from './PostCommentCreateMutation.tsx';
import { PostCommentComposer_me$key } from './__generated__/PostCommentComposer_me.graphql';

type Props = {
  post: PostCommentComposer_post$key;
  me: PostCommentComposer_me$key;
};
const PostCommentComposer = (props: Props) => {
  const post = useFragment<PostCommentComposer_post$key>(
    graphql`
      fragment PostCommentComposer_post on Post {
        id
        author {
          ...UserAvatar_user
        }
      }
    `,
    props.post,
  );

  const me = useFragment<PostCommentComposer_me$key>(
    graphql`
      fragment PostCommentComposer_me on User {
        id
        name
      }
    `,
    props.me,
  );

  const [body, setBody] = useState<string>('');

  const [postCommentCreate, isPending] = useMutation<PostCommentCreateMutation>(PostCommentCreate);

  const handleNewComment = () => {
    const input = {
      post: post.id,
      body,
    };

    const config = {
      variables: {
        input,
      },
      updater: updater(post.id),
      optimisticUpdater: optimisticUpdater(input, me),
      onCompleted: () => {
        setBody('');
      },
    };

    postCommentCreate(config);
  };

  const isDisabled = body.length < 1 || isPending;

  return (
    <>
      <Divider />
      <Flex flex={1} p='16px'>
        <UserAvatar showName={false} user={post.author} />
        <TextFieldMaterial
          ml='10px'
          flexGrow={1}
          variant='outlined'
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <IconButton onClick={handleNewComment} disabled={isDisabled}>
          <SendIcon />
        </IconButton>
      </Flex>
    </>
  );
};

export default PostCommentComposer;
