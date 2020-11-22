# @workshop/route

Custom routing solution based on relay-examples/issue-tracker

## Motivation

https://github.com/ReactTraining/react-router/pull/7010#issuecomment-547625602

React Router v5 is not "ready" for suspense based routing with preload of code and data.

In fact you can workaround react-router v5 following this approach https://dev.to/sibelius/adding-server-side-rendering-to-a-relay-production-app-30oc, not easy

React Router v6 still not ready, but feel promising, but still misses proper place to preload code and data.

This package provides a minimal set of API similar to react-router, so it would be easy to migrate back to react-router

## Usage

You define a route config, similar to react-router-config (v5) and useRoutes (v6)

```jsx
export const routes = [
  {
      component: JSResource('Root', () => import('./components/feed/Root')),
      path: '/',
      exact: false,
      prepare: () => {
        const RootQuery = require('./components/feed/__generated__/RootQuery.graphql');
  
        return {
          rootQuery: loadQuery(
            Environment,
            RootQuery,
            {},
            {
              fetchPolicy: 'network-only',
            },
          ),
        };
      },
      routes: [
        {
            path: '/post/:id',
            exact: true,
            component: JSResource('PostDetail', () => import('./components/feed/post/PostDetail')),
            prepare: (params: { id: string }) => {
              const PostDetailQuery = require('./components/feed/post/__generated__/PostDetailQuery.graphql');
    
              return {
                postDetailQuery: loadQuery(
                  Environment,
                  PostDetailQuery,
                  {
                    id: params.id,
                  },
                  {
                    fetchPolicy: 'store-or-network',
                  },
                ),
              };
            },
      },
    ],
  },
}
```

- JSResource can preload your code before rendering
- `prepare` will be used to preload data for your route component 
