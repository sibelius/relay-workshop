import { createLoader } from '../../graphql/createLoader';

import { registerLoader } from '../loader/loaderRegister';

import UserModel from './UserModel';

const { Wrapper: User, getLoader, clearCache, load, loadAll } = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
});

export { getLoader, clearCache, load, loadAll };
export default User;

registerLoader('UserLoader', getLoader);
