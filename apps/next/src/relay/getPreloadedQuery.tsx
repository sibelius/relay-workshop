import { networkFetch } from './network';
import { ConcreteRequest, Variables } from 'relay-runtime';

const getRequestEsm = (request: ConcreteRequest) => {
  if (request.default) {
    return request.default;
  }

  return request;
}

export async function getPreloadedQuery(
  request: ConcreteRequest,
  variables: Variables
) {
  const safeRequest = getRequestEsm(request);

  const response = await networkFetch(safeRequest.params, variables);
  return {
    params: safeRequest.params,
    variables,
    response,
  };
}
