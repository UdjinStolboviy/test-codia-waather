module.exports = {
  testEnvironment: "jsdom",
  // ...
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/src/test/__mocks__/fileMock.js",
    "\\.(scss)$": "<rootDir>/src/test/__mocks__/fileMock.js",
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
  ],
};
