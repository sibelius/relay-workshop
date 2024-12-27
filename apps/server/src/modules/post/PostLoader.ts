import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister.ts';

import PostModel from './PostModel.ts';
import { postFilterMapping } from './PostFilterInputType.ts';

const {
  Wrapper: Post,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
  filterMapping: postFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Post;

registerLoader('PostLoader', getLoader);
