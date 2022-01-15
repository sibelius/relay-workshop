import { Variables } from 'react-relay';
import { RequestParameters, UploadableMap, CacheConfig } from 'relay-runtime';

export const isMutation = (request: RequestParameters) => request.operationKind === 'mutation';
export const isQuery = (request: RequestParameters) => request.operationKind === 'query';
export const forceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);

export const handleData = (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return response.text();
};

function getRequestBodyWithUploadables(request: RequestParameters, variables: Variables, uploadables: UploadableMap) {
  const formData = new FormData();
  formData.append('name', request.name);
  formData.append('query', request.text!);
  formData.append('variables', JSON.stringify(variables));

  Object.keys(uploadables).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });

  return formData;
}

function getRequestBodyWithoutUplodables(request: RequestParameters, variables: Variables) {
  return JSON.stringify({
    name: request.name, // used by graphql mock on tests
    query: request.text, // GraphQL text from input
    variables,
  });
}

export function getRequestBody(request: RequestParameters, variables: Variables, uploadables?: UploadableMap) {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }

  return getRequestBodyWithoutUplodables(request, variables);
}

export const getHeaders = (uploadables?: UploadableMap) => {
  if (uploadables) {
    return {
      Accept: '*/*',
    };
  }

  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
  };
};
