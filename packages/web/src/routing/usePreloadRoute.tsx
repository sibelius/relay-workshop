import { useCallback } from 'react';

import { useRoutingContext } from './RoutingContext';

export const usePreloadRoute = (to: string) => {
  const router = useRoutingContext();

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    router.preloadCode(to);
  }, [to, router]);

  // Callback to preload the code and data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  const preloadRoute = useCallback(() => {
    router.preload(to);
  }, [to, router]);

  return [preloadRouteCode, preloadRoute];
};
