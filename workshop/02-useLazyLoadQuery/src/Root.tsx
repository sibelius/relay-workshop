import React from 'react';

import Providers from './Providers';
import App from './App';

const Root = () => {
  /**
   * @TODO
   * Add Suspense to suspend when using useLazyLoadQuery
   * Add ErrorBoundary to catch errors in useLazyLoadQuery
   */

  return (
    <Providers>
      <App />
    </Providers>
  );
};

export default Root;
