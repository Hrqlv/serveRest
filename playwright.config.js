const { defineConfig, devices } = require('@playwright/test');

const envCI = process.env.CI?.toLocaleLowerCase() === 'true';

module.exports = defineConfig({
  timeout: 100000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: envCI ? 3 : 0,
  workers: envCI ? 3 : 3,

  reporter: [
    ['list', { printSteps: true }],
    ['html'],
  ],

  use: {
    trace: 'on',
    video: 'on',
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
