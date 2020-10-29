// eslint-disable-next-line
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import { Model, Types, Document } from 'mongoose';

import { buildMongoConditionsFromFilters, GraphQLFilter } from '@entria/graphql-mongo-helpers';

// import { validateContextUser } from './validateContextUser';
import { withConnectionCursor } from './withConnectionCursor';

const defaultViewerCanSee = <Value extends Document>(context: BaseContext<string, Value>, data: Value): Value => data;

export type DataLoaderKey = string | Types.ObjectId;

export interface BaseContext<LoaderName extends string, Value extends Document> {
  dataloaders: Record<LoaderName, DataLoader<string, Value>>;
}

export type CreateLoaderArgs<
  Context extends BaseContext<LoaderName, Value>,
  LoaderName extends string,
  Value extends Document
> = {
  model: Model<Value>;
  viewerCanSee?: (context: Context, data: Value) => Value | Promise<Value>;
  loaderName: LoaderName;
  filterMapping?: object;
};

export interface FilteredConnectionArguments extends ConnectionArguments {
  filters: GraphQLFilter | null;
}

export const createLoader = <
  Context extends BaseContext<LoaderName, Value>,
  LoaderName extends string,
  Value extends Document
>({
  model,
  viewerCanSee = defaultViewerCanSee,
  loaderName,
  filterMapping = {},
}: CreateLoaderArgs<Context, LoaderName, Value>) => {
  class Loader {
    [key: string]: any;
    constructor(data: Value) {
      // TODO - improve this - get only model paths
      // eslint-disable-next-line
      Object.keys(data).map(key => {
        this[key] = (data as any)[key];
      });
      this.id = data.id || data._id;
    }
  }

  const nameIt = (name: string, cls: typeof Loader): typeof Loader => ({ [name]: class extends cls {} }[name]);

  const Wrapper = nameIt(model.collection.collectionName, Loader);

  const getLoader = () => new DataLoader<string, Value>(ids => mongooseLoader(model, ids));

  const load = async (context: Context, id: DataLoaderKey) => {
    if (!id) {
      return null;
    }

    try {
      const data = await context.dataloaders[loaderName].load(id.toString());

      if (!data) {
        return null;
      }

      const filteredData = await viewerCanSee(context, data);

      return filteredData ? (new Wrapper(filteredData) as Value) : null;
    } catch (err) {
      return null;
    }
  };

  const clearCache = ({ dataloaders }: Context, id: string) => dataloaders[loaderName].clear(id.toString());

  // disable validate to simpify workshop
  // const loadAll = validateContextUser(
  const loadAll = withConnectionCursor(model, load, (context: Context, args: FilteredConnectionArguments) => {
    const builtMongoConditions = buildMongoConditionsFromFilters(context, args.filters, filterMapping as any);

    const conditions = {
      ...builtMongoConditions.conditions,
    };

    const sort = {
      createdAt: -1,
    };

    return {
      conditions,
      sort,
    };
  });

  return {
    Wrapper: Wrapper as {
      new (value: Value): Value;
    },
    getLoader,
    clearCache,
    load,
    loadAll,
  };
};
