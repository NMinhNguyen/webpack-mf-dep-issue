const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// SKIP_PREFLIGHT_CHECK=true react-app-rewired start --scripts-version @duplotech/react-scripts

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
        '@material-ui/styles/esm/StylesProvider': { singleton: true },
        '@material-ui/styles/esm/useTheme/ThemeContext': { singleton: true },
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  );

  // Disable runtimeChunk when producing `remoteEntry.js`
  delete config.optimization.runtimeChunk;

  return config;
};
