import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField, getObjectId } from '@entria/graphql-mongo-helpers';

import CommentModel from '../../comment/CommentModel';

import * as CommentLoader from '../../comment/CommentLoader';

import { GraphQLContext } from '../../../graphql/types';
import CommentType from '../../comment/CommentType';

import LikeModel from '../LikeModel';

type Args = {
  comment: string;
};
const mutation = mutationWithClientMutationId({
  name: 'CommentUnLike',
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

    if (!hasLiked) {
      return {
        id: comment._id,
        error: 'You have not liked this comment yet',
      };
    }

    await hasLiked.deleteOne({
      _id: hasLiked._id,
    });

    return {
      id: comment._id,
      error: null,
      success: 'Comment unliked',
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
