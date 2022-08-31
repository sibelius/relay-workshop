import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  POST: {
    NEW: 'POST_NEW',
  },
};

export default new PubSub();
