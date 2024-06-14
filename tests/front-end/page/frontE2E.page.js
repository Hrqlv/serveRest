import { expect } from '@playwright/test';

export class TestsE2EPage {

    constructor(page) {
        this.page = page;
        this.mensagemErroCadastro = 'div[class*="alert alert"]',
        this.btnCadastrar = 'button[data-testid="cadastrar"]'
    }

    async irPara() {
        await this.page.goto('https://front.serverest.dev/cadastrarusuarios') 
    }

    async realizarCadastro(nome, email, password) {
        await this.page.locator('input[data-testid="nome"]').type(nome)
        await this.page.locator('input[data-testid="email"]').type(email)
        await this.page.locator('input[data-testid="password"]').type(password)
        await this.page.locator(this.btnCadastrar).click()
    }

    async validarMensagemCadastro() {
        await expect(this.page.locator('a[class="alert-link"]').filter({hasText: 'Cadastro realizado com sucesso'})).toBeVisible()
    }

    async validarTituloPaginaInicial() {
        await expect(this.page.locator('div[class="jumbotron"]').filter({hasText: 'Serverest Store' })).toBeVisible()
    }

    async clicarNoPrimeiroProduto() {
        await this.page.locator('div[class="card-body"]').nth(0).click()
    }

    async adicionarNaLista() {
        await this.page.locator('button[data-testid="adicionarNaLista"]').filter({hasText: 'Adicionar a lista' }).nth(0).click()
    }

    async validarPaginaListaDeCompras() {
        await expect(this.page.locator('h1').filter({hasText: 'Lista de Compras' })).toBeVisible()
        await expect(this.page.locator('div[class="card col-3"]')).toBeVisible()
    }

    async logout() {
        await this.page.locator('button[data-testid="logout"]').click()
    }

    async validarMensagensErroCadastro() {
        await this.page.locator('a[data-testid="cadastrar"]').click()
        await this.page.locator(this.btnCadastrar).click()
        await expect(this.page.locator(this.mensagemErroCadastro).filter({hasText: 'Nome é obrigatório' })).toBeVisible()
        await expect(this.page.locator(this.mensagemErroCadastro).filter({hasText: 'Email é obrigatório' })).toBeVisible()
        await expect(this.page.locator(this.mensagemErroCadastro).filter({hasText: 'Password é obrigatório' })).toBeVisible()
    }
}
