const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
import { ServicesAPI } from '../../pages/frontAPI.page';

let servicesApi;
let userId;

const nome = faker.name.fullName();
const email = faker.internet.email();
const senha = faker.internet.password();
const adm = 'true';

test.describe('API Tests @API', () => {
  test.beforeEach(async ({ page }) => {
    servicesApi = new ServicesAPI();
  });

  test('Realizar Login com sucesso com API', async ({ page }) => {
    await test.step('Preencher email e senha validos para o login com sucesso - POST', async () => {
        const postSignin = await servicesApi.postLogin('fulano@qa.com', 'teste');
        const signinBody = await postSignin.json();
        expect(signinBody.message).toEqual('Login realizado com sucesso');
        expect(postSignin.status()).toBe(200);
    });
  });

  test('Realizar fluxo de usuarios com API', async ({ page }) => {
    await test.step('Obter os dados do usuario - GET', async () => {
      const usuariosResponse = await servicesApi.getUsuarios();
      const usuarioBody = await usuariosResponse.json();
      expect(usuariosResponse.status()).toBe(200);
      expect(usuarioBody).toHaveProperty('usuarios');
      expect(usuarioBody.usuarios.length).toBeGreaterThan(0); 
    })

    await test.step('Cadastrar um usuário - POST', async () => {
      const postUsuarios = await servicesApi.postUsuarios(nome, email, senha, adm);
      const usuariosBody = await postUsuarios.json();
      expect(usuariosBody.message).toEqual('Cadastro realizado com sucesso');
      userId = usuariosBody._id;
      expect(postUsuarios.status()).toBe(201)
    });

    await test.step('Buscar o usuairo pelo id', async () => {
      const usuariosIDResponse = await servicesApi.getUsuariosID();
      const usuarioIDBody = await usuariosIDResponse.json();
      expect(usuarioIDBody).toHaveProperty('_id')
      expect(usuariosIDResponse.status()).toBe(200);
    })

    // await test.step('Limpar o carrinho do usuário', async () => {
    //   const clearCarrinhoResponse = await servicesApi.clearCarrinho(userId);
    //   expect(clearCarrinhoResponse.status()).toBe(200);
    // });

    // await test.step('Excluir o usuairo pelo id', async () => {
    //   const deleteUsuarioResponse = await servicesApi.deleteUsuarioID(userId);
    //   const deleteUsuarioBody = await deleteUsuarioResponse.json();
    //   expect(deleteUsuarioBody.message).toEqual('Registro excluído com sucesso');
    //   expect(deleteUsuarioResponse.status()).toBe(200)
    // })
});
});
