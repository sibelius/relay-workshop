import { GraphQLString } from 'graphql';

export const errorField = {
  error: {
    type: GraphQLString,
    // TODO check if this resolver is actually needed. graphqljs defaults to something along these lines
    resolve: ({ error }: { error: string }) => error,
  },
};
