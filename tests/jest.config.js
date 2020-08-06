module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js", "jest-localstorage-mock"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  rootDir: "../",
  snapshotSerializers: ["jest-emotion", "enzyme-to-json/serializer"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/tests/e2e"],
  modulePaths: ["src/", "node_modules"],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
