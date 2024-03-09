const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';

test("Verify All Books link is visible", async ({page}) => {
    await page.goto(baseUrl);
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify Login button is visible', async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('#guest');
    const loginButton = await page.$('a.button:nth-child(1)');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify Register button is visible', async ( {page} ) => {
    await page.goto(baseUrl);
    await page.waitForSelector('#guest');
    const registerButton = await page.$('a.button:nth-child(2)');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});