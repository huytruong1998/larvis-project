/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    // ✅ Mocks for CSS Modules
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
};

module.exports = config;
