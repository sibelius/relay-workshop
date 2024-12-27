import { GraphQLSchema } from 'graphql';

import QueryType from './QueryType.ts';
import MutationType from './MutationType.ts';
import SubscriptionType from './SubscriptionType.ts';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});
