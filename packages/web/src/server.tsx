import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import logger from 'koa-logger';
import { renderToString } from 'react-dom/server';

import App from './App';
import createRouter from './routing/createRouter';
import { routes } from './routes';
import { getMockHistory } from './routing/getMockHistory';
import RoutingContext from './routing/RoutingContext';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

console.log('process.env.RAZZLE_PUBLIC_DIR: ', process.env.RAZZLE_PUBLIC_DIR);

// Initialize `koa-router` and setup a route listening on `GET /*`
// Logic has been splitted into two chained middleware functions
// @see https://github.com/alexmingoia/koa-router#multiple-middleware
const router = new Router();
router.get(
  '/*',
  (ctx, next) => {
    const context = {};

    const serverHistory = getMockHistory({ context, location: ctx.url });
    const router = createRouter(routes, serverHistory);

    const markup = renderToString(
      <RoutingContext.Provider value={router.context}>
        <App />
      </RoutingContext.Provider>,
    );

    ctx.state.markup = markup;

    return context.url ? ctx.redirect(context.url) : next();
  },
  ctx => {
    ctx.status = 200;
    ctx.body = `
    <!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>React Europe Relay Workshop</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${ctx.state.markup}</div>
      </body>
    </html>`;

    console.log('body: ', ctx.body);
  },
);

// Intialize and configure Koa application
const server = new Koa();
server
  .use(logger())
  // `koa-helmet` provides security headers to help prevent common, well known attacks
  // @see https://helmetjs.github.io/
  .use(helmet())
  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  .use(serve(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods());

server.on('error', err => {
  // eslint-disable-next-line no-console
  console.error('Error while answering request', err);
});

export default server;
