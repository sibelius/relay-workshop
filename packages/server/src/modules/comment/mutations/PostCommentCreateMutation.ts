import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, successField, getObjectId } from '@workshop/graphql';

import PostModel from '../../post/PostModel';

import * as PostLoader from '../../post/PostLoader';
import PostType from '../../post/PostType';

import { GraphQLContext } from '../../../graphql/types';

import CommentModel from '../CommentModel';
import * as CommentLoader from '../CommentLoader';
import { CommentConnection } from '../CommentType';

type Args = {
  post: string;
  body: string;
};
const mutation = mutationWithClientMutationId({
  name: 'PostCommentCreate',
  inputFields: {
    post: {
      type: new GraphQLNonNull(GraphQLID),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
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

    const comment = await new CommentModel({
      user: context.user._id,
      post,
      body: args.body,
    }).save();

    return {
      id: comment._id,
      post: post._id,
      error: null,
    };
  },
  outputFields: {
    commentEdge: {
      type: CommentConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const comment = await CommentLoader.load(context, id);

        // Returns null if no node was loaded
        if (!comment) {
          return null;
        }

        return {
          cursor: toGlobalId('Comment', comment._id),
          node: comment,
        };
      },
    },
    post: {
      type: PostType,
      resolve: async ({ post }, _, context) => {
        return await PostLoader.load(context, post);
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
