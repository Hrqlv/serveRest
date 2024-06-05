import { expect, request } from "@playwright/test";

export class ServicesAPI {
    constructor(authToken) {
        this.authToken = authToken;
        this.id = '0uxuPY0cbmQhpEz1',
        this.urlBase = 'https://serverest.dev'
    }

    async postLogin(user, password) {
        const context = await request.newContext();
        const response = await context.post(`${this.urlBase}/login`, {
                data: {
                    email: user, 
                    password: password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.authToken}` 
                },
            });
            expect(response.status(), `Request (/login) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200)
            return response;
    }

    async getUsuarios() {
        const context = await request.newContext()
        const response = await context.get(`${this.urlBase}/usuarios`)
        return response;
    }

    async postUsuarios(nome, email, senha, adm) {
        const context = await request.newContext()
        const response = await context.post(`${this.urlBase}/usuarios`, {
            data: {
                nome: nome,
                email: email,
                password: senha,
                administrador: adm
              },
        })
        expect(response.status(), `Request (/usuarios) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(201)
        return response;
    }

    async getUsuariosID() {
        const context = await request.newContext()
        const response = await context.get(`${this.urlBase}/usuarios/${this.id}`)
        return response
    }

    // async clearCarrinho() {
    //     const context = await request.newContext({
    //         extraHTTPHeaders: {
    //             'Authorization': `Bearer ${this.authToken}`,
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const response = await context.delete(`${this.urlBase}/carrinhos/concluir-compra`);
    //     return response;
    // }

    // async deleteUsuarioID() {
    //     const context = await request.newContext()
    //     const response = await context.delete(`${this.urlBase}/usuarios/${this.id}`)
    //     return response
    // }
}
