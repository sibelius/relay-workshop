import { graphql } from 'react-relay';

export const PostUnLike = graphql`
  mutation PostUnLikeMutation($input: PostUnLikeInput!) {
    PostUnLike(input: $input) {
      success
      error
      post {
        meHasLiked
        likesCount
      }
    }
  }
`;

export const unlikeOptimisticResponse = post => ({
  PostUnLike: {
    success: '',
    error: null,
    post: {
      id: post.id,
      meHasLiked: false,
      likesCount: post.likesCount - 1,
    },
  },
});
