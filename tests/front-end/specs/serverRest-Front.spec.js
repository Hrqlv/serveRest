const { test } = require('@playwright/test');
import { TestsE2EPage } from '../page/frontE2E.page';
import { createUser } from "../../../helpers/helpers";

let testsE2EPage
let user

test.describe('E2E Tests @E2E', async () => {
  test.beforeEach(async({ page }) => {
    testsE2EPage = new TestsE2EPage(page);
    user = createUser();
    await testsE2EPage.irPara()
    await testsE2EPage.realizarCadastro(user.userName, user.email, user.password)
    await testsE2EPage.validarMensagemCadastro()
  })
  
  test('Validar titulo da pagina inicial, clicar no primeiro produto, adicionar na lista e validar', async ({ page }) => {
    await test.step('Validar titulo pagina inicial', async () => {
      await testsE2EPage.validarTituloPaginaInicial()
    })

    await test.step('Clicar no primeiro produto', async () => {
      await testsE2EPage.clicarNoPrimeiroProduto()
    })

    await test.step('Adicionar na lista', async () => {
      await testsE2EPage.adicionarNaLista()
    })

    await test.step('Validar pagina lista de compras', async () => {
      await testsE2EPage.validarPaginaListaDeCompras()
    })
  });

  test('Fazer o logout da pagina incial e validar mensagens de erro da tela de cadastro', async ({page}) => {
    await test.step('Fazer logout', async () => {
      await testsE2EPage.logout()
    })

    await test.step('Validar as mensagens de erro', async () => {
      await testsE2EPage.validarMensagensErroCadastro()
    })
  })
})
