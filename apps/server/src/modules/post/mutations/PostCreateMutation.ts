import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';

import PostModel from '../PostModel';

import * as PostLoader from '../PostLoader';
import { PostConnection } from '../PostType';

import { type GraphQLContext } from '../../../graphql/types';
import pubSub, { EVENTS } from '../../../pubSub';

type Args = {
  content: string;
};
const mutation = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { content } = args;

    // TODO - move this check to a middleware
    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }

    const post = await new PostModel({
      content,
      author: context.user._id,
    }).save();

    await pubSub.publish(EVENTS.POST.NEW, { postId: post._id });

    return {
      id: post._id,
      error: null,
    };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const post = await PostLoader.load(context, id);

        // Returns null if no node was loaded
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;

// TODO enable middleware
// export default {
//   ...mutation,
//   authenticatedOnly: true,
// };
