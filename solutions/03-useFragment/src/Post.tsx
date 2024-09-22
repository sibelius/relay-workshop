import { Card } from "@workshop/ui";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { Text } from "rebass";

import type { Post_post$key } from "./__generated__/Post_post.graphql";

const Post = (props) => {
	const post = useFragment<Post_post$key>(
		graphql`
      fragment Post_post on Post {
        id
        content
        author {
          name
        }
      }
    `,
		props.post,
	);

	return (
		<Card mt="10px" flexDirection="column" p="10px">
			<Text>id: {post.id}</Text>
			<Text>content: {post.content}</Text>
			<Text>Author: {post.author.name}</Text>
		</Card>
	);
};

export default Post;
