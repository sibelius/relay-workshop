import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../graphql/connectionDefinitions';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { mongooseIDResolver } from '../../graphql/mongooseIDResolver';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import * as PostLoader from '../post/PostLoader';
import { timestamps } from '../../graphql/timestampResolvers';
import LikeModel from '../like/LikeModel';
import PostType from '../post/PostType';

import { IComment } from './CommentModel';
import { load } from './CommentLoader';

const CommentType = new GraphQLObjectType<IComment, GraphQLContext>({
  name: 'Comment',
  description: 'Comment data',
  fields: () => ({
    id: globalIdField('Comment'),
    ...mongooseIDResolver,
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
      type: GraphQLNonNull(GraphQLInt),
      resolve: comment => LikeModel.countDocuments({ comment: comment._id }),
    },
    meHasLiked: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'whether logged user liked this post',
      resolve: async (comment, _, context) => {
        if (!context.user) {
          return false;
        }

        return (await LikeModel.countDocuments({ comment: comment._id, user: context.user._id })) > 0;
      },
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});

export default CommentType;

registerTypeLoader(CommentType, load);

export const CommentConnection = connectionDefinitions({
  name: 'Comment',
  nodeType: CommentType,
});
