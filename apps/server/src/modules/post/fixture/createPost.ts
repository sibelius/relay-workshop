import { getCounter, getOrCreate } from '../../../../test';
import { DeepPartial } from '../../../../test/deepPartial';
import Post, { IPost } from '../PostModel';
import User from '../../user/UserModel';
import { createUser } from '../../user/fixture/createUser';

export const createPost = async (args: DeepPartial<IPost> = {}) => {
  const i = getCounter('post');

  let { author, ...rest } = args;

  if (!author) {
    author = await getOrCreate(User, createUser);
  }

  return new Post({
    content: `content#${i}`,
    author,
    ...rest,
  }).save();
};
