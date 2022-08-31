import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import PostMutations from '../modules/post/mutations';
import LikeMutations from '../modules/like/mutations';
import CommentMutations from '../modules/comment/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
    ...LikeMutations,
    ...CommentMutations,
  }),
});

export default MutationType;
