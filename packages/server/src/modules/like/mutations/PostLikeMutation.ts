import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField, getObjectId } from '@workshop/graphql';

import PostModel from '../../post/PostModel';

import * as PostLoader from '../../post/PostLoader';

import { GraphQLContext } from '../../../graphql/types';
import PostType from '../../post/PostType';

import LikeModel from '../LikeModel';

type Args = {
  post: string;
};
const mutation = mutationWithClientMutationId({
  name: 'PostLike',
  inputFields: {
    post: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const post = await PostModel.findOne({
      _id: getObjectId(args.post),
    });

    if (!post) {
      return {
        error: 'post not found',
      };
    }

    const hasLiked = await LikeModel.findOne({
      post: post._id,
      user: context.user._id,
    });

    if (hasLiked) {
      return {
        id: post._id,
        success: 'Post already liked',
      };
    }

    await new LikeModel({
      post,
      user: context.user._id,
    }).save();

    return {
      id: post._id,
      error: null,
      success: 'Post liked',
    };
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }, _, context) => {
        return await PostLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;

// TODO enable middleware
// export default {
//   ...mutation,
//   authenticatedOnly: true,
// };
