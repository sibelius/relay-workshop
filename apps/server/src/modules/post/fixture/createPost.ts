import { getCounter, getOrCreate } from "../../../../test";
import type { DeepPartial } from '../../../../test/deepPartial.ts';
import User from '../../user/UserModel.ts';
import { createUser } from '../../user/fixture/createUser.ts';
import Post, { type IPost } from '../PostModel.ts';

export const createPost = async (args: DeepPartial<IPost> = {}) => {
    const i = getCounter("post");

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
