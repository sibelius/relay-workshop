import React, { Suspense } from 'react';

import Providers from './Providers.tsx';
import App from './App.tsx';
import Loading from './Loading.tsx';
import ErrorBoundaryRetry from './ErrorBoundaryRetry.tsx';

const Root = () => {
  return (
    <Providers>
      <ErrorBoundaryRetry>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ErrorBoundaryRetry>
    </Providers>
  );
};

export default Root;
