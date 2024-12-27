import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister.ts';

import CommentModel from './CommentModel.ts';
import { commentFilterMapping } from './CommentFilterInputType.ts';

const {
  Wrapper: Comment,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: CommentModel,
  loaderName: 'CommentLoader',
  filterMapping: commentFilterMapping,
});

export { getLoader, clearCache, load, loadAll };
export default Comment;

registerLoader('CommentLoader', getLoader);
