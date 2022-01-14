import {
  GraphQLBoolean,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  ThunkObjMap,
  resolveObjMapThunk,
} from 'graphql';

export const forwardConnectionArgs: GraphQLFieldConfigArgumentMap = {
  after: {
    type: GraphQLString,
  },
  first: {
    type: GraphQLInt,
  },
};

export const backwardConnectionArgs: GraphQLFieldConfigArgumentMap = {
  before: {
    type: GraphQLString,
  },
  last: {
    type: GraphQLInt,
  },
};

export const connectionArgs: GraphQLFieldConfigArgumentMap = {
  ...forwardConnectionArgs,
  ...backwardConnectionArgs,
};

type ConnectionConfig = {
  name?: string | null;
  nodeType: GraphQLObjectType;
  resolveNode?: GraphQLFieldResolver<any, any> | null;
  resolveCursor?: GraphQLFieldResolver<any, any> | null;
  edgeFields?: ThunkObjMap<GraphQLFieldConfig<any, any>> | null;
  connectionFields?: ThunkObjMap<GraphQLFieldConfig<any, any>> | null;
};

export type GraphQLConnectionDefinitions = {
  edgeType: GraphQLObjectType;
  connectionType: GraphQLObjectType;
};

const pageInfoType = new GraphQLObjectType({
  name: 'PageInfoExtended',
  description: 'Information about pagination in a connection.',
  fields: () => ({
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating forwards, are there more items?',
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paginating backwards, are there more items?',
    },
    startCursor: {
      type: GraphQLString,
      description: 'When paginating backwards, the cursor to continue.',
    },
    endCursor: {
      type: GraphQLString,
      description: 'When paginating forwards, the cursor to continue.',
    },
  }),
});

export function connectionDefinitions(config: ConnectionConfig): GraphQLConnectionDefinitions {
  const { nodeType, resolveCursor, resolveNode } = config;
  const name = config.name || nodeType.name;
  const edgeFields = config.edgeFields || {};
  const connectionFields = config.connectionFields || {};

  const edgeType = new GraphQLObjectType({
    name: `${name}Edge`,
    description: 'An edge in a connection.',
    fields: () => ({
      node: {
        type: nodeType,
        resolve: resolveNode,
        description: 'The item at the end of the edge',
      },
      cursor: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: resolveCursor,
        description: 'A cursor for use in pagination',
      },
      ...(resolveObjMapThunk(edgeFields) as any),
    }),
  });

  const connectionType = new GraphQLObjectType({
    name: `${name}Connection`,
    description: 'A connection to a list of items.',
    fields: () => ({
      count: {
        type: GraphQLInt,
        description: 'Number of items in this connection',
      },
      totalCount: {
        type: GraphQLInt,
        resolve: connection => connection.count,
        description: `A count of the total number of objects in this connection, ignoring pagination.
  This allows a client to fetch the first five objects by passing "5" as the
  argument to "first", then fetch the total count so it could display "5 of 83",
  for example.`,
      },
      startCursorOffset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Offset from start',
      },
      endCursorOffset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'Offset till end',
      },
      pageInfo: {
        type: new GraphQLNonNull(pageInfoType),
        description: 'Information to aid in pagination.',
      },
      edges: {
        type: new GraphQLNonNull(new GraphQLList(edgeType)),
        description: 'A list of edges.',
      },
      ...(resolveObjMapThunk(connectionFields) as any),
    }),
  });

  return { edgeType, connectionType };
}
