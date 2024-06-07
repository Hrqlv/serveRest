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

const nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`;
const preco = faker.datatype.number({ min: 1, max: 1000 });
const descricao = faker.lorem.words(3);
const quantidade = faker.datatype.number({ min: 1, max: 100 });

test.describe('API Tests @API', () => {
    test.beforeEach(async ({ page }) => {
        servicesApi = new ServicesAPI();
        const postSignin = await servicesApi.postLogin('fulano@qa.com', 'teste');
        const signinBody = await postSignin.json();
        console.log(`Login response: ${JSON.stringify(signinBody)}`); 
        expect(signinBody.message).toEqual('Login realizado com sucesso');
        expect(postSignin.status()).toBe(200);
        servicesApi.authToken = signinBody.authorization;
        console.log(`Auth token set: ${servicesApi.authToken}`);
    });
 
    test.afterEach(async () => {
        if (produtoID) {
            const deleteProdutoResponse = await servicesApi.deleteProduto(produtoID);
            expect(deleteProdutoResponse.status()).toBe(200);
            console.log(`Produto ${produtoID} deletado com sucesso`);
        }
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

        await test.step('Buscar o usuario pelo id - GET', async () => {
            const usuariosIDResponse = await servicesApi.getUsuariosID(userId);
            const usuarioIDBody = await usuariosIDResponse.json();
            expect(usuarioIDBody).toHaveProperty('_id');
            expect(usuariosIDResponse.status()).toBe(200);
        });

        await test.step('Excluir o usuario pelo id - DELETE', async () => {
            const deleteUsuarioResponse = await servicesApi.deleteUsuarioID(userId);
            const deleteUsuarioBody = await deleteUsuarioResponse.json();
            expect(deleteUsuarioBody.message).toEqual('Registro excluído com sucesso');
            expect(deleteUsuarioResponse.status()).toBe(200);
        });

        await test.step('Alterar o usuario referente ao id - PUT', async () => {
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

        await test.step('Cadastrar um produto - POST', async () => {
            const postProdutos = await servicesApi.postProdutos(nomeProduto, preco, descricao, quantidade);
            const produtosBody = await postProdutos.json();
            expect(produtosBody.message).toEqual('Cadastro realizado com sucesso');
            produtoID = produtosBody._id;
            expect(postProdutos.status()).toBe(201);
        });

        await test.step('Buscar o produto pelo id - GET', async () => {
            const produtoIDResponse = await servicesApi.getProdutosID(produtoID);
            const produtoIDBody = await produtoIDResponse.json();
            expect(produtoIDBody).toHaveProperty('_id');
            expect(produtoIDResponse.status()).toBe(200);
        });

        await test.step('Excluir o produto pelo id - DELETE', async () => {
            const deleteProdutoResponse = await servicesApi.deleteProduto(produtoID);
            const deleteProdutoBody = await deleteProdutoResponse.json();
            expect(deleteProdutoBody.message).toEqual('Registro excluído com sucesso');
            expect(deleteProdutoResponse.status()).toBe(200);
        });

        await test.step('Alterar o produto referente ao id - PUT', async () => {
            const putProdutoResponse = await servicesApi.putProdutosID(produtoID, nomeProduto, preco, descricao, quantidade);
            const putProdutoBody = await putProdutoResponse.json();
            expect(putProdutoBody.message).toEqual('Cadastro realizado com sucesso');
            expect(putProdutoResponse.status()).toBe(201);
        })
    });
});
