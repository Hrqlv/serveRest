import { Page, expect } from '@playwright/test';

export class TestsE2EPage {

    constructor(page) {
        this.page = page;
    }

    async validarTituloLogin() {
    await expect(this.page.locator('h1[class="font-robot"]')).toBeVisible()
    }

    async realizarLogin() {
    await this.page.locator('input[data-testid="email"]').type('test01@gmail.com')
    await this.page.locator('input[data-testid="senha"]').type('test@123')
    await this.page.locator('button[data-testid="entrar"]').click()
    }

}
