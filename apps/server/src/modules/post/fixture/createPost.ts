import { getCounter, getOrCreate } from "../../../../test";
import type { DeepPartial } from "../../../../test/deepPartial";
import User from "../../user/UserModel";
import { createUser } from "../../user/fixture/createUser";
import Post, { type IPost } from "../PostModel";

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
