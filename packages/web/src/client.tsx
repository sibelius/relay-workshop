import React from 'react';
// eslint-disable-next-line
import { hydrate, createRoot } from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import RoutingContext from './routing/RoutingContext';
import createRouter from './routing/createRouter';
import { routes } from './routes';

// hydrate(
//   <App />,
//   document.getElementById('root')
// );

// Uses the custom router setup to define a router instanace that we can pass through context
const router = createRouter(routes, createBrowserHistory());

createRoot(document.getElementById('root')).render(
  <RoutingContext.Provider value={router.context}>
    <App />
  </RoutingContext.Provider>,
);

// if (module.hot) {
//   module.hot.accept();
// }
