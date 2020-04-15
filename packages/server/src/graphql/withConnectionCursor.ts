import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader';
import { Model } from 'mongoose';

import { LoaderFn } from './types';

export const withConnectionCursor = (
  model: Model<any>,
  loader: LoaderFn,
  condFn: (...p: any[]) => { conditions?: object; sort?: object },
) => (...params: any[]) => {
  const { conditions = {}, sort = {} } = condFn(...params);

  const [context, args] = params;

  const cursor = model.find(conditions).sort(sort);

  return connectionFromMongoCursor({
    cursor,
    context,
    args,
    loader,
  });
};
