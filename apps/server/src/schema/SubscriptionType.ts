import { GraphQLObjectType } from 'graphql';

import PostNew from '../modules/post/subscription/PostNewSubscription.ts';

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    PostNew: PostNew as any,
  },
});

export default SubscriptionType;
