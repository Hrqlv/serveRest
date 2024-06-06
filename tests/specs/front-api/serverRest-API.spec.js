const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
import { ServicesAPI } from '../../pages/frontAPI.page';

let servicesApi;
let userId;
let produtoID

const nomeUsuario = faker.name.fullName();
const email = faker.internet.email();
const senha = faker.internet.password();
const adm = 'true';

const nomeProduto = faker.commerce.productName();
const preco = faker.datatype.number({ min: 1, max: 1000 });
const descricao = faker.lorem.words(3);
const quantidade = faker.datatype.number({ min: 1, max: 100 });

test.describe('API Tests @API', () => {
    test.beforeEach(async ({ page }) => {
        servicesApi = new ServicesAPI();
        const postSignin = await servicesApi.postLogin('fulano@qa.com', 'teste');
        const signinBody = await postSignin.json();
        expect(signinBody.message).toEqual('Login realizado com sucesso');
        expect(postSignin.status()).toBe(200);
        servicesApi.authToken = signinBody.authorization
    });

    test('Realizar fluxo de usuarios com API', async ({ page }) => {
        await test.step('Obter os dados do usuario - GET', async () => {
            const usuariosResponse = await servicesApi.getUsuarios();
            const usuarioBody = await usuariosResponse.json();
            expect(usuariosResponse.status()).toBe(200);
            expect(usuarioBody).toHaveProperty('usuarios');
            expect(usuarioBody.usuarios.length).toBeGreaterThan(0);
        });

        await test.step('Cadastrar um usuário - POST', async () => {
            const postUsuarios = await servicesApi.postUsuarios(nomeUsuario, email, senha, adm);
            const usuariosBody = await postUsuarios.json();
            expect(usuariosBody.message).toEqual('Cadastro realizado com sucesso');
            userId = usuariosBody._id;
            expect(postUsuarios.status()).toBe(201);
        });

        await test.step('Buscar o usuario pelo id', async () => {
            const usuariosIDResponse = await servicesApi.getUsuariosID(userId);
            const usuarioIDBody = await usuariosIDResponse.json();
            expect(usuarioIDBody).toHaveProperty('_id');
            expect(usuariosIDResponse.status()).toBe(200);
        });

        await test.step('Excluir o usuario pelo id', async () => {
            const deleteUsuarioResponse = await servicesApi.deleteUsuarioID(userId);
            const deleteUsuarioBody = await deleteUsuarioResponse.json();
            expect(deleteUsuarioBody.message).toEqual('Registro excluído com sucesso');
            expect(deleteUsuarioResponse.status()).toBe(200);
        });

        await test.step('Alterar o usuario referente ao id', async () => {
            const putUsuarioResponse = await servicesApi.putUsuarios(userId, nomeUsuario, email, senha, adm);
            const putUsuarioBody = await putUsuarioResponse.json();
            expect(putUsuarioBody.message).toEqual('Cadastro realizado com sucesso');
            expect(putUsuarioResponse.status()).toBe(201);
        });
    });

    test('Realizar fluxo de produtos com API', async ({ page }) => {
        await test.step('Pegar os produtos - GET', async () => {
            const produtosResponse = await servicesApi.getProdutos();
            const produtosBody = await produtosResponse.json();
            expect(produtosResponse.status()).toBe(200);
            expect(produtosBody).toHaveProperty('produtos');
            expect(produtosBody.produtos.length).toBeGreaterThan(0);
        });

        await test.step('Postar o produto - POST', async () => {
            const postProduto = await servicesApi.postProdutos(nomeProduto, preco, descricao, quantidade);
            const produtoBody = await postProduto.json();
            expect(produtoBody.message).toEqual('Cadastro realizado com sucesso');
            produtoID = usuariosBody._id;
            expect(postProduto.status()).toBe(201);
        });

        await test.step('Excluir produto - DELETE', async () => {
          const deleteProdutoResponse = await servicesApi.deleteProduto(produtoID);
          const deleteProdutoBody = await deleteProdutoResponse.json();
          expect(deleteProdutoBody.message).toEqual('Registro excluído com sucesso ');
          expect(deleteProdutoResponse.status()).toBe(200);
        })
    });
});
