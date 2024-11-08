/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  reset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};