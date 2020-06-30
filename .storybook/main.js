const path = require('path');

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      include: path.resolve(__dirname, '../src'),
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      ...config.resolve.alias,
      styles: path.resolve(__dirname, "../src/styles"),
      "@": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};
