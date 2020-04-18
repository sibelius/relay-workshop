import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { useFragment } from 'react-relay/hooks';
import IconButton from '@material-ui/core/IconButton';

import { graphql } from 'react-relay';

import { Text } from 'rebass';

import { theme } from '@workshop/ui';

import { useMutation } from '../../../relay';

import { likeOptimisticResponse, PostLike } from './PostLikeMutation';
import { PostUnLike, unlikeOptimisticResponse } from './PostUnLikeMutation';
import { PostLikeMutation } from './__generated__/PostLikeMutation.graphql';
import { PostUnLikeMutation } from './__generated__/PostUnLikeMutation.graphql';
import { PostLikeButton_post$key } from './__generated__/PostLikeButton_post.graphql';

type Props = {
  post: PostLikeButton_post$key;
};
const PostLikeButton = (props: Props) => {
  const post = useFragment<PostLikeButton_post$key>(
    graphql`
      fragment PostLikeButton_post on Post {
        id
        meHasLiked
        likesCount
      }
    `,
    props.post,
  );

  const [postLike] = useMutation<PostLikeMutation>(PostLike);
  const [postUnLike] = useMutation<PostUnLikeMutation>(PostUnLike);

  const Icon = post.meHasLiked ? FavoriteIcon : FavoriteBorderIcon;

  const handleLike = () => {
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
  };

  return (
    <>
      <IconButton onClick={handleLike}>
        <Icon style={{ color: theme.relayDark }} />
      </IconButton>
      {post.likesCount > 0 ? <Text>{post.likesCount}</Text> : null}
    </>
  );
};

export default PostLikeButton;
