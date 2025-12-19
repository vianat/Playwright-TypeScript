import { test, expect } from '@playwright/test';

test.describe("Login functionality", () => {

    test.beforeEach('Go to login page', async ({page}) => {
        await page.goto('/');
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        await page.getByRole("link", {name: "Make Appointment"}).click();
        await expect(page.getByText("Please login to make")).toBeVisible();
    })

    test('Login with valid creds', async ({page}) => {

        await page.getByLabel("Username").fill("John Doe")
        await page.getByLabel("Password").fill("ThisIsNotAPassword")
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    test('Should prevent login with invalid creds', async ({page}) => {

        await page.getByLabel("Username").fill("John Fufelof")
        await page.getByLabel("Password").fill("invalid")
        await page.getByRole("button", {name: "Login"}).click();

        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    });
})