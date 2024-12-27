import { ConcreteRequest, Variables } from 'relay-runtime';
import { GetServerSidePropsContext } from 'next/types';

import { networkFetch } from './environment.tsx';

const getRequestEsm = (request: ConcreteRequest) => {
  if (request.default) {
    return request.default;
  }

  return request;
}

export async function getPreloadedQuery(
  request: ConcreteRequest,
  variables: Variables,
  ctx: GetServerSidePropsContext<any>,
) {
  const safeRequest = getRequestEsm(request);

  const headers = {
    Cookie: ctx.req.headers.cookie,
  }

  const response = await networkFetch(safeRequest.params, variables, headers);
  return {
    params: safeRequest.params,
    variables,
    response,
  };
}
