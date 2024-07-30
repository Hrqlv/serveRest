const { defineConfig, devices } = require('@playwright/test');
const { currentsReporter } = require('@currents/playwright');

// Configuração do Currents usando variáveis de ambiente
const currentsConfig = {
  ciBuildId: process.env.CI_BUILD_ID || "local-build", // Usando a variável de ambiente ou um valor padrão
  recordKey: process.env.RECORD_KEY, // Usando a variável de ambiente
  projectId: process.env.PROJECT_ID, // Usando a variável de ambiente
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
