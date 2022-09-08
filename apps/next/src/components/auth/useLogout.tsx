import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    router.push('/auth/login');
  }, [router]);

  return [logout];
};
