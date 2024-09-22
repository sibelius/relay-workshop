import { fireEvent, render, waitFor } from "@testing-library/react";
// import '@testing-library/jest-dom';
import React, { act } from "react";

// eslint-disable-next-line
import {
	type PreloadedQuery,
	graphql,
	loadQuery,
	usePreloadedQuery,
} from "react-relay";
// eslint-disable-next-line
import {
	MockPayloadGenerator,
	MockResolvers,
	createMockEnvironment,
} from "relay-test-utils";

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
		const data = usePreloadedQuery(
			graphql`
      query PostLikeButtonSpecQuery($id: ID!) @relay_test_operation {
        post: node(id: $id) {
          ...PostLikeButton_post
        }
      }
    `,
			preloadedQuery,
		);

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
	// eslint-disable-next-line
	const customMockResolvers = {
		Post: () => ({
			id: variables.id,
			meHasLiked: true,
			likesCount: 10,
		}),
	};

	/**
	 * TODO
	 * queue a pending operation, this would be a preloadQuery call
	 */
	environment.mock.queuePendingOperation(PostLikeButtonSpecQuery, variables);

	/**
	 * TODO
	 * mock a queued operation
	 */
	environment.mock.queueOperationResolver((operation) =>
		MockPayloadGenerator.generate(operation, customMockResolvers),
	);

	/**
	 * TODO
	 * preloadQuery test GraphQL operation
	 */
	const preloadedQuery = loadQuery(
		environment,
		PostLikeButtonSpecQuery,
		variables,
		{ fetchPolicy: "store-or-network" },
	);

	const Root = getRoot({
		preloadedQuery,
		environment,
	});

	// eslint-disable-next-line
	const { debug, getByText, getByTestId } = render(<Root />);

	await waitFor(() => {
		expect(getByText("10")).toBeTruthy();
	});

	debug();

	// it should render likes count
});

it("should non-render post likesCount if is equal zero", async () => {
	const environment = createMockEnvironment();

	const variables = {
		id: "postId",
	};

	const customMockResolvers = {
		Post: () => ({
			id: variables.id,
			likesCount: 0,
			meHasLiked: true,
		}),
	};

	environment.mock.queuePendingOperation(PostLikeButtonSpecQuery, variables);
	environment.mock.queueOperationResolver((operation) =>
		MockPayloadGenerator.generate(operation, customMockResolvers),
	);

	const preloadedQuery = loadQuery(
		environment,
		PostLikeButtonSpecQuery,
		variables,
		{ fetchPolicy: "store-or-network" },
	);

	const Root = getRoot({
		environment,
		preloadedQuery,
	});

	const { debug, queryByText } = render(<Root />);

	expect(queryByText(/[0-9]+/i)).not.toBeInTheDocument();

	debug();
});

it("click in the like button", async () => {
	const environment = createMockEnvironment();

	const variables = {
		id: "postId",
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
		environment,
		preloadedQuery,
	});

	const { debug, getByTestId, findByText } = render(<Root />);

	/**
	 * TODO
	 * Get the likeButton in DOM using the testId
	 */

	const likeButton = {};
	/**
	 * TODO
	 * Click on the like button and assert the variables pass in the mutation operation
	 */

	/**
	 * TODO
	 * Mock a response mutation and assert the new likesCount
	 */

	expect(await findByText("290")).toBeInTheDocument();
	debug();
});
