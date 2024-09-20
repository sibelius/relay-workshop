import React from 'react';
import { RouteObject } from 'react-router-dom';
import { loadQuery } from 'react-relay';

import { Environment } from './relay';

import AppQuery from './__generated__/AppQuery.graphql'

import PostDetailQuery from './components/feed/post/__generated__/PostDetailQuery.graphql'

import PostDetail from './components/feed/post/PostDetail'
import App from './App'

export const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/',
    loader: ({ params }) => {
      return {
        appQuery: loadQuery(
          Environment,
          AppQuery,
          {},
          {
            fetchPolicy: 'network-only',
          },
        ),
      };
    },
  },
  {
    path: '/post/:id',
    element: <PostDetail />,
    loader: ({ params }) => {

      return {
        postDetailQuery: loadQuery(
          Environment,
          PostDetailQuery,
          {
            id: params.id,
          },
          {
            fetchPolicy: 'store-or-network',
          },
        ),
      };
    },
  },
];
