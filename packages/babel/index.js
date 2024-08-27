module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-flow',
  ],
  plugins: [
    'relay',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    // '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-async-generator-functions',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    // TODO - this break server tests
    // 'react-refresh/babel',
  ],
};
