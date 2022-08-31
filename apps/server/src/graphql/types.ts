import mongoose from 'mongoose';

import { DataLoaders } from '../modules/loader/loaderRegister';
import { IUser } from '../modules/user/UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
  dataloaders: DataLoaders;
};

export type LoaderFn = (ctx: GraphQLContext, id: string | ObjectId | object) => any;
