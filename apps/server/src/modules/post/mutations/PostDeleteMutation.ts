import { GraphQLNonNull, GraphQLID } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { errorField, successField } from '@entria/graphql-mongo-helpers';

import * as PostLoader from '../PostLoader';

import { type GraphQLContext } from '../../../graphql/types';
import PostModel from '../PostModel';

type Args = {
  postId: string;
};
const mutation = mutationWithClientMutationId({
  name: 'PostDelete',
  inputFields: {
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async (args: Args, context: GraphQLContext) => {
    const { postId } = args;

    if (!context.user) {
      return {
        error: 'user not logged',
      };
    }
    const deletedPost = await PostLoader.load(context, fromGlobalId(postId).id);

    if (!deletedPost) {
      return {
        error: 'Post not found',
      };
    }

    await PostModel.deleteOne({
      _id: deletedPost.id,
    });

    return {
      id: deletedPost.id,
      error: null,
    };
  },
  outputFields: {
    postId: {
      type: GraphQLID,
      resolve: async ({ id }, _, context) => {
        const post = await PostLoader.load(context, id);

        if (!post) {
          return null;
        }

        return toGlobalId('Post', post.id);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;
