import { expect, request } from "@playwright/test";

export class ServicesAPI {
    constructor() {
        this.authToken = null;
        this.urlBase = 'https://serverest.dev';
    }

    async postLogin(user, password) {
        const context = await request.newContext();
        const response = await context.post(`${this.urlBase}/login`, {
            data: {
                email: user,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            },
        });
        expect(response.status(), `Request (/login) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200);
        const responseBody = await response.json();
        this.authToken = responseBody.authorization;
        console.log(`Auth Token: ${this.authToken}`); 
        return response;
    }

    async getUsuarios() {
        console.log(`Token for getUsuarios: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.get(`${this.urlBase}/usuarios`);
        return response;
    }

    async postUsuarios(nome, email, senha, adm) {
        console.log(`Token for postUsuarios: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken,
                'Content-Type': 'application/json'
            }
        });
        const response = await context.post(`${this.urlBase}/usuarios`, {
            data: {
                nome: nome,
                email: email,
                password: senha,
                administrador: adm
            }
        });
        expect(response.status(), `Request (/usuarios) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(201);
        return response;
    }

    async getUsuariosID(userId) {
        console.log(`Token for getUsuariosID: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.get(`${this.urlBase}/usuarios/${userId}`);
        return response;
    }

    async deleteUsuarioID(userID) {
        console.log(`Token for deleteUsuarioID: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.delete(`${this.urlBase}/usuarios/${userID}`);
        expect(response.status(), `Request (/usuarios/${userID}) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200);
        return response;
    }

    async putUsuarios(userID, nome, email, senha, adm) {
        console.log(`Token for putUsuarios: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken,
                'Content-Type': 'application/json'
            }
        });
        const response = await context.put(`${this.urlBase}/usuarios/${userID}`, {
            data: {
                nome: nome,
                email: email,
                password: senha,
                administrador: adm
            }
        });
        expect(response.status(), `Request (/usuarios/${userID}) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(201);
        return response;
    }

    async getProdutos() {
        console.log(`Token for getProdutos: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.get(`${this.urlBase}/produtos`);
        return response;
    }

    async postProdutos(nome, preco, descricao, quantidade) {
        console.log(`Token for postProdutos: ${this.authToken}`);
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken,
                'Content-Type': 'application/json'
            }
        });

        const response = await context.post(`${this.urlBase}/produtos`, {
            data: {
                nome: nome,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade
            }
        });

        expect(response.status(), `Request (/produtos) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(201);
        return response;
    }

    async getProdutosID(produtoID) {
        console.log(`Token for getProdutosID: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.get(`${this.urlBase}/produtos/${produtoID}`);
        expect(response.status(), `Request (/produtos/${produtoID}) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200);
        return response;
    }

    async deleteProduto(produtoID) {
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken
            }
        });
        const response = await context.delete(`${this.urlBase}/produtos/${produtoID}`);
        expect(response.status(), `Request (/produtos/${produtoID}) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200);
        return response;
    }

    async putProdutosID(produtoID, nome, preco, descricao, quantidade) {
        console.log(`Token for putProdutosID: ${this.authToken}`); 
        const context = await request.newContext({
            extraHTTPHeaders: {
                'Authorization': this.authToken,
                'Content-Type': 'application/json'
            }
        });
        const response = await context.put(`${this.urlBase}/produtos/${produtoID}`, {
            data: {
                nome: nome,
                preco: preco,
                descricao: descricao,
                quantidade: quantidade
            }
        });
        expect(response.status(), `Request (/produtos/${produtoID}) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(201);
        return response;
    }
    
}
