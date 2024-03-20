import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  //leverage SWC + jest-runtime to resolve memory leak issue
  //https://github.com/reside-eng/jest-runtime
  //https://swc.rs/docs/usage/jest
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  runtime: '@side/jest-runtime',
});
