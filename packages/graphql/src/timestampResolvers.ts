import { GraphQLString } from 'graphql';

interface TimestampedObj {
  updatedAt?: Date | null;
  createdAt?: Date | null;
}

export const timestamps = {
  createdAt: {
    type: GraphQLString,
    resolve: (obj: TimestampedObj) => (obj.createdAt ? obj.createdAt.toISOString() : null),
  },
  updatedAt: {
    type: GraphQLString,
    resolve: (obj: TimestampedObj) => (obj.updatedAt ? obj.updatedAt.toISOString() : null),
  },
};
