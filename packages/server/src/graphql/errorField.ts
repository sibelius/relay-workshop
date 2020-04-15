import { GraphQLString } from 'graphql';

export const errorField = {
  error: {
    type: GraphQLString,
    resolve: ({ error }) => error,
  },
};
