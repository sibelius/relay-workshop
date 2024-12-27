import User, { type IUser } from '../UserModel';
import { getCounter } from '../../../../test';
import { type DeepPartial } from '../../../../test/deepPartial';

export const createUser = (args: DeepPartial<IUser> = {}) => {
  const i = getCounter('user');

  return new User({
    name: `user#${i}`,
    email: `user${i}@example.com`,
    ...args,
  }).save();
};
