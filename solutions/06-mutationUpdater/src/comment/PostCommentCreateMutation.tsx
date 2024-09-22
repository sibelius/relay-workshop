import { graphql } from "react-relay";
import {
	ConnectionHandler,
	type RecordSourceSelectorProxy,
	type SelectorStoreUpdater,
} from "relay-runtime";

import { connectionUpdater } from "react-relay";

import type { PostCommentComposer_me } from "./__generated__/PostCommentComposer_me.graphql";
import type { PostCommentCreateInput } from "./__generated__/PostCommentCreateMutation.graphql";

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

export const updater =
	(parentId: string): SelectorStoreUpdater =>
	(store: RecordSourceSelectorProxy) => {
		const newEdge = store
			.getRootField("PostCommentCreate")
			.getLinkedRecord("commentEdge");

		connectionUpdater({
			store,
			parentId,
			connectionName: "PostComments_comments",
			edge: newEdge,
			before: true,
		});
	};

let tempID = 0;

export const optimisticUpdater =
	(input: PostCommentCreateInput, me: PostCommentComposer_me) =>
	(store: RecordSourceSelectorProxy) => {
		const id = "client:newComment:" + tempID++;

		const node = store.create(id, "Comment");

		const meProxy = store.get(me.id);

		node.setValue(id, "id");
		node.setValue(input.body, "body");
		node.setLinkedRecord(meProxy, "user");

		const newEdge = store.create("client:newEdge:" + tempID++, "CommentEdge");
		newEdge.setLinkedRecord(node, "node");

		const parentProxy = store.get(input.post);
		const conn = ConnectionHandler.getConnection(
			parentProxy,
			"PostComments_comments",
		);
		ConnectionHandler.insertEdgeBefore(conn, newEdge);
	};
