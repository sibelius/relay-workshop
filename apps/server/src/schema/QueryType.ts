import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { connectionArgs } from '@entria/graphql-mongo-helpers';

import { nodesField, nodeField } from '../modules/node/typeRegister';
import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import { PostConnection } from '../modules/post/PostType';
import * as PostLoader from '../modules/post/PostLoader';

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
