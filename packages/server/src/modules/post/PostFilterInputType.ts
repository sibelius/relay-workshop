import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE , getObjectId } from '@entria/graphql-mongo-helpers';


export const postFilterMapping = {
  author: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const PostFilterInputType = new GraphQLInputObjectType({
  name: 'PostFilter',
  description: 'Used to filter posts',
  fields: () => ({
    author: {
      type: GraphQLID,
    },
  }),
});

export default PostFilterInputType;
