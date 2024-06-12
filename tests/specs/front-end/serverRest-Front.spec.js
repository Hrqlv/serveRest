const { test } = require('@playwright/test');
import { TestsE2EPage } from '../../pages/frontE2E.page';

let testsE2EPage

test.describe('E2E Tests @E2E', async () => {
  test.beforeEach(async({ page }) => {
    testsE2EPage = new TestsE2EPage(page);
    await testsE2EPage.irPara()
  })
  
  test('Realizar login e validar mensagem de campos inválidos', async ({ page }) => {
    await test.step('Validar titulo login', async () => {
      await testsE2EPage.validarTituloLogin()
    })

    await test.step('Preencher o login com email e senha', async () => {
      await testsE2EPage.realizarLogin()
    })

    await test.step('Validar mensagens de erros para campos inválidos', async () => {
      await testsE2EPage.validarMensagensDeErroLogin()
    })
  });

  test('Realizar a validaçao de usuarios que contem nos produtos', async ({ page }) => {
    await test.step('Validar a lista dos usuarios', async () => {
      await testsE2EPage.realizarLogin()
      await testsE2EPage.botaoListarUsuario()
      await testsE2EPage.validarListaUsuarios()
    })
  })
})
