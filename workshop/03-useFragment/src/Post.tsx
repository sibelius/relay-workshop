import React from 'react';
import { Text } from 'rebass';
import { Card } from '@workshop/ui';

/**
 * TODO
 * useFragment to let Post declare its data requirement
 */

// eslint-disable-next-line
const Post = props => {
  return (
    <Card mt='10px' flexDirection='column' p='10px'>
      <Text>id: {post.id}</Text>
      <Text>content: {post.content}</Text>
    </Card>
  );
};

export default Post;
