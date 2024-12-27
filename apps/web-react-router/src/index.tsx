import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';

import App from './App.tsx';
import { routes } from './routes.tsx';
import Feed from './components/feed/Feed.tsx';
import { getPreloadedQuery } from './relay/getPreloadedQuery.tsx';
import FeedQuery from './components/feed/__generated__/FeedQuery.graphql';
import Providers from './Providers.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async ({ request, params, context }) => {
      console.log('loader: ', {
        request,
        params,
        context,
      });

      return {
        feedQuery: await getPreloadedQuery(FeedQuery, {}),
      };
    },
    element: <Feed />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
]);


createRoot(document.getElementById('root')).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
