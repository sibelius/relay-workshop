import { GraphQLString } from 'graphql';

export const successField = {
  success: {
    type: GraphQLString,
    // TODO check if this resolver is actually needed. graphqljs defaults to something along these lines
    resolve: ({ success }: { success: string }) => success,
  },
};
