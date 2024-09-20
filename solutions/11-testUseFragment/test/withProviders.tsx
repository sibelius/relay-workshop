import React, { Suspense } from 'react';

// eslint-disable-next-line import/namespace
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';

import ErrorBoundary from '../src/ErrorBoundaryRetry';
import Providers from '../src/Providers';

import {routes as defaultRoutes}  from '../src/routes'

export type WithProviders = {
  Component: () => React.JSX.Element
  environment: RelayMockEnvironment;
  initialEntries?: string[];
  routes?: RouteObject[];
};
export const withProviders = ({
  Component,
  environment,
  initialEntries = ['/'],
  routes,
}: WithProviders) => {
  const testRoutes = routes;

  const router = createMemoryRouter(testRoutes || defaultRoutes, {
    initialEntries,
    initialIndex: 0,
  })

  return () => {
    // TODO - make RouterRenderer work
    return (
      <Providers environment={environment as unknown as RelayModernEnvironment}>
        <ErrorBoundary>
          <Suspense fallback={'Loading fallback...'}>
            <Component />
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </Providers>
    );
  };
};
