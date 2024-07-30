const { defineConfig, devices } = require('@playwright/test');
const { currentsReporter } = require('@currents/playwright');

// Configuração do Currents usando variáveis de ambiente
const currentsConfig = {
  ciBuildId: "hello-currents", // 📖 https://currents.dev/readme/guides/ci-build-id
  recordKey: "ys*****dx", // 📖 https://currents.dev/readme/guides/record-key
  projectId: "ugnPrx", // get one at https://app.currents.dev
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
    currentsReporter(currentsConfig) // Adicionar Currents Reporter
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
