import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode';
import { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes';

import config from '../config';

// read from localstorage or cookie
const getToken = () => {
  /**
   * TODO
   * use your user token
   */
  return 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWZlMjkwY2YyMzdhNDdlZDgyZDcxYyIsImlhdCI6MTcyNDcyNjgwN30.G2sfYPtfWM34Vs5Z0N2Nu_1l_Jmlu8p3Pt-sMXDdxGc';
};

export const fetchGraphQL = async (request: RequestParameters, variables: Variables) => {
  const authorization = getToken();

  const response = await fetch(config.GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  const data = await response.json();

  return data;
};
