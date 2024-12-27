import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { connectionArgs } from '@entria/graphql-mongo-helpers';

import { nodesField, nodeField } from '../modules/node/typeRegister.ts';
import UserType from '../modules/user/UserType.ts';
import * as UserLoader from '../modules/user/UserLoader.ts';
import { PostConnection } from '../modules/post/PostType.ts';
import * as PostLoader from '../modules/post/PostLoader.ts';

import pkg from '../../package.json';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: (root, args, context) => UserLoader.load(context, context.user?._id),
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await PostLoader.loadAll(context, args),
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => pkg.version,
    },
  }),
});

export default QueryType;
