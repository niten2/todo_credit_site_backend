module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfigFile": "./tsconfig.json"
    }
  },

  "moduleFileExtensions": [
    "ts",
    "js"
  ],

  "moduleDirectories": [
    "node_modules",
    "test",
    "src",
  ],

  "transform": {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
  },

  "testMatch": [
    "**/test/**/*.(spec|test).(ts|js)"
  ],

  "testPathIgnorePatterns": [
    "<rootDir>/etc/",
    "<rootDir>/node_modules/",
  ],

  "modulePathIgnorePatterns": [
    "<rootDir>/etc/",
  ],

  "testEnvironment": "node",
  "setupTestFrameworkScriptFile": "./test/support/index.ts",
  "notify": false,
  "clearMocks": false,
  "verbose": false,
  "timers": "fake",
}
