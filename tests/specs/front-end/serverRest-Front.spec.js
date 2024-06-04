const { test } = require('@playwright/test');
import { TestsE2EPage } from '../../pages/frontE2E.page';

let testsE2EPage

test.describe('Realizae tests E2E', async () => {
  test.beforeEach(async({ page }) => {
    testsE2EPage = new TestsE2EPage(page);
   await page.goto('https://front.serverest.dev/') 
  })
  test('Realizar login', async ({ page }) => {
    await test.step('Validar titulo login', async () => {
      await testsE2EPage.validarTituloLogin()
    })

    await test.step('Preencher o login com email e senha', async () => {
      await testsE2EPage.realizarLogin()
    })
  });
})
