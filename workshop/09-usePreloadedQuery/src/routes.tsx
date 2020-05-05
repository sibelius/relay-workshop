// eslint-disable-next-line
import { preloadQuery } from 'react-relay/hooks';

import { JSResource } from '@workshop/route';

// eslint-disable-next-line
import { Environment } from './relay';

export const routes = [
  {
    component: JSResource('App', () => import('./App')),
    path: '/',
    exact: true,
    prepare: () => {
      /**
       * TODO
       * add preloadQuery to start fetching before component has mounted
       */
    },
  },
  {
    path: '/post/:id',
    exact: true,
    component: JSResource('PostDetail', () => import('./components/feed/post/PostDetail')),
    // eslint-disable-next-line
    prepare: (params: { id: string }) => {
      /**
       * TODO
       * add preloadQuery to start fetching before component has mounted
       * use params as query variables
       */
    },
  },
];
