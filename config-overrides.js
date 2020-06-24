const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = function override(config, env) {
  config.plugins.unshift(
    new ModuleFederationPlugin({
      name: 'app-1',
      library: { type: 'var', name: 'app1' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        ...dependencies,
        // '@material-ui/styles/esm/StylesProvider',
        // '@material-ui/styles/esm/useTheme/ThemeContext',
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    }),
  );

  // Disable runtimeChunk when producing `remoteEntry.js`
  delete config.optimization.runtimeChunk;

  return config;
};
