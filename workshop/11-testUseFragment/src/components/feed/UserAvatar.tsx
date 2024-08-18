import React from 'react';

import { useFragment , graphql } from 'react-relay';

import { Text, Flex } from 'rebass';
import Avatar from '@mui/material/Avatar';

import { theme } from '@workshop/ui';

import { UserAvatar_user$key } from './__generated__/UserAvatar_user.graphql';

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
  showName: boolean;
  user: UserAvatar_user$key;
};
const UserAvatar = (props: Props) => {
  const { showName = true } = props;

  const user = useFragment<UserAvatar_user$key>(
    graphql`
      fragment UserAvatar_user on User {
        id
        name
      }
    `,
    props.user,
  );

  const initials = getInitials(user.name);

  return (
    <Flex alignItems='center'>
      <Avatar>{initials}</Avatar>
      {showName && (
        <Text ml='10px' fontWeight='600' color={theme.relayDark}>
          {user.name}
        </Text>
      )}
    </Flex>
  );
};

export default UserAvatar;
