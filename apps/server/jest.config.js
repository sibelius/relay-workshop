const pack = require('./package.json');

const jestTransformer = () => {
  if (process.env.JEST_TRANSFORMER === 'babel-barrel') {
    // eslint-disable-next-line
    console.log('babel-barrel');

    return {
      '^.+\\.(js|ts|tsx)?$': require.resolve('./babelBarrel'),
    }
  }

  // eslint-disable-next-line
  console.log('babel-jest');

  return {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  };
};

module.exports = {
  displayName: pack.name,
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTestFramework.js'],
  resetModules: false,
  reporters: ['default', 'jest-junit'],
  transform: {
    ...jestTransformer(),
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
};
