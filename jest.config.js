module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|scss|png|jpg|jpeg|gif|svg)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
};
