import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],  // point to your test folder
  transform: {
    '^.+\\.ts$': ['ts-jest', {}],  // ts-jest transform
  },
};

export default config;
