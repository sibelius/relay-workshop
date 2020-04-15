import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionArgs, connectionDefinitions } from '../../graphql/connectionDefinitions';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { mongooseIDResolver } from '../../graphql/mongooseIDResolver';

import { GraphQLContext } from '../../graphql/types';
import UserType from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { timestamps } from '../../graphql/timestampResolvers';
import LikeModel from '../like/LikeModel';
import CommentModel from '../comment/CommentModel';
import * as CommentLoader from '../comment/CommentLoader';
import { CommentConnection } from '../comment/CommentType';

import { withFilter } from '../../graphql/withFilter';

import { IPost } from './PostModel';
import { load } from './PostLoader';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: globalIdField('Post'),
    ...mongooseIDResolver,
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => UserLoader.load(context, post.author),
    },
    likesCount: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: post => LikeModel.countDocuments({ post: post._id }),
    },
    commentsCount: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: post => CommentModel.countDocuments({ post: post._id }),
    },
    comments: {
      type: GraphQLNonNull(CommentConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (post, args, context) =>
        await CommentLoader.loadAll(context, withFilter(args, { post: post._id })),
    },
    meHasLiked: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'whether logged user liked this post',
      resolve: async (post, _, context) => {
        if (!context.user) {
          return false;
        }

        return (await LikeModel.countDocuments({ post: post._id, user: context.user._id })) > 0;
      },
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});

export default PostType;

registerTypeLoader(PostType, load);

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});
