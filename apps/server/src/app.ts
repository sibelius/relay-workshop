import 'isomorphic-fetch';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from 'kcors';
//import { graphqlHTTP, OptionsData } from 'koa-graphql';
import bodyParser from 'koa-bodyparser';
//import { GraphQLError } from 'graphql';
import koaPlayground from 'graphql-playground-middleware-koa';

import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';

import { schema } from './schema/schema';
import { getUser } from './auth';
import { getContext } from './getContext';

const router = new Router();

const app = new Koa();

app.use(bodyParser());

app.on('error', err => {
  // eslint-disable-next-line
  console.log('app error: ', err);
});

app.use(logger());
app.use(cors());

router.get('/', async ctx => {
  ctx.body = 'Welcome to Relay Workshop';
});

export const setCookie = (context: Context) => (cookieName: string, token: string) => {
  // const domain = null;
  //
  // const secure = process.env.NODE_ENV !== 'development';
  // const sameSite = 'None'; // Lax | None
  //
  // const options = {
  //   httpOnly: true,
  //   overwrite: true,
  //   maxAge,
  //   secure,
  //   domain,
  //   signed: false,
  //   sameSite,
  // };

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    path: '/',
  };

  context.cookies.set(cookieName, token, options);
};

/*
const graphqlSettingsPerReq = async (req: Request, ctx, koaContext) => {
  const { user } = await getUser(req.header.authorization);

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: await getContext({
      req,
      user,
      koaContext,
      setCookie: setCookie(koaContext),
    }),
    formatError: (error: GraphQLError) => {
      // eslint-disable-next-line
      console.log(error.message);
      // eslint-disable-next-line
      console.log(error.locations);
      // eslint-disable-next-line
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  } as OptionsData;
};
*/

//const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

//router.all('/graphql', graphqlServer);
router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: '/subscriptions',
    // subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }),
);

router.all('/graphql', async ctx => {
  const { user } = await getUser(ctx.header.authorization);
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

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
          setCookie: setCookie(ctx),
        });
      },
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
