import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { Card, TextArea, CardActions } from '@workshop/ui';

import { useMutation } from 'react-relay';

import { PostCreate, updater } from './PostCreateMutation';
import { PostCreateMutation } from './__generated__/PostCreateMutation.graphql';

const PostComposer = () => {
  const [content, setContent] = useState<string>('');

  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);

  const onSubmit = () => {
    const config = {
      variables: {
        input: {
          content,
        },
      },
      updater,
      onCompleted: () => {
        setContent('');
      },
    };

    postCreate(config);
  };

  const isDisabled = content.length <= 3 || isPending;

  return (
    <Card mb='10px' flexDirection='column'>
      <CardContent>
        <TextArea label="What's happening" value={content} onChange={e => setContent(e.target.value)} />
      </CardContent>
      <CardActions justifyContent='flex-end'>
        <Button variant='contained' color='primary' onClick={onSubmit} disabled={isDisabled}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostComposer;
