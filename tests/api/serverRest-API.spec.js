const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
import { createUser } from "../../helpers/helpers";
import { ServicesAPI } from './frontAPI.page';
import { validateJsonSchema } from "./jsonSchemaValidatorClasses/validateJsonSchema";

let servicesApi;
let produtoID;
let carrinhoID;
let user, userId;

const administrador = 'true';

const nomeProduto = `${faker.commerce.productName()}-${faker.datatype.uuid()}`;
const preco = faker.datatype.number({ min: 1, max: 1000 });
const descricao = faker.lorem.words(3);
const quantidade = faker.datatype.number({ min: 1, max: 100 });

test.describe('API Tests @API', () => {
    test.beforeEach(async ({ page }) => {
        servicesApi = new ServicesAPI();
        user = createUser();
    
        // Realizar Cadastro
        const postUsuarios = await servicesApi.postUsuarios(user.userName, user.email, user.password, administrador);
        await validateJsonSchema('POST_NewUser', postUsuarios);
        const usuariosBody = await postUsuarios.json();
        expect(usuariosBody.message).toEqual('Cadastro realizado com sucesso');
        userId = usuariosBody._id;
        expect(postUsuarios.status()).toBe(201);

        // Realizar login
        const postSignin = await servicesApi.postLogin(user.email, user.password);
        await validateJsonSchema('POST_NewLogin', postSignin);
        const signinBody = await postSignin.json();
        expect(signinBody.message).toEqual('Login realizado com sucesso');
        expect(postSignin.status()).toBe(200);
        servicesApi.authToken = signinBody.authorization;
    
        // Cadastrar um produto
        const postProdutos = await servicesApi.postProdutos(nomeProduto, preco, descricao, quantidade);
        await validateJsonSchema('POST_NewProduto', postProdutos);
        const produtosBody = await postProdutos.json();
        expect(produtosBody.message).toEqual('Cadastro realizado com sucesso');
        produtoID = produtosBody._id;
        expect(postProdutos.status()).toBe(201);
    });

        // Fluxo de usuario
    test('Realizar fluxo de usuario com API', async ({ page }) => {
        await test.step('Obter os dados do usuario - GET', async () => {
            const usuariosResponse = await servicesApi.getUsuarios();
            await validateJsonSchema('GET_NewUser', usuariosResponse);
            const usuarioBody = await usuariosResponse.json();
            expect(usuariosResponse.status()).toBe(200);
            expect(usuarioBody).toHaveProperty('usuarios');
            expect(usuarioBody.usuarios.length).toBeGreaterThan(0);
        });

        await test.step('Buscar o usuario pelo id - GET', async () => {
            const usuariosIDResponse = await servicesApi.getUsuariosID(userId);
            await validateJsonSchema('GET_NewUserID', usuariosIDResponse);
            const usuarioIDBody = await usuariosIDResponse.json();
            expect(usuarioIDBody).toHaveProperty('_id');
            expect(usuariosIDResponse.status()).toBe(200);
        });

        await test.step('Excluir o usuario pelo id - DELETE', async () => {
            const deleteUsuarioResponse = await servicesApi.deleteUsuarioID(userId);
            await validateJsonSchema('DELETE_DeleteUsuarioID', deleteUsuarioResponse);
            const deleteUsuarioBody = await deleteUsuarioResponse.json();
            expect(deleteUsuarioBody.message).toEqual('Registro excluído com sucesso');
            expect(deleteUsuarioResponse.status()).toBe(200);
        });

        await test.step('Alterar o usuario referente ao id - PUT', async () => {
            const putUsuarioResponse = await servicesApi.putUsuarios(userId, user.userName, user.email, user.password, administrador);
            await validateJsonSchema('PUT_User', putUsuarioResponse);
            const putUsuarioBody = await putUsuarioResponse.json();
            expect(putUsuarioBody.message).toEqual('Cadastro realizado com sucesso');
            expect(putUsuarioResponse.status()).toBe(201);
        });
    });

        // Fluxo de produto
    test('Realizar fluxo de produto com API', async ({ page }) => {
        await test.step('Pegar os produtos - GET', async () => {
            const produtosResponse = await servicesApi.getProdutos();
            await validateJsonSchema('GET_Produto', produtosResponse);
            const produtosBody = await produtosResponse.json();
            expect(produtosResponse.status()).toBe(200);
            expect(produtosBody).toHaveProperty('produtos');
            expect(produtosBody.produtos.length).toBeGreaterThan(0);
        });

        await test.step('Buscar o produto pelo id - GET', async () => {
            const produtoIDResponse = await servicesApi.getProdutosID(produtoID);
            await validateJsonSchema('GET_ProdutoID', produtoIDResponse);
            const produtoIDBody = await produtoIDResponse.json();
            expect(produtoIDBody).toHaveProperty('_id');
            expect(produtoIDResponse.status()).toBe(200);
        });

        await test.step('Excluir o produto pelo id - DELETE', async () => {
            const deleteProdutoResponse = await servicesApi.deleteProduto(produtoID);
            await validateJsonSchema('DELETE_Produto', deleteProdutoResponse);
            const deleteProdutoBody = await deleteProdutoResponse.json();
            expect(deleteProdutoBody.message).toEqual('Registro excluído com sucesso');
            expect(deleteProdutoResponse.status()).toBe(200);
        });

        await test.step('Alterar o produto referente ao id - PUT', async () => {
            const putProdutoResponse = await servicesApi.putProdutosID(produtoID, nomeProduto, preco, descricao, quantidade);
            await validateJsonSchema('PUT_ProdutoID', putProdutoResponse);
            const putProdutoBody = await putProdutoResponse.json();
            expect(putProdutoBody.message).toEqual('Cadastro realizado com sucesso');
            expect(putProdutoResponse.status()).toBe(201);
        });
    });

        // Fluxo de carrinho
    test('Realizar fluxo de carrinho com API', async ({ page }) => {
        await test.step('Concluir compra - DELETE', async () => {
            const concluirCompraResponse = await servicesApi.concluirCompra(carrinhoID)
            await validateJsonSchema('DELETE-ConcluirCompra', concluirCompraResponse);
            expect(concluirCompraResponse.status()).toBe(200)
        })
 
        await test.step('Cancelar compra - DELETE', async () => {
            const cancelarCompraResponse = await servicesApi.cancelarCompra(carrinhoID);
            await validateJsonSchema('DELETE_CancelarCompra', cancelarCompraResponse);
            expect(cancelarCompraResponse.status()).toBe(200);
        })

        await test.step('Pegar produtos no carrinho - GET', async () => {
            const carrinhoResponse = await servicesApi.getCarrinho();
            await validateJsonSchema('GET_Carrinho', carrinhoResponse);
            const carrinhoBody = await carrinhoResponse.json();
            expect(carrinhoBody).toHaveProperty('carrinhos');
            expect(carrinhoResponse.status()).toBe(200);
        })

         await test.step('Postar um carrinho - POST', async () => {
            const postCarrinhos = await servicesApi.postCarrinho(produtoID, quantidade);
            await validateJsonSchema('POST_PostCarrinho', postCarrinhos);
            const carrinhosBody = await postCarrinhos.json();
            expect(carrinhosBody.message).toEqual('Cadastro realizado com sucesso');
            carrinhoID = carrinhosBody._id;
            expect(postCarrinhos.status()).toBe(201);
        })
   
        await test.step('Pegar carrinho referente ao id - GET', async () => {
            const carrinhoIDResponse = await servicesApi.getCarrinhoID(carrinhoID);
            await validateJsonSchema('GET_CarrinhoID', carrinhoIDResponse);
            const carrinhoIDBody = await carrinhoIDResponse.json();
            expect(carrinhoIDBody).toHaveProperty('_id');
            expect(carrinhoIDResponse.status()).toBe(200);
        })
    });
});
