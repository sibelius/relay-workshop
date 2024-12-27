import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField, getObjectId } from '@entria/graphql-mongo-helpers';

import CommentModel from '../../comment/CommentModel.ts';

import * as CommentLoader from '../../comment/CommentLoader.ts';

import { type GraphQLContext } from '../../../graphql/types.ts';
import CommentType from '../../comment/CommentType.ts';

import LikeModel from '../LikeModel.ts';

type Args = {
  comment: string;
};
const mutation = mutationWithClientMutationId({
  name: 'CommentLike',
  inputFields: {
    comment: {
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

    const comment = await CommentModel.findOne({
      _id: getObjectId(args.comment),
    });

    if (!comment) {
      return {
        error: 'comment not found',
      };
    }

    const hasLiked = await LikeModel.findOne({
      comment: comment._id,
      user: context.user._id,
    });

    if (hasLiked) {
      return {
        id: comment._id,
        success: 'Comment already liked',
      };
    }

    await new LikeModel({
      comment,
      user: context.user._id,
    }).save();

    return {
      id: comment._id,
      error: null,
      success: 'Comment liked',
    };
  },
  outputFields: {
    comment: {
      type: CommentType,
      resolve: async ({ id }, _, context) => {
        return await CommentLoader.load(context, id);
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
