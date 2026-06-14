// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { getBaseURL } from './utils/env.js';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    baseURL: getBaseURL(),
    trace: 'on-first-retry',
    testIdAttribute: 'automation-id',
  },

  /* Configure projects */
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.spec\.js/,
    },

    {
      name: 'teacher',
      testMatch: /teacher\/.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/teacher.json',
      },
    },

    {
      name: 'student',
      testMatch: /student\/.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/student.json',
      },
    },
  ],
});