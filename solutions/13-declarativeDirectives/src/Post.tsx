/* eslint-disable relay/generated-flow-types */
import React, { useCallback } from 'react';
import { useFragment, graphql, useMutation, ConnectionHandler } from 'react-relay';
import { Text } from 'rebass';
import { Card, CardActions, theme, Button } from '@workshop/ui';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

//import { useMutation } from 'react-relay';

import { ROOT_ID } from 'relay-runtime';

import { likeOptimisticResponse, PostLike } from './PostLikeMutation';
import { unlikeOptimisticResponse, PostUnLike } from './PostUnLikeMutation';
import { PostLikeMutation } from './__generated__/PostLikeMutation.graphql';
import { PostUnLikeMutation } from './__generated__/PostUnLikeMutation.graphql';
import { Post_post, Post_post$key } from './__generated__/Post_post.graphql';
import { PostDeleteMutation } from './PostDeleteMutation';

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

  const globalPostId = post.id
  const [deletePostCommit, isDeletingPost] = useMutation(PostDeleteMutation)

  const [postLike] = useMutation<PostLikeMutation>(PostLike);
  const [postUnLike] = useMutation<PostUnLikeMutation>(PostUnLike);

  const Icon = post.meHasLiked ? FavoriteIcon : FavoriteBorderIcon;

  /**
   * TODO
   * Consume your deleteMutation here  */

  function deletePost() {
    /**
     * TODO
     * create a function to delete a post given its globalId and the posts connection.
     */
    const feedPostsConnectionId = ConnectionHandler.getConnectionID(ROOT_ID, 'Feed_posts')

    console.log(feedPostsConnectionId)

    if (!feedPostsConnectionId) throw new Error('Connection Feed_posts not found')
    deletePostCommit({
      variables: {
        input: {
          postId: globalPostId,
        },
        connections: [feedPostsConnectionId],
      },
    })
  }

  const handleLike = useCallback(() => {
    const config = {
      variables: {
        input: {
          post: post.id,
        },
      },
      optimisticResponse: post.meHasLiked ? unlikeOptimisticResponse(post) : likeOptimisticResponse(post),
    };

    const mutationFn = post.meHasLiked ? postUnLike : postLike;

    mutationFn(config);
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

        <Button onClick={deletePost}>{isDeletingPost ? 'Deleting...' : 'Delete Post'}</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
