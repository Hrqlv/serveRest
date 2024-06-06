import { Page, expect } from '@playwright/test';

export class TestsE2EPage {

    constructor(page) {
        this.page = page;
    }

    async validarTituloLogin() {
    await expect(this.page.locator('h1[class="font-robot"]')).toBeVisible()
    }

    async realizarLogin() {
    await this.page.locator('input[data-testid="email"]').type('fulano@qa.com')
    await this.page.locator('input[data-testid="senha"]').type('teste')
    await this.page.locator('button[data-testid="entrar"]').click()
    }

    async validarMensagensDeErroLogin() {
        await this.page.locator('button[data-testid="logout"]').click()
        await this.page.locator('button[data-testid="entrar"]').click()
        await expect(this.page.locator('div[class="alert alert-secondary alert-dismissible"]').filter({hasText: 'Email é obrigatório' })).toBeVisible()
        await expect(this.page.locator('div[class="alert alert-secondary alert-dismissible"]').filter({hasText: 'Password é obrigatório' })).toBeVisible()
    }

    async validarProdutosTelaInicial() {
      await expect(this.page.locator('div[class*="card"]').filter({hasText: 'Unbranded Rubber Bacon' }).nth(0)).toBeVisible()
    }

    async adicionarNaListaValidarProdutoCarrinho() {
        await this.page.locator('button[data-testid="adicionarNaLista"]').nth(0).click()
        await expect(this.page.locator('h1').filter({hasText: 'Lista de Compras' })).toBeVisible()
        await expect(this.page.locator('div[data-testid="shopping-cart-product-name"]')).toBeVisible()
    }
}
