const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000';
const loginUrl = 'http://localhost:3000/login';
const registerUrl = 'http://localhost:3000/register';
const catalogUrl = 'http://localhost:3000/catalog';
const loginEmail = 'peter@abv.bg';
const registerEmail = 'some@email.com';
const password = '123456';

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
test('Submit Login Form with Valid Credentials', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Submit Login Form with Empty Input Fields', async ({page}) => {
    await page.goto(loginUrl);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Submit Login Form with Empty Email Input Field', async ({page}) => {
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

test('Submit Login Form with Empty Password Input Field', async ({page}) => {
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

// Tests for Register Page
test('Submit Register Form with Valid Values', async ({page}) => {
    await page.goto(registerUrl);
    await page.fill('#email', registerEmail);
    await page.fill('#password', password);
    await page.fill('#repeat-pass', password);
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Submit Register Form with Empty Values', async ({page}) => {
    await page.goto(registerUrl);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Submit Register Form with Empty Email', async ({page}) => {
    await page.goto(registerUrl);
    await page.fill('#password', password);
    await page.fill('#repeat-pass', password);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Submit Register Form with Empty Password', async ({page}) => {
    await page.goto(registerUrl);
    await page.fill('#email', registerEmail);
    await page.fill('#repeat-pass', password);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Submit Register Form with Empty Confirm  Password', async ({page}) => {
    await page.goto(registerUrl);
    await page.fill('#email', registerEmail);
    await page.fill('#password', password);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Submit Register Form with Different Passwords', async ({page}) => {
    await page.goto(registerUrl);
    await page.fill('#email', registerEmail);
    await page.fill('#password', password);
    await page.fill('#repeat-pass', '654321');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

// Test for "Add Book" page
test('Add book with correct data', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test title');
    await page.fill('#description', 'Test description');
    await page.fill('#image', 'http://someurl.com/example-image.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('input[type="submit"]');

    await page.waitForURL(catalogUrl);
    expect(page.url()).toBe(catalogUrl);
});

test('Add book with empty title', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'Test description');
    await page.fill('#image', 'http://someurl.com/example-image.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are requireq!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create'); 
});

test('Add book with empty description', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test title');
    await page.fill('#image', 'http://someurl.com/example-image.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are requireq!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create'); 
});

test('Add book with empty image url', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test title');
    await page.fill('#description', 'Test description');
    await page.selectOption('#type', 'Mistery');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are requireq!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create'); 
});

// Test for "All Books" page
test('Verify That All Books Are Displayed', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);

});

// test('Verify That No Books Are Displayed', async ({page}) => {
//     await page.goto(loginUrl);
//     await page.fill('#email', loginEmail);
//     await page.fill('#password', password);
//     await Promise.all([
//         page.click('input[type="submit"]'),
//         page.waitForURL(catalogUrl)
//     ]);
    
//     const noBooksMessage = await page.textContent('.no-books');
//     expect(noBooksMessage).toBe('No books in database!');

// });

//Tests for "Details" page
test('Login and navigate to Details page', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test title');
});

test('Guest user navigate to Details page', async ({page}) => {
    await page.goto(baseUrl);
    
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test title');
});

test('Verify That All Info Is Displayed Correctly', async ({page}) => {
    await page.goto(baseUrl);
    
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test title');

    const detailsPageType = await page.textContent('p.type');
    expect(detailsPageType).toBe('Type: Mistery');

    const detailsPageDescription = await page.textContent('.book-description p');
    expect(detailsPageDescription).toBe('Test description');

    const imageSrc = await page.$eval('p.img img', (img) => img.src);
    expect(imageSrc).toBe('http://someurl.com/example-image.jpg');
});

test('Verify If Edit and Delete Buttons Are Visible for Creator', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);

    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const editButton = page.locator('.button >> text=Edit');
    const deleteButton = page.locator('.button >> text=Delete');
    await expect(editButton).toBeVisible();
    await expect(deleteButton).toBeVisible();
});

test('Verify If Edit and Delete Buttons Are Not Visible for Non-Creator', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', 'john@abv.bg');
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const editButton = page.locator('.button >> text=Edit');
    const deleteButton = page.locator('.button >> text=Delete');
    await expect(editButton).not.toBeVisible();
    await expect(deleteButton).not.toBeVisible();
});

test('Verify If Like Button Is Not Visible for Creator', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);

    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const likeButton = page.locator('.button >> text=Like');
    await expect(likeButton).not.toBeVisible();
});

test('Verify If Like Button Is Visible for Non-Creator', async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', "john@abv.bg");
    await page.fill('#password', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(catalogUrl)
    ]);

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const likeButton = page.locator('.button >> text=Like');
    await expect(likeButton).toBeVisible();
});

// Logout functionality
test("Verify That the Logout Button Is Visible", async ({page}) => {
    await page.goto(loginUrl);
    await page.fill('#email', loginEmail);
    await page.fill('#password', password);
    await page.click('input.button');
    
    await page.waitForSelector('nav.navbar');
    const addBooksLink = await page.$('a[href="javascript:void(0)"]');
    const isAddBooksVisible = await addBooksLink.isVisible();

    expect(isAddBooksVisible).toBe(true);
});