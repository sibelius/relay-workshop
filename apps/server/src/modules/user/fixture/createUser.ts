import User, { type IUser } from '../UserModel.ts';
import { getCounter } from '../../../../test';
import { type DeepPartial } from '../../../../test/deepPartial.ts';

export const createUser = (args: DeepPartial<IUser> = {}) => {
  const i = getCounter('user');

  return new User({
    name: `user#${i}`,
    email: `user${i}@example.com`,
    ...args,
  }).save();
};
