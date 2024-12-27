import { RequestParameters, Variables, UploadableMap } from 'relay-runtime';

import config from '../config.tsx';

import { getToken } from '../components/auth/security.tsx';

import { handleData, getRequestBody, getHeaders, isMutation } from './helpers.tsx';
import fetchWithRetries from './fetchWithRetries.tsx';

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = async (request: RequestParameters, variables: Variables, uploadables: UploadableMap) => {
  try {
    const body = getRequestBody(request, variables, uploadables);

    const authorization = getToken();

    const headers = {
      ...getHeaders(uploadables),
      authorization,
    };

    const isMutationOperation = isMutation(request);

    const fetchFn = isMutationOperation ? fetch : fetchWithRetries;

    // uncomment to see optimistic update working
    // const fetchFn = fetchWithRetries;

    const response = await fetchFn(config.GRAPHQL_URL, {
      method: 'POST',
      headers,
      body,
      fetchTimeout: 20000,
      retryDelays: [1000, 3000, 5000],
    });

    const data = await handleData(response);

    if (response.status === 401) {
      throw data.errors;
    }

    if (isMutation(request) && data.errors) {
      throw data;
    }

    if (!data.data) {
      throw data.errors;
    }

    return data;
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);

    const timeoutRegexp = new RegExp(/Still no successful response after/);
    const serverUnavailableRegexp = new RegExp(/Failed to fetch/);
    if (timeoutRegexp.test(err.message) || serverUnavailableRegexp.test(err.message)) {
      throw new Error('Unavailable service. Try again later.');
    }

    throw err;
  }
};

export default fetchQuery;
