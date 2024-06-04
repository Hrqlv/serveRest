import { expect, request } from "@playwright/test";

export class ServicesAPI {
    constructor(authToken) {
        this.authToken = authToken
    }
    
    async postLogin(user = string, password = string) {
        const context = await request.newContext()
        const response = await context.post(`/login`, {
            data: {
                "userName": user,
                "password": password
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response
        // expect(response.status(), `Request (Account/v1/Login) failed\nStatus: ${(response.status())} ${response.statusText()}`).toBe(200)
        // return response.json();
    }
}