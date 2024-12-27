import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister.ts';

import { type GraphQLContext } from '../../graphql/types.ts';
import UserType from '../user/UserType.ts';
import * as UserLoader from '../user/UserLoader.ts';

import LikeModel from '../like/LikeModel.ts';
import CommentModel from '../comment/CommentModel.ts';
import * as CommentLoader from '../comment/CommentLoader.ts';
import { CommentConnection } from '../comment/CommentType.ts';

import { type IPost } from './PostModel.ts';
import { load } from './PostLoader.ts';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...objectIdResolver,
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author),
    },
    likesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: post => LikeModel.countDocuments({ post: post._id }),
    },
    commentsCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: post => CommentModel.countDocuments({ post: post._id }),
    },
    comments: {
      type: new GraphQLNonNull(CommentConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (post, args, context) =>
        await CommentLoader.loadAll(context, withFilter(args, { post: post._id })),
    },
    meHasLiked: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'whether logged user liked this post',
      resolve: async (post, _, context) => {
        if (!context.user) {
          return false;
        }

        return (await LikeModel.countDocuments({ post: post._id, user: context.user._id })) > 0;
      },
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
