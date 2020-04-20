import { createMemoryHistory } from 'history';

import React, { Suspense } from 'react';
import '@testing-library/jest-dom/extend-expect';

import { RoutingContext, createRouter } from '@workshop/route';

import ErrorBoundary from '../src/ErrorBoundary';
import { Environment } from '../src/relay';
import Providers from '../src/Providers';
import { Route } from '../src/routes';

type WithProviders = {
  environment: typeof Environment;
  Component: React.ComponentType;
  initialEntries: string[];
  routes: Route;
};
export const withProviders = ({ environment = Environment, Component, initialEntries, routes }: WithProviders) => {
  const router = createRouter(
    routes,
    createMemoryHistory({
      initialEntries,
      initialIndex: 0,
    }),
  );

  return props => {
    // TODO - make RouterRenderer work
    return (
      <RoutingContext.Provider value={router.context}>
        <Providers environment={environment}>
          <ErrorBoundary>
            <Suspense fallback={'Loading fallback...'}>
              <Component {...props} />
              {/*<RouterRenderer />*/}
            </Suspense>
          </ErrorBoundary>
        </Providers>
      </RoutingContext.Provider>
    );
  };
};
