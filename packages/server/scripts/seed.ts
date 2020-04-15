import { connectDatabase } from '../src/database';
import Post from '../src/modules/post/PostModel';

(async () => {
  await connectDatabase();

  const total = await Post.countDocuments();

  const arr = Array.from(Array(10).keys());

  for (const i of arr) {
    const n = total + i + 1;

    await new Post({
      title: `title#${n}`,
      description: `description#${n}`,
    }).save();
  }

  process.exit(0);
})();
