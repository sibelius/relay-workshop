import { GraphQLObjectType } from 'graphql';

import PostNew from '../modules/post/subscription/PostNewSubscription';

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    PostNew,
  },
});

export default SubscriptionType;
