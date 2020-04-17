// eslint-disable-next-line
import { mongooseLoader } from '@entria/graphql-mongoose-loader';
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import { Model, Types } from 'mongoose';

import { buildMongoConditionsFromFilters } from '@entria/graphql-mongo-helpers';

// import { validateContextUser } from './validateContextUser';
import { withConnectionCursor } from './withConnectionCursor';

const defaultViewerCanSee = (context, data) => data;

type DataLoaderKey = string | Types.ObjectId;

type CreateLoaderArgs<Context> = {
  model: Model<any>;
  viewerCanSee?: (context: Context, any) => Promise<object>;
  loaderName: string;
  filterMapping?: object;
};
export const createLoader = <Context extends object>({
  model,
  viewerCanSee = defaultViewerCanSee,
  loaderName,
  filterMapping = {},
}: CreateLoaderArgs<Context>) => {
  class Loader {
    constructor(data: any) {
      // TODO - improve this - get only model paths
      // eslint-disable-next-line
      Object.keys(data).map(key => {
        this[key] = data[key];
      });
      this.id = data.id || data._id;
    }
  }

  const nameIt = (name, cls) => ({ [name]: class extends cls {} }[name]);

  const Wrapper = nameIt(model.collection.collectionName, Loader);

  const getLoader = () => new DataLoader(ids => mongooseLoader(model, ids));

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

      return filteredData ? new Wrapper(filteredData) : null;
    } catch (err) {
      return null;
    }
  };

  const clearCache = ({ dataloaders }: Context, id: string) => dataloaders[loaderName].clear(id.toString());

  // disable validate to simpify workshop
  // const loadAll = validateContextUser(
  const loadAll = withConnectionCursor(model, load, (context: Context, args: ConnectionArguments) => {
    const builtMongoConditions = buildMongoConditionsFromFilters(context, args.filters, filterMapping);

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
    Wrapper,
    getLoader,
    clearCache,
    load,
    loadAll,
  };
};
