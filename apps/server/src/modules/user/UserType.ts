import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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

import { PostConnection } from '../post/PostType.ts';
import * as PostLoader from '../post/PostLoader.ts';

import { CommentConnection } from '../comment/CommentType.ts';
import * as CommentLoader from '../comment/CommentLoader.ts';

import { type IUser } from './UserModel.ts';
import { load } from './UserLoader.ts';

const UserType = new GraphQLObjectType<IUser, GraphQLContext>({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        await PostLoader.loadAll(
          context,
          withFilter(args, {
            author: user._id,
          }),
        ),
    },
    comments: {
      type: new GraphQLNonNull(CommentConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args, context) =>
        await CommentLoader.loadAll(context, withFilter(args, { user: user._id })),
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
