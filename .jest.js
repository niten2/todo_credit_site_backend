module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  },
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "moduleDirectories": [
    "node_modules",
    "spec",
    "src"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  },
  "testMatch": [
    "**/spec/**/*.spec.(ts|js)"
  ],
  "testEnvironment": "node",
  "setupTestFrameworkScriptFile": "./spec/support/index.ts",
  "notify": false,
  "clearMocks": false,
  "verbose": false,
}
