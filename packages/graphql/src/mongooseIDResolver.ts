import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Types } from 'mongoose';

type MongooseModel = {
  _id: Types.ObjectId;
};

export const mongooseIDResolver = {
  _id: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'mongoose _id',
    resolve: ({ _id }: MongooseModel) => _id.toString(),
  },
};
