import { subscriptionWithClientId } from 'graphql-relay-subscription';

import PostType from '../PostType';
import pubSub, { EVENTS } from '../../../pubSub';
import * as PostLoader from '../PostLoader';

type PostNew = {
  postId: string;
};
const PostNewSubscription = subscriptionWithClientId({
  name: 'PostNew',
  inputFields: {},
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }, _, context) => await PostLoader.load(context, id),
    },
  },
  subscribe: (input, context) => {
    // eslint-disable-next-line
    console.log('Subscribe PostNewSubscription: ', input, context);

    return pubSub.asyncIterator(EVENTS.POST.NEW);
  },
  getPayload: async (obj: PostNew) => {
    return {
      id: obj.postId,
    };
  },
});

export default PostNewSubscription;
