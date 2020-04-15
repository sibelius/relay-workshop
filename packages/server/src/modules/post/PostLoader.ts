import { createLoader } from '../../graphql/createLoader';

import { registerLoader } from '../loader/loaderRegister';

import PostModel from './PostModel';
import { postFilterMapping } from './PostFilterInputType';

const { Wrapper: Post, getLoader, clearCache, load, loadAll } = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
  filterMapping: postFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Post;

registerLoader('PostLoader', getLoader);
