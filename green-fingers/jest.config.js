/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './jest.setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo|@unimodules|@testing-library)',
  ],
};

