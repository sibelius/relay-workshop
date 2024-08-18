import React, { useTransition } from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { Flex, Text } from 'rebass';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { theme } from '@workshop/ui';

import UserAvatar from './UserAvatar';

import { PostComments_post$key } from './__generated__/PostComments_post.graphql';
import { PostCommentsRefetchQuery } from './__generated__/PostCommentsRefetchQuery.graphql';

type Props = {
  post: PostComments_post$key;
};
const PostComments = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const [post, refetch] = useRefetchableFragment<PostCommentsRefetchQuery, _>(
    graphql`
      fragment PostComments_post on Post
      @argumentDefinitions(first: { type: Int, defaultValue: 1 }, after: { type: String })
      @refetchable(queryName: "PostCommentsRefetchQuery") {
        id
        comments(first: $first, after: $after) @connection(key: "PostComments_comments", filters: []) {
          endCursorOffset
          startCursorOffset
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              body
              user {
                id
                name
                ...UserAvatar_user
              }
            }
          }
        }
      }
    `,
    props.post,
  );

  const { comments } = post;
  const { edges, pageInfo } = comments;

  if (edges.length === 0) {
    return null;
  }

  const loadMore = () => {
    startTransition(() => {
      const after = pageInfo.endCursor;

      const variables = {
        id: post.id,
        first: 1,
        after,
      };

      refetch(variables, { fetchPolicy: 'store-or-network' });
    });
  };

  const isDisabled = !pageInfo.hasNextPage;

  return (
    <Flex flex={1} p='16px' flexDirection='column'>
      {post.comments.edges.map(({ node }) => {
        return (
          <Flex mt='10px' key={node.id}>
            <UserAvatar showName={false} user={node.user} />
            <Flex backgroundColor='#F2F3F5' borderRadius={10} p='10px' ml='10px'>
              <Text fontWeight='600px' color={theme.relayDark}>
                {node.user.name}
              </Text>
              <Text ml='10px'>{node.body}</Text>
            </Flex>
          </Flex>
        );
      })}
      {isPending && (
        <Flex mt='10px' justifyContent='center'>
          <CircularProgress />
        </Flex>
      )}
      <Flex flex={1} justifyContent='flex-end' mt='10px'>
        <Button variant='contained' color='primary' onClick={loadMore} disabled={isDisabled}>
          Show older
        </Button>
      </Flex>
    </Flex>
  );
};

export default PostComments;
