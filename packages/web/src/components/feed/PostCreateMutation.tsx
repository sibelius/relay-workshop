import { graphql } from 'react-relay';
import { SelectorStoreUpdater, ROOT_ID } from 'relay-runtime';

import { connectionUpdater } from '@workshop/relay';

export const PostCreate = graphql`
  mutation PostCreateMutation($input: PostCreateInput!) {
    PostCreate(input: $input) {
      success
      error
      postEdge {
        node {
          id
          content
          author {
            id
            name
          }
          meHasLiked
          likesCount
          ...PostComments_post
        }
      }
    }
  }
`;

export const updater: SelectorStoreUpdater = store => {
  const newEdge = store.getRootField('PostCreate').getLinkedRecord('postEdge');

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'Feed_posts',
    edge: newEdge,
    before: true,
  });
};
