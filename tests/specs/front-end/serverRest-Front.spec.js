const { test } = require('@playwright/test');
import { TestsE2EPage } from '../../pages/frontE2E.page';

let testsE2EPage

test.describe('Realizae tests E2E', async () => {
  test.beforeEach(async({ page }) => {
    testsE2EPage = new TestsE2EPage(page);
   await page.goto('https://front.serverest.dev/') 
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

  test('Realizar a validaçao de produtos que contem na pagina inicial e no carrinho que o usuario desejar', async ({ page }) => {
    await test.step('Validar quantos produtos tem', async () => {
      await testsE2EPage.realizarLogin()
      await testsE2EPage.validarProdutosTelaInicial()
      await testsE2EPage.adicionarNaListaValidarProdutoCarrinho()
    })
  })
})
