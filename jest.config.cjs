module.exports = {
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  esModuleInterop: true,
};
