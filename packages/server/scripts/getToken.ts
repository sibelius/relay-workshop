import { connectDatabase } from '../src/database';
import { generateToken } from '../src/auth';

import { getOrCreateRelayUser } from './getOrCreateRelayUser';

(async () => {
  await connectDatabase();

  const user = await getOrCreateRelayUser();

  // eslint-disable-next-line
  console.log({
    token: generateToken(user),
  });

  process.exit(0);
})();
