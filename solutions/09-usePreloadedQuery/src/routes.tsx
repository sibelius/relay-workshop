import React from "react";
import { loadQuery } from "react-relay";

import type { RouteObject } from "react-router-dom";

import { AppQuery } from "./__generated__/AppQuery.graphql";
import { PostDetailQuery } from "./__generated__/AppQuery.graphql";

import App from './App.tsx';
import PostDetail from './components/feed/post/PostDetail.tsx';

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
