import React from 'react'
import { loadQuery } from 'react-relay';

import { RouteObject } from 'react-router-dom';

import { Environment } from './relay';


import AppQuery from './__generated__/AppQuery.graphql'
import PostDetailQuery from './components/feed/post/__generated__/PostDetailQuery.graphql'

import App from './App.tsx';
import PostDetail from './components/feed/post/PostDetail.tsx';


export const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/',
    loader: () => {

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
