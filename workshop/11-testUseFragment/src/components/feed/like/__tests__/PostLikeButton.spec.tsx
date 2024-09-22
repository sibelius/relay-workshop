import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// eslint-disable-next-line
import {
	type PreloadedQuery,
	graphql,
	loadQuery,
	usePreloadedQuery,
} from "react-relay";
// eslint-disable-next-line
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils";

// eslint-disable-next-line
import type { OperationType } from "relay-runtime";
import PostLikeButton from "../PostLikeButton";

import {
	type WithProviders,
	withProviders,
} from "../../../../../test/withProviders";

// eslint-disable-next-line import/no-unresolved
import PostLikeButtonSpecQuery from "./__generated__/PostLikeButtonSpecQuery.graphql";

type RootProps = Pick<WithProviders, "environment"> & {
	preloadedQuery: PreloadedQuery<OperationType>;
};

// eslint-disable-next-line
// biome-ignore lint/suspicious/noExportsInTest: <explanation>
export const getRoot = ({ preloadedQuery, environment }: RootProps) => {
	const UseQueryWrapper = () => {
		/**
		 * TODO
		 * add usePreloadQuery of a test operation
		 */
		const data = {
			post: {},
		};

		return <PostLikeButton post={data.post} />;
	};

	return withProviders({
		Component: UseQueryWrapper,
		environment,
	});
};

it("should render post like button and likes count", async () => {
	const environment = createMockEnvironment();
	// eslint-disable-next-line

	const postId = "postId";
	// eslint-disable-next-line
	const variables = {
		id: postId,
	};

	/**
	 * TODO
	 * properly mock resolvers
	 */
	const customMockResolvers = {};

	/**
	 * TODO
	 * queue a pending operation, this would be a preloadQuery call
	 */

	/**
	 * TODO
	 * mock a queued operation
	 */

	/**
	 * TODO
	 * preloadQuery test GraphQL operation
	 */
	const preloadedQuery = {};

	const Root = getRoot({
		preloadedQuery,
		environment,
	});

	const { debug, findByText } = render(<Root />);

	expect(await findByText("10")).toBeTruthy();

	debug();
});

it("should non-render post likesCount if is equal zero", async () => {
	/**
	 * TODO
	 * build a likesCount test is zero
	 */
});
