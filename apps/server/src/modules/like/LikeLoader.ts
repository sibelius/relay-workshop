import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister.ts';

import LikeModel from './LikeModel.ts';
import { likeFilterMapping } from './LikeFilterInputType.ts';

const {
  Wrapper: Like,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: LikeModel,
  loaderName: 'LikeLoader',
  filterMapping: likeFilterMapping,
});

export { getLoader, clearCache, load, loadAll };

export default Like;

registerLoader('LikeLoader', getLoader);
