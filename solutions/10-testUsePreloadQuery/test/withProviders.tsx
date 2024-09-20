import React, { Suspense } from 'react';

// eslint-disable-next-line import/namespace
import { createBrowserRouter, createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

import ErrorBoundary from '../src/ErrorBoundaryRetry';
import Providers from '../src/Providers';
import App from '../src/App';
import Loading from '../src/Loading';
import { RelayMockEnvironment } from 'relay-test-utils/lib/RelayModernMockEnvironment';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';


type WithProviders = {
  environment: RelayMockEnvironment;
  initialEntries: string[];
  routes: RouteObject[];
};
export const withProviders = ({
  environment,
  initialEntries = ['/'],
  routes,
}: WithProviders) => {
  const testRoutes = routes;

  const router = createMemoryRouter(testRoutes, {
    initialEntries,
    initialIndex: 0,
  })

  return (props) => {
    // TODO - make RouterRenderer work
    return (
      <Providers environment={environment as unknown as RelayModernEnvironment}>
        <ErrorBoundary>
          <Suspense fallback={'Loading fallback...'}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </Providers>
    );
  };
};
