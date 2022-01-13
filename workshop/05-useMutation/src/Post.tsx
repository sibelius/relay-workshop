import React, { useCallback } from 'react';
import { useFragment, graphql } from 'react-relay';
import { Text } from 'rebass';
import { Card, CardActions, theme } from '@workshop/ui';
import FavoriteIcon from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material';
import IconButton from '@mui/material';

import { Post_post, Post_post$key } from './__generated__/Post_post.graphql';

type Props = {
  post: Post_post;
};
const Post = (props: Props) => {
  const post = useFragment<Post_post$key>(
    graphql`
      fragment Post_post on Post {
        id
        content
        author {
          name
        }
        meHasLiked
        likesCount
      }
    `,
    props.post,
  );

  /**
   * TODO
   * useMutation from @workshop/relay
   */

  const Icon = post.meHasLiked ? FavoriteIcon : FavoriteBorderIcon;

  const handleLike = useCallback(() => {
    // eslint-disable-next-line
    const config = {
      variables: {
        input: {
          post: post.id,
        },
      },
      /**
       * TODO
       * add optimistic update to mutation config
       */
    };

    /**
     * TODO
     * call post like mutation
     */
  }, [post]);

  return (
    <Card mt='10px' flexDirection='column' p='10px'>
      <Text>id: {post.id}</Text>
      <Text>content: {post.content}</Text>
      <Text>Author: {post.author.name}</Text>
      <CardActions>
        <IconButton onClick={handleLike}>
          <Icon style={{ color: theme.relayDark }} />
        </IconButton>
        {post.likesCount > 0 ? <Text>{post.likesCount}</Text> : null}
      </CardActions>
    </Card>
  );
};

export default Post;
