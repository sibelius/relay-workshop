import path from 'path';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const ENV = process.env;

export const config = {
  MONGO_URI: ENV.MONGO_URI || 'mongodb://localhost/reacteurope',
  PORT: ENV.PORT || 7500,
  JWT_SECRET: ENV.JWT_KEY || 'secret_key',
};
