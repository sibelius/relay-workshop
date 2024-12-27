import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes.tsx';

import Providers from './Providers.tsx';

const router = createBrowserRouter(routes)

const Root = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default Root;
