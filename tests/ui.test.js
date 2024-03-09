const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';
const loginUrl = 'http://localhost:3000/login';

// Navigation Bar for Guest Users
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

// Navigation Bar for Logged-In Users
test("Verify All Books link is visible after login", async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input.button');
    
    // Check if All Books link is visible
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test("Verify My Books link is visible", async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input.button');
    
    // Check if My Books link is visible
    await page.waitForSelector('nav.navbar');
    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksVisible = await myBooksLink.isVisible();

    expect(isMyBooksVisible).toBe(true);
});

test("Verify Add Books link is visible", async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input.button');
    
    // Check if Add Book link is visible
    await page.waitForSelector('nav.navbar');
    const addBooksLink = await page.$('a[href="/create"]');
    const isAddBooksVisible = await addBooksLink.isVisible();

    expect(isAddBooksVisible).toBe(true);
});

test("Verify user email is visible", async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input.button');
    
    // Check if user email is visible
    await page.waitForSelector('#user>span');
    const emailSpan = await page.$('#user>span');
    const emailSpanText = await emailSpan.textContent();

    expect(emailSpanText).toBe('Welcome, peter@abv.bg');
});

// Test for Login Page
test('Submit the Form with Valid Credentials', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Submit the Form with Empty Input Fields', async ({page}) => {
    await page.goto(loginUrl);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Submit the Form with Empty Email Input Field', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test.only('Submit the Form with Empty Password Input Field', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});