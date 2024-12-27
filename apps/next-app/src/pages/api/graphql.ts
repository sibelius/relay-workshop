import { NextApiRequest, NextApiResponse } from 'next';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { schema, getContext, getUser } from '@workshop/server';

import { serialize } from 'cookie';

import connectMongoDB from '../../connectMongoDB.ts';
import { config } from '../../config.tsx';

export const setCookie = (res: NextApiResponse) => (cookieName: string, token: string) => {
  res.setHeader(
    'Set-Cookie',
    serialize(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
    }),
  );
}

export const graphqlHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const request: any = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: '/api/graphql',
      }),
    );
    return;
  }

  // Extract the GraphQL parameters from the request
  const { operationName, query, variables } = getGraphQLParameters(request);

  const { user } = await getUser(req.cookies[config.WORKSHOP_COOKIE]);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: () => {
      return getContext({
        req: request,
        user,
        setCookie: setCookie(res),
      });
    },
  });

  if (result.type === 'RESPONSE') {
    // We set the provided status and headers and just the send the payload back to the client
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status);
    res.json(result.payload);
    return;
  }
};

export default connectMongoDB(graphqlHandler);
