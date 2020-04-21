import { GraphQLString } from 'graphql';

export const successField = {
  success: {
    type: GraphQLString,
    resolve: ({ success }) => success,
  },
};
