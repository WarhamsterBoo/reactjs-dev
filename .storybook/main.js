const path = require('path');

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      shared: path.resolve(__dirname, "../src/components/Shared"),
    };
    return config;
  },
};
