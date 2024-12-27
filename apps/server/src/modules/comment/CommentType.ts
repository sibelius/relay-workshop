import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions, objectIdResolver, timestampResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister.ts';

import { type GraphQLContext } from '../../graphql/types.ts';
import UserType from '../user/UserType.ts';
import * as UserLoader from '../user/UserLoader.ts';
import * as PostLoader from '../post/PostLoader.ts';

import LikeModel from '../like/LikeModel.ts';
import PostType from '../post/PostType.ts';

import { type IComment } from './CommentModel.ts';
import { load } from './CommentLoader.ts';

const CommentType = new GraphQLObjectType<IComment, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  fields: () => ({
    id: globalIdField('Comment'),
    ...objectIdResolver,
    body: {
      type: GraphQLString,
      resolve: comment => comment.body,
    },
    user: {
      type: UserType,
      resolve: (comment, _, context) => UserLoader.load(context, comment.user),
    },
    post: {
      type: PostType,
      resolve: (comment, _, context) => PostLoader.load(context, comment.post),
    },
    likesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: comment => LikeModel.countDocuments({ comment: comment._id }),
    },
    meHasLiked: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'whether logged user liked this post',
      resolve: async (comment, _, context) => {
        if (!context.user) {
          return false;
        }

        return (await LikeModel.countDocuments({ comment: comment._id, user: context.user._id })) > 0;
      },
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default CommentType;

registerTypeLoader(CommentType, load);

export const CommentConnection = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});
