import { useEffect } from 'react';
import { graphql, readInlineData } from 'react-relay';

import { useRouter } from 'next/router';

import { useAuth_user } from './__generated__/useAuth_user.graphql';

const useAuthFragment = graphql`
  fragment useAuth_user on User @inline {
    id
    name
  }
`;

export const useAuth = (userRef: useAuth_user) => {
  const router = useRouter();

  const user = readInlineData<useAuth_user>(useAuthFragment, userRef);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  });

  return isAuthenticated;
};
