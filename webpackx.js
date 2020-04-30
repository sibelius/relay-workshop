import path from 'path';
import { spawn } from 'child_process';

import webpack from 'webpack';

import config, { outputPath, outputFilename } from './webpack/webpack.config';

const compilerRunPromise = compiler =>
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

const runProgram = () => {
  const outputFile = path.join(outputPath, outputFilename);

  const program = spawn(process.execPath, [outputFile], {
    std: 'inherit',
    shell: true,
  });

  program.stdout.setEncoding('utf8');
  program.stdout.on('data', data => {
    // eslint-disable-next-line
    console.log(data);
  });

  program.stderr.setEncoding('utf8');
  program.stderr.on('data', data => {
    // eslint-disable-next-line
    console.log(data);
  });

  program.on('exit', code => {
    process.exit(code);
  });
};

(async () => {
  try {
    const wpConfig = {
      ...config,
      entry: path.join(__dirname, process.argv[2]),
    };

    const compiler = webpack(wpConfig);

    const stats = await compilerRunPromise(compiler);

    // eslint-disable-next-line
    console.log(stats.toString());

    runProgram();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
})();
