const { test, expect } = require('@playwright/test');
import { ServicesAPI } from '../../pages/frontAPI.page';

let servicesApi = new ServicesAPI();

test.describe('API Tests @API', async () => {
  test.beforeEach(async({ page }) => {
    await page.goto('https://serverest.dev/login')
    servicesApi = new ServicesAPI();
  });

  test('Realizar Login com sucesso @APILOGIN', async ({ page }) => {
    await test.step('Preencher email e senha validos para o login com sucesso', async () => {
        const postSignin = await servicesApi.postLogin('fulano@qa.com', 'teste');
        const signinBody = await postSignin.json();
        expect(signinBody.success).toEqual(true);
    });

    await test.step('Login and validate user', async () => {
        const loginResponse = await servicesApi.postLogin('fulano@qa.com', 'teste');
        expect(loginResponse.status()).toBe(200);
        // const loginResponseJson = await loginResponse.json();
        // await validateJsonSchema('POST_Login', loginResponseJson);
        // expect(loginResponseJson.username).toBe(user.userName)
        // expect(loginResponseJson.password).toBe(user.password)
        // expect(loginResponseJson.userId).toBe(userID)
    });
  });
});
