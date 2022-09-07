import { NextApiRequest, NextApiResponse } from "next";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { schema, getContext } from "@workshop/server";
import connectMongoDB from '../../connectMongoDB';

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
        endpoint: "/api/graphql",
      })
    );
    return;
  }

  // Extract the GraphQL parameters from the request
  const { operationName, query, variables } = getGraphQLParameters(request);

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
      });
    },
  });

  if (result.type === "RESPONSE") {
    // We set the provided status and headers and just the send the payload back to the client
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status);
    res.json(result.payload);
    return;
  }
};

export default connectMongoDB(graphqlHandler);
