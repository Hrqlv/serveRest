import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 100000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [['list', { printSteps: true }], ['html']],
  use: {
    // baseURL: process.env.URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
