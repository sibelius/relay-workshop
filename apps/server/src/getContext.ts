import { Request, Context } from 'koa';

import { setCookie } from '@workshop/next/src/pages/api/graphql';

import { IUser } from './modules/user/UserModel';
import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';

type ContextVars = {
  user?: IUser | null;
  req?: Request;
  koaContext: Context;
  setCookie: (cookieName: string, token: string) => void;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getDataloaders();

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
    koaContext: ctx.koaContext,
    setCookie: ctx.setCookie,
  } as GraphQLContext;
};
