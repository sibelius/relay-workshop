import React from 'react';

// eslint-disable-next-line import/namespace
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes';

import Providers from './Providers';

// const router = createRouter(routes, createBrowserHistory());
const router = createBrowserRouter(routes)

const Root = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default Root;
