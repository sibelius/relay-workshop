import { connectDatabase } from '../src/database';
import Post from '../src/modules/post/PostModel';

import { getOrCreateRelayUser } from './getOrCreateRelayUser';

const N = 10;

(async () => {
  await connectDatabase();

  const user = await getOrCreateRelayUser();
  const total = await Post.countDocuments();

  const arr = Array.from(Array(N).keys());

  for (const i of arr) {
    const n = total + i + 1;

    await new Post({
      content: `content#${n}`,
      author: user,
    }).save();
  }

  // eslint-disable-next-line
  console.log(`${N} posts created`);

  process.exit(0);
})();
