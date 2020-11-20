import path from 'path';
import { spawn, ChildProcess } from 'child_process';
import webpack, { Compiler, Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const cwd = process.cwd();

export const outputPath = path.join(cwd, '.webpack');
export const outputFilename = 'bundle.js';

const config: Configuration = {
  context: cwd,
  mode: 'development',
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: outputPath,
    filename: outputFilename,
  },
  target: 'node',
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
      allowlist: [/@workshop/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
        exclude: [/node_modules/, path.resolve(__dirname, '.serverless'), path.resolve(__dirname, '.webpack')],
      },
    ],
  },
  plugins: [],
  node: {
    global: false,
    __dirname: false,
    __filename: false,
  },
};

const compilerRunPromise = (compiler: Compiler) =>
  new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats && stats.hasErrors()) {
        reject(err || stats.toString());
      }

      resolve(stats);
    });
  });

export function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Exit with error code: ${code}`));
      }
    });
    childProcess.once('error', (err: Error) => {
      reject(err);
    });
  });
}

const runProgram = async () => {
  const outputFile = path.join(outputPath, outputFilename);
  const execArgs = process.argv.slice(3);

  const childProcess = spawn(process.execPath, [outputFile, ...execArgs], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });

  await onExit(childProcess);
};

(async () => {
  try {
    const compiler = webpack(config, () => path.join(__dirname, process.argv[2]));

    await compilerRunPromise(compiler);

    await runProgram();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
})();
