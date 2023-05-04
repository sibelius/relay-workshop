module.exports = {
  src: './src',
  schema: '../server/schema/schema.graphql',
  language: 'typescript',
  excludes: ['**/.next/**', '**/node_modules/**', '**/schema/**'],
  artifactDirectory: './src/__generated__',
  featureFlags: {
    enable_relay_resolver_transform: true,
  },
};
