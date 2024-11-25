/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/src/treasureGenerator/__tests__/generator/test-utils.ts',
    '<rootDir>/src/treasureGenerator/__tests__/generator/test_data/*',
  ],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
