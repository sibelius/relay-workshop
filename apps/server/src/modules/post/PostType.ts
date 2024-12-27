import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import {
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
  withFilter,
} from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { type GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';

import LikeModel from '../like/LikeModel';
import CommentModel from '../comment/CommentModel';
import * as CommentLoader from '../comment/CommentLoader';
import { CommentConnection } from '../comment/CommentType';

import { type IPost } from './PostModel';
import { load } from './PostLoader';

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
