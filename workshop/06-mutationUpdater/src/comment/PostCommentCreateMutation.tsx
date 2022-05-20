/* eslint-disable */
// eslint-disable-next-line
import { graphql } from 'react-relay';
import { SelectorStoreUpdater, RecordSourceSelectorProxy } from 'relay-runtime';

// eslint-disable-next-line import/no-unresolved
import { PostCommentCreateInput } from './__generated__/PostCommentCreateMutation.graphql';
// eslint-disable-next-line import/no-unresolved
import { PostCommentComposer_me } from './__generated__/PostCommentComposer_me.graphql';

export const PostCommentCreate = graphql`
  mutation PostCommentCreateMutation($input: PostCommentCreateInput!) {
    PostCommentCreate(input: $input) {
      success
      error
      post {
        commentsCount
      }
      commentEdge {
        node {
          id
          body
          user {
            id
            name
          }
        }
      }
    }
  }
`;

/**
 * TODO
 * finish Post Comment updater
 * the updater should add the new comment edge to the PostComments connection
 */
export const updater =
  (parentId: string): SelectorStoreUpdater =>
  (store: RecordSourceSelectorProxy) => {};

let tempID = 0;

/**
 * TODO
 * Create an optimistic updater to PostComment mutation
 * the optimistic updater should create a new comment with the correct text and author
 */
export const optimisticUpdater =
  (input: PostCommentCreateInput, me: PostCommentComposer_me) =>
  (
    // eslint-disable-next-line
    store: RecordSourceSelectorProxy,
  ) => {
    // eslint-disable-next-line
    const id = 'client:newComment:' + tempID++;
  };
