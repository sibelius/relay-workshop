import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

import { connectionArgs } from '@workshop/graphql';

import { nodesField, nodeField } from '../modules/node/typeRegister';
import UserType from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import { PostConnection } from '../modules/post/PostType';
import * as PostLoader from '../modules/post/PostLoader';

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
      type: GraphQLNonNull(PostConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await PostLoader.loadAll(context, args),
    },
    searchPosts: {
      type: GraphQLList(GraphQLNonNull(GraphQLString)),
      args: {
        query: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: () => [],
    },
  }),
});

export default QueryType;
