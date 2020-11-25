import 'isomorphic-fetch';
import React from 'react';
import { unstable_createRoot } from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import RelayEnvironment from './relay/Environment';

import App from './App';

unstable_createRoot(document.getElementById('root') as HTMLElement).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <App />
  </RelayEnvironmentProvider>,
);
