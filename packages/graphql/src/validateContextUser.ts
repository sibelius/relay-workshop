import { NullConnection } from './NullConnection';

export const validateContextUser = (f: (...params: any[]) => void) => (...params: any[]) => {
  const [context] = params;
  if (!context.user) {
    return NullConnection;
  }

  return f(...params);
};
