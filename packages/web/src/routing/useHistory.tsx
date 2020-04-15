import { useRoutingContext } from './RoutingContext';

export const useHistory = () => {
  const routing = useRoutingContext();

  return routing.history;
};
