import '@testing-library/jest-dom';
import '@testing-library/react/cleanup-after-each';

window.scrollTo = () => {};

jest.mock('../src/relay/Environment', () => {
  // eslint-disable-next-line
  // const { createMockEnvironment } = require('relay-test-utils');

  const { createMockEnvironment } = require('./RelayModernMockEnvironment');

  return createMockEnvironment();
});

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
});
