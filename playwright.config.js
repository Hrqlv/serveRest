const { defineConfig, devices } = require('@playwright/test');
const { currentsReporter } = require('@currents/playwright');

// Configuração do Currents usando variáveis de ambiente
const currentsConfig = {
  ciBuildId: process.env.CI_BUILD_ID || "hello",
  recordKey: process.env.RECORD_KEY,
  projectId: process.env.PROJECT_ID,
};

const envCI = process.env.CI?.toLocaleLowerCase() == 'true' ? true : false;

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
    currentsReporter(currentsConfig)
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
