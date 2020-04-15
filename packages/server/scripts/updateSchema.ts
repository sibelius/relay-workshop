import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { printSchema } from 'graphql/utilities';

import { schema as schemaGraphql } from '../src/schema/schema';

const writeFileAsync = promisify(fs.writeFile);

(async () => {
  const configs = [
    {
      schema: schemaGraphql,
      path: '../schema',
    },
  ];

  await Promise.all([
    ...configs.map(async config => {
      await writeFileAsync(path.join(__dirname, `${config.path}/schema.graphql`), printSchema(config.schema));
    }),
  ]);

  process.exit(0);
})();
