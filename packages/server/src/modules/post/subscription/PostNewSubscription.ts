import { subscriptionWithClientId } from 'graphql-relay-subscription';

import PostType from '../PostType';
import pubSub, { EVENTS } from '../../../pubSub';
import * as PostLoader from '../PostLoader';
import { GraphQLContext } from '../../../graphql/types';

type PostNew = {
  postId: string;
};
const PostNewSubscription = subscriptionWithClientId<PostNew, GraphQLContext>({
  name: 'PostNew',
  inputFields: {},
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }: any, _, context) => await PostLoader.load(context, id),
    },
  },
  subscribe: (input, context) => {
    // eslint-disable-next-line
    console.log('Subscribe PostNewSubscription: ', input, context);

    return pubSub.asyncIterator(EVENTS.POST.NEW);
  },
  getPayload: (obj: PostNew) => {
    return {
      id: obj.postId,
    };
  },
});

export default PostNewSubscription;
