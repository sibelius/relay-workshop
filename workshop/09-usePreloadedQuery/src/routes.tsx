import React from "react";
import { loadQuery } from "react-relay";

import type { RouteObject } from "react-router-dom";

import App from "./App";
import PostDetail from "./components/feed/post/PostDetail";

// eslint-disable-next-line
import { Environment } from "./relay";

export const routes: RouteObject[] = [
	{
		element: <App />,
		path: "/",
		loader: () => {
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
			/**
			 * TODO
			 * add preloadQuery to start fetching before component has mounted
			 * use params as query variables
			 */
		},
	},
];
