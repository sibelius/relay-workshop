import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

import { getObjectId } from "@entria/graphql-mongo-helpers";

export const commentFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const CommentFilterInputType = new GraphQLInputObjectType({
  name: 'CommentFilter',
  description: 'Used to filter comments',
  fields: () => ({
    user: {
      type: GraphQLID,
    },
    post: {
      type: GraphQLID,
    },
    comment: {
      type: GraphQLID,
    },
  }),
});

export default CommentFilterInputType;
