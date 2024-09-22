import { graphql } from "react-relay";
import {
	ConnectionHandler,
	ROOT_ID,
	type RecordSourceSelectorProxy,
} from "relay-runtime";

import { connectionUpdater } from "react-relay";

export const PostNew = graphql`
  subscription PostNewSubscription($input: PostNewInput!) {
    PostNew(input: $input) {
      post {
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
`;

export const updater = (store: RecordSourceSelectorProxy) => {
	const postNode = store.getRootField("PostNew").getLinkedRecord("post");

	const postId = postNode.getValue("id");

	const postStore = store.get(postId);

	// avoid mutation + subscription update
	if (!postStore) {
		const postConnection = ConnectionHandler.getConnection(
			store.getRoot(),
			"Feed_posts",
		);

		// create user edge
		const postEdge = ConnectionHandler.createEdge(
			store,
			postConnection,
			postNode,
			"PostEdge",
		);

		connectionUpdater({
			store,
			parentId: ROOT_ID,
			connectionName: "Feed_posts",
			edge: postEdge,
			before: true,
		});
	}
};
