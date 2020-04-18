import React, { useContext } from 'react';

import { RoutingContextType } from './createRouter';

const RoutingContext = React.createContext(null);

/**
 * A custom context instance for our router type
 */
export default RoutingContext;

export const useRoutingContext = (): RoutingContextType => {
  const routing = useContext<RoutingContextType>(RoutingContext);

  return routing;
};
