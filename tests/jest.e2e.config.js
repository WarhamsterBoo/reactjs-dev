module.exports = {
  clearMocks: true,
  preset: "jest-puppeteer",
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.e2e.js", "expect-puppeteer"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  rootDir: "../",
  testPathIgnorePatterns: ["<rootDir>/src/"],
  modulePaths: ["src/", "node_modules"],
};
