import { defineConfig, devices } from '@playwright/test';

const envCI = process.env.CI?.toLocaleLowerCase() == 'true' ? true : false;

export default defineConfig({
  
  timeout: 100000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: envCI ? 3 : 0,
  workers: envCI ? 3 : 1,
 
  reporter: [['list', { printSteps: true }], ['html']],

  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on',
    actionTimeout: 10000,
    navigationTimeout: 40000,
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
