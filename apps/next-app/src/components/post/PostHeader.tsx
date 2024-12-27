import React from 'react';
import { useFragment , graphql } from 'react-relay';

import { Text, Flex } from 'rebass';

import UserAvatar from '../UserAvatar.tsx';

import { PostHeader_user$key } from './__generated__/PostHeader_user.graphql';

export const getInitials = (name: string) => {
  return name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(namePart => namePart.charAt(0))
        .join('')
    : 'AN';
};

type Props = {
  user: PostHeader_user$key;
};
const PostHeader = (props: Props) => {
  const user = useFragment<PostHeader_user$key>(
    graphql`
      fragment PostHeader_user on User {
        id
        name
        ...UserAvatar_user
      }
    `,
    props.user,
  );

  return (
    <Flex alignItems='center'>
      <UserAvatar user={user} />
      <Text ml='5px'>posted in your Workshop</Text>
    </Flex>
  );
};

export default PostHeader;
