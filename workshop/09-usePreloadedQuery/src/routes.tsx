import React from "react";
import { loadQuery } from "react-relay";

import type { RouteObject } from "react-router-dom";

import { AppQuery } from "./__generated__/AppQuery.graphql";
import { PostDetailQuery } from "./__generated__/AppQuery.graphql";

import App from "./App";
import PostDetail from "./components/feed/post/PostDetail";

// eslint-disable-next-line
import { Environment } from "./relay";

export const routes: RouteObject[] = [
	{
		element: <App />,
		path: "/",
		loader: () => {
			return {
				appQuery: loadQuery(
					Environment,
					AppQuery,
					{},
					{
						fetchPolicy: "network-only",
					},
				),
			};
			/**
			 * TODO
			 * add preloadQuery to start fetching before component has mounted
			 */
		},
	},
	{
		path: "/post/:id",
		element: <PostDetail />,
		loader: ({ request, params, context }) => {
			return {
				postDetailQuery: loadQuery(
					Environment,
					PostDetailQuery,
					{
						id: params.id,
					},
					{
						fetchPolicy: "store-or-network",
					},
				),
			};
		},
	},
];
