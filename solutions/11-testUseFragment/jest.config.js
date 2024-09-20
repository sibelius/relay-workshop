const pkg = require('./package');

module.exports = {
  name: pkg.name,
  displayName: pkg.name,
  testPathIgnorePatterns: ['/node_modules/', './dist', './scripts', '__generated__'],
  coverageReporters: ['lcov', 'html'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(j|t)sx?$',
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
  collectCoverageFrom: ['src/**/*.tsx'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  setupFiles: ['<rootDir>/test/polyfill.js'],
  rootDir: './',
};
