module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  rootDir: "../",
  snapshotSerializers: ["jest-emotion"],
  moduleNameMapper: {
    "shared(.*)": "<rootDir>/src/components/Shared/$1",
    "styles/(.*)": "<rootDir>/src/styles/$1",
    "commonTypes/(.*)": "<rootDir>/src/commonTypes/$1",
  },
  modulePaths: [
    "src/",
    "node_modules"
  ],
};
